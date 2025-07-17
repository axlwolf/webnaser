<?php
/**
 * Main configuration file for the Grupo Naser CMS API
 * Compatible with GoDaddy hosting environment
 */

// Environment settings
define('ENV', 'development'); // Options: development, production

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'naser_cms');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// API settings
define('API_VERSION', '1.0');
define('API_BASE_PATH', '/api');
define('JWT_SECRET', 'change_this_to_a_secure_random_string_in_production');
define('JWT_EXPIRY', 86400); // 24 hours in seconds

// File upload settings
define('UPLOAD_DIR', __DIR__ . '/../public/uploads/');
define('MAX_UPLOAD_SIZE', 5242880); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx']);

// Error reporting
if (ENV === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// CORS settings for development
if (ENV === 'development') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

// Time zone
date_default_timezone_set('America/Mexico_City');