# Prompt para Gemini - Siguiente Batch de Tareas

## Contexto del Proyecto

Estás desarrollando el backend del sistema de autenticación para el CMS de Grupo Naser. Has completado exitosamente el modelo User con todas las propiedades y métodos necesarios para la gestión de usuarios.

## Estado Actual

### ✅ Completado por Ti

- Modelo User con propiedades completas
- Métodos de hash y verificación de contraseñas
- Manejo de tokens de recuperación
- Getters y setters apropiados
- Interfaz UserRepositoryInterface definida

### 🔄 En Progreso por Claude

- LoginForm (Tarea 5.1) - Componente de formulario de login

## Tu Próxima Tarea: Implementar UserRepository

### Objetivo

Crear el repositorio que maneje todas las operaciones de base de datos relacionadas con usuarios, siguiendo el patrón Repository y los principios de Clean Architecture.

### Especificaciones Técnicas

**Ubicación**: `api/repositories/UserRepository.php`

**Archivos a crear**:

- `UserRepository.php` - Implementación del repositorio
- `tests/unit/backend/UserRepositoryTest.php` - Tests unitarios

### Requisitos Funcionales

1. **Implementar UserRepositoryInterface**:

   ```php
   interface UserRepositoryInterface {
       public function findById(int $id): ?User;
       public function findByEmail(string $email): ?User;
       public function create(User $user): User;
       public function update(User $user): User;
       public function delete(int $id): bool;
       public function updateLastLogin(int $userId): void;
       public function updatePassword(int $userId, string $hashedPassword): void;
   }
   ```

2. **Métodos Adicionales Requeridos**:
   - `findByResetToken(string $token): ?User`
   - `clearResetToken(int $userId): void`
   - `setResetToken(int $userId, string $token, DateTime $expiry): void`

### Estructura de Base de Datos

**Tabla: `users`**

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    reset_token VARCHAR(255) NULL,
    reset_token_expiry DATETIME NULL,
    last_login DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Implementación Requerida

```php
<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Interfaces\UserRepositoryInterface;
use PDO;
use DateTime;

class UserRepository implements UserRepositoryInterface
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    // Implementar todos los métodos de la interfaz
}
```

### Requisitos de Seguridad

1. **Prepared Statements**:

   - Usar prepared statements para todas las consultas
   - Nunca concatenar directamente valores en SQL
   - Validar todos los inputs

2. **Manejo de Contraseñas**:

   - Nunca almacenar contraseñas en texto plano
   - Usar `password_hash()` con `PASSWORD_DEFAULT`
   - Verificar con `password_verify()`

3. **Tokens de Recuperación**:
   - Generar tokens seguros con `bin2hex(random_bytes(32))`
   - Establecer tiempo de expiración (24 horas)
   - Limpiar tokens después del uso

### Ejemplo de Implementación

```php
public function findByEmail(string $email): ?User
{
    $stmt = $this->connection->prepare(
        "SELECT * FROM users WHERE email = ? LIMIT 1"
    );

    $stmt->execute([$email]);
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$userData) {
        return null;
    }

    return $this->mapArrayToUser($userData);
}

public function create(User $user): User
{
    $stmt = $this->connection->prepare(
        "INSERT INTO users (name, email, password, role, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?)"
    );

    $now = new DateTime();
    $stmt->execute([
        $user->getName(),
        $user->getEmail(),
        $user->getPassword(), // Ya debe estar hasheado
        $user->getRole(),
        $now->format('Y-m-d H:i:s'),
        $now->format('Y-m-d H:i:s')
    ]);

    $user->setId((int)$this->connection->lastInsertId());
    return $user;
}
```

### Manejo de Errores

1. **Excepciones**:

   - Capturar PDOException
   - Lanzar excepciones específicas del dominio
   - Logging apropiado para debugging

2. **Validaciones**:
   - Validar email único en create/update
   - Verificar que el usuario existe antes de update/delete
   - Validar formato de email

### Tests Unitarios Requeridos

**Ubicación**: `tests/unit/backend/UserRepositoryTest.php`

```php
class UserRepositoryTest extends TestCase
{
    private UserRepository $repository;
    private PDO $connection;

    protected function setUp(): void
    {
        // Setup con base de datos en memoria
        $this->connection = new PDO('sqlite::memory:');
        $this->createUsersTable();
        $this->repository = new UserRepository($this->connection);
    }

    public function testFindByEmailReturnsUserWhenExists(): void
    {
        // Test implementation
    }

    public function testFindByEmailReturnsNullWhenNotExists(): void
    {
        // Test implementation
    }

    public function testCreateUserSuccessfully(): void
    {
        // Test implementation
    }

    // Más tests...
}
```

### Configuración de Base de Datos

**Archivo**: `api/config/database.php`

```php
<?php

return [
    'host' => $_ENV['DB_HOST'] ?? 'localhost',
    'port' => $_ENV['DB_PORT'] ?? 3306,
    'database' => $_ENV['DB_NAME'] ?? 'naser_cms',
    'username' => $_ENV['DB_USER'] ?? 'root',
    'password' => $_ENV['DB_PASSWORD'] ?? '',
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
];
```

### Comandos de Testing

```bash
# Ejecutar tests específicos del repositorio
./scripts/test-docker.sh --filter UserRepositoryTest

# Ejecutar todos los tests unitarios
./scripts/test-docker.sh --testsuite Unit
```

### Comandos de Reporte

**Al iniciar**:

```bash
node .kiro/specs/auth-integration/update-status.js start-task gemini "2.2" "Iniciando implementación de UserRepository con métodos CRUD y tests"
```

**Durante desarrollo** (cada 2-3 horas):

```bash
node .kiro/specs/auth-integration/update-status.js update-progress gemini "2.2" "Progreso: [descripción del avance]"
```

**Al completar**:

```bash
node .kiro/specs/auth-integration/update-status.js complete-task gemini "2.2" "UserRepository completado con todos los métodos CRUD, seguridad y tests unitarios"
```

### Consideraciones Especiales

1. **Compatibilidad GoDaddy**:

   - Usar características de MySQL compatibles
   - Evitar funciones específicas de versiones nuevas
   - Manejar límites de memoria y tiempo de ejecución

2. **Performance**:

   - Índices apropiados en email (único)
   - Consultas optimizadas
   - Conexión reutilizable

3. **Logging**:
   - Log de operaciones críticas
   - No incluir información sensible en logs
   - Diferentes niveles de logging

### Recursos Disponibles

- Modelo User: `api/models/User.php`
- Interfaz: `api/models/interfaces/UserRepositoryInterface.php`
- Contrato API: `.kiro/specs/auth-integration/api-contract.md`
- Scripts de testing configurados y funcionales

### Próxima Tarea Sugerida

Después de completar UserRepository, proceder con:

- AuthService backend (Tarea 3.2)
- JwtService (Tarea 3.1)

---

**Preparado por**: Kiro (Orquestador)  
**Fecha**: 2025-07-22  
**Prioridad**: Alta
