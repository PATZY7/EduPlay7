<?php
mysqli_report(MYSQLI_REPORT_OFF);
$host = "localhost";
$user = "root";
$password = "";
$database = "upea_juegos_db";

// Intento de conexión inicial
$conexion = @new mysqli($host, $user, $password, $database);

// Si la base de datos no existe, intentar crearla automáticamente
if ($conexion->connect_error) {
    $rootConn = @new mysqli($host, $user, $password);
    if (!$rootConn->connect_error) {
        $rootConn->query("CREATE DATABASE IF NOT EXISTS upea_juegos_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $rootConn->close();
        $conexion = @new mysqli($host, $user, $password, $database);
    }
}

if (!$conexion || $conexion->connect_error) {
    // Si no conecta, responder JSON de error controlado sin romper la ejecución
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "No se pudo conectar a la base de datos MySQL."]);
    exit;
}

$conexion->set_charset("utf8mb4");

// Auto-creación de tablas si no existen para garantizar funcionamiento inmediato
$conexion->query("CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    ru VARCHAR(20) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL DEFAULT '',
    ci VARCHAR(20) NOT NULL,
    semestre VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

$passwordColumn = $conexion->query("SHOW COLUMNS FROM estudiantes LIKE 'password_hash'");
if (!$passwordColumn) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "No se pudo verificar la estructura de cuentas."]);
    exit;
}
if ($passwordColumn && $passwordColumn->num_rows === 0) {
    if (!$conexion->query("ALTER TABLE estudiantes ADD password_hash VARCHAR(255) NOT NULL DEFAULT '' AFTER ru")) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "No se pudo habilitar la actualización segura de contraseñas."]);
        exit;
    }
}

$conexion->query("CREATE TABLE IF NOT EXISTS puntajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT NOT NULL,
    materia VARCHAR(100) NOT NULL,
    puntaje INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_estudiante FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
?>