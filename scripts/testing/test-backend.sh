#!/bin/bash

# Script específico para testing de Backend PHP
# Ejecuta PHPUnit con configuración optimizada

set -e

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

log() {
    echo -e "${GREEN}[BACKEND-TEST] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

main() {
    log "🧪 Iniciando tests de Backend PHP..."

    cd "$PROJECT_ROOT/api"

    # Verificar dependencias
    if [ ! -f "vendor/bin/phpunit" ]; then
        warning "PHPUnit no encontrado, instalando dependencias..."
        composer install --no-interaction --prefer-dist
    fi

    # Verificar configuración de PHPUnit
    local phpunit_config="phpunit.xml"
    if [ ! -f "$phpunit_config" ]; then
        error "Configuración de PHPUnit no encontrada: $phpunit_config"
        exit 1
    fi

    # Crear directorio de reportes
    mkdir -p "$PROJECT_ROOT/reports/backend"

    # Ejecutar tests con cobertura
    log "Ejecutando PHPUnit con cobertura..."
    
    if ./vendor/bin/phpunit \
        --configuration "$phpunit_config" \
        --coverage-html "$PROJECT_ROOT/reports/backend/coverage" \
        --coverage-clover "$PROJECT_ROOT/reports/backend/coverage.xml" \
        --log-junit "$PROJECT_ROOT/reports/backend/junit.xml" \
        --testdox \
        --colors=always; then
        
        log "✅ Tests de backend completados exitosamente"
        
        # Mostrar resumen de cobertura si existe
        if [ -f "$PROJECT_ROOT/reports/backend/coverage.xml" ]; then
            log "📊 Reporte de cobertura generado en reports/backend/coverage/"
        fi
        
        exit 0
    else
        error "❌ Tests de backend fallaron"
        exit 1
    fi
}

main "$@"