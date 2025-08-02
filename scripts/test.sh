#!/bin/bash

# Testing - Grupo Naser CMS
# Script para ejecutar todos los tests

set -e

echo "🧪 Ejecutando tests Grupo Naser CMS..."

# Parse command line arguments
QUICK_MODE=false
BACKEND_ONLY=false
FRONTEND_ONLY=false
SKIP_SETUP=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --quick)
            QUICK_MODE=true
            shift
            ;;
        --backend-only)
            BACKEND_ONLY=true
            shift
            ;;
        --frontend-only)
            FRONTEND_ONLY=true
            shift
            ;;
        --skip-setup)
            SKIP_SETUP=true
            shift
            ;;
        *)
            echo "Uso: $0 [--quick] [--backend-only] [--frontend-only] [--skip-setup]"
            exit 1
            ;;
    esac
done

# Setup test environment first (unless skipped)
if [ "$SKIP_SETUP" = false ]; then
    echo "🔧 Configurando entorno de testing..."
    if [ -f "scripts/testing/setup-test-environment.sh" ]; then
        ./scripts/testing/setup-test-environment.sh
    else
        echo "⚠️  Test environment setup script not found, continuing..."
    fi
fi

# Verificar que Docker esté corriendo
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo."
    echo "Por favor inicia Docker Desktop y ejecuta: ./scripts/dev.sh"
    exit 1
fi

# Verificar que los contenedores estén corriendo
if ! docker-compose ps | grep -q "naser_backend.*Up"; then
    echo "❌ Error: El contenedor del backend no está corriendo."
    echo "Ejecuta: ./scripts/dev.sh"
    exit 1
fi

if ! docker-compose ps | grep -q "naser_frontend.*Up"; then
    echo "❌ Error: El contenedor del frontend no está corriendo."
    echo "Ejecuta: ./scripts/dev.sh"
    exit 1
fi

if ! docker-compose ps | grep -q "naser_admin.*Up"; then
    echo "❌ Error: El contenedor del admin no está corriendo."
    echo "Ejecuta: ./scripts/dev.sh"
    exit 1
fi

# Tests del backend (PHP)
if [ "$FRONTEND_ONLY" = false ]; then
    echo "🔧 Ejecutando tests del backend (PHP)..."
    docker exec naser_backend php -v
    docker exec naser_backend composer --version

    if [ -f "api/vendor/bin/phpunit" ]; then
        echo "📊 Ejecutando PHPUnit tests..."
        docker exec naser_backend ./vendor/bin/phpunit --testdox
    else
        echo "⚠️  PHPUnit no está instalado. Instalando dependencias..."
        docker exec naser_backend composer install --dev
        docker exec naser_backend ./vendor/bin/phpunit --testdox
    fi

    # PHP Code Style check
    if [ "$QUICK_MODE" = false ]; then
        echo "🎨 Verificando estilo de código PHP..."
        docker exec naser_backend composer cs || echo "⚠️  Code style issues found"
    fi
fi

# Tests del frontend (React)
if [ "$BACKEND_ONLY" = false ]; then
    echo "⚛️  Ejecutando tests del frontend (React)..."
    docker exec naser_frontend npm --version
    
    if [ "$QUICK_MODE" = true ]; then
        docker exec naser_frontend npm run test -- --watchAll=false --coverage=false
    else
        docker exec naser_frontend npm run test -- --watchAll=false --coverage
    fi

    # Frontend linting
    if [ "$QUICK_MODE" = false ]; then
        echo "🎨 Verificando estilo de código React..."
        docker exec naser_frontend npm run lint || echo "⚠️  Linting issues found"
    fi

    # Admin Dashboard tests
    echo "🛡️  Ejecutando tests del Admin Dashboard..."
    docker exec naser_admin npm --version
    
    if [ "$QUICK_MODE" = true ]; then
        docker exec naser_admin npm run test -- --watchAll=false --coverage=false
    else
        docker exec naser_admin npm run test -- --watchAll=false --coverage
    fi

    # Admin linting
    if [ "$QUICK_MODE" = false ]; then
        echo "🎨 Verificando estilo de código Admin..."
        docker exec naser_admin npm run lint || echo "⚠️  Admin linting issues found"
    fi
fi

# Health checks (unless in quick mode)
if [ "$QUICK_MODE" = false ]; then
    echo "🏥 Verificando endpoints de salud..."

    # Backend health check
    if curl -f http://localhost:8000/api/v1/health >/dev/null 2>&1; then
        echo "✅ Backend health check: OK"
    else
        echo "❌ Backend health check: FAIL"
    fi

    # Frontend health check
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
        echo "✅ Frontend health check: OK"
    else
        echo "❌ Frontend health check: FAIL"
    fi

    # Admin Dashboard health check
    if curl -f http://localhost:3001 >/dev/null 2>&1; then
        echo "✅ Admin Dashboard health check: OK"
    else
        echo "❌ Admin Dashboard health check: FAIL"
    fi

    # Database connection check
    echo "🗄️  Verificando conexión a base de datos..."
    if docker exec naser_db mysql -u naser_user -pnaser_pass_2024 -e "SELECT 1" naser_cms >/dev/null 2>&1; then
        echo "✅ Database connection: OK"
    else
        echo "❌ Database connection: FAIL"
    fi
fi

# Generate test report
echo "📊 Generando reporte de tests..."
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_DIR="reports/testing"
mkdir -p "$REPORT_DIR"

cat > "$REPORT_DIR/test-report-$TIMESTAMP.md" << EOF
# Test Report - $(date)

## Configuration
- Quick Mode: $QUICK_MODE
- Backend Only: $BACKEND_ONLY  
- Frontend Only: $FRONTEND_ONLY
- Skip Setup: $SKIP_SETUP

## Results
- Backend Tests: $([ "$FRONTEND_ONLY" = false ] && echo "✅ Executed" || echo "⏭️  Skipped")
- Frontend Tests: $([ "$BACKEND_ONLY" = false ] && echo "✅ Executed" || echo "⏭️  Skipped")
- Health Checks: $([ "$QUICK_MODE" = false ] && echo "✅ Executed" || echo "⏭️  Skipped")

## Docker Containers Status
$(docker-compose ps)

EOF

echo ""
echo "✅ Tests completados!"
echo "📊 Reporte guardado en: $REPORT_DIR/test-report-$TIMESTAMP.md"
echo ""
echo "🔧 Comandos útiles:"
echo "   Tests rápidos:       ./scripts/test.sh --quick"
echo "   Solo backend:        ./scripts/test.sh --backend-only"
echo "   Solo frontend:       ./scripts/test.sh --frontend-only"
echo "   Ver logs:            docker-compose logs -f"
echo ""