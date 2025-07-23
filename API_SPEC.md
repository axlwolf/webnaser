# Especificaciones API - Grupo Naser CMS

Este documento define las especificaciones detalladas de la API RESTful para el CMS de Grupo Naser, estableciendo el contrato entre el frontend (Claude) y el backend (Gemini).

## Convenciones Generales

### Base URL

```
/api/v1
```

### Formato de Respuesta Estándar

#### Respuesta Exitosa

```json
{
  "success": true,
  "data": {
    /* datos específicos del endpoint */
  },
  "message": "Operación exitosa",
  "timestamp": "2025-07-18T10:30:00-06:00"
}
```

#### Respuesta de Error

```json
{
  "success": false,
  "error": "validation_error", // código de error
  "message": "Datos inválidos",
  "violations": {
    "email": "El email es obligatorio",
    "password": "La contraseña debe tener al menos 6 caracteres"
  },
  "timestamp": "2025-07-18T10:30:00-06:00"
}
```

### Códigos de Estado HTTP

- **200 OK**: Solicitud exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Solicitud exitosa sin contenido de respuesta
- **400 Bad Request**: Error de validación o solicitud incorrecta
- **401 Unauthorized**: Autenticación requerida o inválida
- **403 Forbidden**: Autenticado pero sin permisos
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

### Autenticación

- Basada en JWT (JSON Web Tokens)
- Token enviado en header: `Authorization: Bearer {token}`
- Tiempo de expiración: 24 horas

## Endpoints API

### 1. Autenticación (`/api/v1/auth`)

#### Login

- **URL**: `/auth/login`
- **Método**: `POST`
- **Descripción**: Autenticar usuario y obtener token JWT
- **Requiere Auth**: No
- **Cuerpo de la Solicitud**:
  ```json
  {
    "email": "admin@naser.com.mx",
    "password": "contraseña_segura"
  }
  ```
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": 1,
        "name": "Administrador",
        "email": "admin@naser.com.mx",
        "role": "admin"
      }
    },
    "message": "Inicio de sesión exitoso",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```
- **Respuesta de Error** (401 Unauthorized):
  ```json
  {
    "success": false,
    "error": "authentication_failed",
    "message": "Credenciales inválidas",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Logout

- **URL**: `/auth/logout`
- **Método**: `POST`
- **Descripción**: Invalidar token JWT actual
- **Requiere Auth**: Sí
- **Respuesta Exitosa** (204 No Content)

#### Refresh Token

- **URL**: `/auth/refresh`
- **Método**: `POST`
- **Descripción**: Renovar token JWT expirado
- **Requiere Auth**: Sí (token expirado)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "message": "Token renovado exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Usuario Actual

- **URL**: `/auth/me`
- **Método**: `GET`
- **Descripción**: Obtener información del usuario autenticado
- **Requiere Auth**: Sí
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Administrador",
      "email": "admin@naser.com.mx",
      "role": "admin",
      "last_login": "2025-07-17T15:30:00-06:00"
    },
    "message": "Información de usuario obtenida",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

### 2. Páginas (`/api/v1/pages`)

#### Listar Páginas

- **URL**: `/pages`
- **Método**: `GET`
- **Descripción**: Obtener listado de páginas
- **Requiere Auth**: Sí (para admin), No (para públicas)
- **Parámetros Query**:
  - `page` (int, opcional): Número de página, default 1
  - `limit` (int, opcional): Elementos por página, default 10
  - `status` (string, opcional): Filtrar por estado ('published', 'draft')
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": 1,
          "title": "Inicio",
          "slug": "inicio",
          "status": "published",
          "meta_title": "Grupo Naser - Servicios Funerarios",
          "updated_at": "2025-06-15T10:30:00-06:00"
        }
        // más páginas...
      ],
      "pagination": {
        "current_page": 1,
        "per_page": 10,
        "total_items": 25,
        "total_pages": 3
      }
    },
    "message": "Páginas obtenidas exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Obtener Página

- **URL**: `/pages/{id}`
- **Método**: `GET`
- **Descripción**: Obtener detalle de una página específica
- **Requiere Auth**: Sí (para admin/draft), No (para públicas)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Inicio",
      "slug": "inicio",
      "content": "<h1>Bienvenidos a Grupo Naser</h1><p>Contenido...</p>",
      "meta_title": "Grupo Naser - Servicios Funerarios",
      "meta_description": "Servicios funerarios de calidad en México",
      "status": "published",
      "created_at": "2025-01-15T10:30:00-06:00",
      "updated_at": "2025-06-15T10:30:00-06:00"
    },
    "message": "Página obtenida exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Crear Página

