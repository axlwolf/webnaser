# PROMPT ESPECÍFICO PARA GEMINI - IMPLEMENTAR USERREPOSITORY

## 🎯 CONTEXTO DEL PROYECTO

Estás desarrollando el sistema de autenticación para el **CMS de Grupo Naser**, un sitio web de servicios funerarios que será desplegado en **GoDaddy shared hosting**.

**Branch actual**: `feature/auth-integration`  
**Tu rol**: Desarrollador Backend PHP  
**Progreso actual**: 13.33% (4/30 tareas completadas)

## ✅ LO QUE YA HAS COMPLETADO EXITOSAMENTE

Has implementado un **modelo User robusto y seguro**:

- **Clase User** (`api/models/User.php`) - Modelo completo con todas las propiedades
- **Métodos de seguridad** - Hash y verificación de contraseñas con `password_hash()`
- **Getters/Setters** - Acceso controlado a todas las propiedades
- **Timestamps** - Auditoría de creación y actualización
- **Tokens de recuperación** - Manejo de reset de contraseñas
- **Interfaz** (`api/models/interfaces/UserRepositoryInterface.php`) - Contrato definido

## 🎯 TU PRÓXIMA TAREA: IMPLEMENTAR USERREPOSITORY (Tarea 2.2)

### OBJETIVO

Crear un **repositorio completo para operaciones CRUD** con usuarios en la base de datos, siguiendo los principios de **Clean Architecture** y **compatibilidad con GoDaddy**.

### UBICACIÓN DE ARCHIVOS

```
api/repositories/UserRepository.php           # Implementación principal
tests/unit/backend/UserRepositoryTest.php     # Tests unitarios
tests/integration/database/UserRepositoryIntegrationTest.php  # Tests de integración
```

### ESPECIFICACIONES TÉCNICAS DETALLADAS

#### 1. IMPLEMENTACIÓN PRINCIPAL (UserRepository.php)

```php
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
     * Buscar usuario por ID
     */
    public function findById(int $id): ?User
    {
        // Tu implementación aquí
    }

    /**
     * Buscar usuario por email (para login)
     */
    public function findByEmail(string $email): ?User
    {
        // Tu implementación aquí
    }

    /**
     * Crear nuevo usuario
     */
    public function create(User $user): User
    {
        // Tu implementación aquí
    }

    /**
     * Actualizar usuario existente
     */
    public function update(User $user): User
    {
        // Tu implementación aquí
    }

    /**
     * Eliminar usuario (soft delete recomendado)
     */
    public function delete(int $id): bool
    {
        // Tu implementación aquí
    }

    /**
     * Actualizar timestamp de último login
     */
    public function updateLastLogin(int $userId): void
    {
        // Tu implementación aquí
    }

    /**
     * Actualizar contraseña de usuario
     */
    public function updatePassword(int $userId, string $hashedPassword): void
    {
        // Tu implementación aquí
    }

    /**
     * Buscar usuario por token de recuperación
     */
    public function findByResetToken(string $token): ?User
    {
        // Método adicional recomendado
    }

    /**
     * Limpiar tokens de recuperación expirados
     */
    public function cleanExpiredResetTokens(): int
    {
        // Método adicional recomendado
    }
}
```

#### 2. ESQUEMA DE BASE DE DATOS REQUERIDO

```sql
-- Ejecutar en MySQL 8.0 (compatible con GoDaddy)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL COMMENT 'Hashed with password_hash()',
    role ENUM('admin', 'editor') DEFAULT 'editor',
    reset_token VARCHAR(255) NULL,
    reset_token_expiry DATETIME NULL,
    last_login DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Índices para performance
    INDEX idx_email (email),
    INDEX idx_reset_token (reset_token),
    INDEX idx_role (role),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos de prueba (admin por defecto)
INSERT INTO users (name, email, password, role) VALUES
('Administrador', 'admin@naser.com.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
-- Contraseña: password
```

#### 3. IMPLEMENTACIÓN DETALLADA DE MÉTODOS

##### findByEmail (Crítico para login)

```php
public function findByEmail(string $email): ?User
{
    try {
        $sql = "SELECT * FROM users WHERE email = :email AND deleted_at IS NULL LIMIT 1";
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
```

##### create (Para registro de usuarios)

```php
public function create(User $user): User
{
    try {
        $this->connection->beginTransaction();

        $sql = "INSERT INTO users (name, email, password, role, created_at, updated_at)
                VALUES (:name, :email, :password, :role, NOW(), NOW())";

        $stmt = $this->connection->prepare($sql);
        $stmt->bindValue(':name', $user->getName(), PDO::PARAM_STR);
        $stmt->bindValue(':email', $user->getEmail(), PDO::PARAM_STR);
        $stmt->bindValue(':password', $user->getPassword(), PDO::PARAM_STR);
        $stmt->bindValue(':role', $user->getRole(), PDO::PARAM_STR);

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
```

