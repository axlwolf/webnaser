<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Core\Router;
use App\Core\Request;
use App\Core\Response;
use App\Controllers\AuthController;
use App\Services\AuthService;
use App\Repositories\UserRepository;
use App\Controllers\PageController;
use App\Services\PageService;
use App\Repositories\PageRepository;
use App\Controllers\ServiceController;
use App\Services\ServiceService;
use App\Repositories\ServiceRepository;
use App\Controllers\LocationController;
use App\Services\LocationService;
use App\Repositories\LocationRepository;
use App\Controllers\ObituaryController;
use App\Services\ObituaryService;
use App\Repositories\ObituaryRepository;
use App\Controllers\MediaController;
use App\Services\MediaService;
use App\Repositories\MediaRepository;

// Define environment
define('ENV', 'development');

// Load configuration
require_once __DIR__ . '/config.php';

// Database connection
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (\PDOException $e) {
    // In a real app, log this error and show a generic message
    die("Database connection failed: " . $e->getMessage());
}

// Dependency Injection
$userRepository = new UserRepository($pdo);
$authService = new AuthService($userRepository);
$authController = new AuthController($authService);

$pageRepository = new PageRepository($pdo);
$pageService = new PageService($pageRepository);
$pageController = new PageController($pageService);

$serviceRepository = new ServiceRepository($pdo);
$serviceService = new ServiceService($serviceRepository);
$serviceController = new ServiceController($serviceService);

$locationRepository = new LocationRepository($pdo);
$locationService = new LocationService($locationRepository);
$locationController = new LocationController($locationService);

$obituaryRepository = new ObituaryRepository($pdo);
$obituaryService = new ObituaryService($obituaryRepository);
$obituaryController = new ObituaryController($obituaryService);

$mediaRepository = new MediaRepository($pdo);
$mediaService = new MediaService($mediaRepository, UPLOAD_DIR, MAX_UPLOAD_SIZE, ALLOWED_EXTENSIONS);
$mediaController = new MediaController($mediaService);

// Routing
$router = new Router();

$router->add('POST', '/api/v1/auth/login', function(Request $request) use ($authController) {
    return $authController->login($request);
});

// Page routes
$router->add('GET', '/api/v1/pages', fn(Request $r) => $pageController->index($r));
$router->add('POST', '/api/v1/pages', fn(Request $r) => $pageController->store($r));
$router->add('GET', '/api/v1/pages/(\d+)', fn(Request $r, $id) => $pageController->show($r, $id));
$router->add('PUT', '/api/v1/pages/(\d+)', fn(Request $r, $id) => $pageController->update($r, $id));
$router->add('DELETE', '/api/v1/pages/(\d+)', fn(Request $r, $id) => $pageController->destroy($r, $id));

// Service routes
$router->add('GET', '/api/v1/services', fn(Request $r) => $serviceController->index($r));
$router->add('POST', '/api/v1/services', fn(Request $r) => $serviceController->store($r));
$router->add('GET', '/api/v1/services/(\d+)', fn(Request $r, $id) => $serviceController->show($r, $id));
$router->add('PUT', '/api/v1/services/(\d+)', fn(Request $r, $id) => $serviceController->update($r, $id));
$router->add('DELETE', '/api/v1/services/(\d+)', fn(Request $r, $id) => $serviceController->destroy($r, $id));

// Location routes
$router->add('GET', '/api/v1/locations', fn(Request $r) => $locationController->index($r));
$router->add('POST', '/api/v1/locations', fn(Request $r) => $locationController->store($r));
$router->add('GET', '/api/v1/locations/(\d+)', fn(Request $r, $id) => $locationController->show($r, $id));
$router->add('PUT', '/api/v1/locations/(\d+)', fn(Request $r, $id) => $locationController->update($r, $id));
$router->add('DELETE', '/api/v1/locations/(\d+)', fn(Request $r, $id) => $locationController->destroy($r, $id));

// Obituary routes
$router->add('GET', '/api/v1/obituaries', fn(Request $r) => $obituaryController->index($r));
$router->add('POST', '/api/v1/obituaries', fn(Request $r) => $obituaryController->store($r));
$router->add('GET', '/api/v1/obituaries/(\d+)', fn(Request $r, $id) => $obituaryController->show($r, $id));
$router->add('PUT', '/api/v1/obituaries/(\d+)', fn(Request $r, $id) => $obituaryController->update($r, $id));
$router->add('DELETE', '/api/v1/obituaries/(\d+)', fn(Request $r, $id) => $obituaryController->destroy($r, $id));

// Media routes
$router->add('GET', '/api/v1/media', fn(Request $r) => $mediaController->index($r));
$router->add('POST', '/api/v1/media', fn(Request $r) => $mediaController->upload($r, $_FILES['file'])); // Pass $_FILES directly
$router->add('GET', '/api/v1/media/(\d+)', fn(Request $r, $id) => $mediaController->show($r, $id));
$router->add('DELETE', '/api/v1/media/(\d+)', fn(Request $r, $id) => $mediaController->destroy($r, $id));

$router->dispatch();