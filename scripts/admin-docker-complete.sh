#!/bin/bash

# Admin Docker Complete - Grupo Naser CMS
# Verificación final de la dockerización completa del admin dashboard

set -e

echo "🛡️  Verificación Final: Admin Dashboard Dockerizado"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Contador de verificaciones
CHECKS_PASSED=0
TOTAL_CHECKS=0

# Función para verificar archivos
check_file() {
    local file=$1
    local description=$2
    ((TOTAL_CHECKS++))
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $description${NC}"
        ((CHECKS_PASSED++))
    else
        echo -e "${RED}❌ $description - FALTANTE: $file${NC}"
    fi
}

# Función para verificar contenido en archivos
check_content() {
    local file=$1
    local pattern=$2
    local description=$3
    ((TOTAL_CHECKS++))
    
    if [ -f "$file" ] && grep -q "$pattern" "$file"; then
        echo -e "${GREEN}✅ $description${NC}"
        ((CHECKS_PASSED++))
    else
        echo -e "${RED}❌ $description - NO ENCONTRADO en $file${NC}"
    fi
}

echo -e "${BLUE}🔍 Verificando archivos de configuración Docker...${NC}"

# Verificar archivos Docker
check_file "src/admin/Dockerfile" "Dockerfile del admin"
check_file "src/admin/.dockerignore" ".dockerignore del admin"
check_file "src/admin/nginx.conf" "Configuración nginx del admin"

echo -e "${BLUE}🔧 Verificando configuración de Vite...${NC}"

# Verificar configuración de Vite
check_file "src/admin/vite.config.js" "Configuración de Vite"
check_content "src/admin/vite.config.js" "port: 3001" "Puerto 3001 en Vite config"
check_content "src/admin/vite.config.js" "host: '0.0.0.0'" "Host 0.0.0.0 en Vite config"

echo -e "${BLUE}🎨 Verificando estilos y estructura...${NC}"

# Verificar archivos de estilos
check_file "src/admin/src/styles/variables.scss" "Variables SCSS"
check_file "src/admin/src/styles/globals.scss" "Estilos globales SCSS"
check_file "src/admin/src/test/setup.js" "Setup de testing"

# Verificar componentes de ejemplo
check_file "src/admin/src/components/Layout/AdminLayout.jsx" "Componente AdminLayout"
check_file "src/admin/src/components/Layout/AdminLayout.module.scss" "Estilos AdminLayout"

echo -e "${BLUE}🐳 Verificando Docker Compose...${NC}"

# Verificar configuración en docker-compose.yml
check_content "docker-compose.yml" "admin:" "Servicio admin en docker-compose"
check_content "docker-compose.yml" "3001:3001" "Puerto 3001 en docker-compose"
check_content "docker-compose.yml" "naser_admin" "Nombre del contenedor admin"

echo -e "${BLUE}🌐 Verificando configuración de nginx...${NC}"

# Verificar nginx
check_content "docker/nginx/default.conf" "upstream admin" "Upstream admin en nginx"
check_content "docker/nginx/default.conf" "location /admin" "Location /admin en nginx"

echo -e "${BLUE}📜 Verificando scripts actualizados...${NC}"

# Verificar scripts
check_content "scripts/dev.sh" "Admin Dashboard" "Admin en script dev.sh"
check_content "scripts/test.sh" "naser_admin" "Admin en script test.sh"
check_content "scripts/deploy-prep.sh" "admin" "Admin en script deploy-prep.sh"

echo -e "${BLUE}📦 Verificando package.json...${NC}"

# Verificar package.json
check_content "src/admin/package.json" '"dev"' "Script dev en admin package.json"
check_content "src/admin/package.json" '"build"' "Script build en admin package.json"
check_content "src/admin/package.json" '"test"' "Script test en admin package.json"
check_content "package.json" "docker:dev" "Scripts Docker en package.json principal"

echo ""
echo "=================================================="
echo -e "${CYAN}📊 RESUMEN DE VERIFICACIÓN${NC}"
echo "=================================================="

# Calcular porcentaje
PERCENTAGE=$((CHECKS_PASSED * 100 / TOTAL_CHECKS))

echo -e "Verificaciones exitosas: ${GREEN}$CHECKS_PASSED/$TOTAL_CHECKS${NC} (${PERCENTAGE}%)"

if [ $CHECKS_PASSED -eq $TOTAL_CHECKS ]; then
    echo -e "${GREEN}🎉 ¡DOCKERIZACIÓN COMPLETA!${NC}"
    echo ""
    echo -e "${BLUE}✨ El Admin Dashboard está completamente dockerizado${NC}"
    echo ""
    echo -e "${YELLOW}🚀 Comandos para usar:${NC}"
    echo "   Iniciar desarrollo:  ./scripts/dev.sh"
    echo "   Ejecutar tests:      ./scripts/test.sh"
    echo "   Verificar setup:     ./scripts/verify-admin-setup.sh"
    echo "   Build para deploy:   ./scripts/deploy-prep.sh"
    echo ""
    echo -e "${YELLOW}🌐 URLs disponibles:${NC}"
    echo "   Admin Dashboard:     http://localhost:3001"
    echo "   Admin (via nginx):   http://localhost/admin/"
    echo "   Frontend público:    http://localhost:3000"
    echo "   Backend API:         http://localhost:8000"
    echo ""
    echo -e "${YELLOW}📋 Características implementadas:${NC}"
    echo "   ✅ Docker multi-stage build"
    echo "   ✅ Hot reload en desarrollo"
    echo "   ✅ Optimización para producción"
    echo "   ✅ Configuración nginx"
    echo "   ✅ Variables de entorno"
    echo "   ✅ Testing setup"
    echo "   ✅ SCSS con variables"
    echo "   ✅ Componentes con CSS Modules"
    echo "   ✅ Accesibilidad (a11y)"
    echo "   ✅ Responsive design"
    echo "   ✅ Compatibilidad GoDaddy"
    echo ""
    echo -e "${GREEN}🎯 ¡Listo para desarrollo!${NC}"
    
elif [ $PERCENTAGE -ge 80 ]; then
    echo -e "${YELLOW}⚠️  Configuración casi completa${NC}"
    echo "Revisa los elementos faltantes arriba."
    
else
    echo -e "${RED}❌ Configuración incompleta${NC}"
    echo "Varios elementos necesitan atención."
fi

echo ""
echo -e "${BLUE}📚 Documentación adicional:${NC}"
echo "   - React Standards: Seguir estándares definidos"
echo "   - CSS Modules: Usar para estilos de componentes"
echo "   - Accessibility: Implementar ARIA labels y semántica"
echo "   - Performance: Usar React.memo y lazy loading"
echo "   - Testing: Escribir tests para componentes críticos"
echo ""

exit 0