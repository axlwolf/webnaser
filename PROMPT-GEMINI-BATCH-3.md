# PROMPT GEMINI - BATCH 3: API Core + Integración Frontend

## 🎯 CONTEXTO DEL PROYECTO

El proyecto Grupo Naser CMS ha avanzado significativamente con un **36.67% de progreso**. Tu trabajo anterior en UserRepository fue excepcional. Ahora necesitamos expandir el backend con APIs completas y preparar la integración con el frontend que Claude está desarrollando.

## 📊 ESTADO ACTUAL

- **Progreso**: 36.67% (11/30 tareas completadas)
- **Tu contribución anterior**: UserRepository completo con tests
- **Situación**: Claude resolviendo problemas críticos de frontend
- **Tu misión**: Crear APIs robustas y preparar integración

## 🎯 OBJETIVOS DE ESTA SESIÓN

### FASE 1: API ENDPOINTS COMPLETOS

1. **AuthController con endpoints seguros**
2. **ContentController para gestión de páginas**
3. **ServiceController para servicios funerarios**
4. **LocationController para sucursales**

### FASE 2: INTEGRACIÓN Y SEGURIDAD

1. **Middleware de autenticación JWT**
2. **Validación de datos robusta**
3. **Manejo de errores centralizado**
4. **Documentación API completa**

## 🔧 TAREAS ESPECÍFICAS

### ✅ TAREA G1: AuthController Completo

**Objetivo**: Crear sistema de autenticación robusto con JWT

**Archivo**: `api/controllers/AuthController.php`

**Endpoints Requeridos**:

```php
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
POST /api/auth/change-password
```

**Especificaciones**:

1. **Login Endpoint**:

   ```php
   // POST /api/auth/login
   // Input: { "email": "admin@naser.com", "password": "password123" }
   // Output: { "token": "jwt_token", "user": {...}, "expires_in": 3600 }
   ```

2. **Integración con UserRepository existente**
3. **JWT token generation y validation**
4. **Rate limiting para prevenir ataques**
5. **Logging de intentos de login**
6. **Compatibilidad con GoDaddy hosting**

**Características de Seguridad**:

- Password hashing con `password_hash()`
- JWT con expiración configurable
- Refresh token mechanism
- CSRF protection
- Input sanitization
- SQL injection prevention

### ✅ TAREA G2: ContentController para CMS

**Objetivo**: API completa para gestión de contenido de páginas

**Archivo**: `api/controllers/ContentController.php`

**Endpoints Requeridos**:

```php
GET    /api/content/pages           # Listar páginas
GET    /api/content/pages/{id}      # Obtener página específica
POST   /api/content/pages           # Crear página (admin)
PUT    /api/content/pages/{id}      # Actualizar página (admin)
DELETE /api/content/pages/{id}      # Eliminar página (admin)
GET    /api/content/pages/slug/{slug} # Obtener por slug
```

**Modelo de Datos**:

```php
// Estructura de página
{
  "id": 1,
  "title": "Nosotros - Grupo Naser",
  "slug": "nosotros",
  "content": "HTML content...",
  "meta_title": "SEO title",
  "meta_description": "SEO description",
  "featured_image": "path/to/image.jpg",
  "status": "published", // draft, published, archived
  "created_at": "2025-07-31T10:00:00Z",
  "updated_at": "2025-07-31T10:00:00Z"
}
```

**Funcionalidades**:

- CRUD completo para páginas
- Validación de contenido HTML
- Generación automática de slugs
- Versionado de contenido
- SEO metadata management
- Image upload handling

### ✅ TAREA G3: ServiceController para Servicios Funerarios

**Objetivo**: API especializada para servicios funerarios de Grupo Naser

**Archivo**: `api/controllers/ServiceController.php`

**Endpoints Requeridos**:

