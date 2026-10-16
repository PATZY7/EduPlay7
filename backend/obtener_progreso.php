<?php
header("Content-Type: application/json; charset=UTF-8");
include 'conexion.php';

$estudiante_id = intval($_GET['estudiante_id'] ?? 0);

if ($estudiante_id <= 0) {
    echo json_encode([]);
    exit;
}

$stmt = $conexion->prepare("SELECT id, materia, puntaje, DATE_FORMAT(fecha, '%d/%m/%Y %H:%i') AS fecha FROM puntajes WHERE estudiante_id = ? ORDER BY fecha DESC");
if ($stmt) {
    $stmt->bind_param("i", $estudiante_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $progreso = [];
    while ($row = $result->fetch_assoc()) {
        $progreso[] = $row;
    }
    $stmt->close();
    echo json_encode($progreso);
} else {
    echo json_encode([]);
}
?>