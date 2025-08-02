<?php

namespace App\Controllers;

use App\Core\Database;
use App\Repositories\UserRepository;
use App\Models\User;
use Firebase\JWT\JWT;
use App\Exceptions\ValidationException;
use App\Exceptions\UnauthorizedException;
use App\Exceptions\NotFoundException;

class AuthController {
    private $userRepository;

    public function __construct() {
        $db = Database::getInstance();
        $this->userRepository = new UserRepository($db);
    }

    public function login() {
        $data = json_decode(file_get_contents('php://input'), true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($email) || empty($password)) {
            throw new ValidationException(['email' => 'Email y contraseña son requeridos.']);
        }

        $user = $this->userRepository->findByEmail($email);

        if (!$user || !password_verify($password, $user->getPassword())) {
            throw new UnauthorizedException('Credenciales inválidas.');
        }

        $this->userRepository->updateLastLogin($user->getId());

        $payload = [
            'iss' => $_SERVER['HTTP_HOST'],
            'aud' => $_SERVER['HTTP_HOST'],
            'iat' => time(),
            'exp' => time() + ($_ENV['JWT_EXPIRY'] ?? 3600),
            'data' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'role' => $user->getRole()
            ]
        ];

        $jwt = JWT::encode($payload, $_ENV['JWT_SECRET'] ?? 'your-secret-key', 'HS256');

        echo json_encode([
            'success' => true,
            'data' => [
                'token' => $jwt,
                'user' => [
                    'id' => $user->getId(),
                    'name' => $user->getName(),
                    'email' => $user->getEmail(),
                    'role' => $user->getRole()
                ],
                'expires_in' => $_ENV['JWT_EXPIRY'] ?? 3600
            ],
            'message' => 'Inicio de sesión exitoso.',
            'timestamp' => date('c')
        ]);
    }

    public function logout() {
        echo json_encode([
            'success' => true,
            'message' => 'Sesión cerrada exitosamente.',
            'timestamp' => date('c')
        ]);
    }

    public function refresh() {
        $userData = \App\Core\Request::get('user');

        if (!$userData) {
            throw new UnauthorizedException('Token inválido o expirado.');
        }

        $user = $this->userRepository->findById($userData->id);

        if (!$user) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        $payload = [
            'iss' => $_SERVER['HTTP_HOST'],
            'aud' => $_SERVER['HTTP_HOST'],
            'iat' => time(),
            'exp' => time() + ($_ENV['JWT_EXPIRY'] ?? 3600),
            'data' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'role' => $user->getRole()
            ]
        ];

        $jwt = JWT::encode($payload, $_ENV['JWT_SECRET'] ?? 'your-secret-key', 'HS256');

        echo json_encode([
            'success' => true,
            'data' => [
                'token' => $jwt,
                'expires_in' => $_ENV['JWT_EXPIRY'] ?? 3600
            ],
            'message' => 'Token actualizado exitosamente.',
            'timestamp' => date('c')
        ]);
    }

    public function me() {
        $userData = \App\Core\Request::get('user');
        
        if (!$userData) {
            throw new UnauthorizedException('Usuario no autenticado.');
        }

        $user = $this->userRepository->findById($userData->id);

        if (!$user) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        echo json_encode([
            'success' => true,
            'data' => [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'role' => $user->getRole(),
                'last_login' => $user->getLastLogin() ? $user->getLastLogin()->format('c') : null
            ],
            'message' => 'Información de usuario obtenida.',
            'timestamp' => date('c')
        ]);
    }

    public function changePassword() {
        $userData = \App\Core\Request::get('user');
        
        if (!$userData) {
            throw new UnauthorizedException('Usuario no autenticado.');
        }

        $data = json_decode(file_get_contents('php://input'), true);
        $oldPassword = $data['old_password'] ?? '';
        $newPassword = $data['new_password'] ?? '';

        if (empty($oldPassword) || empty($newPassword)) {
            throw new ValidationException(['password' => 'La contraseña actual y la nueva son requeridas.']);
        }

        $user = $this->userRepository->findById($userData->id);

        if (!$user || !password_verify($oldPassword, $user->getPassword())) {
            throw new UnauthorizedException('La contraseña actual es incorrecta.');
        }

        if (strlen($newPassword) < 8) {
            throw new ValidationException(['new_password' => 'La nueva contraseña debe tener al menos 8 caracteres.']);
        }

        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $this->userRepository->updatePassword($user->getId(), $hashedPassword);

        echo json_encode([
            'success' => true,
            'message' => 'Contraseña actualizada exitosamente.',
            'timestamp' => date('c')
        ]);
    }
}
