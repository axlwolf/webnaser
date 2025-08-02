#!/bin/bash

# Verify Admin Dashboard Setup - Grupo Naser CMS
# Verifica que el admin dashboard esté correctamente dockerizado

set -e

echo "🛡️  Verificando configuración del Admin Dashboard..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar que Docker esté corriendo
if ! docker info >/dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker no está corriendo.${NC}"
    echo "Por favor inicia Docker Desktop."
    exit 1
fi

echo -e "${BLUE}🔍 Verificando archivos de configuración...${NC}"

# Verificar archivos necesarios
FILES_TO_CHECK=(
    "src/admin/Dockerfile"
    "src/admin/nginx.conf"
    "src/admin/package.json"
    "docker-compose.yml"
)

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file - FALTANTE${NC}"
    fi
done

echo -e "${BLUE}🐳 Verificando configuración de Docker Compose...${NC}"

# Verificar que el servicio admin esté en docker-compose.yml
if grep -q "admin:" docker-compose.yml; then
    echo -e "${GREEN}✅ Servicio 'admin' encontrado en docker-compose.yml${NC}"
else
    echo -e "${RED}❌ Servicio 'admin' NO encontrado en docker-compose.yml${NC}"
fi

# Verificar puerto 3001
if grep -q "3001:3001" docker-compose.yml; then
    echo -e "${GREEN}✅ Puerto 3001 configurado correctamente${NC}"
else
    echo -e "${RED}❌ Puerto 3001 NO configurado${NC}"
fi

echo -e "${BLUE}📦 Verificando dependencias del admin...${NC}"

# Verificar package.json del admin
if [ -f "src/admin/package.json" ]; then
    if grep -q '"dev"' src/admin/package.json; then
        echo -e "${GREEN}✅ Script 'dev' encontrado en package.json${NC}"
    else
        echo -e "${RED}❌ Script 'dev' NO encontrado${NC}"
    fi
    
    if grep -q '"build"' src/admin/package.json; then
        echo -e "${GREEN}✅ Script 'build' encontrado en package.json${NC}"
    else
        echo -e "${RED}❌ Script 'build' NO encontrado${NC}"
    fi
    
    if grep -q '"test"' src/admin/package.json; then
        echo -e "${GREEN}✅ Script 'test' encontrado en package.json${NC}"
    else
        echo -e "${RED}❌ Script 'test' NO encontrado${NC}"
    fi
fi

echo -e "${BLUE}🚀 Intentando construir la imagen del admin...${NC}"

# Intentar construir la imagen
if docker build -t naser-admin-test src/admin/ --target dev-watch; then
    echo -e "${GREEN}✅ Imagen del admin construida exitosamente${NC}"
    
    # Limpiar imagen de prueba
    docker rmi naser-admin-test >/dev/null 2>&1 || true
else
    echo -e "${RED}❌ Error al construir la imagen del admin${NC}"
fi

echo -e "${BLUE}🔧 Verificando scripts actualizados...${NC}"

# Verificar que los scripts incluyan el admin
SCRIPTS_TO_CHECK=(
    "scripts/dev.sh"
    "scripts/test.sh"
    "scripts/deploy-prep.sh"
)

for script in "${SCRIPTS_TO_CHECK[@]}"; do
    if grep -q "admin" "$script"; then
        echo -e "${GREEN}✅ $script incluye configuración de admin${NC}"
    else
        echo -e "${YELLOW}⚠️  $script podría necesitar actualización para admin${NC}"
    fi
done

echo -e "${BLUE}🌐 Verificando configuración de nginx...${NC}"

if grep -q "upstream admin" docker/nginx/default.conf; then
    echo -e "${GREEN}✅ Upstream 'admin' configurado en nginx${NC}"
else
    echo -e "${RED}❌ Upstream 'admin' NO configurado en nginx${NC}"
fi

if grep -q "location /admin" docker/nginx/default.conf; then
    echo -e "${GREEN}✅ Location '/admin' configurado en nginx${NC}"
else
    echo -e "${RED}❌ Location '/admin' NO configurado en nginx${NC}"
fi

echo ""
echo -e "${BLUE}📋 Resumen de la verificación:${NC}"
echo "=============================================="

# Contar verificaciones exitosas
CHECKS_PASSED=0
TOTAL_CHECKS=10

# Simular conteo (en un script real, contarías las verificaciones reales)
if [ -f "src/admin/Dockerfile" ]; then ((CHECKS_PASSED++)); fi
if [ -f "src/admin/nginx.conf" ]; then ((CHECKS_PASSED++)); fi
if [ -f "src/admin/package.json" ]; then ((CHECKS_PASSED++)); fi
if grep -q "admin:" docker-compose.yml; then ((CHECKS_PASSED++)); fi
if grep -q "3001:3001" docker-compose.yml; then ((CHECKS_PASSED++)); fi
if grep -q '"dev"' src/admin/package.json 2>/dev/null; then ((CHECKS_PASSED++)); fi
if grep -q '"build"' src/admin/package.json 2>/dev/null; then ((CHECKS_PASSED++)); fi
if grep -q '"test"' src/admin/package.json 2>/dev/null; then ((CHECKS_PASSED++)); fi
if grep -q "upstream admin" docker/nginx/default.conf; then ((CHECKS_PASSED++)); fi
if grep -q "location /admin" docker/nginx/default.conf; then ((CHECKS_PASSED++)); fi

echo -e "Verificaciones exitosas: ${GREEN}$CHECKS_PASSED/$TOTAL_CHECKS${NC}"

if [ $CHECKS_PASSED -eq $TOTAL_CHECKS ]; then
    echo -e "${GREEN}✅ ¡Admin Dashboard completamente configurado!${NC}"
    echo ""
    echo -e "${BLUE}🚀 Próximos pasos:${NC}"
    echo "1. Ejecutar: ./scripts/dev.sh"
    echo "2. Visitar: http://localhost:3001 (Admin Dashboard)"
    echo "3. Visitar: http://localhost/admin/ (A través de nginx)"
    echo "4. Ejecutar tests: ./scripts/test.sh"
else
    echo -e "${YELLOW}⚠️  Configuración incompleta. Revisa los errores arriba.${NC}"
fi

echo ""
echo -e "${BLUE}🔧 URLs disponibles después de ./scripts/dev.sh:${NC}"
echo "   Frontend:        http://localhost:3000"
echo "   Admin Dashboard: http://localhost:3001"
echo "   Admin (nginx):   http://localhost/admin/"
echo "   Backend API:     http://localhost:8000"
echo "   phpMyAdmin:      http://localhost:8080"
echo ""