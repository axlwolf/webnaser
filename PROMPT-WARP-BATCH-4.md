# PROMPT WARP - BATCH 4: Resolución de Problemas Críticos de Infraestructura

## 🚨 CONTEXTO CRÍTICO

¡Situación crítica identificada! Eres **Warp**, el especialista en DevOps y automatización para el **CMS de Grupo Naser**. Has identificado problemas críticos de infraestructura que están bloqueando el desarrollo del equipo.

**Equipo de 4 agentes coordinados**:

- **Kiro**: Orquestador principal - esperando resolución de bloqueos
- **Claude**: Desarrollador Frontend React - bloqueado por problema ARM64
- **Gemini**: Desarrollador Backend PHP - bloqueado por problema Apache
- **Warp (tú)**: Especialista DevOps - RESPONSABLE DE RESOLVER CRISIS

**Branch actual**: `feature/auth-integration`  
**Estado**: 🚨 **CRÍTICO** - Servicios no funcionales  
**Prioridad**: **MÁXIMA** - Bloquea todo el desarrollo

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

### **PROBLEMA 1: Frontend ARM64/Rollup (Mac M1/M2)**

- **Síntoma**: Módulo de Rollup faltante para arquitectura ARM64
- **Estado Actual**: Contenedor `naser_frontend` reiniciando constantemente
- **Impacto**: Frontend completamente no funcional
- **Afecta a**: Claude (desarrollo frontend bloqueado)

### **PROBLEMA 2: Backend Apache Redirección Infinita**

- **Síntoma**: Errores HTTP 500 por redirección infinita en Apache
- **Estado Actual**: Contenedor `naser_backend` unhealthy
- **Impacto**: API backend no responde correctamente
- **Afecta a**: Gemini (desarrollo backend bloqueado)

## 🎯 TU MISIÓN CRÍTICA: RESOLUCIÓN INMEDIATA (Tarea W.4)

### OBJETIVO

**Resolver INMEDIATAMENTE** ambos problemas críticos para desbloquear el desarrollo del equipo completo. Esta es una tarea de máxima prioridad que debe completarse antes que cualquier otra.

### UBICACIÓN DE ARCHIVOS DE SOLUCIÓN

```
fixes/critical/
├── fix-arm64-frontend.sh      # Script para resolver problema ARM64
├── fix-apache-backend.sh      # Script para resolver redirección Apache
├── docker-compose.fixed.yml   # Configuración Docker corregida
├── frontend-arm64.Dockerfile  # Dockerfile específico para ARM64
└── apache-config.fixed.conf   # Configuración Apache corregida

scripts/emergency/
├── emergency-restart.sh       # Reinicio de emergencia de servicios
├── health-check-critical.sh   # Verificación de salud crítica
├── rollback-config.sh         # Rollback en caso de problemas
└── validate-fixes.sh          # Validación de correcciones

logs/critical/
├── frontend-error.log         # Logs detallados del problema frontend
├── backend-error.log          # Logs detallados del problema backend
└── resolution-log.md          # Log de resolución paso a paso
```

### ESPECIFICACIONES TÉCNICAS DETALLADAS

#### 1. SCRIPT DE RESOLUCIÓN ARM64 (fix-arm64-frontend.sh)

