#!/bin/bash

# Script para que Warp registre automáticamente sus contribuciones adicionales
# Uso: ./scripts/warp-log-contribution.sh "Descripción" "archivo.sh" "Propósito"

set -e

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_FILE="$PROJECT_ROOT/WARP-CONTRIBUTIONS-LOG.md"

log() {
    echo -e "${BLUE}[WARP-LOG] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Función para registrar contribución
register_contribution() {
    local description="$1"
    local file_path="$2"
    local purpose="$3"
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    
    if [ -z "$description" ] || [ -z "$file_path" ] || [ -z "$purpose" ]; then
        echo "Uso: $0 \"Descripción\" \"archivo.sh\" \"Propósito\""
        echo "Ejemplo: $0 \"Script de backup automático\" \"scripts/backup.sh\" \"Backup diario de base de datos\""
        exit 1
    fi
    
    log "📝 Registrando nueva contribución de Warp..."
    
    # Verificar si el archivo existe
    if [ ! -f "$PROJECT_ROOT/$file_path" ]; then
        warning "⚠️ Archivo no encontrado: $file_path"
        warning "Registrando de todas formas..."
    fi
    
    # Contar líneas de código si el archivo existe
    local lines_count="N/A"
    if [ -f "$PROJECT_ROOT/$file_path" ]; then
        lines_count=$(wc -l < "$PROJECT_ROOT/$file_path")
    fi
    
    # Crear entrada en el log
    local entry="
### **$(date +"%Y-%m-%d") - $description**
- **Archivo**: \`$file_path\`
- **Propósito**: $purpose
- **Líneas de código**: $lines_count
- **Timestamp**: $timestamp
- **Tipo**: Contribución adicional (más allá de tareas asignadas)
"
    
    # Buscar la sección donde insertar
    if grep -q "## 📋 CONTRIBUCIONES ADICIONALES IDENTIFICADAS" "$LOG_FILE"; then
        # Insertar después del header de contribuciones
        sed -i.bak "/## 📋 CONTRIBUCIONES ADICIONALES IDENTIFICADAS/a\\
$entry" "$LOG_FILE"
    else
        # Si no existe la sección, agregarla
        echo -e "\n## 📋 CONTRIBUCIONES ADICIONALES IDENTIFICADAS\n$entry" >> "$LOG_FILE"
    fi
    
    success "✅ Contribución registrada en $LOG_FILE"
    
    # Reportar al sistema de hooks si está disponible
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" add-comment warp \
            "🛠️ CONTRIBUCIÓN ADICIONAL: $description - $purpose"
        success "✅ Reportado al sistema de hooks"
    fi
    
    # Mostrar resumen
    log "📊 Resumen de la contribución:"
    echo "  - Descripción: $description"
    echo "  - Archivo: $file_path"
    echo "  - Propósito: $purpose"
    echo "  - Líneas: $lines_count"
    echo "  - Registrado: $timestamp"
}

# Función para mostrar estadísticas
show_stats() {
    log "📈 Estadísticas de contribuciones de Warp:"
    
    if [ -f "$LOG_FILE" ]; then
        local total_contributions=$(grep -c "### \*\*.*- " "$LOG_FILE" || echo "0")
        local total_files=$(grep -c "- \*\*Archivo\*\*:" "$LOG_FILE" || echo "0")
        
        echo "  - Total de contribuciones adicionales: $total_contributions"
        echo "  - Total de archivos creados: $total_files"
        echo "  - Última actualización: $(date)"
    else
        warning "⚠️ Archivo de log no encontrado"
    fi
}

# Función principal
main() {
    case "${1:-}" in
        "stats"|"--stats"|"-s")
            show_stats
            ;;
        "help"|"--help"|"-h")
            echo "Uso: $0 [OPCIÓN] o $0 \"Descripción\" \"archivo.sh\" \"Propósito\""
            echo ""
            echo "Opciones:"
            echo "  stats, -s    Mostrar estadísticas de contribuciones"
            echo "  help, -h     Mostrar esta ayuda"
            echo ""
            echo "Ejemplos:"
            echo "  $0 \"Script de restauración\" \"fixes/restore.sh\" \"Restaura configuración\""
            echo "  $0 stats"
            ;;
        "")
            echo "Error: Se requieren parámetros"
            echo "Uso: $0 \"Descripción\" \"archivo.sh\" \"Propósito\""
            echo "Para ayuda: $0 help"
            exit 1
            ;;
        *)
            register_contribution "$1" "$2" "$3"
            ;;
    esac
}

# Ejecutar función principal
main "$@"