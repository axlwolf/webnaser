<?php

namespace App\Core;

class Router {
    private $routes = [];

    public function add($method, $path, $handler) {
        $this->routes[] = [$method, $path, $handler];
    }

    public function dispatch(Request $request) {
        $path = $request->getPath();
        $method = $request->getMethod();

        foreach ($this->routes as $route) {
            list($routeMethod, $routePath, $handler) = $route;

            $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[a-zA-Z0-9_]+)', $routePath);
            if ($routeMethod === $method && preg_match("#^$pattern$#", $path, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                
                list($controllerClass, $methodName) = $handler;
                $controller = new $controllerClass();
                
                call_user_func_array([$controller, $methodName], $params);
                return;
            }
        }

        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'not_found', 'message' => 'Endpoint no encontrado.', 'timestamp' => date('c')]);
    }
}