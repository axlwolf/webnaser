<?php

namespace App\Middleware;

use App\Core\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    public static function handle() {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'unauthorized', 'message' => 'Token de autorización no proporcionado.']);
            exit();
        }

        $authHeader = $headers['Authorization'];
        list($jwt) = sscanf($authHeader, 'Bearer %s');

        if (!$jwt) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'unauthorized', 'message' => 'Formato de token inválido.']);
            exit();
        }

        try {
            $decoded = JWT::decode($jwt, new Key(JWT_SECRET, 'HS256'));
            Request::set('user', $decoded->data);
        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'token_invalid', 'message' => 'Token inválido o expirado: ' . $e->getMessage()]);
            exit();
        }
    }
}