- **URL**: `/pages`
- **Método**: `POST`
- **Descripción**: Crear nueva página
- **Requiere Auth**: Sí (admin)
- **Cuerpo de la Solicitud**:
  ```json
  {
    "title": "Nueva Página",
    "slug": "nueva-pagina",
    "content": "<h1>Contenido de la nueva página</h1>",
    "meta_title": "Nueva Página - Grupo Naser",
    "meta_description": "Descripción para SEO",
    "status": "draft"
  }
  ```
- **Respuesta Exitosa** (201 Created):
  ```json
  {
    "success": true,
    "data": {
      "id": 5,
      "title": "Nueva Página",
      "slug": "nueva-pagina",
      "content": "<h1>Contenido de la nueva página</h1>",
      "meta_title": "Nueva Página - Grupo Naser",
      "meta_description": "Descripción para SEO",
      "status": "draft",
      "created_at": "2025-07-18T10:30:00-06:00",
      "updated_at": "2025-07-18T10:30:00-06:00"
    },
    "message": "Página creada exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Actualizar Página

- **URL**: `/pages/{id}`
- **Método**: `PUT`
- **Descripción**: Actualizar página existente
- **Requiere Auth**: Sí (admin)
- **Cuerpo de la Solicitud**: (similar a crear, campos opcionales)
- **Respuesta Exitosa** (200 OK): (similar a obtener página)

#### Eliminar Página

- **URL**: `/pages/{id}`
- **Método**: `DELETE`
- **Descripción**: Eliminar página
- **Requiere Auth**: Sí (admin)
- **Respuesta Exitosa** (204 No Content)

### 3. Servicios (`/api/v1/services`)

#### Listar Servicios

- **URL**: `/services`
- **Método**: `GET`
- **Descripción**: Obtener listado de servicios funerarios
- **Requiere Auth**: No
- **Parámetros Query**:
  - `page` (int, opcional): Número de página, default 1
  - `limit` (int, opcional): Elementos por página, default 10
  - `status` (string, opcional): Filtrar por estado ('active', 'inactive')
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": 1,
          "name": "Servicio Básico",
          "short_description": "Servicio funerario básico con todo lo necesario",
          "image_url": "/uploads/services/basic.jpg",
          "price": 15000.0,
          "status": "active"
        }
        // más servicios...
      ],
      "pagination": {
        "current_page": 1,
        "per_page": 10,
        "total_items": 5,
        "total_pages": 1
      }
    },
    "message": "Servicios obtenidos exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Obtener Servicio

- **URL**: `/services/{id}`
- **Método**: `GET`
- **Descripción**: Obtener detalle de un servicio específico
- **Requiere Auth**: No
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Servicio Básico",
      "short_description": "Servicio funerario básico con todo lo necesario",
      "description": "<p>Descripción detallada del servicio básico...</p>",
      "image_url": "/uploads/services/basic.jpg",
      "price": 15000.0,
      "features": [
        "Ataúd básico",
        "Traslado",
        "Preparación del cuerpo",
        "Sala de velación por 24 horas"
      ],
      "status": "active",
      "created_at": "2025-01-15T10:30:00-06:00",
      "updated_at": "2025-06-15T10:30:00-06:00"
    },
    "message": "Servicio obtenido exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Crear/Actualizar/Eliminar Servicio

- Similar a los endpoints de páginas, con campos específicos para servicios

### 4. Ubicaciones (`/api/v1/locations`)

#### Listar Ubicaciones

- **URL**: `/locations`
- **Método**: `GET`
- **Descripción**: Obtener listado de sucursales
- **Requiere Auth**: No
- **Parámetros Query**:
  - `page` (int, opcional): Número de página, default 1
  - `limit` (int, opcional): Elementos por página, default 10
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": 1,
          "name": "Sucursal Aragón",
          "address": "Av. Aragón 123, Ciudad de México",
          "phone": "55-1234-5678",
          "email": "aragon@naser.com.mx",
          "latitude": 19.4326,
          "longitude": -99.1332
        }
        // más ubicaciones...
      ],
      "pagination": {
        "current_page": 1,
        "per_page": 10,
        "total_items": 3,
        "total_pages": 1
      }
    },
    "message": "Ubicaciones obtenidas exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Obtener/Crear/Actualizar/Eliminar Ubicación

- Similar a los endpoints anteriores, con campos específicos para ubicaciones

### 5. Contactos (`/api/v1/contacts`)

#### Enviar Formulario de Contacto

- **URL**: `/contacts`
- **Método**: `POST`
- **Descripción**: Enviar formulario de contacto
- **Requiere Auth**: No
- **Cuerpo de la Solicitud**:
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "phone": "5512345678",
    "subject": "Información sobre servicios",
    "message": "Me gustaría obtener más información sobre sus servicios de previsión."
  }
  ```
