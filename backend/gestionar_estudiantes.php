<?php
mysqli_report(MYSQLI_REPORT_OFF);
header("Content-Type: application/json; charset=utf-8");
include 'conexion.php';

function responder($statusCode, $payload) {
    http_response_code($statusCode);
    echo json_encode($payload);
    exit;
}

function leerDatosSolicitud() {
    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);
    if (is_array($data)) {
        return $data;
    }

    parse_str($raw, $formData);
    return is_array($formData) ? $formData : [];
}

function validarDatosEstudiante($data) {
    $campos = ["nombre", "apellido", "correo", "ru", "ci", "semestre"];
    foreach ($campos as $campo) {
        if (!isset($data[$campo]) || trim((string)$data[$campo]) === '') {
            responder(400, ["status" => "error", "message" => "Todos los campos del estudiante son obligatorios."]);
        }
    }

    $estudiante = [];
    foreach ($campos as $campo) {
        $estudiante[$campo] = trim((string)$data[$campo]);
    }
    if (!filter_var($estudiante["correo"], FILTER_VALIDATE_EMAIL)) {
        responder(400, ["status" => "error", "message" => "Ingrese un correo electrónico válido."]);
    }

    return $estudiante;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conexion->query("SELECT id, nombre, apellido, correo, ru, ci, semestre FROM estudiantes ORDER BY id DESC");
    if (!$result) {
        responder(500, ["status" => "error", "message" => "No se pudo cargar la lista de estudiantes."]);
    }

    $estudiantes = [];
    while ($row = $result->fetch_assoc()) {
        $estudiantes[] = $row;
    }
    echo json_encode($estudiantes);
    exit;
}

if ($method === 'POST') {
    $estudiante = validarDatosEstudiante(leerDatosSolicitud());
    $stmt = $conexion->prepare(
        "INSERT INTO estudiantes (nombre, apellido, correo, ru, ci, semestre) VALUES (?, ?, ?, ?, ?, ?)"
    );
    if (!$stmt) {
        responder(500, ["status" => "error", "message" => "No se pudo preparar el registro del estudiante."]);
    }
    $stmt->bind_param(
        "ssssss",
        $estudiante["nombre"],
        $estudiante["apellido"],
        $estudiante["correo"],
        $estudiante["ru"],
        $estudiante["ci"],
        $estudiante["semestre"]
    );
    if (!$stmt->execute()) {
        if ($stmt->errno === 1062) {
            responder(409, ["status" => "error", "message" => "El correo o RU ya se encuentran registrados."]);
        }
        responder(500, ["status" => "error", "message" => "No se pudo registrar al estudiante."]);
    }
    responder(201, ["status" => "success", "message" => "Estudiante registrado correctamente."]);
}

if ($method === 'PUT') {
    $data = leerDatosSolicitud();
    $id = filter_var($data["id"] ?? null, FILTER_VALIDATE_INT);
    if (!$id || $id < 1) {
        responder(400, ["status" => "error", "message" => "El identificador del estudiante no es válido."]);
    }
    $estudiante = validarDatosEstudiante($data);
    $stmt = $conexion->prepare(
        "UPDATE estudiantes SET nombre = ?, apellido = ?, correo = ?, ru = ?, ci = ?, semestre = ? WHERE id = ?"
    );
    if (!$stmt) {
        responder(500, ["status" => "error", "message" => "No se pudo preparar la actualización del estudiante."]);
    }
    $stmt->bind_param(
        "ssssssi",
        $estudiante["nombre"],
        $estudiante["apellido"],
        $estudiante["correo"],
        $estudiante["ru"],
        $estudiante["ci"],
        $estudiante["semestre"],
        $id
    );
    if (!$stmt->execute()) {
        if ($stmt->errno === 1062) {
            responder(409, ["status" => "error", "message" => "El correo o RU ya pertenecen a otro estudiante."]);
        }
        responder(500, ["status" => "error", "message" => "No se pudo actualizar al estudiante."]);
    }
    if ($stmt->affected_rows === 0) {
        $check = $conexion->prepare("SELECT id FROM estudiantes WHERE id = ?");
        $check->bind_param("i", $id);
        $check->execute();
        $check->store_result();
        if ($check->num_rows === 0) {
            responder(404, ["status" => "error", "message" => "No se encontró el estudiante solicitado."]);
        }
    }
    responder(200, ["status" => "success", "message" => "Estudiante actualizado correctamente."]);
}

if ($method === 'DELETE') {
    $data = leerDatosSolicitud();
    $id = filter_var($data["id"] ?? null, FILTER_VALIDATE_INT);
    if (!$id || $id < 1) {
        responder(400, ["status" => "error", "message" => "El identificador del estudiante no es válido."]);
    }
    $stmt = $conexion->prepare("DELETE FROM estudiantes WHERE id = ?");
    if (!$stmt) {
        responder(500, ["status" => "error", "message" => "No se pudo preparar la eliminación del estudiante."]);
    }
    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
        responder(500, ["status" => "error", "message" => "No se pudo eliminar al estudiante."]);
    }
    if ($stmt->affected_rows === 0) {
        responder(404, ["status" => "error", "message" => "No se encontró el estudiante solicitado."]);
    }
    responder(200, ["status" => "success", "message" => "Estudiante eliminado correctamente."]);
}

header("Allow: GET, POST, PUT, DELETE");
responder(405, ["status" => "error", "message" => "Método de solicitud no permitido."]);
?>
