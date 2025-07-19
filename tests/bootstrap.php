<?php

/**
 * PHPUnit Bootstrap File
 * 
 * This file is loaded before any tests are run.
 * It sets up the testing environment and loads necessary dependencies.
 */

// Load Composer autoloader
require_once __DIR__ . '/../api/vendor/autoload.php';

// Set timezone for consistent test results
date_default_timezone_set('America/Mexico_City');

// Set error reporting for tests
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define test constants
define('TEST_ROOT', __DIR__);
define('PROJECT_ROOT', dirname(__DIR__));
define('API_ROOT', PROJECT_ROOT . '/api');

// Set environment variables for testing
$_ENV['APP_ENV'] = 'testing';
$_ENV['DB_CONNECTION'] = 'sqlite';
$_ENV['DB_DATABASE'] = ':memory:';

// Disable output buffering for tests
if (ob_get_level()) {
    ob_end_clean();
}

