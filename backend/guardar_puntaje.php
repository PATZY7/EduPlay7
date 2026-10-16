<?php
header("Content-Type: application/json; charset=UTF-8");
include 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['estudiante_id'], $data['materia'], $data['puntaje'])) {
    $estudiante_id = intval($data['estudiante_id']);
    $materia = trim($data['materia']);
    $puntaje = intval($data['puntaje']);

    if ($estudiante_id <= 0) {
        // En caso de que sea administrador o cuenta especial sin ID relacional estricto
        echo json_encode(["status" => "warning", "message" => "Progreso temporal registrado (sin id de estudiante)."]);
        exit;
    }

    $stmt = $conexion->prepare("INSERT INTO puntajes (estudiante_id, materia, puntaje) VALUES (?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("isi", $estudiante_id, $materia, $puntaje);
        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success", 
                "message" => "Puntaje y progreso guardados exitosamente en la base de datos.",
                "id" => $stmt->insert_id
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al insertar en la base de datos: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error de preparación SQL: " . $conexion->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos para registrar el puntaje."]);
}
?>