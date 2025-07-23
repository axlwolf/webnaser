# Instrucciones para Próximas Tareas

## Para Gemini (Backend)

### Tarea Inmediata: 2.2 Implementar UserRepository

**Objetivo**: Crear el repositorio para operaciones de base de datos con usuarios.

**Ubicación**: `api/repositories/UserRepository.php`

**Requisitos**:

1. Implementar interfaz `UserRepositoryInterface`
2. Métodos requeridos:
   - `findByEmail(string $email): ?User`
   - `findById(int $id): ?User`
   - `create(User $user): User`
   - `update(User $user): User`
   - `delete(int $id): bool`
   - `updateLastLogin(int $userId): void`
   - `updatePassword(int $userId, string $hashedPassword): void`

**Consideraciones**:

- Usar PDO para conexiones de base de datos
- Implementar prepared statements para seguridad
- Manejar excepciones apropiadamente
- Seguir estándares PSR-4
- Crear tests unitarios correspondientes

**Comando para reportar inicio**:

```bash
node .kiro/specs/auth-integration/update-status.js start-task gemini "2.2" "Iniciando implementación de UserRepository"
```

**Comando para reportar completitud**:

```bash
node .kiro/specs/auth-integration/update-status.js complete-task gemini "2.2" "UserRepository implementado con todos los métodos CRUD y tests"
```

## Para Claude (Frontend)

### Análisis de Estado Actual

Claude ha implementado excelentemente más funcionalidad de la planificada:

- ✅ AuthContext y hooks (Tarea 2.3) - Ya completado
- ✅ TokenStorage (Tarea 2.4) - Ya completado
- ✅ ApiService básico (Tarea 3.3) - Ya completado
- ✅ AuthService frontend (Tarea 3.4) - Ya completado

### Opciones para Próxima Tarea

**Opción A: Componentes de UI (Recomendado)**

- Tarea 5.1: Implementar componente LoginForm
- Tarea 5.4: Implementar componente de cierre de sesión

**Opción B: Componentes de Recuperación**

- Tarea 5.3: Implementar componentes de recuperación de contraseña

**Opción C: Funcionalidades Avanzadas**

- Tarea 7.2: Implementar manejo de sesión inactiva

### Recomendación: Tarea 5.1 - LoginForm

**Objetivo**: Crear el formulario de inicio de sesión.

**Ubicación**: `src/frontend/src/auth/components/LoginForm/`

**Requisitos**:

1. Formulario con validación en tiempo real
2. Manejo de errores de API
3. Indicadores de carga
4. Integración con AuthContext
5. Responsive design
6. Accesibilidad completa

**Comando para reportar inicio**:

```bash
node .kiro/specs/auth-integration/update-status.js start-task claude "5.1" "Iniciando implementación de LoginForm"
```

## Coordinación de Integración

### Puntos de Sincronización

1. **Cuando Gemini complete UserRepository**:

   - Kiro preparará pruebas de integración
   - Claude podrá probar formularios contra API real

2. **Cuando Claude complete LoginForm**:
   - Gemini podrá probar endpoints con UI real
   - Kiro validará flujo completo de autenticación

### Comunicación

- Reportar progreso cada 2-3 horas
- Usar el sistema de seguimiento para actualizaciones
- Comunicar bloqueos inmediatamente

## Recursos Disponibles

### Para Gemini

- Modelo User ya implementado
- Contrato API definido
- Scripts de testing configurados
- Documentación de base de datos

### Para Claude

- Servicios de autenticación implementados
- Contexto y hooks listos
- Tipos TypeScript definidos
- Componente ProtectedRoute funcional

## Próximos Hitos

1. **Hito 1**: UserRepository + LoginForm completados
2. **Hito 2**: Primer flujo de autenticación end-to-end
3. **Hito 3**: Todos los componentes UI implementados
4. **Hito 4**: Sistema completo con recuperación de contraseña

---

**Coordinado por**: Kiro (Orquestador)  
**Fecha**: 2025-07-22  
**Estado**: Listo para próximas tareas
