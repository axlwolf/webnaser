<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Interfaces\UserRepositoryInterface;
use PDO;
use PDOException;
use DateTime;

class UserRepository implements UserRepositoryInterface
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    /**
     * Find a user by their ID.
     */
    public function findById(int $id): ?User
    {
        try {
            $sql = "SELECT * FROM users WHERE id = :id LIMIT 1";
            $stmt = $this->connection->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            $userData = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$userData) {
                return null;
            }

            return $this->mapArrayToUser($userData);

        } catch (PDOException $e) {
            error_log("Error finding user by id: " . $e->getMessage());
            throw new \RuntimeException("Error al buscar usuario", 0, $e);
        }
    }

    /**
     * Find a user by their email address.
     */
    public function findByEmail(string $email): ?User
    {
        try {
            $sql = "SELECT * FROM users WHERE email = :email LIMIT 1";
            $stmt = $this->connection->prepare($sql);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();

            $userData = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$userData) {
                return null;
            }

            return $this->mapArrayToUser($userData);

        } catch (PDOException $e) {
            error_log("Error finding user by email: " . $e->getMessage());
            throw new \RuntimeException("Error al buscar usuario", 0, $e);
        }
    }

    /**
     * Create a new user in the database.
     */
    public function create(User $user): User
    {
        try {
            $this->connection->beginTransaction();

            $sql = "INSERT INTO users (name, email, password, role, created_at, updated_at)
                    VALUES (:name, :email, :password, :role, :created_at, :updated_at)";

            $stmt = $this->connection->prepare($sql);

            $now = (new DateTime())->format('Y-m-d H:i:s');

            $stmt->bindValue(':name', $user->getName(), PDO::PARAM_STR);
            $stmt->bindValue(':email', $user->getEmail(), PDO::PARAM_STR);
            $stmt->bindValue(':password', $user->getPassword(), PDO::PARAM_STR);
            $stmt->bindValue(':role', $user->getRole(), PDO::PARAM_STR);
            $stmt->bindValue(':created_at', $now);
            $stmt->bindValue(':updated_at', $now);

            $stmt->execute();

            $userId = (int) $this->connection->lastInsertId();
            $user->setId($userId);

            $this->connection->commit();

            return $user;

        } catch (PDOException $e) {
            $this->connection->rollBack();
            error_log("Error creating user: " . $e->getMessage());
            throw new \RuntimeException("Error al crear usuario", 0, $e);
        }
    }

    /**
     * Update an existing user's data.
     */
    public function update(User $user): User
    {
        try {
            $sql = "UPDATE users SET 
                        name = :name, 
                        email = :email, 
                        role = :role, 
                        updated_at = :updated_at
                    WHERE id = :id";

            $stmt = $this->connection->prepare($sql);

            $now = (new DateTime())->format('Y-m-d H:i:s');

            $stmt->bindValue(':name', $user->getName(), PDO::PARAM_STR);
            $stmt->bindValue(':email', $user->getEmail(), PDO::PARAM_STR);
            $stmt->bindValue(':role', $user->getRole(), PDO::PARAM_STR);
            $stmt->bindValue(':updated_at', $now);
            $stmt->bindValue(':id', $user->getId(), PDO::PARAM_INT);

            $stmt->execute();

            return $user;

        } catch (PDOException $e) {
            error_log("Error updating user: " . $e->getMessage());
            throw new \RuntimeException("Error al actualizar usuario", 0, $e);
        }
    }

    /**
     * Delete a user from the database.
     */
    public function delete(int $id): bool
    {
        try {
            $sql = "DELETE FROM users WHERE id = :id";
            $stmt = $this->connection->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            return $stmt->execute();

        } catch (PDOException $e) {
            error_log("Error deleting user: " . $e->getMessage());
            throw new \RuntimeException("Error al eliminar usuario", 0, $e);
        }
    }

    /**
     * Update the last login timestamp for a user.
     */
    public function updateLastLogin(int $userId): void
    {
        try {
            $sql = "UPDATE users SET last_login = :last_login, updated_at = :updated_at WHERE id = :id";
            $stmt = $this->connection->prepare($sql);

            $now = (new DateTime())->format('Y-m-d H:i:s');

            $stmt->bindParam(':last_login', $now);
            $stmt->bindParam(':updated_at', $now);
            $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
            $stmt->execute();

        } catch (PDOException $e) {
            error_log("Error updating last login: " . $e->getMessage());
            // No lanzar excepción aquí, es operación secundaria
        }
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(int $userId, string $hashedPassword): void
    {
        try {
            $sql = "UPDATE users SET password = :password, updated_at = :updated_at WHERE id = :id";
            $stmt = $this->connection->prepare($sql);

            $now = (new DateTime())->format('Y-m-d H:i:s');

            $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);
            $stmt->bindParam(':updated_at', $now);
            $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
            $stmt->execute();

        } catch (PDOException $e) {
            error_log("Error updating password: " . $e->getMessage());
            throw new \RuntimeException("Error al actualizar la contraseña", 0, $e);
        }
    }

    /**
     * Find a user by their password reset token.
     */
    public function findByResetToken(string $token): ?User
    {
        try {
            $sql = "SELECT * FROM users WHERE reset_token = :token AND reset_token_expiry > :now LIMIT 1";
            $stmt = $this->connection->prepare($sql);

            $now = (new DateTime())->format('Y-m-d H:i:s');

            $stmt->bindParam(':token', $token, PDO::PARAM_STR);
            $stmt->bindParam(':now', $now);
            $stmt->execute();

            $userData = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$userData) {
                return null;
            }

            return $this->mapArrayToUser($userData);

        } catch (PDOException $e) {
            error_log("Error finding user by reset token: " . $e->getMessage());
            throw new \RuntimeException("Error al buscar usuario por token", 0, $e);
        }
    }

    /**
     * Clean up expired password reset tokens.
     */
    public function cleanExpiredResetTokens(): int
    {
        try {
            $sql = "UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE reset_token_expiry <= :now";
            $stmt = $this->connection->prepare($sql);

            $now = (new DateTime())->format('Y-m-d H:i:s');

            $stmt->bindParam(':now', $now);
            $stmt->execute();

            return $stmt->rowCount();

        } catch (PDOException $e) {
            error_log("Error cleaning expired reset tokens: " . $e->getMessage());
            return 0;
        }
    }

    public function save(User $user): bool
    {
        if ($user->getId()) {
            $this->update($user);
            return true;
        } else {
            $createdUser = $this->create($user);
            return $createdUser->getId() > 0;
        }
    }

    /**
     * Map a database row to a User object.
     */
    private function mapArrayToUser(array $userData): User
    {
        return new User(
            id: (int) ($userData['id'] ?? 0),
            name: $userData['name'] ?? '',
            email: $userData['email'] ?? '',
            password: $userData['password'] ?? '',
            role: $userData['role'] ?? 'editor',
            resetToken: $userData['reset_token'] ?? null,
            resetTokenExpiry: isset($userData['reset_token_expiry']) ? new DateTime($userData['reset_token_expiry']) : null,
            lastLogin: isset($userData['last_login']) ? new DateTime($userData['last_login']) : null,
            createdAt: isset($userData['created_at']) ? new DateTime($userData['created_at']) : null,
            updatedAt: isset($userData['updated_at']) ? new DateTime($userData['updated_at']) : null
        );
    }
}