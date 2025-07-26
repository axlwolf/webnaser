# Solución: Configuración de PHPUnit en Docker

## 🚫 Problema Identificado

Gemini tiene un problema con la configuración de PHPUnit en Docker donde:

- El contenedor `naser_backend` solo monta `./api:/var/www/html`
- Los tests están en `./tests:/var/www/tests` (montaje separado)
- PHPUnit no puede resolver las rutas relativas entre `api/` y `tests/`
- El bootstrap.php no se encuentra correctamente

## ✅ Solución Completa

### 1. Modificar docker-compose.yml

Cambiar el montaje del contenedor backend para incluir todo el proyecto:

```yaml
# Backend PHP API
backend:
  build:
    context: ./api
    dockerfile: Dockerfile
    target: development
  container_name: naser_backend
  restart: unless-stopped
  ports:
    - "8000:80"
  volumes:
    # CAMBIO PRINCIPAL: Montar todo el proyecto
    - .:/var/www/project
    # Mantener el directorio de trabajo en /var/www/html para Apache
    - ./api:/var/www/html
    - ./api/docker/php.ini:/usr/local/etc/php/conf.d/99-app.ini
  environment:
    DB_HOST: database
    DB_PORT: 3306
    DB_NAME: naser_cms
    DB_USER: naser_user
    DB_PASSWORD: naser_pass_2024
    APP_ENV: development
    APP_DEBUG: true
    JWT_SECRET: naser_jwt_secret_development_2024
    CORS_ORIGIN: http://localhost:3000
  depends_on:
    - database
  networks:
    - naser_network
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost/api/v1/health"]
    interval: 30s
    timeout: 10s
    retries: 3
  # NUEVO: Establecer directorio de trabajo para comandos
  working_dir: /var/www/project
```

### 2. Crear nuevo phpunit.xml optimizado para Docker

Crear `api/phpunit-docker.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/9.5/phpunit.xsd"
         bootstrap="/var/www/project/tests/bootstrap.php"
         colors="true"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         processIsolation="false"
         stopOnFailure="false">
    <testsuites>
        <testsuite name="Unit">
            <directory suffix="Test.php">/var/www/project/tests/unit/backend</directory>
        </testsuite>
        <testsuite name="Integration">
            <directory suffix="Test.php">/var/www/project/tests/integration/api</directory>
            <directory suffix="Test.php">/var/www/project/tests/integration/database</directory>
        </testsuite>
    </testsuites>
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="DB_CONNECTION" value="sqlite"/>
        <env name="DB_DATABASE" value=":memory:"/>
    </php>
</phpunit>
```

### 3. Actualizar bootstrap.php para Docker

Modificar `tests/bootstrap.php`:

```php
<?php

/**
 * PHPUnit Bootstrap File
 *
 * This file is loaded before any tests are run.
 * It sets up the testing environment and loads necessary dependencies.
 */

// Detectar si estamos en Docker o desarrollo local
$isDocker = file_exists('/var/www/project');

if ($isDocker) {
    // Rutas para Docker
    define('PROJECT_ROOT', '/var/www/project');
    define('API_ROOT', '/var/www/project/api');
    define('TEST_ROOT', '/var/www/project/tests');
} else {
    // Rutas para desarrollo local
    define('TEST_ROOT', __DIR__);
    define('PROJECT_ROOT', dirname(__DIR__));
    define('API_ROOT', PROJECT_ROOT . '/api');
}

// Load Composer autoloader
require_once API_ROOT . '/vendor/autoload.php';

// Set timezone for consistent test results
date_default_timezone_set('America/Mexico_City');

// Set error reporting for tests
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set environment variables for testing
$_ENV['APP_ENV'] = 'testing';
$_ENV['DB_CONNECTION'] = 'sqlite';
$_ENV['DB_DATABASE'] = ':memory:';

// Disable output buffering for tests
if (ob_get_level()) {
    ob_end_clean();
}
```

### 4. Crear script de testing para Docker

Crear `scripts/test-docker.sh`:

```bash
#!/bin/bash

# Script para ejecutar tests en Docker
# Uso: ./scripts/test-docker.sh [opciones de phpunit]

echo "🧪 Ejecutando tests en contenedor Docker..."

# Verificar que el contenedor esté ejecutándose
if ! docker ps | grep -q naser_backend; then
    echo "❌ El contenedor naser_backend no está ejecutándose"
    echo "💡 Ejecuta: docker-compose up -d backend"
    exit 1
fi

# Ejecutar PHPUnit dentro del contenedor
docker exec -it naser_backend php /var/www/project/api/vendor/bin/phpunit \
    --configuration /var/www/project/api/phpunit-docker.xml \
    --testdox \
    "$@"

echo "✅ Tests completados"
```

### 5. Comandos para Gemini

Una vez implementados los cambios:

```bash
# 1. Reconstruir y reiniciar el contenedor
docker-compose down
docker-compose up -d backend

# 2. Verificar que el montaje funciona
docker exec -it naser_backend ls -la /var/www/project

# 3. Ejecutar tests
chmod +x scripts/test-docker.sh
./scripts/test-docker.sh

# O directamente:
docker exec -it naser_backend php /var/www/project/api/vendor/bin/phpunit \
    --configuration /var/www/project/api/phpunit-docker.xml \
    --testdox
```

## 🔧 Implementación Paso a Paso

### Paso 1: Actualizar docker-compose.yml

### Paso 2: Crear phpunit-docker.xml

### Paso 3: Actualizar bootstrap.php

### Paso 4: Crear script de testing

### Paso 5: Probar la configuración

## 🎯 Resultado Esperado

Después de implementar estos cambios:

- ✅ PHPUnit podrá encontrar bootstrap.php
- ✅ Los tests se ejecutarán correctamente en Docker
- ✅ Mantendrá compatibilidad con desarrollo local
- ✅ Rutas absolutas resolverán correctamente

## 🚨 Notas Importantes

1. **Backup**: Hacer backup de docker-compose.yml antes de cambios
2. **Reconstruir**: Necesario reconstruir contenedor después de cambios
3. **Verificar**: Probar tanto en Docker como en desarrollo local
4. **Permisos**: Asegurar que scripts tengan permisos de ejecución

Esta solución resuelve el problema manteniendo la flexibilidad para desarrollo local y Docker.