```bash
#!/bin/bash

# Resolución Crítica: Problema ARM64/Rollup en Frontend
# Soluciona incompatibilidad de Rollup con arquitectura ARM64 (Mac M1/M2)

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

log() {
    echo -e "${BLUE}[ARM64-FIX] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

critical_header() {
    echo -e "${PURPLE}
╔══════════════════════════════════════════════════════════════════════════════╗
║                    🚨 RESOLUCIÓN CRÍTICA: PROBLEMA ARM64                     ║
║                           Ejecutado por Warp                                ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función para reportar a Kiro
report_to_kiro() {
    local status="$1"
    local message="$2"
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" "$status" warp "W.4" "$message"
    fi
}

# Detectar arquitectura
detect_architecture() {
    log "🔍 Detectando arquitectura del sistema..."

    local arch=$(uname -m)
    local os=$(uname -s)

    echo "Arquitectura: $arch"
    echo "OS: $os"

    if [[ "$arch" == "arm64" ]] && [[ "$os" == "Darwin" ]]; then
        success "✅ Detectado: Mac con chip Apple Silicon (ARM64)"
        return 0
    elif [[ "$arch" == "x86_64" ]]; then
        warning "⚠️ Detectado: Arquitectura x86_64 - problema ARM64 no aplica"
        return 1
    else
        warning "⚠️ Arquitectura no reconocida: $arch"
        return 1
    fi
}

# Resolver problema de Rollup ARM64
fix_rollup_arm64() {
    log "🔧 Resolviendo problema de Rollup para ARM64..."

    cd "$PROJECT_ROOT/src/frontend"

    # Verificar si existe package.json
    if [ ! -f "package.json" ]; then
        error "package.json no encontrado en src/frontend"
        return 1
    fi

    # Backup del package.json original
    cp package.json package.json.backup
    log "📋 Backup creado: package.json.backup"

    # Limpiar node_modules y package-lock.json
    log "🧹 Limpiando instalación anterior..."
    rm -rf node_modules package-lock.json

    # Configurar npm para ARM64
    log "⚙️ Configurando npm para ARM64..."
    npm config set target_arch arm64
    npm config set target_platform darwin
    npm config set cache ~/.npm-arm64

    # Instalar dependencias específicas para ARM64
    log "📦 Instalando dependencias compatibles con ARM64..."

    # Instalar Rollup específico para ARM64
    npm install @rollup/rollup-darwin-arm64 --save-dev

    # Reinstalar todas las dependencias
    npm install --force

    # Verificar instalación
    if [ -d "node_modules" ] && [ -f "node_modules/.bin/rollup" ]; then
        success "✅ Rollup instalado correctamente para ARM64"
        return 0
    else
        error "❌ Falló la instalación de Rollup para ARM64"
        return 1
    fi
}

# Crear Dockerfile específico para ARM64
create_arm64_dockerfile() {
    log "🐳 Creando Dockerfile específico para ARM64..."

    cat > "$PROJECT_ROOT/src/frontend/Dockerfile.arm64" << 'EOF'
# Dockerfile específico para ARM64 (Mac M1/M2)
FROM --platform=linux/arm64 node:18-alpine

# Establecer variables de entorno para ARM64
ENV NODE_ENV=development
ENV PLATFORM=linux/arm64
ENV ARCH=arm64

# Instalar dependencias del sistema
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Configurar npm para ARM64
RUN npm config set target_arch arm64 && \
    npm config set target_platform linux

# Instalar dependencias específicas para ARM64
RUN npm install @rollup/rollup-linux-arm64 --save-dev

# Instalar todas las dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
EOF

    success "✅ Dockerfile ARM64 creado: src/frontend/Dockerfile.arm64"
}

# Actualizar docker-compose para ARM64
update_docker_compose_arm64() {
    log "🔄 Actualizando docker-compose para ARM64..."

    # Crear versión corregida de docker-compose
    cat > "$PROJECT_ROOT/docker-compose.arm64.yml" << 'EOF'
version: '3.8'

services:
  frontend:
    build:
      context: ./src/frontend
      dockerfile: Dockerfile.arm64
      platform: linux/arm64
    container_name: naser_frontend_arm64
    ports:
      - "3000:3000"
    volumes:
      - ./src/frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - PLATFORM=linux/arm64
    networks:
      - naser-network
    restart: unless-stopped

  # Mantener otros servicios sin cambios
  backend:
    build: ./api
    container_name: naser_backend
    ports:
      - "8000:80"
    volumes:
      - ./api:/var/www/html
    networks:
      - naser-network
    depends_on:
      - database

  database:
    image: mysql:8.0
    container_name: naser_db
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: naser_cms
      MYSQL_USER: naser_user
      MYSQL_PASSWORD: naser_password
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - naser-network

networks:
  naser-network:
    driver: bridge

volumes:
  db_data:
EOF

    success "✅ docker-compose ARM64 creado: docker-compose.arm64.yml"
}

# Validar corrección
validate_arm64_fix() {
    log "✅ Validando corrección ARM64..."

    cd "$PROJECT_ROOT/src/frontend"

    # Verificar que Rollup funciona
    if npm run build --dry-run > /dev/null 2>&1; then
        success "✅ Build de frontend funciona correctamente"
        return 0
    else
        error "❌ Build de frontend aún falla"
        return 1
    fi
}

# Función principal
main() {
    critical_header

    log "🚨 Iniciando resolución crítica del problema ARM64..."

    # Reportar inicio
    report_to_kiro "start-task" "CRÍTICO: Resolviendo problema ARM64/Rollup que bloquea frontend"

    # Crear directorio de logs
    mkdir -p "$PROJECT_ROOT/logs/critical"

    # Detectar arquitectura
    if ! detect_architecture; then
        warning "Problema ARM64 no aplica en esta arquitectura"
        exit 0
    fi

    # Resolver problema de Rollup
    if fix_rollup_arm64; then
        success "✅ Problema de Rollup ARM64 resuelto"
    else
        error "❌ Falló resolución de Rollup ARM64"
        report_to_kiro "add-comment" "❌ CRÍTICO: Falló resolución de problema ARM64 - requiere intervención manual"
        exit 1
    fi

    # Crear Dockerfile específico
    create_arm64_dockerfile

    # Actualizar docker-compose
    update_docker_compose_arm64

    # Validar corrección
    if validate_arm64_fix; then
        success "🎉 Problema ARM64 completamente resuelto"
        report_to_kiro "update-progress" "✅ CRÍTICO RESUELTO: Problema ARM64/Rollup solucionado - frontend desbloqueado"
    else
        error "❌ Validación falló - problema persiste"
        report_to_kiro "add-comment" "⚠️ CRÍTICO: Problema ARM64 parcialmente resuelto - requiere validación adicional"
        exit 1
    fi

    success "🚀 Frontend desbloqueado - Claude puede continuar desarrollo"
    exit 0
}

# Ejecutar función principal
main "$@"
```

