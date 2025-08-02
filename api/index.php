<?php

require_once __DIR__ . '/core/bootstrap.php';

use App\Core\Router;
use App\Core\Request;

$router = new Router();

// Include API routes
require_once __DIR__ . '/routes/api.php';

$request = new Request();

// Basic headers
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($request->getMethod() === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$router->dispatch($request);

