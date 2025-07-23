<?php

namespace App\Models;

use DateTime;

class User {
    public function __construct(
        int $id = 0,
        string $name = '',
        string $email = '',
        string $password = '',
        string $role = 'editor',
        ?string $resetToken = null,
        ?DateTime $resetTokenExpiry = null,
        ?DateTime $lastLogin = null,
        ?DateTime $createdAt = null,
        ?DateTime $updatedAt = null
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
        $this->resetToken = $resetToken;
        $this->resetTokenExpiry = $resetTokenExpiry;
        $this->lastLogin = $lastLogin;
        $this->createdAt = $createdAt ?? new DateTime();
        $this->updatedAt = $updatedAt ?? new DateTime();
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }
    private int $id;
    private string $name;
    private string $email;
    private string $password; // Hashed
    private string $role; // 'admin' | 'editor'
    private ?string $resetToken;
    private ?DateTime $resetTokenExpiry;
    private ?DateTime $lastLogin;
    private DateTime $createdAt;
    private DateTime $updatedAt;

    // Getters and setters
    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = password_hash($password, PASSWORD_DEFAULT);
    }

    public function verifyPassword(string $password): bool
    {
        return password_verify($password, $this->password);
    }

    public function getRole(): string
    {
        return $this->role;
    }

    public function setRole(string $role): void
    {
        $this->role = $role;
    }

    public function getResetToken(): ?string
    {
        return $this->resetToken;
    }

    public function setResetToken(?string $resetToken): void
    {
        $this->resetToken = $resetToken;
    }

    public function getResetTokenExpiry(): ?DateTime
    {
        return $this->resetTokenExpiry;
    }

    public function setResetTokenExpiry(?DateTime $resetTokenExpiry): void
    {
        $this->resetTokenExpiry = $resetTokenExpiry;
    }

    public function getLastLogin(): ?DateTime
    {
        return $this->lastLogin;
    }

    public function setLastLogin(?DateTime $lastLogin): void
    {
        $this->lastLogin = $lastLogin;
    }

    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function getUpdatedAt(): DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }
}