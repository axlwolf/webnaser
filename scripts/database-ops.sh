#!/bin/bash

# Database Operations - Grupo Naser CMS
# Gestión completa de operaciones de base de datos

set -e

echo "🗄️  Database Operations - Grupo Naser CMS"

# Parse arguments
OPERATION=""
BACKUP_NAME=""
RESTORE_FILE=""
MIGRATION_FILE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        backup)
            OPERATION="backup"
            BACKUP_NAME="$2"
            shift 2
            ;;
        restore)
            OPERATION="restore"
            RESTORE_FILE="$2"
            shift 2
            ;;
        migrate)
            OPERATION="migrate"
            MIGRATION_FILE="$2"
            shift 2
            ;;
        status)
            OPERATION="status"
            shift
            ;;
        optimize)
            OPERATION="optimize"
            shift
            ;;
        reset)
            OPERATION="reset"
            shift
            ;;
        *)
            echo "Uso: $0 {backup|restore|migrate|status|optimize|reset} [argumentos]"
            echo ""
            echo "Operaciones disponibles:"
            echo "  backup [nombre]     - Crear backup de la base de datos"
            echo "  restore [archivo]   - Restaurar desde backup"
            echo "  migrate [archivo]   - Ejecutar migración específica"
            echo "  status             - Mostrar estado de la base de datos"
            echo "  optimize           - Optimizar tablas de la base de datos"
            echo "  reset              - Resetear base de datos (¡PELIGROSO!)"
            exit 1
            ;;
    esac
done

# Verificar que Docker esté corriendo
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo."
    exit 1
fi

# Verificar que el contenedor de base de datos esté corriendo
if ! docker-compose ps | grep -q "naser_db.*Up"; then
    echo "❌ Error: El contenedor de base de datos no está corriendo."
    echo "Ejecuta: ./scripts/dev.sh"
    exit 1
fi

# Crear directorio de backups
mkdir -p backups/database

# Función para crear backup
create_backup() {
    local backup_name="${BACKUP_NAME:-backup-$(date +%Y%m%d_%H%M%S)}"
    local backup_file="backups/database/${backup_name}.sql"
    
    echo "💾 Creando backup: $backup_file"
    
    docker exec naser_db mysqldump \
        -u naser_user \
        -pnaser_pass_2024 \
        --single-transaction \
        --routines \
        --triggers \
        naser_cms > "$backup_file"
    
    # Comprimir backup
    gzip "$backup_file"
    
    echo "✅ Backup creado: ${backup_file}.gz"
    echo "📊 Tamaño: $(ls -lh "${backup_file}.gz" | awk '{print $5}')"
}

# Función para restaurar backup
restore_backup() {
    if [ -z "$RESTORE_FILE" ]; then
        echo "❌ Error: Especifica el archivo de backup a restaurar"
        exit 1
    fi
    
    if [ ! -f "$RESTORE_FILE" ]; then
        echo "❌ Error: Archivo de backup no encontrado: $RESTORE_FILE"
        exit 1
    fi
    
    echo "⚠️  ADVERTENCIA: Esta operación sobrescribirá la base de datos actual"
    read -p "¿Continuar? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Operación cancelada"
        exit 1
    fi
    
    echo "🔄 Restaurando desde: $RESTORE_FILE"
    
    # Descomprimir si es necesario
    if [[ "$RESTORE_FILE" == *.gz ]]; then
        gunzip -c "$RESTORE_FILE" | docker exec -i naser_db mysql \
            -u naser_user \
            -pnaser_pass_2024 \
            naser_cms
    else
        docker exec -i naser_db mysql \
            -u naser_user \
            -pnaser_pass_2024 \
            naser_cms < "$RESTORE_FILE"
    fi
    
    echo "✅ Base de datos restaurada exitosamente"
}

