<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Utils\JwtHandler;

class AuthService {
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function login(string $email, string $password): ?string {
        $user = $this->userRepository->findByEmail($email);

        if (!$user || !$user->verifyPassword($password)) {
            return null;
        }

        $payload = [
            'user_id' => $user->id,
            'role' => $user->role
        ];
        
        // Secret and expiry should come from config
        $secret = 'your-super-secret-key'; 
        $expiry = 3600; // 1 hour

        return JwtHandler::encode($payload, $secret, $expiry);
    }
}
