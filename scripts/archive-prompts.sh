#!/bin/bash

# Script para archivar archivos PROMPT-[agent]-BATCH-*.md
# Uso: ./scripts/archive-prompts.sh [--dry-run]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directorio de destino
ARCHIVE_DIR="docs/prompts-archive"
DRY_RUN=false

# Procesar argumentos
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    echo -e "${YELLOW}🔍 Modo dry-run activado - no se moverán archivos${NC}"
fi

# Crear directorio de archivo si no existe
if [[ "$DRY_RUN" == false ]]; then
    mkdir -p "$ARCHIVE_DIR"
fi

# Buscar archivos PROMPT-[agent]-BATCH-*.md en el directorio raíz
PROMPT_FILES=($(find . -maxdepth 1 -name "PROMPT-*-BATCH-*.md" -type f))

if [[ ${#PROMPT_FILES[@]} -eq 0 ]]; then
    echo -e "${BLUE}ℹ️  No se encontraron archivos PROMPT-[agent]-BATCH-*.md para archivar${NC}"
    exit 0
fi

echo -e "${BLUE}📁 Archivos PROMPT encontrados:${NC}"
for file in "${PROMPT_FILES[@]}"; do
    echo -e "  ${YELLOW}→${NC} $(basename "$file")"
done

echo ""

# Procesar cada archivo
MOVED_COUNT=0
for file in "${PROMPT_FILES[@]}"; do
    filename=$(basename "$file")
    destination="$ARCHIVE_DIR/$filename"
    
    if [[ "$DRY_RUN" == true ]]; then
        echo -e "${YELLOW}[DRY-RUN]${NC} Movería: $filename → $ARCHIVE_DIR/"
    else
        if [[ -f "$destination" ]]; then
            echo -e "${YELLOW}⚠️  El archivo $filename ya existe en el archivo. Creando backup...${NC}"
            timestamp=$(date +"%Y%m%d_%H%M%S")
            mv "$destination" "${destination}.backup_${timestamp}"
        fi
        
        mv "$file" "$destination"
        echo -e "${GREEN}✅ Movido:${NC} $filename → $ARCHIVE_DIR/"
        ((MOVED_COUNT++))
    fi
done

if [[ "$DRY_RUN" == false ]]; then
    echo ""
    echo -e "${GREEN}🎉 Archivado completado:${NC}"
    echo -e "  ${GREEN}→${NC} $MOVED_COUNT archivos movidos a $ARCHIVE_DIR/"
    echo -e "  ${GREEN}→${NC} Directorio raíz limpio"
    
    # Generar timestamp para documentación
    echo ""
    echo -e "${BLUE}📝 Información del archivado:${NC}"
    echo -e "  ${BLUE}→${NC} Fecha: $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "  ${BLUE}→${NC} Usuario: $(whoami)"
    echo -e "  ${BLUE}→${NC} Directorio: $(pwd)"
    
    # Verificar si hay cambios para commit
    if git status --porcelain | grep -q "docs/prompts-archive\|PROMPT-.*-BATCH-.*\.md"; then
        echo ""
        echo -e "${YELLOW}📋 Cambios detectados para commit:${NC}"
        git status --porcelain | grep "docs/prompts-archive\|PROMPT-.*-BATCH-.*\.md" || true
        echo ""
        echo -e "${BLUE}💡 Sugerencia de commit:${NC}"
        echo -e "  ${BLUE}→${NC} git add docs/prompts-archive/ ."
        echo -e "  ${BLUE}→${NC} git commit -m \"Archive PROMPT files from session $(date '+%Y-%m-%d')\""
    fi
else
    echo ""
    echo -e "${YELLOW}🔍 Dry-run completado - ejecuta sin --dry-run para mover los archivos${NC}"
fi