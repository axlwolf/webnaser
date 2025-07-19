<?php

namespace App\Core;

class Router {
    private array $routes = [];

    public function add(string $method, string $path, callable $handler): void {
        $this->routes[$method][$path] = $handler;
    }

    public function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        $handler = null;
        $params = [];

        foreach ($this->routes[$method] as $route => $callback) {
            $pattern = "#^" . $route . "$#";
            if (preg_match($pattern, $path, $matches)) {
                $handler = $callback;
                $params = array_slice($matches, 1);
                break;
            }
        }

        if ($handler) {
            $request = new Request();
            $response = call_user_func_array($handler, array_merge([$request], $params));
            $response->send();
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
        }
    }
}
