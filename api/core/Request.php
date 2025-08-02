<?php

namespace App\Core;

class Request {
    private static $data = [];
    private $path;
    private $method;

    public function __construct() {
        $this->path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->method = $_SERVER['REQUEST_METHOD'];
    }

    public function getPath() {
        return $this->path;
    }

    public function getMethod() {
        return $this->method;
    }

    public static function get($key) {
        return self::$data[$key] ?? null;
    }

    public static function set($key, $value) {
        self::$data[$key] = $value;
    }
}
