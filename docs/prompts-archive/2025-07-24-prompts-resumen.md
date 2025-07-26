# Prompts para Siguiente Sesión - Sistema de Autenticación

## 🎯 Estado del Proyecto

**Branch**: `feature/auth-integration`  
**Progreso**: 13.33% (4/30 tareas completadas)  
**Último commit**: `cd49f5f` - Sistema de autenticación Fase 1

## 📋 Prompts Listos para Usar

### Para Claude (Frontend)

````
# PROMPT PARA CLAUDE - IMPLEMENTAR LOGINFORM

Estás trabajando en el sistema de autenticación para el CMS de Grupo Naser. Has completado exitosamente la estructura base de autenticación en el frontend React.

## Tu próxima tarea: Implementar LoginForm (Tarea 5.1)

### Contexto completado por ti:
- ✅ AuthContext con gestión completa de estado
- ✅ Hook useAuth
- ✅ AuthService con métodos de API
- ✅ TokenStorage con manejo de JWT
- ✅ ApiInterceptor con renovación automática
- ✅ Componente ProtectedRoute
- ✅ Tipos TypeScript completos

### Especificaciones:

**Ubicación**: `src/frontend/src/auth/components/LoginForm/`

**Archivos a crear**:
- LoginForm.tsx
- LoginForm.module.css
- LoginForm.test.tsx
- index.ts

**Requisitos funcionales**:
1. Formulario con campos email y password
2. Validación en tiempo real (email formato válido, password mín 8 chars)
3. Integración con useAuth hook
4. Manejo de estados loading/error
5. Redirección después de login exitoso
6. Enlace a recuperación de contraseña

**Requisitos técnicos**:
- Componente funcional con hooks
- Diseño responsive (mobile-first)
- Accesibilidad completa (ARIA, keyboard nav)
- Tests unitarios con React Testing Library
- Mensajes de error en español
- Compatible con GoDaddy hosting

**Archivos de referencia**:
- `.kiro/specs/auth-integration/requirements.md`
- `.kiro/specs/auth-integration/design.md`
- `.kiro/specs/auth-integration/api-contract.md`
- `src/frontend/src/auth/context/AuthContext.tsx`

**Comandos para reportar progreso**:
```bash
# Al iniciar
node .kiro/specs/auth-integration/update-status.js start-task claude "5.1" "Iniciando implementación de LoginForm"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task claude "5.1" "LoginForm completado con validaciones, tests y documentación"
````

Revisa el archivo completo en: `.kiro/specs/auth-integration/prompts-claude-siguiente-batch.md`

```

### Para Gemini (Backend)

```

# PROMPT PARA GEMINI - IMPLEMENTAR USERREPOSITORY

Estás trabajando en el sistema de autenticación para el CMS de Grupo Naser. Has completado exitosamente el modelo de Usuario siguiendo los estándares PHP.

## Tu próxima tarea: Implementar UserRepository (Tarea 2.2)

### Contexto completado por ti:

- ✅ Modelo User con todas las propiedades requeridas
- ✅ Métodos de hash y verificación de contraseñas
- ✅ Getters y setters completos
- ✅ Manejo de tokens de recuperación
- ✅ Interfaz UserRepositoryInterface

### Especificaciones:

**Ubicación**: `api/repositories/UserRepository.php`

**Métodos a implementar**:

- `findById(int $id): ?User`
- `findByEmail(string $email): ?User`
- `create(User $user): User`
- `update(User $user): User`
- `delete(int $id): bool`
- `updateLastLogin(int $userId): void`
- `updatePassword(int $userId, string $hashedPassword): void`

**Requisitos técnicos**:

- Usar PDO para conexiones de base de datos
- Prepared statements para seguridad
- Manejo de excepciones apropiado
- Tipado estricto PHP 8.2
- Tests unitarios con PHPUnit
- Documentación PHPDoc completa

**Esquema de base de datos**:

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
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Testing con Docker**:

```bash
# Ejecutar tests
./scripts/test-docker.sh
```

**Comandos para reportar progreso**:

```bash
# Al iniciar
node .kiro/specs/auth-integration/update-status.js start-task gemini "2.2" "Iniciando implementación de UserRepository"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task gemini "2.2" "UserRepository completado con todos los métodos, tests y documentación"
```

Revisa el archivo completo en: `.kiro/specs/auth-integration/prompts-gemini-siguiente-batch.md`

````

## 🛠️ Sistema de Monitoreo

Para iniciar el sistema de seguimiento:

```bash
# Iniciar monitoreo
cd .kiro/specs/auth-integration
./start-monitoring.sh start

# Ver estado actual
./start-monitoring.sh status

# Ver logs
./start-monitoring.sh logs
````

## 📊 Archivos de Seguimiento

- **Estado del proyecto**: `.kiro/specs/auth-integration/status.json`
- **Log de comunicación**: `.kiro/specs/auth-integration/communication-log.md`
- **Seguimiento diario**: `.kiro/specs/auth-integration/daily-tracking.md`

## 🔄 Próximos Hitos

1. **LoginForm + UserRepository**: Base funcional completa
2. **Primer flujo end-to-end**: Autenticación funcionando
3. **Componentes UI completos**: Experiencia de usuario lista

## 📚 Documentación Completa

Toda la documentación del proyecto está en:

- `.kiro/specs/auth-integration/` - Especificaciones del feature
- `KIRO.md` - Plan de orquestación general
- `API_SPEC.md` - Especificaciones de API
- `VISUAL_SPEC.md` - Especificaciones visuales

---

**Preparado por**: Kiro (Orquestador)  
**Fecha**: 2025-07-22  
**Commit**: cd49f5f  
**Estado**: Listo para siguiente sesión