- **Respuesta Exitosa** (201 Created):
  ```json
  {
    "success": true,
    "data": {
      "id": 123,
      "reference": "CONT-20250718-123"
    },
    "message": "Formulario enviado exitosamente. Nos pondremos en contacto pronto.",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Listar/Obtener/Actualizar Contactos (Admin)

- Endpoints similares a los anteriores, solo accesibles para administradores

### 6. Medios (`/api/v1/media`)

#### Subir Archivo

- **URL**: `/media`
- **Método**: `POST`
- **Descripción**: Subir archivo de imagen u otro medio
- **Requiere Auth**: Sí (admin)
- **Cuerpo de la Solicitud**: `multipart/form-data` con campo `file`
- **Respuesta Exitosa** (201 Created):
  ```json
  {
    "success": true,
    "data": {
      "id": 42,
      "filename": "5f8d3a1b2c.jpg",
      "original_filename": "imagen.jpg",
      "mime_type": "image/jpeg",
      "size": 153284,
      "url": "/uploads/media/5f8d3a1b2c.jpg",
      "thumbnail_url": "/uploads/media/thumbnails/5f8d3a1b2c.jpg",
      "created_at": "2025-07-18T10:30:00-06:00"
    },
    "message": "Archivo subido exitosamente",
    "timestamp": "2025-07-18T10:30:00-06:00"
  }
  ```

#### Listar/Obtener/Eliminar Medios

- Endpoints similares a los anteriores, para gestión de archivos multimedia

## Códigos de Error

| Código                  | Descripción                    |
| ----------------------- | ------------------------------ |
| `authentication_failed` | Credenciales inválidas         |
| `token_expired`         | Token JWT expirado             |
| `token_invalid`         | Token JWT inválido             |
| `unauthorized`          | No autorizado para esta acción |
| `validation_error`      | Error de validación de datos   |
| `resource_not_found`    | Recurso no encontrado          |
| `resource_exists`       | El recurso ya existe           |
| `server_error`          | Error interno del servidor     |

## Validación de Datos

### Reglas Comunes

- **Email**: Formato válido, máximo 100 caracteres
- **Contraseña**: Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
- **Nombres**: Máximo 100 caracteres, sin caracteres especiales
- **Teléfono**: Formato mexicano (10 dígitos)
- **Slug**: Solo letras minúsculas, números y guiones, sin espacios

### Mensajes de Error

Todos los mensajes de error deben estar en español mexicano (es-MX):

```php
$errorMessages = [
    'required' => 'Este campo es obligatorio',
    'email' => 'Ingresa un email válido',
    'min' => 'Este campo debe tener al menos :min caracteres',
    'max' => 'Este campo no puede tener más de :max caracteres',
    'unique' => 'Este valor ya existe',
    'numeric' => 'Este campo debe ser un número',
    'date' => 'Este campo debe ser una fecha válida',
    'url' => 'Este campo debe ser una URL válida',
    'unauthorized' => 'No tienes permisos para realizar esta acción',
    'not_found' => 'El recurso solicitado no fue encontrado',
    'server_error' => 'Error del servidor. Inténtalo más tarde.',
];
```

## Consideraciones de Seguridad

### Protección CSRF

- Tokens CSRF para formularios públicos
- Validación de origen de solicitud

### Limitación de Tasa

- Máximo 60 solicitudes por minuto para endpoints públicos
- Máximo 300 solicitudes por minuto para endpoints autenticados

### Validación de Archivos

- Tipos permitidos: jpg, jpeg, png, gif, pdf
- Tamaño máximo: 5MB
- Escaneo de malware

### Sanitización de Datos

- Todos los inputs deben ser sanitizados
- HTML permitido solo en campos específicos (content)

---

**Última actualización**: 18 de julio de 2025  
**Autor**: Kiro (Orquestador)  
**Para implementación por**: Gemini (Backend)
