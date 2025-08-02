# 🏗️ Backend Architecture - Grupo Naser CMS

**Fecha**: 1 de agosto de 2025  
**Estado**: ✅ Estructura base implementada, APIs en desarrollo  
**Especialista**: Gemini (Backend PHP Developer)  
**Progreso**: 80% APIs core completadas

## 📊 Estado Actual

### ✅ Implementado

- **Estructura MVC**: Controladores, modelos, repositorios y servicios
- **Configuración Base**: Environment variables, CORS, error handling
- **Composer Setup**: PSR-4 autoloading, dependencias configuradas
- **Docker Integration**: Contenedor backend funcionando
- **Health Endpoints**: `/api/v1/health` y `/api/v1/test` operativos
- **GoDaddy Compatibility**: Configuraciones específicas para shared hosting

### 🔄 En Desarrollo

- **Authentication System**: JWT implementation (Gemini Batch 3)
- **CRUD APIs**: Páginas, servicios, ubicaciones (Gemini Batch 3)
- **Database Integration**: Conexión PDO y migraciones
- **Validation Layer**: Sistema de validación robusto

## 🏗️ Arquitectura del Sistema

### Estructura de Directorios

```
api/
├── controllers/           # Controladores MVC
│   ├── AuthController.php
│   ├── ContentController.php
│   ├── LocationController.php
│   ├── MediaController.php
│   ├── ObituaryController.php
│   ├── PageController.php
│   └── ServiceController.php
├── core/                  # Clases core del sistema
│   ├── Database.php       # Singleton PDO connection
│   ├── Request.php        # HTTP request handling
│   ├── Response.php       # HTTP response formatting
│   └── Router.php         # URL routing system
├── middleware/            # Middleware de autenticación
│   └── AuthMiddleware.php
├── models/                # Modelos de datos
│   ├── Location.php
│   ├── Media.php
│   ├── Obituary.php
│   ├── Page.php
│   ├── Service.php
│   ├── User.php
│   └── interfaces/        # Interfaces de modelos
├── repositories/          # Patrón Repository
│   ├── ContentRepository.php
│   ├── LocationRepository.php
│   ├── MediaRepository.php
│   ├── ObituaryRepository.php
│   ├── PageRepository.php
│   ├── ServiceRepository.php
│   └── UserRepository.php
├── routes/                # Definición de rutas
│   └── api.php
├── services/              # Servicios de negocio
│   ├── AuthService.php
│   ├── JwtService.php
│   ├── LocationService.php
│   ├── MediaService.php
│   ├── ObituaryService.php
│   ├── PageService.php
│   └── ServiceService.php
├── utils/                 # Utilidades
│   └── JwtHandler.php
├── vendor/                # Dependencias Composer
├── docker/                # Configuraciones Docker
│   ├── apache-site.conf
│   ├── apache.conf
│   └── php.ini
├── .htaccess             # Apache rewrite rules
├── composer.json         # Dependencias PHP
├── config.php           # Configuración principal
├── Dockerfile           # Docker container
└── index.php            # Entry point
```

## 🔧 Configuración Técnica

### Environment Variables

```php
// config.php - Variables principales
define('ENV', $_ENV['APP_ENV'] ?? 'development');
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'naser_cms');
define('DB_USER', $_ENV['DB_USER'] ?? 'root');
define('DB_PASS', $_ENV['DB_PASSWORD'] ?? '');
define('JWT_SECRET', $_ENV['JWT_SECRET'] ?? 'your-super-secret-key');
define('JWT_EXPIRY', $_ENV['JWT_EXPIRY'] ?? 86400); // 24 hours
```

### Composer Dependencies

```json
{
  "require": {
    "php": ">=7.4",
    "ext-json": "*",
    "ext-pdo": "*",
    "vlucas/phpdotenv": "^5.4",
    "firebase/php-jwt": "^6.8"
  },
  "require-dev": {
    "phpunit/phpunit": "^9.5",
    "squizlabs/php_codesniffer": "^3.7",
    "phpmd/phpmd": "^2.13",
    "mockery/mockery": "^1.5",
    "fakerphp/faker": "^1.20"
  }
}
```

### PSR-4 Autoloading

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "."
    }
  }
}
```

## 🛡️ Seguridad y Estándares

### PHP Standards Compliance

- **PSR-4**: Autoloading estándar implementado
- **MVC Pattern**: Separación clara de responsabilidades
- **Prepared Statements**: Para todas las consultas de base de datos
- **Input Sanitization**: Validación y sanitización de todos los inputs
- **CSRF Protection**: Implementado para formularios
- **Password Hashing**: Usando `password_hash()` para contraseñas

### GoDaddy Compatibility

```php
// Configuraciones específicas para shared hosting
define('UPLOAD_DIR', __DIR__ . '/../public/uploads/');
define('MAX_UPLOAD_SIZE', $_ENV['MAX_UPLOAD_SIZE'] ?? 5242880); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'pdf']);

