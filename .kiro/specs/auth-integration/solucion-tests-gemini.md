# Solución al Problema de Configuración de Pruebas para Gemini

## Análisis del Problema

Después de analizar los archivos de configuración, he identificado el problema principal:

1. El archivo `phpunit.xml` en la carpeta `api/` está configurado para buscar el archivo bootstrap en `../tests/bootstrap.php`
2. El contenedor Docker `naser_backend` tiene montado:
   - Todo el proyecto en `/var/www/project`
   - La carpeta `api/` en `/var/www/html` (directorio de trabajo de Apache)
3. El problema ocurre porque PHPUnit se ejecuta desde `/var/www/html` (api/), pero busca el bootstrap en `../tests/` que no existe en esa ruta dentro del contenedor

## Solución Propuesta

Hay varias formas de resolver este problema. Recomiendo la siguiente solución que requiere cambios mínimos:

### 1. Modificar el archivo phpunit.xml

Actualiza el archivo `api/phpunit.xml` para usar rutas absolutas basadas en el montaje del proyecto en el contenedor:

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
    <!-- Resto del archivo sin cambios -->
</phpunit>
```

### 2. Crear un script para ejecutar las pruebas

Crea un script en `api/run-tests.sh` para ejecutar PHPUnit desde el directorio correcto:

```bash
#!/bin/bash

# Script para ejecutar pruebas PHPUnit desde el directorio correcto
cd /var/www/project/api
./vendor/bin/phpunit "$@"
```

Haz el script ejecutable:

```bash
chmod +x api/run-tests.sh
```

### 3. Actualizar el archivo bootstrap.php

Asegúrate de que el archivo `tests/bootstrap.php` use rutas absolutas para el contenedor:

```php
<?php

/**
 * PHPUnit Bootstrap File
 */

// Load Composer autoloader
require_once '/var/www/project/api/vendor/autoload.php';

// Set timezone for consistent test results
date_default_timezone_set('America/Mexico_City');

// Set error reporting for tests
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define test constants
define('TEST_ROOT', '/var/www/project/tests');
define('PROJECT_ROOT', '/var/www/project');
define('API_ROOT', '/var/www/project/api');

// Set environment variables for testing
$_ENV['APP_ENV'] = 'testing';
$_ENV['DB_CONNECTION'] = 'sqlite';
$_ENV['DB_DATABASE'] = ':memory:';

// Disable output buffering for tests
if (ob_get_level()) {
    ob_end_clean();
}
```

## Cómo Ejecutar las Pruebas

Con estos cambios, puedes ejecutar las pruebas de la siguiente manera:

```bash
# Entrar al contenedor
docker exec -it naser_backend bash

# Ejecutar todas las pruebas
/var/www/project/api/run-tests.sh

# Ejecutar una suite específica
/var/www/project/api/run-tests.sh --testsuite Unit

# Ejecutar un archivo de prueba específico
/var/www/project/api/run-tests.sh /var/www/project/tests/unit/backend/ExampleTest.php
```

## Solución Alternativa: Modificar docker-compose.yml

Si prefieres una solución que no requiera cambiar los archivos de configuración de PHPUnit, puedes modificar el `docker-compose.yml` para cambiar el directorio de trabajo:

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
    # Montar todo el proyecto en la raíz
    - .:/var/www
    # Mantener API en directorio de trabajo de Apache
    - ./api:/var/www/html
    - ./api/docker/php.ini:/usr/local/etc/php/conf.d/99-app.ini
  working_dir: /var/www
  # Resto de la configuración sin cambios
```

Con esta configuración, las rutas relativas en `phpunit.xml` funcionarían correctamente.

## Recomendación Final

Recomiendo la primera solución (modificar phpunit.xml) porque:

1. Es menos invasiva y no requiere cambiar la estructura del proyecto
2. Es más explícita y menos propensa a errores
3. Funciona independientemente de dónde se ejecute PHPUnit dentro del contenedor

Si tienes alguna pregunta o necesitas más ayuda, no dudes en preguntar.

---

Kiro (Orquestador)
