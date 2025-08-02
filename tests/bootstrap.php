<?php

require_once __DIR__ . '/../api/vendor/autoload.php';

use Dotenv\Dotenv;

// Load environment configuration for testing
try {
    // First try to load testing environment
    if (file_exists(__DIR__ . '/../.env.testing')) {
        $dotenv = Dotenv::createImmutable(__DIR__ . '/..', '.env.testing');
        $dotenv->load();
    } 
    // Fallback to regular .env if it exists
    elseif (file_exists(__DIR__ . '/../.env')) {
        $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
        $dotenv->load();
    }
    // If no environment file exists, set default testing values
    else {
        // Set minimal required environment variables for testing
        $_ENV['APP_ENV'] = 'testing';
        $_ENV['APP_DEBUG'] = 'true';
        $_ENV['DB_HOST'] = '127.0.0.1';
        $_ENV['DB_PORT'] = '3306';
        $_ENV['DB_NAME'] = 'naser_cms_test';
        $_ENV['DB_USER'] = 'test_user';
        $_ENV['DB_PASSWORD'] = 'test_password';
        $_ENV['JWT_SECRET'] = 'test_jwt_secret_for_phpunit_testing_2024';
        $_ENV['JWT_EXPIRE'] = '3600';
        
        // Also set $_SERVER superglobal for compatibility
        foreach ($_ENV as $key => $value) {
            $_SERVER[$key] = $value;
        }
    }
} catch (Exception $e) {
    // If Dotenv fails, continue with default testing environment
    error_log("Warning: Could not load environment file: " . $e->getMessage());
    
    // Set minimal required environment variables for testing
    $_ENV['APP_ENV'] = 'testing';
    $_ENV['APP_DEBUG'] = 'true';
    $_ENV['DB_HOST'] = '127.0.0.1';
    $_ENV['DB_PORT'] = '3306';
    $_ENV['DB_NAME'] = 'naser_cms_test';
    $_ENV['DB_USER'] = 'test_user';
    $_ENV['DB_PASSWORD'] = 'test_password';
    $_ENV['JWT_SECRET'] = 'test_jwt_secret_for_phpunit_testing_2024';
    $_ENV['JWT_EXPIRE'] = '3600';
    
    // Also set $_SERVER superglobal for compatibility
    foreach ($_ENV as $key => $value) {
        $_SERVER[$key] = $value;
    }
}