##### updateLastLogin (Para auditoría)

```php
public function updateLastLogin(int $userId): void
{
    try {
        $sql = "UPDATE users SET last_login = NOW(), updated_at = NOW() WHERE id = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        $stmt->execute();

    } catch (PDOException $e) {
        error_log("Error updating last login: " . $e->getMessage());
        // No lanzar excepción aquí, es operación secundaria
    }
}
```

#### 4. MÉTODO HELPER PARA MAPEO

```php
/**
 * Mapear array de base de datos a objeto User
 */
private function mapArrayToUser(array $userData): User
{
    return new User(
        id: (int) $userData['id'],
        name: $userData['name'],
        email: $userData['email'],
        password: $userData['password'], // Ya hasheada
        role: $userData['role'],
        resetToken: $userData['reset_token'],
        resetTokenExpiry: $userData['reset_token_expiry'] ?
            new DateTime($userData['reset_token_expiry']) : null,
        lastLogin: $userData['last_login'] ?
            new DateTime($userData['last_login']) : null,
        createdAt: new DateTime($userData['created_at']),
        updatedAt: new DateTime($userData['updated_at'])
    );
}
```

#### 5. CONFIGURACIÓN DE CONEXIÓN PDO

```php
// En config.php o DatabaseConnection.php
class DatabaseConnection
{
    private static ?PDO $instance = null;

    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            $host = $_ENV['DB_HOST'] ?? 'localhost';
            $dbname = $_ENV['DB_NAME'] ?? 'naser_cms';
            $username = $_ENV['DB_USER'] ?? 'naser_user';
            $password = $_ENV['DB_PASSWORD'] ?? 'naser_pass_2024';

            $dsn = "mysql:host={$host};dbname={$dbname};charset=utf8mb4";

            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_PERSISTENT => false, // Para GoDaddy
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
            ];

            try {
                self::$instance = new PDO($dsn, $username, $password, $options);
            } catch (PDOException $e) {
                error_log("Database connection failed: " . $e->getMessage());
                throw new \RuntimeException("Error de conexión a base de datos");
            }
        }

        return self::$instance;
    }
}
```

#### 6. TESTS UNITARIOS (UserRepositoryTest.php)

```php
<?php

namespace Tests\Unit\Backend;

use PHPUnit\Framework\TestCase;
use App\Repositories\UserRepository;
use App\Models\User;
use PDO;
use PDOStatement;

class UserRepositoryTest extends TestCase
{
    private UserRepository $repository;
    private PDO $mockConnection;
    private PDOStatement $mockStatement;

    protected function setUp(): void
    {
        $this->mockConnection = $this->createMock(PDO::class);
        $this->mockStatement = $this->createMock(PDOStatement::class);
        $this->repository = new UserRepository($this->mockConnection);
    }

    public function testFindByEmailReturnsUserWhenFound(): void
    {
        $userData = [
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@naser.com.mx',
            'password' => 'hashed_password',
            'role' => 'admin',
            'reset_token' => null,
            'reset_token_expiry' => null,
            'last_login' => null,
            'created_at' => '2025-01-01 00:00:00',
            'updated_at' => '2025-01-01 00:00:00'
        ];

        $this->mockConnection
            ->expects($this->once())
            ->method('prepare')
            ->willReturn($this->mockStatement);

        $this->mockStatement
            ->expects($this->once())
            ->method('execute');

        $this->mockStatement
            ->expects($this->once())
            ->method('fetch')
            ->willReturn($userData);

        $result = $this->repository->findByEmail('test@naser.com.mx');

        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals('test@naser.com.mx', $result->getEmail());
        $this->assertEquals('Test User', $result->getName());
    }

    public function testFindByEmailReturnsNullWhenNotFound(): void
    {
        $this->mockConnection
            ->expects($this->once())
            ->method('prepare')
            ->willReturn($this->mockStatement);

        $this->mockStatement
            ->expects($this->once())
            ->method('fetch')
            ->willReturn(false);

        $result = $this->repository->findByEmail('nonexistent@naser.com.mx');

        $this->assertNull($result);
    }

    public function testCreateUserSuccessfully(): void
    {
        $user = new User(
            name: 'New User',
            email: 'new@naser.com.mx',
            password: 'hashed_password',
            role: 'editor'
        );

        $this->mockConnection
            ->expects($this->once())
            ->method('beginTransaction');

        $this->mockConnection
            ->expects($this->once())
            ->method('prepare')
            ->willReturn($this->mockStatement);

        $this->mockConnection
            ->expects($this->once())
            ->method('lastInsertId')
            ->willReturn('1');

        $this->mockConnection
            ->expects($this->once())
            ->method('commit');

        $result = $this->repository->create($user);

        $this->assertEquals(1, $result->getId());
    }

    // Más tests aquí...
}
```