```php
GET    /api/services                # Listar servicios
GET    /api/services/{id}           # Obtener servicio específico
POST   /api/services                # Crear servicio (admin)
PUT    /api/services/{id}           # Actualizar servicio (admin)
DELETE /api/services/{id}           # Eliminar servicio (admin)
GET    /api/services/category/{cat} # Servicios por categoría
```

**Categorías de Servicios**:

- `prevision` - Previsión funeraria
- `inmediata` - Necesidad inmediata
- `cremacion` - Servicios de cremación
- `traslados` - Traslados
- `velacion` - Servicios de velación

**Modelo de Datos**:

```php
{
  "id": 1,
  "name": "Previsión Funeraria Básica",
  "category": "prevision",
  "description": "Descripción del servicio...",
  "features": ["Feature 1", "Feature 2"],
  "price_range": "Desde $15,000",
  "image": "path/to/service-image.jpg",
  "gallery": ["img1.jpg", "img2.jpg"],
  "is_featured": true,
  "status": "active",
  "created_at": "2025-07-31T10:00:00Z"
}
```

### ✅ TAREA G4: LocationController para Sucursales

**Objetivo**: API para gestión de ubicaciones de Grupo Naser

**Archivo**: `api/controllers/LocationController.php`

**Endpoints Requeridos**:

```php
GET    /api/locations               # Listar ubicaciones
GET    /api/locations/{id}          # Obtener ubicación específica
POST   /api/locations               # Crear ubicación (admin)
PUT    /api/locations/{id}          # Actualizar ubicación (admin)
DELETE /api/locations/{id}          # Eliminar ubicación (admin)
GET    /api/locations/nearest       # Ubicación más cercana
```

**Ubicaciones Existentes**:

- Naser Tlalpan
- Naser Morelos
- Naser Oaxaca
- Naser Aragón

**Modelo de Datos**:

```php
{
  "id": 1,
  "name": "Naser Tlalpan",
  "slug": "tlalpan",
  "address": "Dirección completa...",
  "phone": "+52 55 1234 5678",
  "email": "tlalpan@naser.com.mx",
  "coordinates": {
    "lat": 19.2847,
    "lng": -99.1843
  },
  "hours": {
    "monday": "24 horas",
    "tuesday": "24 horas",
    // ...
  },
  "services": ["velacion", "cremacion", "traslados"],
  "images": ["exterior.jpg", "interior.jpg"],
  "is_main": false,
  "status": "active"
}
```

### ✅ TAREA G5: Middleware de Autenticación JWT

**Objetivo**: Sistema de middleware para proteger endpoints

**Archivo**: `api/middleware/AuthMiddleware.php`

**Funcionalidades**:

1. **JWT Token Validation**:

   ```php
   // Validar token en header Authorization: Bearer <token>
   // Verificar expiración
   // Extraer datos de usuario
   // Inyectar usuario en request
   ```

2. **Role-based Access Control**:

   ```php
   // Middleware para diferentes roles
   // AdminMiddleware - solo administradores
   // AuthMiddleware - usuarios autenticados
   // GuestMiddleware - usuarios no autenticados
   ```

3. **Rate Limiting**:
   - Límites por IP
   - Límites por usuario
   - Diferentes límites por endpoint

### ✅ TAREA G6: Sistema de Validación Robusto

**Objetivo**: Validación centralizada y consistente

**Archivo**: `api/validators/`

**Validadores Requeridos**:

1. **`AuthValidator.php`**:

   ```php
   // Validación de login
   // Validación de cambio de contraseña
   // Validación de datos de usuario
   ```

2. **`ContentValidator.php`**:

   ```php
   // Validación de páginas
   // Sanitización de HTML
   // Validación de SEO metadata
   ```

3. **`ServiceValidator.php`**:
   ```php
   // Validación de servicios
   // Validación de categorías
   // Validación de precios
   ```

**Características**:

- Mensajes de error en español
- Validación de tipos de datos
- Sanitización de inputs
- Validación de archivos subidos
- Custom validation rules