# Función para ejecutar migraciones
run_migration() {
    if [ -n "$MIGRATION_FILE" ]; then
        if [ ! -f "$MIGRATION_FILE" ]; then
            echo "❌ Error: Archivo de migración no encontrado: $MIGRATION_FILE"
            exit 1
        fi
        
        echo "🔄 Ejecutando migración: $MIGRATION_FILE"
        docker exec -i naser_db mysql \
            -u naser_user \
            -pnaser_pass_2024 \
            naser_cms < "$MIGRATION_FILE"
        
        echo "✅ Migración ejecutada exitosamente"
    else
        echo "🔄 Ejecutando todas las migraciones..."
        
        for migration in database/migrations/*.sql; do
            if [ -f "$migration" ]; then
                echo "   Ejecutando: $(basename "$migration")"
                docker exec -i naser_db mysql \
                    -u naser_user \
                    -pnaser_pass_2024 \
                    naser_cms < "$migration"
            fi
        done
        
        echo "✅ Todas las migraciones ejecutadas"
    fi
}

# Función para mostrar estado
show_status() {
    echo "📊 Estado de la base de datos:"
    echo ""
    
    # Información de conexión
    echo "🔗 Información de conexión:"
    docker exec naser_db mysql \
        -u naser_user \
        -pnaser_pass_2024 \
        -e "SELECT VERSION() as 'MySQL Version', DATABASE() as 'Current Database', USER() as 'Current User';" \
        naser_cms
    
    echo ""
    
    # Tablas existentes
    echo "📋 Tablas existentes:"
    docker exec naser_db mysql \
        -u naser_user \
        -pnaser_pass_2024 \
        -e "SHOW TABLES;" \
        naser_cms
    
    echo ""
    
    # Tamaño de la base de datos
    echo "💾 Tamaño de la base de datos:"
    docker exec naser_db mysql \
        -u naser_user \
        -pnaser_pass_2024 \
        -e "SELECT 
            table_schema as 'Database',
            ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) as 'Size (MB)'
        FROM information_schema.tables 
        WHERE table_schema = 'naser_cms'
        GROUP BY table_schema;" \
        naser_cms
    
    echo ""
    
    # Estadísticas de tablas
    echo "📈 Estadísticas de tablas:"
    docker exec naser_db mysql \
        -u naser_user \
        -pnaser_pass_2024 \
        -e "SELECT 
            table_name as 'Table',
            table_rows as 'Rows',
            ROUND(((data_length + index_length) / 1024 / 1024), 2) as 'Size (MB)'
        FROM information_schema.tables 
        WHERE table_schema = 'naser_cms'
        ORDER BY (data_length + index_length) DESC;" \
        naser_cms
}

# Función para optimizar base de datos
optimize_database() {
    echo "⚡ Optimizando base de datos..."
    
    # Obtener lista de tablas
    tables=$(docker exec naser_db mysql \
        -u naser_user \
        -pnaser_pass_2024 \
        -e "SHOW TABLES;" \
        naser_cms | tail -n +2)
    
    # Optimizar cada tabla
    for table in $tables; do
        echo "   Optimizando tabla: $table"
        docker exec naser_db mysql \
            -u naser_user \
            -pnaser_pass_2024 \
            -e "OPTIMIZE TABLE $table;" \
            naser_cms >/dev/null
    done
    
    # Analizar tablas
    echo "📊 Analizando tablas..."
    for table in $tables; do
        docker exec naser_db mysql \
            -u naser_user \
            -pnaser_pass_2024 \
            -e "ANALYZE TABLE $table;" \
            naser_cms >/dev/null
    done
    
    echo "✅ Optimización completada"
}

# Función para resetear base de datos
reset_database() {
    echo "⚠️  ADVERTENCIA: Esta operación eliminará TODOS los datos"
    echo "Esta acción NO se puede deshacer"
    read -p "Escribe 'RESET' para confirmar: " -r
    
    if [ "$REPLY" != "RESET" ]; then
        echo "Operación cancelada"
        exit 1
    fi
    
    echo "🗑️  Eliminando todas las tablas..."
    
    # Obtener lista de tablas
    tables=$(docker exec naser_db mysql \
        -u naser_user \
        -pnaser_pass_2024 \
        -e "SHOW TABLES;" \
        naser_cms 2>/dev/null | tail -n +2 || echo "")
    
    # Desactivar foreign key checks
    docker exec naser_db mysql \
        -u naser_user \
        -pnaser_pass_2024 \
        -e "SET FOREIGN_KEY_CHECKS = 0;" \
        naser_cms
    
    # Eliminar cada tabla
    for table in $tables; do
        echo "   Eliminando tabla: $table"
        docker exec naser_db mysql \
            -u naser_user \
            -pnaser_pass_2024 \
            -e "DROP TABLE IF EXISTS $table;" \
            naser_cms
    done
    
    # Reactivar foreign key checks
    docker exec naser_db mysql \
        -u naser_user \
        -pnaser_pass_2024 \
        -e "SET FOREIGN_KEY_CHECKS = 1;" \
        naser_cms
    
    echo "✅ Base de datos reseteada"
    echo "🔄 Ejecuta las migraciones para recrear las tablas:"
    echo "   $0 migrate"
}

# Ejecutar operación solicitada
case $OPERATION in
    backup)
        create_backup
        ;;
    restore)
        restore_backup
        ;;
    migrate)
        run_migration
        ;;
    status)
        show_status
        ;;
    optimize)
        optimize_database
        ;;
    reset)
        reset_database
        ;;
    *)
        echo "❌ Error: Operación no especificada"
        exit 1
        ;;
esac

echo ""
echo "🔧 Comandos útiles:"
echo "   Ver logs de DB:      docker-compose logs database"
echo "   Conectar a MySQL:    docker exec -it naser_db mysql -u naser_user -pnaser_pass_2024 naser_cms"
echo "   phpMyAdmin:          http://localhost:8080"
echo ""