#### 7. TESTS DE INTEGRACIÓN

```php
<?php

namespace Tests\Integration\Database;

use PHPUnit\Framework\TestCase;
use App\Repositories\UserRepository;
use App\Models\User;
use PDO;

class UserRepositoryIntegrationTest extends TestCase
{
    private UserRepository $repository;
    private PDO $connection;

    protected function setUp(): void
    {
        // Usar SQLite en memoria para tests
        $this->connection = new PDO('sqlite::memory:');
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Crear tabla de prueba
        $this->connection->exec("
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'editor',
                reset_token VARCHAR(255),
                reset_token_expiry DATETIME,
                last_login DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ");

        $this->repository = new UserRepository($this->connection);
    }

    public function testFullUserLifecycle(): void
    {
        // Crear usuario
        $user = new User(
            name: 'Integration Test User',
            email: 'integration@naser.com.mx',
            password: 'test_password',
            role: 'admin'
        );

        $createdUser = $this->repository->create($user);
        $this->assertGreaterThan(0, $createdUser->getId());

        // Buscar por email
        $foundUser = $this->repository->findByEmail('integration@naser.com.mx');
        $this->assertNotNull($foundUser);
        $this->assertEquals('Integration Test User', $foundUser->getName());

        // Actualizar último login
        $this->repository->updateLastLogin($createdUser->getId());

        // Verificar actualización
        $updatedUser = $this->repository->findById($createdUser->getId());
        $this->assertNotNull($updatedUser->getLastLogin());
    }
}
```

### CONSIDERACIONES ESPECIALES PARA GODADDY

#### Limitaciones de Shared Hosting:

```php
// Configuración optimizada para GoDaddy
$options = [
    PDO::ATTR_PERSISTENT => false,        // No usar conexiones persistentes
    PDO::ATTR_TIMEOUT => 30,              // Timeout corto
    PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,  // Buffer queries
    PDO::ATTR_EMULATE_PREPARES => false,  // Usar prepared statements reales
];
```

#### Manejo de Memoria:

```php
// Liberar recursos explícitamente
public function __destruct()
{
    $this->connection = null;
}
```

### CRITERIOS DE ACEPTACIÓN

- [ ] Implementación completa de UserRepositoryInterface
- [ ] Todas las operaciones CRUD funcionando correctamente
- [ ] Prepared statements para prevenir SQL injection
- [ ] Manejo robusto de errores con logging
- [ ] Tests unitarios con cobertura >80%
- [ ] Tests de integración con base de datos
- [ ] Documentación PHPDoc completa
- [ ] Compatible con GoDaddy shared hosting
- [ ] Optimizado para performance

### COMANDOS PARA TESTING

```bash
# Ejecutar tests desde el host
./scripts/test-docker.sh

# Ejecutar solo tests de UserRepository
./scripts/test-docker.sh --filter UserRepository

# Ejecutar con cobertura
./scripts/test-docker.sh --coverage-html tests/coverage
```

### COMANDOS PARA REPORTAR PROGRESO

```bash
# Al iniciar la tarea
node .kiro/specs/auth-integration/update-status.js start-task gemini "2.2" "Iniciando implementación de UserRepository con operaciones CRUD completas"

# Para reportar progreso (cada 2-3 horas)
node .kiro/specs/auth-integration/update-status.js update-progress gemini "2.2" "Métodos CRUD implementados, trabajando en tests unitarios"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task gemini "2.2" "UserRepository completado con todos los métodos, tests unitarios e integración, y documentación"
```

### ARCHIVOS DE REFERENCIA

Revisa estos archivos para contexto completo:

- `.kiro/specs/auth-integration/requirements.md` - Requisitos del sistema
- `.kiro/specs/auth-integration/design.md` - Diseño técnico
- `.kiro/specs/auth-integration/api-contract.md` - Contrato de API
- `api/models/User.php` - Tu implementación del modelo
- `api/models/interfaces/UserRepositoryInterface.php` - Interfaz a implementar
- `api/config.php` - Configuración de base de datos

### PRÓXIMAS TAREAS DESPUÉS DE ESTA

1. **Tarea 3.1**: Implementar JwtService
2. **Tarea 3.2**: Implementar AuthService backend
3. **Tarea 4.1**: Implementar endpoint de login

---

**¡Tu modelo User fue implementado de manera excepcional!** Siguió perfectamente los estándares PHP y las mejores prácticas de seguridad. Este UserRepository será la base sólida para todas las operaciones de autenticación.

**Enfócate en**: Seguridad (prepared statements), performance (índices, queries optimizadas), y compatibilidad con GoDaddy hosting.