### ✅ TAREA G7: Manejo de Errores Centralizado

**Objetivo**: Sistema robusto de manejo de errores

**Archivo**: `api/exceptions/ErrorHandler.php`

**Tipos de Errores**:

```php
// HTTP Status Codes apropiados
// 400 - Bad Request (validación)
// 401 - Unauthorized (autenticación)
// 403 - Forbidden (autorización)
// 404 - Not Found (recurso no existe)
// 422 - Unprocessable Entity (validación)
// 500 - Internal Server Error (errores del servidor)
```

**Formato de Respuesta**:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos proporcionados no son válidos",
    "details": {
      "email": ["El email es requerido"],
      "password": ["La contraseña debe tener al menos 8 caracteres"]
    }
  },
  "timestamp": "2025-07-31T10:00:00Z"
}
```

### ✅ TAREA G8: Testing Completo de APIs

**Objetivo**: Tests unitarios e integración para todas las APIs

**Archivos de Test**:

- `tests/unit/controllers/AuthControllerTest.php`
- `tests/unit/controllers/ContentControllerTest.php`
- `tests/unit/controllers/ServiceControllerTest.php`
- `tests/unit/controllers/LocationControllerTest.php`
- `tests/integration/api/AuthApiTest.php`

**Cobertura de Tests**:

- Todos los endpoints
- Casos de éxito y error
- Validación de datos
- Autenticación y autorización
- Rate limiting
- Performance tests básicos

## 📋 CRITERIOS DE ÉXITO

### APIs Funcionales

- ✅ Todos los endpoints responden correctamente
- ✅ Autenticación JWT funcionando
- ✅ Validación de datos robusta
- ✅ Manejo de errores consistente
- ✅ Rate limiting implementado

### Calidad de Código

- ✅ Tests unitarios > 90% cobertura
- ✅ Tests de integración completos
- ✅ Documentación API completa
- ✅ Código siguiendo PSR-12
- ✅ Sin vulnerabilidades de seguridad

### Integración

- ✅ Compatible con frontend React
- ✅ CORS configurado correctamente
- ✅ Headers de seguridad implementados
- ✅ Logging completo
- ✅ Compatible con GoDaddy hosting

## 🚀 COMANDOS ÚTILES

```bash
# Tests
cd api && composer test

# Code Style
cd api && composer cs

# Mess Detector
cd api && composer md

# Instalar dependencias
cd api && composer install

# Servidor de desarrollo
php -S localhost:8000 -t api/
```

## 📁 ESTRUCTURA DE ARCHIVOS

```
api/
├── controllers/
│   ├── AuthController.php
│   ├── ContentController.php
│   ├── ServiceController.php
│   └── LocationController.php
├── middleware/
│   ├── AuthMiddleware.php
│   ├── AdminMiddleware.php
│   └── RateLimitMiddleware.php
├── validators/
│   ├── AuthValidator.php
│   ├── ContentValidator.php
│   └── ServiceValidator.php
├── exceptions/
│   └── ErrorHandler.php
└── routes/
    └── api.php
```

## 🔗 INTEGRACIÓN CON FRONTEND

**Headers CORS**:

```php
// Permitir requests desde frontend React
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

**Formato de Respuesta Estándar**:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operación exitosa",
  "timestamp": "2025-07-31T10:00:00Z"
}
```

## 🎯 RESULTADO ESPERADO

Al final de esta sesión:

1. **API completa funcionando** - Todos los endpoints operativos
2. **Seguridad robusta** - JWT, validación, rate limiting
3. **Calidad asegurada** - Tests completos y documentación
4. **Lista para integración** - Frontend puede consumir APIs

**¡Tu expertise en PHP y arquitectura backend es fundamental para el éxito del proyecto!**

---

**Prioridad**: 🟡 ALTA  
**Estimación**: 5-7 horas  
**Dependencias**: UserRepository (completado)  
**Siguiente**: Integración con frontend React
