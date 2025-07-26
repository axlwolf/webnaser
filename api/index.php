<?php
/**
 * API Entry Point - Simplificado
 */

// Headers básicos
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Para OPTIONS requests (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit();
}

// Obtener la ruta
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);

// Rutas básicas
switch($path) {
    case '/api/v1/health':
        echo json_encode([
            'status' => 'healthy',
            'timestamp' => date('c'),
            'service' => 'Grupo Naser API',
            'message' => 'Backend funcionando correctamente'
        ]);
        break;
        
    case '/api/v1/test':
        echo json_encode([
            'status' => 'success',
            'message' => 'Test endpoint funcionando',
            'timestamp' => date('c')
        ]);
        break;
        
    default:
        http_response_code(404);
        echo json_encode([
            'error' => 'Endpoint no encontrado',
            'path' => $path
        ]);
}
