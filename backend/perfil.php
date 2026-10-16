<?php
mysqli_report(MYSQLI_REPORT_OFF);
header("Content-Type: application/json; charset=utf-8");
include 'conexion.php';

function responderPerfil($statusCode, $payload) {
    http_response_code($statusCode);
    echo json_encode($payload);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data)) {
    responderPerfil(400, ["status" => "error", "message" => "La solicitud no contiene datos válidos."]);
}

$id = filter_var($data["id"] ?? null, FILTER_VALIDATE_INT);
$currentPassword = (string)($data["current_password"] ?? '');
$newPassword = (string)($data["new_password"] ?? '');
$campos = ["nombre", "apellido", "correo", "ci", "semestre"];
$perfil = [];

if (!$id || $id < 1 || $currentPassword === '') {
    responderPerfil(400, ["status" => "error", "message" => "Confirme su contraseña actual para continuar."]);
}

foreach ($campos as $campo) {
    if (!isset($data[$campo]) || trim((string)$data[$campo]) === '') {
        responderPerfil(400, ["status" => "error", "message" => "Complete todos los campos del perfil."]);
    }
    $perfil[$campo] = trim((string)$data[$campo]);
}

if (!filter_var($perfil["correo"], FILTER_VALIDATE_EMAIL)) {
    responderPerfil(400, ["status" => "error", "message" => "Ingrese un correo electrónico válido."]);
}
if ($newPassword !== '' && strlen($newPassword) < 6) {
    responderPerfil(400, ["status" => "error", "message" => "La nueva contraseña debe tener al menos 6 caracteres."]);
}

$lookup = $conexion->prepare("SELECT id, ru, password_hash FROM estudiantes WHERE id = ?");
if (!$lookup) {
    responderPerfil(500, ["status" => "error", "message" => "No se pudo verificar la cuenta."]);
}
$lookup->bind_param("i", $id);
if (!$lookup->execute()) {
    responderPerfil(500, ["status" => "error", "message" => "No se pudo verificar la cuenta."]);
}
$lookup->bind_result($studentId, $ru, $passwordHash);
if (!$lookup->fetch()) {
    responderPerfil(404, ["status" => "error", "message" => "No se encontró la cuenta solicitada."]);
}
$lookup->close();

$validPassword = $passwordHash !== ''
    ? password_verify($currentPassword, $passwordHash)
    : hash_equals((string)$ru, $currentPassword);
if (!$validPassword) {
    responderPerfil(403, ["status" => "error", "message" => "La contraseña actual es incorrecta."]);
}

if ($newPassword !== '') {
    $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
    $update = $conexion->prepare(
        "UPDATE estudiantes SET nombre = ?, apellido = ?, correo = ?, ci = ?, semestre = ?, password_hash = ? WHERE id = ?"
    );
    if (!$update) {
        responderPerfil(500, ["status" => "error", "message" => "No se pudo preparar la actualización del perfil."]);
    }
    $update->bind_param(
        "ssssssi",
        $perfil["nombre"],
        $perfil["apellido"],
        $perfil["correo"],
        $perfil["ci"],
        $perfil["semestre"],
        $newPasswordHash,
        $id
    );
} else {
    $update = $conexion->prepare(
        "UPDATE estudiantes SET nombre = ?, apellido = ?, correo = ?, ci = ?, semestre = ? WHERE id = ?"
    );
    if (!$update) {
        responderPerfil(500, ["status" => "error", "message" => "No se pudo preparar la actualización del perfil."]);
    }
    $update->bind_param(
        "sssssi",
        $perfil["nombre"],
        $perfil["apellido"],
        $perfil["correo"],
        $perfil["ci"],
        $perfil["semestre"],
        $id
    );
}

if (!$update->execute()) {
    if ($update->errno === 1062) {
        responderPerfil(409, ["status" => "error", "message" => "Ese correo ya está asociado a otra cuenta."]);
    }
    responderPerfil(500, ["status" => "error", "message" => "No se pudo guardar el perfil."]);
}

$student = $conexion->prepare(
    "SELECT id, nombre, apellido, correo, ru, ci, semestre FROM estudiantes WHERE id = ?"
);
if (!$student) {
    responderPerfil(500, ["status" => "error", "message" => "El perfil se guardó, pero no se pudo recargar la cuenta."]);
}
$student->bind_param("i", $id);
if (!$student->execute()) {
    responderPerfil(500, ["status" => "error", "message" => "El perfil se guardó, pero no se pudo recargar la cuenta."]);
}
$result = $student->get_result();
$updatedProfile = $result->fetch_assoc();
responderPerfil(200, [
    "status" => "success",
    "message" => "Perfil actualizado correctamente.",
    "estudiante" => $updatedProfile
]);
?>
