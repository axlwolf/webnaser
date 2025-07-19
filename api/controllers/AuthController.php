<?php

namespace App\Controllers;

use App\Services\AuthService;
use App\Core\Request;
use App\Core\Response;

class AuthController {
    private AuthService $authService;

    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function login(Request $request): Response {
        $data = $request->getBody();
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $token = $this->authService->login($email, $password);

        if (!$token) {
            return new Response(401, ['error' => 'Invalid credentials']);
        }

        return new Response(200, ['token' => $token]);
    }
}
