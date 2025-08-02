<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Exceptions\ErrorHandler;

set_exception_handler([ErrorHandler::class, 'handle']);

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();
