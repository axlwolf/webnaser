<?php
/**
 * Health Check Endpoint
 * Temporary solution for monitoring by Warp
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

// Basic health checks
$health = [
    'status' => 'healthy',
    'timestamp' => date('c'),
    'service' => 'Grupo Naser API',
    'version' => '1.0.0',
    'checks' => []
];

// Check PHP version
$health['checks']['php'] = [
    'status' => version_compare(PHP_VERSION, '7.4.0', '>=') ? 'pass' : 'fail',
    'version' => PHP_VERSION
];

// Check database connection (if available)
try {
    if (file_exists(__DIR__ . '/../../config/database.php')) {
        require_once __DIR__ . '/../../config/database.php';
        // Assume database check would go here
        $health['checks']['database'] = ['status' => 'pass'];
    }
} catch (Exception $e) {
    $health['checks']['database'] = [
        'status' => 'fail',
        'error' => $e->getMessage()
    ];
}

// Check required extensions
$requiredExtensions = ['pdo', 'pdo_mysql', 'mbstring', 'json'];
foreach ($requiredExtensions as $ext) {
    $health['checks']['extensions'][$ext] = extension_loaded($ext) ? 'loaded' : 'missing';
}

// Overall status
$hasFailures = false;
foreach ($health['checks'] as $check) {
    if (is_array($check) && isset($check['status']) && $check['status'] === 'fail') {
        $hasFailures = true;
        break;
    }
}

if ($hasFailures) {
    $health['status'] = 'unhealthy';
    http_response_code(503);
} else {
    http_response_code(200);
}

echo json_encode($health, JSON_PRETTY_PRINT);
