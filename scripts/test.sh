#!/bin/bash

# Testing - Grupo Naser CMS
# Script para ejecutar todos los tests

set -e

echo "🧪 Ejecutando tests Grupo Naser CMS..."

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

# Tests del backend (PHP)
echo "🔧 Ejecutando tests del backend (PHP)..."
docker exec naser_backend php -v
docker exec naser_backend composer --version

if [ -f "api/vendor/bin/phpunit" ]; then
    docker exec naser_backend ./vendor/bin/phpunit
else
    echo "⚠️  PHPUnit no está instalado. Instalando dependencias..."
    docker exec naser_backend composer install --dev
    docker exec naser_backend ./vendor/bin/phpunit
fi

# Tests del frontend (React)
echo "⚛️  Ejecutando tests del frontend (React)..."
docker exec naser_frontend npm --version
docker exec naser_frontend npm run test

# Verificar endpoints de salud
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

# Database connection check
echo "🗄️  Verificando conexión a base de datos..."
if docker exec naser_db mysql -u naser_user -pnaser_pass_2024 -e "SELECT 1" naser_cms >/dev/null 2>&1; then
    echo "✅ Database connection: OK"
else
    echo "❌ Database connection: FAIL"
fi

echo ""
echo "✅ Tests completados!"
echo ""