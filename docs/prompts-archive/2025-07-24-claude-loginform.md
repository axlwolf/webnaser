# ARCHIVO: Prompt Claude LoginForm - 2025-07-24

**Fecha de creación**: 2025-07-24  
**Estado**: Completado exitosamente  
**Tarea**: 5.1 - Implementar LoginForm  
**Resultado**: LoginForm funcional con validaciones, tests y accesibilidad completa

---

# PROMPT ESPECÍFICO PARA CLAUDE - IMPLEMENTAR LOGINFORM

## 🎯 CONTEXTO DEL PROYECTO

Estás desarrollando el sistema de autenticación para el **CMS de Grupo Naser**, un sitio web de servicios funerarios que será desplegado en **GoDaddy hosting**.

**Branch actual**: `feature/auth-integration`  
**Tu rol**: Desarrollador Frontend React  
**Progreso actual**: 13.33% (4/30 tareas completadas)

## ✅ LO QUE YA HAS COMPLETADO EXITOSAMENTE

Has implementado una **estructura de autenticación completa y robusta**:

- **AuthContext** (`src/frontend/src/auth/context/AuthContext.tsx`) - Gestión global de estado
- **useAuth hook** (`src/frontend/src/auth/hooks/useAuth.ts`) - Hook personalizado
- **AuthService** (`src/frontend/src/auth/services/AuthService.ts`) - Comunicación con API
- **TokenStorage** (`src/frontend/src/auth/services/TokenStorage.ts`) - Manejo seguro de JWT
- **ApiInterceptor** (`src/frontend/src/auth/services/ApiInterceptor.ts`) - Renovación automática
- **ProtectedRoute** (`src/frontend/src/auth/components/ProtectedRoute.tsx`) - Protección de rutas
- **Tipos TypeScript** (`src/frontend/src/auth/types/auth.ts`) - Tipado completo

## 🎯 TU PRÓXIMA TAREA: IMPLEMENTAR LOGINFORM (Tarea 5.1)

### OBJETIVO

Crear un **formulario de inicio de sesión completo** que integre con tu infraestructura de autenticación ya implementada.

### UBICACIÓN DE ARCHIVOS

```
src/frontend/src/auth/components/LoginForm/
├── LoginForm.tsx          # Componente principal
├── LoginForm.module.css   # Estilos CSS Modules
├── LoginForm.test.tsx     # Tests unitarios
└── index.ts              # Exportaciones
```

[... resto del contenido del prompt original ...]

---

**RESULTADO**: ✅ COMPLETADO EXITOSAMENTE  
**Archivos creados**: LoginForm.tsx, LoginForm.test.tsx, LoginForm.module.css, index.ts  
**Calidad**: Excelente - cumplió todos los criterios de aceptación
