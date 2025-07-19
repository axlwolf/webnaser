<?php

namespace App\Models;

class User {
    public int $id;
    public string $username;
    public string $email;
    public string $password_hash;
    public string $role;
    public string $created_at;
    public string $updated_at;

    public function __construct(
        string $username,
        string $email,
        string $password_hash,
        string $role = 'editor'
    ) {
        $this->username = $username;
        $this->email = $email;
        $this->password_hash = $password_hash;
        $this->role = $role;
    }

    public function setPassword(string $password): void {
        $this->password_hash = password_hash($password, PASSWORD_DEFAULT);
    }

    public function verifyPassword(string $password): bool {
        return password_verify($password, $this->password_hash);
    }
}
