#!/bin/bash

# Setup Test Environment - Grupo Naser CMS
# Configura el entorno específico para testing

set -e

echo "🔧 Configurando entorno de testing..."

# Verificar que Docker esté corriendo
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo."
    echo "Por favor inicia Docker Desktop primero."
    exit 1
fi

# Crear archivo .env.testing si no existe
if [ ! -f .env.testing ]; then
    echo "📝 Creando archivo .env.testing..."
    cat > .env.testing << 'EOF'
# Environment Configuration - Testing
APP_NAME="Grupo Naser CMS - Testing"
APP_ENV=testing
APP_DEBUG=true
APP_URL=http://localhost

# Database (Testing)
DB_HOST=database
DB_PORT=3306
DB_NAME=naser_cms_test
DB_USER=naser_user
DB_PASSWORD=naser_pass_2024

# JWT
JWT_SECRET=naser_jwt_secret_testing_2024
JWT_EXPIRE=3600

# CORS
CORS_ORIGIN=http://localhost:3000

# Cache (Testing)
CACHE_DRIVER=array
REDIS_HOST=redis
REDIS_PORT=6379

# Logging
LOG_LEVEL=error
LOG_MAX_FILES=1
EOF
fi

# Verificar que los contenedores estén corriendo
if ! docker-compose ps | grep -q "naser_backend.*Up"; then
    echo "⚠️  Backend container not running, starting development environment..."
    ./scripts/dev.sh
fi

# Verificar que el admin esté corriendo
if ! docker-compose ps | grep -q "naser_admin.*Up"; then
    echo "⚠️  Admin container not running, starting development environment..."
    ./scripts/dev.sh
fi

# Crear base de datos de testing si no existe
echo "🗄️  Configurando base de datos de testing..."
docker exec naser_db mysql -u root -pnaser_root_2024 -e "CREATE DATABASE IF NOT EXISTS naser_cms_test;" || true

# Instalar dependencias de testing si no están instaladas
echo "📦 Verificando dependencias de testing..."

# Backend testing dependencies
if ! docker exec naser_backend composer show | grep -q "phpunit/phpunit"; then
    echo "📦 Instalando PHPUnit..."
    docker exec naser_backend composer require --dev phpunit/phpunit
fi

# Frontend testing dependencies
if ! docker exec naser_frontend npm list --depth=0 | grep -q "@testing-library"; then
    echo "📦 Instalando dependencias de testing del frontend..."
    docker exec naser_frontend npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
fi

# Admin testing dependencies
if ! docker exec naser_admin npm list --depth=0 | grep -q "@testing-library"; then
    echo "📦 Instalando dependencias de testing del admin..."
    docker exec naser_admin npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
fi

# Crear directorio de reportes de testing
mkdir -p reports/testing
mkdir -p reports/coverage

echo "✅ Entorno de testing configurado correctamente!"