#### 2. SCRIPT DE RESOLUCIÓN APACHE (fix-apache-backend.sh)

```bash
#!/bin/bash

# Resolución Crítica: Problema de Redirección Infinita Apache
# Soluciona errores HTTP 500 por configuración incorrecta de Apache

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

log() {
    echo -e "${BLUE}[APACHE-FIX] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
}

critical_header() {
    echo -e "${PURPLE}
╔══════════════════════════════════════════════════════════════════════════════╗
║                  🚨 RESOLUCIÓN CRÍTICA: PROBLEMA APACHE                      ║
║                           Ejecutado por Warp                                ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función para reportar a Kiro
report_to_kiro() {
    local status="$1"
    local message="$2"
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" "$status" warp "W.4" "$message"
    fi
}

# Diagnosticar problema Apache
diagnose_apache_problem() {
    log "🔍 Diagnosticando problema de Apache..."

    # Verificar logs de Apache en contenedor
    if docker ps | grep -q "naser_backend"; then
        log "📋 Obteniendo logs de Apache..."
        docker logs naser_backend --tail=50 > "$PROJECT_ROOT/logs/critical/backend-error.log" 2>&1

        # Buscar patrones de redirección infinita
        if grep -q "redirect" "$PROJECT_ROOT/logs/critical/backend-error.log"; then
            warning "⚠️ Detectado: Problema de redirección en logs"
            return 0
        fi

        if grep -q "500" "$PROJECT_ROOT/logs/critical/backend-error.log"; then
            warning "⚠️ Detectado: Errores HTTP 500 en logs"
            return 0
        fi
    else
        error "❌ Contenedor backend no está ejecutándose"
        return 1
    fi
}

# Crear configuración Apache corregida
create_fixed_apache_config() {
    log "🔧 Creando configuración Apache corregida..."

    cat > "$PROJECT_ROOT/api/.htaccess.fixed" << 'EOF'
# Configuración Apache corregida para evitar redirección infinita
RewriteEngine On

# Prevenir redirección infinita
RewriteCond %{ENV:REDIRECT_STATUS} ^$

# Redirigir todas las requests a index.php SOLO si el archivo no existe
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]

# Configuración de headers de seguridad
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Configuración de CORS para desarrollo
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"

# Manejar preflight requests
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
EOF

    success "✅ Configuración Apache corregida creada"
}

# Crear Dockerfile Apache corregido
create_fixed_apache_dockerfile() {
    log "🐳 Creando Dockerfile Apache corregido..."

    cat > "$PROJECT_ROOT/api/Dockerfile.fixed" << 'EOF'
# Dockerfile corregido para evitar problemas de Apache
FROM php:8.2-apache

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    default-mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        zip \
        gd \
        xml \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Habilitar módulos Apache necesarios
RUN a2enmod rewrite headers

# Configurar Apache para evitar redirección infinita
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN echo "DirectoryIndex index.php index.html" >> /etc/apache2/apache2.conf

# Configurar DocumentRoot
ENV APACHE_DOCUMENT_ROOT /var/www/html
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copiar código fuente
COPY . /var/www/html/

# Aplicar configuración corregida
COPY .htaccess.fixed /var/www/html/.htaccess

# Configurar permisos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Exponer puerto
EXPOSE 80

# Comando de inicio
CMD ["apache2-foreground"]
EOF

    success "✅ Dockerfile Apache corregido creado"
}

# Aplicar correcciones
apply_apache_fixes() {
    log "🔄 Aplicando correcciones de Apache..."

    cd "$PROJECT_ROOT/api"

    # Backup de configuración original
    if [ -f ".htaccess" ]; then
        cp .htaccess .htaccess.backup
        log "📋 Backup creado: .htaccess.backup"
    fi

    if [ -f "Dockerfile" ]; then
        cp Dockerfile Dockerfile.backup
        log "📋 Backup creado: Dockerfile.backup"
    fi

    # Aplicar configuración corregida
    cp .htaccess.fixed .htaccess
    cp Dockerfile.fixed Dockerfile

    success "✅ Configuraciones Apache aplicadas"
}

# Reiniciar contenedor backend
restart_backend_container() {
    log "🔄 Reiniciando contenedor backend..."

    # Detener contenedor actual
    docker-compose stop backend

    # Reconstruir con nueva configuración
    docker-compose build --no-cache backend

    # Iniciar contenedor
    docker-compose up -d backend

    # Esperar a que esté listo
    log "⏳ Esperando a que el backend esté listo..."
    sleep 10

    success "✅ Contenedor backend reiniciado"
}

# Validar corrección
validate_apache_fix() {
    log "✅ Validando corrección de Apache..."

    # Verificar que el contenedor está saludable
    local health_status=$(docker inspect --format='{{.State.Health.Status}}' naser_backend 2>/dev/null || echo "no-health")

    if [ "$health_status" = "healthy" ]; then
        success "✅ Contenedor backend está saludable"
    else
        warning "⚠️ Contenedor backend no tiene healthcheck o no está saludable"
    fi

    # Verificar conectividad HTTP
    if curl -f -s --max-time 10 "http://localhost:8000" > /dev/null 2>&1; then
        success "✅ Backend responde correctamente"
        return 0
    else
        error "❌ Backend aún no responde"
        return 1
    fi
}

# Función principal
main() {
    critical_header

    log "🚨 Iniciando resolución crítica del problema Apache..."

    # Reportar inicio
    report_to_kiro "start-task" "CRÍTICO: Resolviendo redirección infinita Apache que bloquea backend"

    # Crear directorio de logs
    mkdir -p "$PROJECT_ROOT/logs/critical"

    # Diagnosticar problema
    if diagnose_apache_problem; then
        log "🔍 Problema Apache diagnosticado"
    else
        warning "⚠️ No se pudo diagnosticar completamente el problema"
    fi

    # Crear configuraciones corregidas
    create_fixed_apache_config
    create_fixed_apache_dockerfile

    # Aplicar correcciones
    apply_apache_fixes

    # Reiniciar contenedor
    restart_backend_container

    # Validar corrección
    if validate_apache_fix; then
        success "🎉 Problema Apache completamente resuelto"
        report_to_kiro "update-progress" "✅ CRÍTICO RESUELTO: Redirección infinita Apache solucionada - backend desbloqueado"
    else
        error "❌ Validación falló - problema persiste"
        report_to_kiro "add-comment" "⚠️ CRÍTICO: Problema Apache parcialmente resuelto - requiere validación adicional"
        exit 1
    fi

    success "🚀 Backend desbloqueado - Gemini puede continuar desarrollo"
    exit 0
}

# Ejecutar función principal
main "$@"
```

