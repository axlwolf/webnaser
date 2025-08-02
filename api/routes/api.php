<?php

use App\Controllers\AuthController;
use App\Controllers\ContentController;
use App\Controllers\ServiceController;
use App\Controllers\LocationController;

$router->add('POST', '/api/auth/login', [AuthController::class, 'login']);
$router->add('POST', '/api/auth/logout', [AuthController::class, 'logout']);
$router->add('POST', '/api/auth/refresh', [AuthController::class, 'refresh']);
$router->add('GET', '/api/auth/me', [AuthController::class, 'me']);
$router->add('POST', '/api/auth/change-password', [AuthController::class, 'changePassword']);

$router->add('GET', '/api/content/pages', [ContentController::class, 'index']);
$router->add('GET', '/api/content/pages/{id}', [ContentController::class, 'show']);
$router->add('POST', '/api/content/pages', [ContentController::class, 'create']);
$router->add('PUT', '/api/content/pages/{id}', [ContentController::class, 'update']);
$router->add('DELETE', '/api/content/pages/{id}', [ContentController::class, 'delete']);
$router->add('GET', '/api/content/pages/slug/{slug}', [ContentController::class, 'showBySlug']);

$router->add('GET', '/api/services', [ServiceController::class, 'index']);
$router->add('GET', '/api/services/{id}', [ServiceController::class, 'show']);
$router->add('POST', '/api/services', [ServiceController::class, 'create']);
$router->add('PUT', '/api/services/{id}', [ServiceController::class, 'update']);
$router->add('DELETE', '/api/services/{id}', [ServiceController::class, 'delete']);

$router->add('GET', '/api/locations', [LocationController::class, 'index']);
$router->add('GET', '/api/locations/{id}', [LocationController::class, 'show']);
$router->add('POST', '/api/locations', [LocationController::class, 'create']);
$router->add('PUT', '/api/locations/{id}', [LocationController::class, 'update']);
$router->add('DELETE', '/api/locations/{id}', [LocationController::class, 'delete']);
$router->add('GET', '/api/locations/nearest', [LocationController::class, 'nearest']);