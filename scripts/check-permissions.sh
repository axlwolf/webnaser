#!/bin/bash

# Script de Verificación de Permisos - Grupo Naser CMS
# Previene problemas de permisos entre usuarios

set -e

echo "🔍 Verificando permisos del proyecto..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar usuario actual
CURRENT_USER=$(whoami)
EXPECTED_USER="flanuza"

if [ "$CURRENT_USER" != "$EXPECTED_USER" ]; then
    echo -e "${RED}⚠️  Usuario actual: $CURRENT_USER (esperado: $EXPECTED_USER)${NC}"
    echo -e "${YELLOW}💡 Cambia al usuario correcto antes de continuar${NC}"
fi

# Buscar archivos con owner root (excluyendo node_modules y .git)
echo "🔍 Buscando archivos con permisos incorrectos..."

ROOT_FILES=$(find . -maxdepth 3 -user root -not -path "./node_modules/*" -not -path "./.git/objects/*" -not -path "./.git/refs/*" -type f 2>/dev/null || true)

if [ -n "$ROOT_FILES" ]; then
    echo -e "${RED}⚠️  ARCHIVOS CON OWNER ROOT DETECTADOS:${NC}"
    echo "$ROOT_FILES" | while read -r file; do
        echo -e "${YELLOW}  → $file${NC}"
    done
    echo ""
    echo -e "${YELLOW}🔧 Para corregir, ejecuta:${NC}"
    echo -e "${GREEN}sudo chown -R flanuza:staff .${NC}"
    echo ""
    exit 1
fi

# Verificar archivos críticos del proyecto
CRITICAL_FILES=(
    "package.json"
    "composer.json"
    "tailwind.config.js"
    "postcss.config.js"
    "src/index.tsx"
    "src/App.tsx"
    "api/index.php"
    "api/config.php"
)

echo "🔍 Verificando archivos críticos..."

PERMISSION_ISSUES=0

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        FILE_OWNER=$(stat -f "%Su" "$file" 2>/dev/null || stat -c "%U" "$file" 2>/dev/null || echo "unknown")
        if [ "$FILE_OWNER" != "$EXPECTED_USER" ] && [ "$FILE_OWNER" != "unknown" ]; then
            echo -e "${RED}❌ $file (owner: $FILE_OWNER)${NC}"
            PERMISSION_ISSUES=$((PERMISSION_ISSUES + 1))
        else
            echo -e "${GREEN}✅ $file${NC}"
        fi
    fi
done

# Verificar directorios críticos
CRITICAL_DIRS=(
    "src"
    "api"
    "scripts"
    "docker"
    ".kiro"
)

echo ""
echo "🔍 Verificando directorios críticos..."

for dir in "${CRITICAL_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        DIR_OWNER=$(stat -f "%Su" "$dir" 2>/dev/null || stat -c "%U" "$dir" 2>/dev/null || echo "unknown")
        if [ "$DIR_OWNER" != "$EXPECTED_USER" ] && [ "$DIR_OWNER" != "unknown" ]; then
            echo -e "${RED}❌ $dir/ (owner: $DIR_OWNER)${NC}"
            PERMISSION_ISSUES=$((PERMISSION_ISSUES + 1))
        else
            echo -e "${GREEN}✅ $dir/${NC}"
        fi
    fi
done

echo ""

# Resultado final
if [ $PERMISSION_ISSUES -eq 0 ]; then
    echo -e "${GREEN}🎉 Todos los permisos están correctos${NC}"
    echo -e "${GREEN}👤 Usuario actual: $CURRENT_USER${NC}"
    echo -e "${GREEN}📁 Proyecto: Permisos consistentes${NC}"
    exit 0
else
    echo -e "${RED}❌ Se encontraron $PERMISSION_ISSUES problemas de permisos${NC}"
    echo ""
    echo -e "${YELLOW}🔧 Comandos para corregir:${NC}"
    echo -e "${GREEN}sudo chown -R flanuza:staff .${NC}"
    echo -e "${GREEN}find . -name 'node_modules' -prune -o -type f -exec chmod 644 {} \\;${NC}"
    echo -e "${GREEN}find . -name 'node_modules' -prune -o -type d -exec chmod 755 {} \\;${NC}"
    echo ""
    exit 1
fi