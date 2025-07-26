<?php

// Load environment variables
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Environment setup
define('ENV', $_ENV['APP_ENV'] ?? 'development');

// Database Configuration
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'naser_cms');
define('DB_USER', $_ENV['DB_USER'] ?? 'root');
define('DB_PASS', $_ENV['DB_PASSWORD'] ?? '');
define('DB_CHARSET', 'utf8mb4');

// RESTful API Configuration
define('API_VERSION', '1.0');
define('API_BASE_PATH', '/api');
define('JWT_SECRET', $_ENV['JWT_SECRET'] ?? 'your-super-secret-key'); // Should be a strong, unique key
define('JWT_EXPIRY', $_ENV['JWT_EXPIRY'] ?? 86400); // 24-hour sessions

// GoDaddy-Specific Settings
define('UPLOAD_DIR', __DIR__ . '/../public/uploads/');
define('MAX_UPLOAD_SIZE', $_ENV['MAX_UPLOAD_SIZE'] ?? 5242880); // 5MB limit
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'pdf']);

// Shared Hosting Optimizations
date_default_timezone_set($_ENV['APP_TIMEZONE'] ?? 'America/Mexico_City');

if (ENV === 'development') {
    // Development CORS and error reporting
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    // Production settings
    error_reporting(0);
    ini_set('display_errors', 0);
    // Add strict security headers for production if needed
}

