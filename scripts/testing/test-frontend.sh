#!/bin/bash

# Script específico para testing de Frontend React
# Ejecuta Jest con React Testing Library

set -e

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

log() {
    echo -e "${GREEN}[FRONTEND-TEST] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

main() {
    log "🎨 Iniciando tests de Frontend React..."

    cd "$PROJECT_ROOT/src/frontend"

    # Verificar package.json
    if [ ! -f "package.json" ]; then
        error "package.json no encontrado en src/frontend"
        exit 1
    fi

    # Verificar node_modules
    if [ ! -d "node_modules" ]; then
        warning "node_modules no encontrado, instalando dependencias..."
        npm install
    fi

    # Crear directorio de reportes
    mkdir -p "$PROJECT_ROOT/reports/frontend"

    # Ejecutar tests con cobertura
    log "Ejecutando Jest con cobertura..."
    
    if npm test -- \
        --coverage \
        --watchAll=false \
        --reporters=default \
        --reporters=jest-junit \
        --coverageReporters=html \
        --coverageReporters=lcov \
        --coverageReporters=text-summary \
        --coverageDirectory="$PROJECT_ROOT/reports/frontend/coverage" \
        --collectCoverageFrom="src/**/*.{js,jsx,ts,tsx}" \
        --collectCoverageFrom="!src/**/*.d.ts" \
        --collectCoverageFrom="!src/index.tsx" \
        --collectCoverageFrom="!src/reportWebVitals.ts" \
        --testResultsProcessor="jest-junit" \
        --verbose; then
        
        log "✅ Tests de frontend completados exitosamente"
        
        # Mostrar resumen de cobertura
        if [ -f "$PROJECT_ROOT/reports/frontend/coverage/lcov-report/index.html" ]; then
            log "📊 Reporte de cobertura generado en reports/frontend/coverage/"
        fi
        
        cd "$PROJECT_ROOT"
        exit 0
    else
        error "❌ Tests de frontend fallaron"
        cd "$PROJECT_ROOT"
        exit 1
    fi
}

main "$@"