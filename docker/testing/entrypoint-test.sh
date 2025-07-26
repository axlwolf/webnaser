#!/bin/bash

# Script de entrada para contenedor de testing
# Prepara el entorno y ejecuta los tests

set -e

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🧪 Iniciando contenedor de testing...${NC}"

# Verificar que estamos en el directorio correcto
if [ ! -f "api/composer.json" ]; then
    echo -e "${YELLOW}⚠️ Directorio de proyecto no encontrado, ajustando...${NC}"
    cd /var/www/project
fi

# Verificar dependencias de Composer
if [ ! -d "api/vendor" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias de Composer...${NC}"
    cd api && composer install --no-interaction --prefer-dist
    cd ..
fi

# Verificar configuración de PHPUnit
if [ ! -f "api/phpunit.xml" ]; then
    echo -e "${YELLOW}⚠️ Configuración de PHPUnit no encontrada${NC}"
    if [ -f "api/phpunit.xml.dist" ]; then
        echo -e "${BLUE}📋 Copiando configuración por defecto...${NC}"
        cp api/phpunit.xml.dist api/phpunit.xml
    fi
fi

# Crear directorios de reportes si no existen
mkdir -p reports/backend
mkdir -p reports/frontend
mkdir -p reports/integration

# Verificar conectividad de base de datos si está configurada
if [ -n "$DB_HOST" ]; then
    echo -e "${BLUE}🔍 Verificando conectividad de base de datos...${NC}"
    
    # Esperar a que la base de datos esté disponible
    timeout=30
    while ! mysqladmin ping -h"$DB_HOST" -P"${DB_PORT:-3306}" -u"${DB_USERNAME:-root}" -p"${DB_PASSWORD:-}" --silent 2>/dev/null; do
        timeout=$((timeout - 1))
        if [ $timeout -eq 0 ]; then
            echo -e "${YELLOW}⚠️ Base de datos no disponible, continuando sin ella...${NC}"
            break
        fi
        echo -e "${BLUE}⏳ Esperando base de datos... ($timeout)${NC}"
        sleep 1
    done
    
    if [ $timeout -gt 0 ]; then
        echo -e "${GREEN}✅ Base de datos conectada${NC}"
    fi
fi

# Mostrar información del entorno
echo -e "${BLUE}📋 Información del entorno de testing:${NC}"
echo "  - PHP Version: $(php -v | head -n1)"
echo "  - Composer Version: $(composer --version)"
echo "  - Xdebug: $(php -m | grep -i xdebug || echo 'No instalado')"
echo "  - Working Directory: $(pwd)"
echo "  - User: $(whoami)"

# Ejecutar comando pasado como parámetro
echo -e "${GREEN}🚀 Ejecutando: $@${NC}"
exec "$@"