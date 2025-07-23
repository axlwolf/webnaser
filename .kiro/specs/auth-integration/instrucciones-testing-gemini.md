# Instrucciones para Ejecutar Tests en Docker - Gemini

## Solución Implementada

He implementado una solución completa para el problema de ejecución de tests en Docker. La solución incluye:

1. **Configuración específica para Docker**: `api/phpunit-docker.xml` con rutas absolutas
2. **Script de ejecución dentro del contenedor**: `api/run-tests.sh`
3. **Script de ejecución desde el host**: `scripts/test-docker.sh`

Esta solución mantiene la compatibilidad con el desarrollo local y sigue los estándares de PHP establecidos para el proyecto.

## Cómo Ejecutar los Tests

### Método 1: Desde el Host (Recomendado)

Este método es el más sencillo y no requiere entrar al contenedor:

```bash
# Ejecutar todas las pruebas
./scripts/test-docker.sh

# Ejecutar solo pruebas unitarias
./scripts/test-docker.sh --testsuite Unit

# Ejecutar pruebas específicas
./scripts/test-docker.sh --filter UserTest
```

### Método 2: Dentro del Contenedor

Si necesitas más control o depurar dentro del contenedor:

```bash
# Entrar al contenedor
docker exec -it naser_backend bash

# Ejecutar todas las pruebas
/var/www/project/api/run-tests.sh

# Ejecutar solo pruebas unitarias
/var/www/project/api/run-tests.sh --testsuite Unit
```

## Cómo Funciona la Solución

1. **Montaje del Proyecto**: Todo el proyecto se monta en `/var/www/project` dentro del contenedor
2. **Rutas Absolutas**: La configuración de PHPUnit usa rutas absolutas para encontrar los archivos correctamente
3. **Scripts Inteligentes**: Los scripts verifican el entorno y proporcionan mensajes claros en caso de error

## Creación de Nuevos Tests

Al crear nuevos tests, asegúrate de:

1. Colocarlos en la carpeta correcta:

   - Tests unitarios: `tests/unit/backend/`
   - Tests de integración API: `tests/integration/api/`
   - Tests de integración DB: `tests/integration/database/`

2. Seguir la convención de nombres:

   - Nombre de clase: `NombreTest.php`
   - Nombre de métodos: `testNombreFuncionalidad()`

3. Extender la clase base correcta:

   ```php
   use PHPUnit\Framework\TestCase;

   class MiTest extends TestCase
   {
       // ...
   }
   ```

## Ejemplo de Test Unitario

```php
<?php

namespace Tests\Unit\Backend;

use PHPUnit\Framework\TestCase;
use App\Services\AuthService;

class AuthServiceTest extends TestCase
{
    public function testValidateCredentials()
    {
        $authService = new AuthService();
        $result = $authService->validateCredentials('admin@naser.com.mx', 'password_correcto');
        $this->assertTrue($result);
    }
}
```

## Solución de Problemas

### Error: "No se puede encontrar bootstrap.php"

Si sigues teniendo problemas con bootstrap.php:

1. Verifica que el archivo existe en `tests/bootstrap.php`
2. Asegúrate de que el contenedor tiene acceso a todo el proyecto
3. Ejecuta `docker-compose down && docker-compose up -d` para reconstruir el contenedor

### Error: "Class not found"

Si tienes errores de clases no encontradas:

1. Verifica que el autoloader está configurado correctamente en bootstrap.php
2. Asegúrate de que las clases siguen el estándar PSR-4
3. Ejecuta `composer dump-autoload` dentro del contenedor

### Error: "Cannot connect to database"

Para tests que requieren base de datos:

1. Verifica que estás usando SQLite en memoria para tests
2. Asegúrate de que las variables de entorno están configuradas correctamente
3. Verifica que tienes los permisos necesarios

## Notas Adicionales

- Los tests se ejecutan con la configuración de entorno `APP_ENV=testing`
- Se usa SQLite en memoria para tests de base de datos
- Los errores se muestran en formato legible con colores
- La cobertura de código está desactivada por defecto (se puede activar en phpunit-docker.xml)

Si tienes alguna pregunta o problema, no dudes en contactarme.

---

Kiro (Orquestador)