### CRITERIOS DE ACEPTACIÓN CRÍTICOS

- [ ] **PROBLEMA ARM64 RESUELTO**: Frontend funcional en Mac M1/M2
- [ ] **PROBLEMA APACHE RESUELTO**: Backend responde sin errores 500
- [ ] **CONTENEDORES SALUDABLES**: Todos los servicios en estado "healthy"
- [ ] **ENDPOINTS FUNCIONALES**: Frontend y Backend responden correctamente
- [ ] **EQUIPO DESBLOQUEADO**: Claude y Gemini pueden continuar desarrollo
- [ ] **LOGS DOCUMENTADOS**: Proceso de resolución completamente registrado
- [ ] **ROLLBACK DISPONIBLE**: Configuraciones de respaldo creadas

### COMANDOS PARA REPORTAR PROGRESO CRÍTICO

```bash
# Al iniciar la resolución crítica
node .kiro/specs/auth-integration/update-status.js start-task warp "W.4" "🚨 CRÍTICO: Iniciando resolución de problemas que bloquean desarrollo"

# Para reportar progreso de cada problema
node .kiro/specs/auth-integration/update-status.js update-progress warp "W.4" "Resolviendo problema ARM64 - frontend desbloqueándose"
node .kiro/specs/auth-integration/update-status.js update-progress warp "W.4" "Resolviendo problema Apache - backend desbloqueándose"

# Al completar resolución crítica
node .kiro/specs/auth-integration/update-status.js complete-task warp "W.4" "🎉 CRÍTICO RESUELTO: Ambos problemas solucionados - equipo completamente desbloqueado"
```

## 🚨 PRIORIDAD MÁXIMA

Esta tarea tiene **PRIORIDAD ABSOLUTA** sobre cualquier otra actividad. El desarrollo completo del equipo está bloqueado hasta que estos problemas se resuelvan.

### IMPACTO DE NO RESOLVER

- ❌ **Claude**: No puede desarrollar componentes frontend
- ❌ **Gemini**: No puede probar endpoints backend
- ❌ **Kiro**: No puede coordinar integración
- ❌ **Proyecto**: Desarrollo completamente paralizado

### IMPACTO DE RESOLVER

- ✅ **Claude**: Frontend funcional para desarrollo
- ✅ **Gemini**: Backend API completamente operativo
- ✅ **Kiro**: Coordinación de equipo restaurada
- ✅ **Proyecto**: Desarrollo a velocidad completa

---

**¡Esta es tu misión más crítica, Warp!** 🚨 El éxito del proyecto depende de resolver estos problemas AHORA.

**Enfócate en**: Resolución inmediata, validación completa, y desbloqueo total del equipo.
