# Contrato API: Sistema de Autenticación

Este documento define el contrato de API entre el frontend (Claude) y el backend (Gemini) para el sistema de autenticación del CMS de Grupo Naser.

## Versión del Documento

- **Versión**: 1.1
- **Fecha**: 2025-07-21
- **Autor**: Kiro (Orquestador)
- **Estado**: Aprobado para implementación

## Convenciones Generales

### Base URL

```
/api/v1/auth/
```

### Formato de Respuesta Estándar

Todas las respuestas seguirán este formato:

```json
{
  "success": true|false,
  "data": { ... },
  "message": "Mensaje descriptivo en español",
  "timestamp": "2025-07-21T14:30:00-06:00"
}
```

### Formato de Error

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensaje de error en español"
  },
  "timestamp": "2025-07-21T14:30:00-06:00"
}
```

### Códigos de Estado HTTP

- `200 OK`: Petición exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Petición inválida
- `401 Unauthorized`: Autenticación requerida
- `403 Forbidden`: Permisos insuficientes
- `404 Not Found`: Recurso no encontrado
- `422 Unprocessable Entity`: Validación fallida
- `429 Too Many Requests`: Demasiadas peticiones (rate limiting)
- `500 Server Error`: Error interno del servidor

### Headers de Autenticación

```
Authorization: Bearer {jwt_token}
```

## Endpoints

### 1. Login

**Endpoint:** `POST /login`

**Request:**

```json
{
  "email": "admin@naser.com.mx",
  "password": "contraseña_segura"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": "2025-07-21T16:30:00-06:00",
    "user": {
      "id": 1,
      "name": "Admin Usuario",
      "email": "admin@naser.com.mx",
      "role": "admin"
    }
  },
  "message": "Inicio de sesión exitoso",
  "timestamp": "2025-07-21T14:30:00-06:00"
}
```

**Response (401 Unauthorized):**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_001",
    "message": "Credenciales inválidas"
  },
  "timestamp": "2025-07-21T14:30:00-06:00"
}
```

**Response (429 Too Many Requests):**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_006",
    "message": "Demasiados intentos fallidos. Intente nuevamente en 15 minutos."
  },
  "timestamp": "2025-07-21T14:30:00-06:00"
}
```

### 2. Logout

**Endpoint:** `POST /logout`

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Request:** Vacío

**Response (200 OK):**

```json
{
  "success": true,
  "data": null,
  "message": "Sesión cerrada exitosamente",
  "timestamp": "2025-07-21T14:35:00-06:00"
}
```

**Response (401 Unauthorized):**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_002",
    "message": "Token inválido o expirado"
  },
  "timestamp": "2025-07-21T14:35:00-06:00"
}
```

### 3. Obtener Usuario Actual

**Endpoint:** `GET /me`

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Admin Usuario",
      "email": "admin@naser.com.mx",
      "role": "admin",
      "last_login": "2025-07-21T14:30:00-06:00"
    }
  },
  "message": "Información de usuario obtenida exitosamente",
  "timestamp": "2025-07-21T14:40:00-06:00"
}
```

**Response (401 Unauthorized):**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_002",
    "message": "Token inválido o expirado"
  },
  "timestamp": "2025-07-21T14:40:00-06:00"
}
```

### 4. Renovar Token

**Endpoint:** `POST /refresh`

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": "2025-07-21T18:45:00-06:00"
  },
  "message": "Token renovado exitosamente",
  "timestamp": "2025-07-21T14:45:00-06:00"
}
```

**Response (401 Unauthorized):**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_002",
    "message": "Token inválido o expirado"
  },
  "timestamp": "2025-07-21T14:45:00-06:00"
}
```

### 5. Solicitar Recuperación de Contraseña

**Endpoint:** `POST /forgot-password`

**Request:**

```json
{
  "email": "admin@naser.com.mx"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": null,
  "message": "Si el correo existe en nuestro sistema, recibirá instrucciones para restablecer su contraseña",
  "timestamp": "2025-07-21T14:50:00-06:00"
}
```

**Nota:** Por seguridad, siempre devuelve 200 OK aunque el email no exista.

### 6. Restablecer Contraseña

**Endpoint:** `POST /reset-password`

**Request:**

```json
{
  "token": "token_de_recuperacion_unico",
  "password": "nueva_contraseña",
  "password_confirmation": "nueva_contraseña"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": null,
  "message": "Contraseña restablecida exitosamente",
  "timestamp": "2025-07-21T14:55:00-06:00"
}
```

**Response (400 Bad Request):**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_007",
    "message": "Token de recuperación inválido"
  },
  "timestamp": "2025-07-21T14:55:00-06:00"
}
```

**Response (422 Unprocessable Entity):**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "La contraseña debe tener al menos 8 caracteres",
    "fields": {
      "password": ["La contraseña debe tener al menos 8 caracteres"]
    }
  },
  "timestamp": "2025-07-21T14:55:00-06:00"
}
```

## Estructura de Datos

### Usuario

```json
{
  "id": 1,
  "name": "Admin Usuario",
  "email": "admin@naser.com.mx",
  "role": "admin",
  "last_login": "2025-07-21T14:30:00-06:00",
  "created_at": "2025-01-01T00:00:00-06:00",
  "updated_at": "2025-07-21T14:30:00-06:00"
}
```

