<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Interfaces\UserRepositoryInterface;
use PDO;

class UserRepository implements UserRepositoryInterface {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function findById(int $id): ?User {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$data) {
            return null;
        }

        return $this->mapToUser($data);
    }

    public function findByEmail(string $email): ?User {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$data) {
            return null;
        }

        return $this->mapToUser($data);
    }

    public function save(User $user): bool {
        // Implement save logic (CREATE/UPDATE)
        return true;
    }

    private function mapToUser(array $data): User {
        $user = new User(
            (int)$data['id'],
            $data['name'],
            $data['email'],
            $data['password_hash'],
            $data['role']
        );
        $user->setCreatedAt(new \DateTime($data['created_at']));
        $user->setUpdatedAt(new \DateTime($data['updated_at']));
        return $user;
    }
}