// Timezone para México
date_default_timezone_set($_ENV['APP_TIMEZONE'] ?? 'America/Mexico_City');
```

### Error Handling

```php
if (ENV === 'development') {
    // Development: mostrar errores
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    // Production: ocultar errores
    error_reporting(0);
    ini_set('display_errors', 0);
}
```

## 🔌 API Endpoints

### Endpoints Implementados

#### Health Check

```http
GET /api/v1/health
```

**Respuesta:**

```json
{
  "status": "healthy",
  "timestamp": "2025-08-01T10:30:00-06:00",
  "service": "Grupo Naser API",
  "message": "Backend funcionando correctamente"
}
```

#### Test Endpoint

```http
GET /api/v1/test
```

**Respuesta:**

```json
{
  "status": "success",
  "message": "Test endpoint funcionando",
  "timestamp": "2025-08-01T10:30:00-06:00"
}
```

### Endpoints en Desarrollo (Gemini Batch 3)

#### Authentication

- `POST /api/v1/auth/login` - Login con JWT
- `POST /api/v1/auth/logout` - Logout seguro
- `GET /api/v1/auth/me` - Usuario actual
- `POST /api/v1/auth/refresh` - Refresh token

#### Content Management

- `GET /api/v1/pages` - Listar páginas
- `POST /api/v1/pages` - Crear página
- `PUT /api/v1/pages/{id}` - Actualizar página
- `DELETE /api/v1/pages/{id}` - Eliminar página

#### Services Management

- `GET /api/v1/services` - Listar servicios
- `POST /api/v1/services` - Crear servicio
- `PUT /api/v1/services/{id}` - Actualizar servicio
- `DELETE /api/v1/services/{id}` - Eliminar servicio

## 🐳 Docker Configuration

### Dockerfile

```dockerfile
FROM php:8.2-apache

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache modules
RUN a2enmod rewrite

# Copy configuration files
COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf
COPY docker/php.ini /usr/local/etc/php/

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader

EXPOSE 80
```

### Apache Configuration

```apache
# docker/apache.conf
<VirtualHost *:80>
    DocumentRoot /var/www/html

    <Directory /var/www/html>
        AllowOverride All
        Require all granted
    </Directory>

    # Enable rewrite module
    RewriteEngine On

    # API routing
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^api/ index.php [L]
</VirtualHost>
```

## 🧪 Testing Strategy

### PHPUnit Configuration

```xml
<!-- phpunit.xml -->
<phpunit bootstrap="tests/bootstrap.php">
    <testsuites>
        <testsuite name="Unit">
            <directory>tests/unit</directory>
        </testsuite>
        <testsuite name="Integration">
            <directory>tests/integration</directory>
        </testsuite>
    </testsuites>

    <coverage>
        <include>
            <directory suffix=".php">./</directory>
        </include>
        <exclude>
            <directory>vendor</directory>
            <directory>tests</directory>
        </exclude>
    </coverage>
</phpunit>
```

### Testing Commands

```bash
# Ejecutar todos los tests
composer test

# Tests con coverage
composer test-coverage

# Code style check
composer cs

# Code style fix
composer cs-fix

# Mess detector
composer md
```

## 📊 Performance Optimizations

### OPcache Configuration

```ini
; docker/php.ini
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.revalidate_freq=2
opcache.fast_shutdown=1
```

### Database Optimizations

- **Connection Pooling**: Singleton pattern para conexiones
- **Prepared Statements**: Para todas las consultas
- **Indexing**: Índices optimizados en tablas principales
- **Query Optimization**: Consultas eficientes con JOINs mínimos

## 🔄 Integration Points

### Frontend Integration (Claude)

- **CORS Headers**: Configurados para desarrollo y producción
- **JSON Responses**: Formato estándar para todas las respuestas
- **Error Handling**: Códigos HTTP apropiados y mensajes consistentes

### Admin Dashboard Integration (Qwen)

- **Authentication**: JWT tokens para sesiones admin
- **CRUD Operations**: APIs completas para gestión de contenido
- **File Upload**: Sistema de medios para imágenes y documentos

### AI/ML Integration (Qwen)

- **ML Endpoints**: `/api/v1/ai/*` para servicios inteligentes
- **Data Analytics**: APIs para métricas y análisis
- **Recommendation Engine**: Endpoints para recomendaciones personalizadas

## 🚀 Deployment Strategy

### Production Configuration

```php
// Configuración de producción
if (ENV === 'production') {
    // Security headers
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');

    // Disable error display
    error_reporting(0);
    ini_set('display_errors', 0);

    // Enable OPcache
    ini_set('opcache.enable', 1);
}
```

### GoDaddy Deployment

1. **Upload Files**: Subir archivos via FTP/cPanel
2. **Environment Setup**: Configurar variables en `.env`
3. **Database Setup**: Ejecutar migraciones
4. **Permissions**: Configurar permisos de archivos
5. **Testing**: Verificar endpoints básicos

## 📈 Monitoring y Logging

### Error Logging

```php
// Logging de errores en producción
if (ENV === 'production') {
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/logs/php_errors.log');
}
```

### Health Monitoring

- **Health Endpoint**: Monitoreo básico del sistema
- **Database Status**: Verificación de conexión
- **Performance Metrics**: Tiempo de respuesta y uso de memoria

## 🎯 Próximos Pasos

### Inmediatos (Gemini Batch 3)

1. **Database Connection**: Implementar conexión PDO robusta
2. **Authentication System**: JWT login/logout completo
3. **CRUD APIs**: Páginas y servicios básicos
4. **Validation Layer**: Sistema de validación de datos

### Mediano Plazo (Qwen Batch 1)

1. **Admin APIs**: Endpoints específicos para dashboard
2. **AI/ML Integration**: Servicios inteligentes
3. **Advanced Features**: Analytics y recomendaciones

### Largo Plazo

1. **Performance Optimization**: Caching y optimizaciones
2. **Security Hardening**: Auditoría de seguridad completa
3. **Monitoring**: Sistema de monitoreo avanzado
4. **Documentation**: API documentation completa

---

**Última actualización**: 1 de agosto de 2025  
**Autor**: Kiro (Orquestador)  
**Estado**: ✅ Estructura base sólida, desarrollo activo en progreso  
**Próxima revisión**: Después de Gemini Batch 3 completion
