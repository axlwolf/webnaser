#!/bin/bash

# Script para ejecutar pruebas PHPUnit en el entorno Docker
# Compatible con los estándares de desarrollo de Grupo Naser CMS

# Colores para mejor legibilidad
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║${GREEN}             Grupo Naser CMS - Test Runner                 ${BLUE}║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar que estamos en el contenedor Docker
if [ ! -d "/var/www/project" ]; then
    echo -e "${RED}Error: Este script debe ejecutarse dentro del contenedor Docker.${NC}"
    echo -e "${YELLOW}Ejecute: docker exec -it naser_backend bash${NC}"
    echo -e "${YELLOW}Y luego: /var/www/project/api/run-tests.sh${NC}"
    exit 1
fi

# Establecer directorio de trabajo
cd /var/www/project/api

# Verificar que PHPUnit está instalado
if [ ! -f "./vendor/bin/phpunit" ]; then
    echo -e "${YELLOW}PHPUnit no encontrado. Instalando dependencias...${NC}"
    composer install --dev
fi

# Verificar que el archivo de configuración existe
if [ ! -f "/var/www/project/api/phpunit-docker.xml" ]; then
    echo -e "${RED}Error: Archivo de configuración phpunit-docker.xml no encontrado.${NC}"
    exit 1
fi

# Verificar que bootstrap.php existe
if [ ! -f "/var/www/project/tests/bootstrap.php" ]; then
    echo -e "${RED}Error: Archivo bootstrap.php no encontrado.${NC}"
    exit 1
fi

# Configurar variables de entorno para pruebas
export APP_ENV=testing
export DB_CONNECTION=sqlite
export DB_DATABASE=":memory:"

echo -e "${BLUE}Ejecutando pruebas con PHPUnit...${NC}"
echo -e "${YELLOW}Configuración: /var/www/project/api/phpunit-docker.xml${NC}"
echo ""

# Ejecutar PHPUnit con la configuración específica para Docker
./vendor/bin/phpunit --configuration /var/www/project/api/phpunit-docker.xml "$@"

# Capturar el código de salida
EXIT_CODE=$?

echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✓ Todas las pruebas pasaron correctamente.${NC}"
else
    echo -e "${RED}✗ Algunas pruebas fallaron. Revise los errores arriba.${NC}"
fi

# Mostrar información de cobertura si está habilitada
if [ -d "/var/www/project/tests/coverage" ]; then
    echo -e "${BLUE}Informe de cobertura disponible en: /var/www/project/tests/coverage${NC}"
fi

echo ""
echo -e "${BLUE}Para ejecutar pruebas específicas:${NC}"
echo -e "${YELLOW}/var/www/project/api/run-tests.sh --testsuite Unit${NC}"
echo -e "${YELLOW}/var/www/project/api/run-tests.sh --filter NombreDelTest${NC}"

exit $EXIT_CODE