#!/bin/bash

# Desarrollo - Grupo Naser CMS
# Script para iniciar el entorno de desarrollo

set -e

echo "🚀 Iniciando entorno de desarrollo Grupo Naser CMS..."

# Verificar que Docker esté corriendo
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo. Por favor inicia Docker Desktop."
    exit 1
fi

# Verificar que docker-compose esté disponible
if ! command -v docker-compose >/dev/null 2>&1; then
    echo "❌ Error: docker-compose no está instalado."
    exit 1
fi

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env desde .env.example..."
    cp .env.example .env
fi

# Crear directorios necesarios
echo "📁 Creando directorios necesarios..."
mkdir -p database/migrations
mkdir -p database/seeds
mkdir -p secrets
mkdir -p logs

# Iniciar servicios
echo "🐳 Iniciando contenedores Docker..."
docker-compose up -d --build

# Esperar que la base de datos esté lista
echo "⏳ Esperando que la base de datos esté lista..."
timeout 60 bash -c "
while ! docker exec naser_db mysqladmin ping -h localhost --silent; do
    echo '⏳ Esperando base de datos...'
    sleep 2
done
"

# Instalar dependencias del backend si es necesario
if [ ! -d "api/vendor" ]; then
    echo "📦 Instalando dependencias del backend..."
    docker exec naser_backend composer install
fi

# Ejecutar migraciones si existen
if [ -d "database/migrations" ] && [ "$(ls -A database/migrations)" ]; then
    echo "📊 Ejecutando migraciones de base de datos..."
    # docker exec naser_backend php migrate.php
fi

# Mostrar estado de los servicios
echo "📊 Estado de los servicios:"
docker-compose ps

echo ""
echo "✅ Entorno de desarrollo iniciado correctamente!"
echo ""
echo "🌐 URLs disponibles:"
echo "   Frontend (React):    http://localhost:3000"
echo "   Backend (PHP API):   http://localhost:8000"
echo "   Sitio completo:      http://localhost"
echo "   phpMyAdmin:          http://localhost:8080"
echo ""
echo "📊 Base de datos:"
echo "   Host: localhost:3306"
echo "   Usuario: naser_user"
echo "   Contraseña: naser_pass_2024"
echo "   Base de datos: naser_cms"
echo ""
echo "🔧 Comandos útiles:"
echo "   Ver logs:            docker-compose logs -f"
echo "   Parar servicios:     docker-compose down"
echo "   Reiniciar:           docker-compose restart"
echo "   Ejecutar tests:      ./scripts/test.sh"
echo ""