### Token JWT

**Payload:**

```json
{
  "sub": "1", // User ID
  "name": "Admin Usuario",
  "email": "admin@naser.com.mx",
  "role": "admin",
  "iat": 1626718109, // Issued at
  "exp": 1626725309, // Expiration time (iat + 2 hours)
  "jti": "unique-token-id" // JWT ID for revocation
}
```

## Códigos de Error

| Código           | Descripción                    |
| ---------------- | ------------------------------ |
| AUTH_001         | Credenciales inválidas         |
| AUTH_002         | Token inválido o expirado      |
| AUTH_003         | Acceso denegado                |
| AUTH_004         | Usuario no encontrado          |
| AUTH_005         | Error en el servidor           |
| AUTH_006         | Demasiados intentos fallidos   |
| AUTH_007         | Token de recuperación inválido |
| AUTH_008         | Token de recuperación expirado |
| VALIDATION_ERROR | Error de validación de datos   |

## Notas de Implementación

1. **Seguridad**:

   - Todas las contraseñas deben ser hasheadas con bcrypt (factor de trabajo: 12)
   - Todas las comunicaciones deben ser sobre HTTPS
   - Implementar rate limiting para prevenir ataques de fuerza bruta (máximo 5 intentos en 15 minutos)
   - Implementar protección CSRF para formularios
   - Establecer cabeceras de seguridad (Content-Security-Policy, X-XSS-Protection)

2. **Validación**:

   - Email: Formato válido de correo electrónico
   - Contraseña: Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
   - Sanitización de todos los inputs para prevenir XSS e inyección SQL
   - Validación tanto en frontend como en backend

3. **Tokens**:

   - Algoritmo: HS256
   - Duración: 2 horas
   - Renovación automática cuando queden menos de 30 minutos de validez
   - Almacenamiento seguro de la clave secreta en variables de entorno
   - Implementar mecanismo de revocación de tokens (por ejemplo, en cambio de contraseña)

4. **Manejo de Errores**:
   - Mensajes de error claros y en español
   - No exponer información sensible en errores
   - Logging detallado en backend para depuración
   - Centralizar manejo de errores para consistencia

## Guía de Implementación para Equipos

### Para Claude (Frontend)

1. **Almacenamiento de Token**:

   - Utilizar localStorage para persistencia entre sesiones
   - Implementar función para limpiar token al cerrar sesión
   - Considerar opción de "Mantener sesión iniciada" para usuarios

2. **Interceptor de Peticiones**:

   - Añadir token JWT a todas las peticiones autenticadas
   - Manejar respuestas 401 para redireccionar a login
   - Implementar renovación automática de token

3. **Formularios**:

   - Validación en tiempo real con feedback visual
   - Mostrar indicador de fortaleza de contraseña
   - Implementar protección contra múltiples envíos

4. **Manejo de Estado**:
   - Utilizar React Context para estado de autenticación
   - Persistir información mínima del usuario (id, nombre, rol)
   - Implementar HOC o hook para protección de rutas

### Para Gemini (Backend)

1. **Implementación de JWT**:

   - Utilizar biblioteca `firebase/php-jwt` para manejo de tokens
   - Almacenar clave secreta en variable de entorno
   - Implementar middleware de autenticación reutilizable

2. **Seguridad de Contraseñas**:

   - Utilizar `password_hash()` y `password_verify()` de PHP
   - Establecer factor de trabajo adecuado para bcrypt
   - Implementar política de contraseñas seguras

3. **Rate Limiting**:

   - Implementar mediante tabla en base de datos o caché
   - Registrar intentos por IP y usuario
   - Escalar tiempo de bloqueo con intentos consecutivos

4. **Logging**:
   - Registrar eventos de autenticación (éxitos y fallos)
   - No incluir contraseñas ni tokens completos en logs
   - Implementar diferentes niveles de logging (info, warning, error)

## Ejemplos de Implementación

### Ejemplo de Interceptor (Frontend - Claude)

```javascript
// api.js
import axios from "axios";
import TokenService from "./tokenService";

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para añadir token a peticiones
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado renovar el token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentar renovar el token
        const response = await api.post("/auth/refresh");
        const { token } = response.data.data;

        // Guardar nuevo token
        TokenService.setToken(token);

        // Reintentar la petición original
        return api(originalRequest);
      } catch (error) {
        // Si falla la renovación, redirigir a login
        TokenService.removeToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

### Ejemplo de Middleware de Autenticación (Backend - Gemini)

```php
<?php
// AuthMiddleware.php

namespace App\Middleware;

use App\Services\JwtService;
use App\Exceptions\AuthException;

class AuthMiddleware
{
    private $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function handle($request, $next)
    {
        // Obtener token del header
        $header = $request->getHeader('Authorization');
        if (empty($header) || !preg_match('/Bearer\s(\S+)/', $header[0], $matches)) {
            throw new AuthException('Token no proporcionado', 'AUTH_002', 401);
        }

        $token = $matches[1];

        try {
            // Validar token
            $payload = $this->jwtService->decode($token);

            // Añadir usuario al request
            $request = $request->withAttribute('user', $payload);

            return $next($request);
        } catch (\Exception $e) {
            throw new AuthException('Token inválido o expirado', 'AUTH_002', 401);
        }
    }
}
```
