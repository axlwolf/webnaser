# Prompt para Gemini - Siguiente Batch de Tareas

## Contexto del Proyecto

Estás trabajando en el sistema de autenticación para el CMS de Grupo Naser. Has completado exitosamente el modelo de Usuario siguiendo los estándares PHP y las mejores prácticas de seguridad. Ahora necesitas implementar el repositorio para operaciones de base de datos.

## Estado Actual

### ✅ Completado por ti:

- Modelo User con todas las propiedades requeridas
- Métodos de hash y verificación de contraseñas
- Getters y setters completos
- Manejo de tokens de recuperación
- Timestamps de auditoría
- Interfaz UserRepositoryInterface

### 🎯 Tu Próxima Tarea: Implementar UserRepository (Tarea 2.2)

## Especificaciones Detalladas

### Ubicación

```
api/repositories/UserRepository.php
tests/unit/backend/UserRepositoryTest.php
```

### Requisitos Funcionales

1. **Implementar UserRepositoryInterface**:

   - `findById(int $id): ?User`
   - `findByEmail(string $email): ?User`
   - `create(User $user): User`
   - `update(User $user): User`
   - `delete(int $id): bool`
   - `updateLastLogin(int $userId): void`
   - `updatePassword(int $userId, string $hashedPassword): void`

2. **Operaciones CRUD Completas**:

   - Crear nuevos usuarios
   - Buscar usuarios por ID y email
   - Actualizar información de usuarios
   - Eliminar usuarios (soft delete recomendado)
   - Operaciones específicas para autenticación

3. **Seguridad**:
   - Usar prepared statements para todas las consultas
   - Sanitización de inputs
   - Manejo seguro de contraseñas
   - Prevención de inyección SQL

### Requisitos Técnicos

1. **Base de Datos**:

   - Usar PDO para conexiones
   - Manejo de transacciones cuando sea necesario
   - Pool de conexiones si es posible
   - Compatibilidad con MySQL 8.0

2. **Estándares PHP**:

   - Seguir PSR-4 para autoloading
   - Usar tipado estricto (PHP 8.2)
   - Manejo de excepciones apropiado
   - Documentación PHPDoc completa

3. **Manejo de Errores**:

   - Excepciones específicas para diferentes errores
   - Logging de errores sin exponer información sensible
   - Validación de datos antes de operaciones DB

4. **Testing**:
   - Tests unitarios con PHPUnit
   - Mocks para conexiones de base de datos
   - Tests de integración con base de datos en memoria
   - Cobertura mínima 80%

### Estructura de Implementación

```php
<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Interfaces\UserRepositoryInterface;
use PDO;
use PDOException;

class UserRepository implements UserRepositoryInterface
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function findByEmail(string $email): ?User
    {
        // Implementación con prepared statement
    }

    // Resto de métodos...
}
```

### Esquema de Base de Datos

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    reset_token VARCHAR(255) NULL,
    reset_token_expiry DATETIME NULL,
    last_login DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_reset_token (reset_token)
);
```

### Configuración de Conexión

Usar la configuración existente en `config.php`:

```php
$dsn = "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
```

## Archivos de Referencia

Revisa estos archivos para entender el contexto:

- `.kiro/specs/auth-integration/requirements.md`
- `.kiro/specs/auth-integration/design.md`
- `.kiro/specs/auth-integration/api-contract.md`
- `api/models/User.php` (tu implementación anterior)
- `api/models/interfaces/UserRepositoryInterface.php`
- `api/config.php`

## Criterios de Aceptación

- [ ] Implementación completa de UserRepositoryInterface
- [ ] Todas las operaciones CRUD funcionando
- [ ] Prepared statements para seguridad
- [ ] Manejo de errores robusto
- [ ] Tests unitarios pasando
- [ ] Tests de integración funcionando
- [ ] Documentación PHPDoc completa
- [ ] Compatible con estándares del proyecto

## Testing con Docker

Usa los scripts que configuramos:

```bash
# Ejecutar tests desde el host
./scripts/test-docker.sh

# O dentro del contenedor
docker exec -it naser_backend /var/www/project/api/run-tests.sh
```

## Comandos para Reportar Progreso

```bash
# Al iniciar
node .kiro/specs/auth-integration/update-status.js start-task gemini "2.2" "Iniciando implementación de UserRepository"

# Para reportar progreso
node .kiro/specs/auth-integration/update-status.js update-progress gemini "2.2" "Métodos CRUD implementados, trabajando en tests"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task gemini "2.2" "UserRepository completado con todos los métodos, tests y documentación"
```

## Próximas Tareas Después de Esta

1. Tarea 3.1: Implementar JwtService
2. Tarea 3.2: Implementar AuthService backend
3. Tarea 4.1: Implementar endpoint de login

## Consideraciones Especiales

- **GoDaddy Compatibility**: Asegúrate de que el código sea compatible con hosting compartido
- **Performance**: Optimiza consultas para el entorno de producción
- **Security**: Prioriza la seguridad en todas las operaciones
- **Logging**: Implementa logging apropiado sin exponer datos sensibles

¡Excelente trabajo con el modelo User! Tu implementación siguió perfectamente los estándares establecidos.
