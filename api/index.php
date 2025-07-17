<?php
/**
 * Main entry point for the Grupo Naser CMS API
 * Handles all API requests and routes them to the appropriate controllers
 */

// Load configuration
require_once 'config.php';

// Set headers for JSON API
header('Content-Type: application/json');

// Handle CORS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (ENV === 'development') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
    exit(0);
}

// Parse the request URI
$requestUri = $_SERVER['REQUEST_URI'];
$basePath = API_BASE_PATH;

// Remove the base path from the request URI
if (strpos($requestUri, $basePath) === 0) {
    $requestUri = substr($requestUri, strlen($basePath));
}

// Remove query string from the request URI
$requestUri = strtok($requestUri, '?');

// Split the URI into segments
$segments = explode('/', trim($requestUri, '/'));

// Get the resource and ID (if any)
$resource = isset($segments[0]) ? $segments[0] : '';
$id = isset($segments[1]) ? $segments[1] : null;
$action = isset($segments[2]) ? $segments[2] : null;

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Get the request body for POST, PUT requests
$requestBody = file_get_contents('php://input');
$requestData = json_decode($requestBody, true);

// Initialize response array
$response = [
    'success' => false,
    'data' => null,
    'error' => null
];

try {
    // Route the request to the appropriate controller
    switch ($resource) {
        case 'auth':
            require_once 'controllers/AuthController.php';
            $controller = new AuthController();
            break;
        case 'pages':
            require_once 'controllers/PageController.php';
            $controller = new PageController();
            break;
        case 'services':
            require_once 'controllers/ServiceController.php';
            $controller = new ServiceController();
            break;
        case 'locations':
            require_once 'controllers/LocationController.php';
            $controller = new LocationController();
            break;
        case 'media':
            require_once 'controllers/MediaController.php';
            $controller = new MediaController();
            break;
        case 'forms':
            require_once 'controllers/FormController.php';
            $controller = new FormController();
            break;
        default:
            // If no resource is specified, return API information
            if (empty($resource)) {
                $response['success'] = true;
                $response['data'] = [
                    'name' => 'Grupo Naser CMS API',
                    'version' => API_VERSION,
                    'status' => 'running'
                ];
                echo json_encode($response);
                exit;
            }
            
            // Resource not found
            http_response_code(404);
            $response['error'] = [
                'code' => 'RESOURCE_NOT_FOUND',
                'message' => 'The requested resource does not exist'
            ];
            echo json_encode($response);
            exit;
    }
    
    // Handle the request based on the HTTP method
    switch ($method) {
        case 'GET':
            if ($id) {
                if ($action) {
                    $result = $controller->custom($id, $action);
                } else {
                    $result = $controller->get($id);
                }
            } else {
                $result = $controller->getAll();
            }
            break;
        case 'POST':
            $result = $controller->create($requestData);
            break;
        case 'PUT':
            if (!$id) {
                throw new Exception('ID is required for PUT requests');
            }
            $result = $controller->update($id, $requestData);
            break;
        case 'DELETE':
            if (!$id) {
                throw new Exception('ID is required for DELETE requests');
            }
            $result = $controller->delete($id);
            break;
        default:
            throw new Exception('Method not allowed');
    }
    
    // Set the response
    $response['success'] = true;
    $response['data'] = $result;
    
} catch (Exception $e) {
    // Handle exceptions
    http_response_code(500);
    $response['error'] = [
        'code' => 'SERVER_ERROR',
        'message' => ENV === 'development' ? $e->getMessage() : 'An error occurred'
    ];
    
    // Log the error
    error_log($e->getMessage());
}

// Return the response as JSON
echo json_encode($response);