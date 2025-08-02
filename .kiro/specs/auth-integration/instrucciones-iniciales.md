# Instrucciones Iniciales para el Feature de Autenticación

## Fecha: 2025-07-21

## Autor: Kiro (Orquestador)

Este documento contiene las instrucciones iniciales para Claude (Frontend) y Gemini (Backend) para comenzar la implementación del sistema de autenticación del CMS de Grupo Naser.

## Contexto General

Estamos implementando un sistema de autenticación completo para el CMS de Grupo Naser que permitirá a los administradores y editores acceder de forma segura al panel de administración. El sistema utilizará JWT (JSON Web Tokens) para la autenticación y mantendrá sesiones seguras entre el frontend React y el backend PHP.

## Documentos de Referencia

Antes de comenzar, por favor revisen los siguientes documentos:

1. **Requisitos**: `.kiro/specs/auth-integration/requirements.md`
2. **Diseño**: `.kiro/specs/auth-integration/design.md`
3. **Tareas**: `.kiro/specs/auth-integration/tasks.md`
4. **Contrato API**: `.kiro/specs/auth-integration/api-contract.md`
5. **Plan de Orquestación**: `.kiro/specs/auth-integration/orchestration-plan.md`

## Instrucciones para Claude (Frontend)

### Tarea Inicial: 1.2 Configurar estructura de carpetas para autenticación en frontend

Para esta tarea, debes:

1. **Crear la estructura de directorios** para los componentes y servicios de autenticación en el frontend:

```
src/frontend/
├── auth/
│   ├── components/
│   │   ├── LoginForm/
│   │   ├── ProtectedRoute/
│   │   ├── ForgotPasswordForm/
│   │   ├── ResetPasswordForm/
│   │   └── LogoutButton/
│   ├── context/
│   │   └── AuthContext/
│   ├── hooks/
│   │   └── useAuth/
│   └── services/
│       ├── authService.js
│       ├── tokenService.js
│       └── apiService.js
```

2. **Crear archivos base** con estructura inicial (componentes vacíos, servicios con funciones sin implementar)

3. **Configurar rutas protegidas** en React Router:

   - Ruta pública para login
   - Ruta pública para recuperación de contraseña
   - Rutas protegidas para el panel de administración

4. **Preparar estructura para tests** unitarios de componentes y servicios

### Consideraciones Importantes

- Utiliza React 19.1.0 (versión especificada en el proyecto)
- Implementa una estructura modular y escalable
- Prepara los archivos para la implementación de tests
- Sigue las convenciones de código establecidas en el proyecto

### Entregables Esperados

- Estructura de directorios completa
- Archivos base con comentarios y TODOs
- Configuración inicial de rutas
- Documentación de la estructura implementada

## Instrucciones para Gemini (Backend)

### Tarea Inicial: 1.1 Configurar estructura de carpetas para autenticación en backend

Para esta tarea, debes:

1. **Crear la estructura de directorios** para los controladores, servicios y repositorios de autenticación en el backend:

```
api/
├── src/
│   ├── Auth/
│   │   ├── Controllers/
│   │   │   └── AuthController.php
│   │   ├── Services/
│   │   │   ├── AuthService.php
│   │   │   └── JwtService.php
│   │   ├── Repositories/
│   │   │   └── UserRepository.php
│   │   ├── Models/
│   │   │   └── User.php
│   │   └── Middleware/
│   │       └── AuthMiddleware.php
│   └── Common/
│       ├── Exceptions/
│       │   └── AuthException.php
│       └── Responses/
│           └── ApiResponse.php
├── tests/
│   └── Auth/
│       ├── Controllers/
│       ├── Services/
│       └── Repositories/
└── config/
    └── auth.php
```

2. **Crear archivos base** con estructura inicial (clases con métodos sin implementar)

3. **Configurar autoloading** para las nuevas clases en composer.json

4. **Preparar estructura para tests** unitarios de controladores, servicios y repositorios

### Consideraciones Importantes

- Sigue los principios de Clean Architecture
- Implementa una estructura modular y escalable
- Prepara los archivos para la implementación de tests
- Sigue las convenciones de código establecidas en el proyecto (PSR-4, PSR-12)

### Entregables Esperados

- Estructura de directorios completa
- Archivos base con comentarios y TODOs
- Configuración de autoloading
- Documentación de la estructura implementada

## Proceso de Reporte

Al finalizar sus tareas iniciales, por favor:

1. Actualicen el estado de sus tareas en el archivo `.kiro/specs/auth-integration/daily-tracking.md`
2. Proporcionen un breve informe de lo implementado
3. Documenten cualquier duda o bloqueo encontrado
4. Indiquen si están listos para continuar con la siguiente tarea

## Próximas Tareas

Una vez completadas las tareas iniciales:

- **Claude**: Continuará con la tarea 2.3 (Implementar AuthContext y hooks)
- **Gemini**: Continuará con la tarea 2.1 (Implementar modelo de Usuario)

## Comunicación

Para cualquier duda o bloqueo, comuníquense conmigo (Kiro) a través del canal establecido. Estaré disponible para resolver dudas y facilitar la comunicación entre ambos equipos.

¡Buena suerte con la implementación!
