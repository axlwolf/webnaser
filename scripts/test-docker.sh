#!/bin/bash

# Script para ejecutar pruebas PHPUnit en el contenedor Docker desde el host
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
echo -e "${BLUE}║${GREEN}         Grupo Naser CMS - Docker Test Runner              ${BLUE}║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker no está instalado o no está en el PATH.${NC}"
    exit 1
fi

# Verificar que el contenedor está en ejecución
if ! docker ps | grep -q naser_backend; then
    echo -e "${RED}Error: El contenedor naser_backend no está en ejecución.${NC}"
    echo -e "${YELLOW}Ejecute: docker-compose up -d backend${NC}"
    exit 1
fi

# Verificar que el script de pruebas existe en el contenedor
if ! docker exec naser_backend test -f /var/www/project/api/run-tests.sh; then
    echo -e "${YELLOW}Script de pruebas no encontrado en el contenedor. Copiando...${NC}"
    
    # Verificar que el script existe localmente
    if [ ! -f "api/run-tests.sh" ]; then
        echo -e "${RED}Error: Script api/run-tests.sh no encontrado localmente.${NC}"
        exit 1
    fi
    
    # Hacer ejecutable el script
    chmod +x api/run-tests.sh
    
    # Verificar que el contenedor tiene el directorio correcto
    if ! docker exec naser_backend test -d /var/www/project/api; then
        echo -e "${RED}Error: El directorio /var/www/project/api no existe en el contenedor.${NC}"
        echo -e "${YELLOW}Verifique la configuración de volúmenes en docker-compose.yml${NC}"
        exit 1
    fi
fi

echo -e "${BLUE}Ejecutando pruebas en el contenedor Docker...${NC}"
echo ""

# Ejecutar las pruebas dentro del contenedor
docker exec naser_backend bash -c "cd /var/www/project && api/run-tests.sh $*"

# Capturar el código de salida
EXIT_CODE=$?

echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✓ Pruebas ejecutadas correctamente en Docker.${NC}"
else
    echo -e "${RED}✗ Hubo problemas al ejecutar las pruebas. Revise los errores arriba.${NC}"
fi

echo ""
echo -e "${BLUE}Ejemplos de uso:${NC}"
echo -e "${YELLOW}./scripts/test-docker.sh                       # Ejecutar todas las pruebas${NC}"
echo -e "${YELLOW}./scripts/test-docker.sh --testsuite Unit      # Ejecutar solo pruebas unitarias${NC}"
echo -e "${YELLOW}./scripts/test-docker.sh --filter UserTest     # Ejecutar pruebas específicas${NC}"

exit $EXIT_CODE