#!/bin/bash

# Deploy - Grupo Naser CMS
# Script para despliegue en producción

set -e

echo "🚀 Desplegando Grupo Naser CMS en producción..."

# Verificar que estemos en la rama correcta
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "production" ]; then
    echo "⚠️  Advertencia: No estás en la rama main o production (actual: $CURRENT_BRANCH)"
    read -p "¿Continuar? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Verificar que exista el archivo de configuración de producción
if [ ! -f .env.prod ]; then
    echo "❌ Error: Archivo .env.prod no encontrado."
    echo "Crea el archivo .env.prod con la configuración de producción."
    exit 1
fi

# Verificar que existan los secretos
if [ ! -d secrets ] || [ ! -f secrets/mysql_root_password.txt ] || [ ! -f secrets/mysql_password.txt ]; then
    echo "❌ Error: Archivos de secretos no encontrados."
    echo "Crea el directorio 'secrets' con los archivos necesarios."
    exit 1
fi

# Ejecutar tests antes del deploy
echo "🧪 Ejecutando tests antes del deploy..."
./scripts/test.sh

# Build de producción
echo "🔨 Construyendo imágenes de producción..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Backup de la base de datos si existe
if docker-compose -f docker-compose.prod.yml ps | grep -q "naser_db_prod.*Up"; then
    echo "💾 Creando backup de la base de datos..."
    BACKUP_FILE="backups/db_backup_$(date +%Y%m%d_%H%M%S).sql"
    mkdir -p backups
    docker exec naser_db_prod mysqldump -u root -p$(cat secrets/mysql_root_password.txt) naser_cms > $BACKUP_FILE
    echo "✅ Backup creado: $BACKUP_FILE"
fi

# Parar servicios de desarrollo si están corriendo
if docker-compose ps | grep -q "Up"; then
    echo "🛑 Parando servicios de desarrollo..."
    docker-compose down
fi

# Desplegar en producción
echo "🚀 Desplegando servicios de producción..."
docker-compose -f docker-compose.prod.yml up -d

# Esperar que los servicios estén listos
echo "⏳ Esperando que los servicios estén listos..."
sleep 30

# Verificar estado de los servicios
echo "📊 Verificando estado de los servicios..."
docker-compose -f docker-compose.prod.yml ps

# Health checks
echo "🏥 Ejecutando health checks..."
timeout 60 bash -c "
while ! curl -f http://localhost/api/v1/health >/dev/null 2>&1; do
    echo '⏳ Esperando backend...'
    sleep 5
done
"

if curl -f http://localhost >/dev/null 2>&1; then
    echo "✅ Frontend: OK"
else
    echo "❌ Frontend: FAIL"
fi

# Ejecutar migraciones de producción si existen
if [ -d "database/migrations" ] && [ "$(ls -A database/migrations)" ]; then
    echo "📊 Ejecutando migraciones de producción..."
    # docker exec naser_backend_prod php migrate.php --env=production
fi

echo ""
echo "✅ Despliegue completado!"
echo ""
echo "🌐 URLs de producción:"
echo "   Sitio web:           http://localhost"
echo "   API:                 http://localhost/api/v1"
echo ""
echo "📊 Comandos útiles:"
echo "   Ver logs:            docker-compose -f docker-compose.prod.yml logs -f"
echo "   Parar servicios:     docker-compose -f docker-compose.prod.yml down"
echo "   Reiniciar:           docker-compose -f docker-compose.prod.yml restart"
echo ""