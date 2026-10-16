<?php
header("Content-Type: application/json");
include 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$correo = trim($data['correo'] ?? '');
$password = (string)($data['password'] ?? $data['ru'] ?? '');

// Credenciales de Administrador del Sistema
if ($correo === 'admin@upea.bo' && $password === 'admin123') {
    echo json_encode([
        "status" => "success",
        "role" => "admin",
        "mensaje" => "Bienvenido Administrador"
    ]);
    exit;
}

$stmt = $conexion->prepare("SELECT id, nombre, apellido, correo, ru, password_hash, ci, semestre FROM estudiantes WHERE correo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $validPassword = $row['password_hash'] !== ''
        ? password_verify($password, $row['password_hash'])
        : hash_equals((string)$row['ru'], $password);
    if (!$validPassword) {
        echo json_encode([
            "status" => "error",
            "message" => "Correo o contraseña incorrectos."
        ]);
        exit;
    }

    unset($row['password_hash']);
    echo json_encode([
        "status" => "success",
        "role" => "student",
        "estudiante" => $row
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Correo o contraseña incorrectos."
    ]);
}
?>