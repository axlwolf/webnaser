<?php

namespace App\Middleware;

use App\Core\Request;

class AdminMiddleware {
    public static function handle() {
        // First, ensure the user is authenticated
        AuthMiddleware::handle();

        $user = Request::get('user');

        if (!$user || !isset($user->role) || $user->role !== 'admin') {
            http_response_code(403);
            echo json_encode([
                'success' => false, 
                'error' => 'forbidden', 
                'message' => 'Acceso denegado. Se requiere rol de administrador.',
                'timestamp' => date('c')
            ]);
            exit();
        }
    }
}
