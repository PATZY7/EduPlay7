<?php
header("Content-Type: application/json");
include 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nombre'], $data['apellido'], $data['correo'], $data['ru'], $data['ci'], $data['semestre'])) {
    $nombre = $conexion->real_escape_string($data['nombre']);
    $apellido = $conexion->real_escape_string($data['apellido']);
    $correo = $conexion->real_escape_string($data['correo']);
    $ru = $conexion->real_escape_string($data['ru']);
    $ci = $conexion->real_escape_string($data['ci']);
    $semestre = $conexion->real_escape_string($data['semestre']);

    $check = $conexion->query("SELECT id FROM estudiantes WHERE correo = '$correo' OR ru = '$ru'");
    if ($check->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "El correo o RU ya se encuentran registrados."]);
        exit;
    }

    $sql = "INSERT INTO estudiantes (nombre, apellido, correo, ru, ci, semestre) VALUES ('$nombre', '$apellido', '$correo', '$ru', '$ci', '$semestre')";
    if ($conexion->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Estudiante registrado correctamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al registrar en la base de datos."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Faltan datos obligatorios."]);
}
?>