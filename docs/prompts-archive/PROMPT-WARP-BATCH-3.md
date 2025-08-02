# PROMPT WARP - BATCH 3: Optimización de Performance y Deployment

## 🎯 CONTEXTO DEL PROYECTO

¡Excelente trabajo en el Batch 2! Eres **Warp**, el especialista en DevOps y automatización para el **CMS de Grupo Naser**. Has completado exitosamente el sistema de testing automatizado. Ahora continuamos con la siguiente fase del proyecto.

**Equipo de 4 agentes coordinados**:

- **Kiro**: Orquestador principal con sistema de hooks automáticos
- **Claude**: Desarrollador Frontend React (completó LoginForm y AuthContext)
- **Gemini**: Desarrollador Backend PHP (completó UserRepository y JwtService)
- **Warp (tú)**: Especialista DevOps y automatización

**Branch actual**: `feature/auth-integration`  
**Progreso actual**: ~45% (Sistema de testing completado)  
**Sistema de hooks**: Activo - detecta automáticamente cambios de todos los agentes

## 🎯 ESTADO ACTUAL DEL PROYECTO

### ✅ Completado en Batch 2

- Sistema completo de testing automatizado
- CI/CD pipeline con GitHub Actions
- Docker testing environment
- Monitoreo continuo de salud del sistema
- Reportes automáticos de cobertura
- Integración con sistema de hooks

### 🎯 PRÓXIMA FASE: OPTIMIZACIÓN Y DEPLOYMENT

Tu siguiente misión es preparar el sistema para producción en **GoDaddy hosting** con optimizaciones de performance, monitoreo avanzado y configuración de deployment automatizado.

## 🎯 TU PRIMERA TAREA: OPTIMIZACIÓN DE PERFORMANCE (Tarea W.3)

### OBJETIVO

Implementar un **sistema completo de optimización de performance** que incluya análisis de recursos, optimización de Docker, configuración de cache, y monitoreo de métricas en tiempo real.

### UBICACIÓN DE ARCHIVOS

```
scripts/performance/
├── analyze-performance.sh     # Análisis completo de performance
├── optimize-docker.sh         # Optimización de contenedores
├── setup-caching.sh          # Configuración de sistema de cache
├── monitor-metrics.sh         # Monitoreo de métricas en tiempo real
├── optimize-database.sh       # Optimización de consultas MySQL
└── generate-performance-report.sh  # Reportes de performance

docker/production/
├── Dockerfile.prod           # Dockerfile optimizado para producción
├── docker-compose.prod.yml   # Configuración de producción
├── nginx.prod.conf          # Configuración Nginx optimizada
└── php.prod.ini             # Configuración PHP optimizada

monitoring/
├── prometheus.yml           # Configuración de Prometheus
├── grafana-dashboard.json   # Dashboard de métricas
├── alertmanager.yml        # Configuración de alertas
└── docker-compose.monitoring.yml  # Stack de monitoreo

optimization/
├── webpack.config.prod.js   # Configuración Webpack optimizada
├── .htaccess.prod          # Configuración Apache para GoDaddy
├── robots.txt              # SEO y crawling
└── sitemap-generator.php   # Generador automático de sitemap
```

### ESPECIFICACIONES TÉCNICAS DETALLADAS

#### 1. SCRIPT DE ANÁLISIS DE PERFORMANCE (analyze-performance.sh)

```bash
#!/bin/bash

# Sistema de Análisis de Performance - Grupo Naser CMS
# Analiza performance completa del sistema y genera recomendaciones

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_DIR="$PROJECT_ROOT/reports/performance/$TIMESTAMP"

log() {
    echo -e "${BLUE}[PERFORMANCE] $1${NC}"
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

header() {
    echo -e "${PURPLE}
╔══════════════════════════════════════════════════════════════════════════════╗
║                    🚀 ANÁLISIS DE PERFORMANCE - NASER CMS                    ║
║                           Optimizado por Warp                               ║
╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
}

# Función para reportar a Kiro
report_to_kiro() {
    local status="$1"
    local message="$2"
    if [ -f "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" ]; then
        node "$PROJECT_ROOT/.kiro/specs/auth-integration/update-status.js" "$status" warp "W.3" "$message"
    fi
}

# Análisis de recursos del sistema
analyze_system_resources() {
    log "🔍 Analizando recursos del sistema..."

    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
    local memory_usage=$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}')
    local disk_usage=$(df "$PROJECT_ROOT" | tail -1 | awk '{print $5}' | sed 's/%//')

    # Análisis de procesos
    local php_processes=$(pgrep -c php || echo "0")
    local node_processes=$(pgrep -c node || echo "0")
    local mysql_processes=$(pgrep -c mysql || echo "0")

    cat > "$REPORT_DIR/system-resources.json" << EOF
{
    "timestamp": "$(date -Iseconds)",
    "system": {
        "cpu_usage": "$cpu_usage",
        "memory_usage": "$memory_usage",
        "disk_usage": "$disk_usage"
    },
    "processes": {
        "php": $php_processes,
        "node": $node_processes,
        "mysql": $mysql_processes
    },
    "recommendations": []
}
EOF

    # Generar recomendaciones
    if (( $(echo "$memory_usage > 80" | bc -l) )); then
        warning "Alto uso de memoria: ${memory_usage}%"
        echo "    \"Optimizar uso de memoria - considerar aumentar límites o optimizar código\"" >> "$REPORT_DIR/recommendations.tmp"
    fi

    if [ "$disk_usage" -gt 85 ]; then
        warning "Poco espacio en disco: ${disk_usage}%"
        echo "    \"Limpiar archivos temporales y logs antiguos\"" >> "$REPORT_DIR/recommendations.tmp"
    fi

    success "Análisis de recursos completado"
}

# Análisis de performance de Docker
analyze_docker_performance() {
    log "🐳 Analizando performance de Docker..."

    if ! command -v docker &> /dev/null; then
        warning "Docker no está disponible"
        return 1
    fii

    # Estadísticas de contenedores
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.NetIO}}\t{{.BlockIO}}" > "$REPORT_DIR/docker-stats.txt"

    # Análisis de imágenes
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" > "$REPORT_DIR/docker-images.txt"

    # Análisis de volúmenes
    docker system df > "$REPORT_DIR/docker-disk-usage.txt"

    # Recomendaciones de optimización
    local large_images=$(docker images --format "{{.Size}}" | grep -E "[0-9]+GB" | wc -l)
    if [ "$large_images" -gt 0 ]; then
        warning "$large_images imágenes Docker grandes detectadas"
        echo "    \"Optimizar imágenes Docker - usar multi-stage builds y alpine base\"" >> "$REPORT_DIR/recommendations.tmp"
    fi

    success "Análisis de Docker completado"
}

# Análisis de performance de base de datos
analyze_database_performance() {
    log "🗄️ Analizando performance de base de datos..."

    # Verificar si MySQL está disponible
    if ! command -v mysql &> /dev/null && ! docker ps | grep -q mysql; then
        warning "MySQL no está disponible para análisis"
        return 1
    fi

    # Análisis de consultas lentas (si está disponible)
    if docker ps | grep -q mysql; then
        local db_container=$(docker ps --format "{{.Names}}" | grep -E "mysql|database" | head -1)
        if [ -n "$db_container" ]; then
            # Obtener estadísticas básicas
            docker exec "$db_container" mysql -e "SHOW GLOBAL STATUS LIKE 'Slow_queries';" > "$REPORT_DIR/mysql-slow-queries.txt" 2>/dev/null || true
            docker exec "$db_container" mysql -e "SHOW GLOBAL STATUS LIKE 'Questions';" > "$REPORT_DIR/mysql-questions.txt" 2>/dev/null || true
            docker exec "$db_container" mysql -e "SHOW GLOBAL STATUS LIKE 'Uptime';" > "$REPORT_DIR/mysql-uptime.txt" 2>/dev/null || true
        fi
    fi

    success "Análisis de base de datos completado"
}

# Análisis de performance web
analyze_web_performance() {
    log "🌐 Analizando performance web..."

    # Verificar endpoints y medir tiempo de respuesta
    local endpoints=(
        "http://localhost:8000:Backend API"
        "http://localhost:3000:Frontend App"
    )

    for endpoint_info in "${endpoints[@]}"; do
        local endpoint="${endpoint_info%%:*}"
        local name="${endpoint_info##*:}"

        log "Midiendo tiempo de respuesta: $name"

        # Medir tiempo de respuesta
        local response_time=$(curl -o /dev/null -s -w "%{time_total}" "$endpoint" 2>/dev/null || echo "timeout")

        if [ "$response_time" != "timeout" ]; then
            echo "$name: ${response_time}s" >> "$REPORT_DIR/response-times.txt"

            # Verificar si es lento
            if (( $(echo "$response_time > 2.0" | bc -l) )); then
                warning "$name responde lento: ${response_time}s"
                echo "    \"Optimizar $name - tiempo de respuesta > 2s\"" >> "$REPORT_DIR/recommendations.tmp"
            fi
        else
            warning "$name no responde"
            echo "$name: No disponible" >> "$REPORT_DIR/response-times.txt"
        fi
    done

    success "Análisis de performance web completado"
}

# Generar reporte consolidado
generate_performance_report() {
    log "📊 Generando reporte consolidado..."

    # Consolidar recomendaciones
    local recommendations=""
    if [ -f "$REPORT_DIR/recommendations.tmp" ]; then
        recommendations=$(cat "$REPORT_DIR/recommendations.tmp" | sort | uniq)
    fi

    cat > "$REPORT_DIR/performance-report.md" << EOF
# 🚀 Reporte de Análisis de Performance

**Timestamp**: $(date)
**Proyecto**: Grupo Naser CMS
**Analizado por**: Warp (DevOps)

## 📊 Resumen Ejecutivo

### Recursos del Sistema
$([ -f "$REPORT_DIR/system-resources.json" ] && echo "- CPU, Memoria y Disco analizados" || echo "- Análisis de recursos no disponible")

### Performance Docker
$([ -f "$REPORT_DIR/docker-stats.txt" ] && echo "- Contenedores analizados" || echo "- Docker no disponible")

### Performance Base de Datos
$([ -f "$REPORT_DIR/mysql-uptime.txt" ] && echo "- MySQL analizado" || echo "- Base de datos no disponible")

### Performance Web
$([ -f "$REPORT_DIR/response-times.txt" ] && echo "- Tiempos de respuesta medidos" || echo "- Endpoints no disponibles")

## 🎯 Recomendaciones de Optimización

$recommendations

## 📁 Archivos Generados

- \`system-resources.json\` - Métricas del sistema
- \`docker-stats.txt\` - Estadísticas de contenedores
- \`response-times.txt\` - Tiempos de respuesta web
- \`mysql-*.txt\` - Métricas de base de datos

## 🚀 Próximos Pasos

1. **Implementar optimizaciones** basadas en recomendaciones
2. **Configurar monitoreo continuo** de métricas
3. **Optimizar configuraciones** de producción
4. **Establecer alertas** para métricas críticas

---
*Generado automáticamente por Warp - Sistema de Análisis de Performance*
EOF

    success "Reporte consolidado generado: $REPORT_DIR/performance-report.md"
}

# Función principal
main() {
    header

    log "🚀 Iniciando análisis completo de performance..."

    # Crear directorio de reportes
    mkdir -p "$REPORT_DIR"

    # Reportar inicio
    report_to_kiro "start-task" "Iniciando análisis completo de performance del sistema"

    # Ejecutar análisis
    analyze_system_resources
    analyze_docker_performance
    analyze_database_performance
    analyze_web_performance

    # Generar reporte final
    generate_performance_report

    # Reportar completitud
    report_to_kiro "update-progress" "Análisis de performance completado - reporte disponible en reports/performance/$TIMESTAMP"

    success "🎉 Análisis de performance completado exitosamente"
    log "📄 Reporte disponible en: $REPORT_DIR/performance-report.md"

    exit 0
}

# Ejecutar función principal
main "$@"
```

#### 2. CONFIGURACIÓN DE PRODUCCIÓN DOCKER (Dockerfile.prod)

```dockerfile
# Dockerfile optimizado para producción - Grupo Naser CMS
FROM php:8.2-apache

# Metadatos
LABEL maintainer="Warp DevOps <devops@naser.com.mx>"
LABEL description="Contenedor optimizado para producción del CMS Grupo Naser"
LABEL version="1.0"

# Variables de entorno para producción
ENV DEBIAN_FRONTEND=noninteractive
ENV APACHE_DOCUMENT_ROOT=/var/www/html
ENV PHP_MEMORY_LIMIT=256M
ENV PHP_MAX_EXECUTION_TIME=60
ENV PHP_UPLOAD_MAX_FILESIZE=10M

# Instalar dependencias optimizadas
RUN apt-get update && apt-get install -y \
    # Dependencias esenciales
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    # Cliente MySQL
    default-mysql-client \
    # Herramientas de optimización
    jpegoptim \
    optipng \
    pngquant \
    gifsicle \
    # Limpieza
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/* \
    && rm -rf /var/tmp/*

# Configurar y instalar extensiones PHP optimizadas
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        zip \
        gd \
        xml \
        bcmath \
        opcache

# Configurar OPcache para producción
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.interned_strings_buffer=16" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=10000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.revalidate_freq=2" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.fast_shutdown=1" >> /usr/local/etc/php/conf.d/opcache.ini

# Configurar PHP para producción
RUN echo "memory_limit=$PHP_MEMORY_LIMIT" >> /usr/local/etc/php/conf.d/production.ini \
    && echo "max_execution_time=$PHP_MAX_EXECUTION_TIME" >> /usr/local/etc/php/conf.d/production.ini \
    && echo "upload_max_filesize=$PHP_UPLOAD_MAX_FILESIZE" >> /usr/local/etc/php/conf.d/production.ini \
    && echo "post_max_size=12M" >> /usr/local/etc/php/conf.d/production.ini \
    && echo "expose_php=Off" >> /usr/local/etc/php/conf.d/production.ini \
    && echo "display_errors=Off" >> /usr/local/etc/php/conf.d/production.ini \
    && echo "log_errors=On" >> /usr/local/etc/php/conf.d/production.ini \
    && echo "error_log=/var/log/php_errors.log" >> /usr/local/etc/php/conf.d/production.ini

# Instalar Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Configurar Apache para producción
RUN a2enmod rewrite headers deflate expires \
    && echo "ServerTokens Prod" >> /etc/apache2/apache2.conf \
    && echo "ServerSignature Off" >> /etc/apache2/apache2.conf

# Crear usuario no-root para seguridad
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Establecer directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos de configuración primero (para cache)
COPY api/composer.json api/composer.lock ./api/

# Instalar dependencias de producción
RUN cd api && composer install --no-dev --optimize-autoloader --no-interaction

# Copiar código fuente
COPY --chown=www-data:www-data . .

# Optimizar permisos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 /var/www/html/api/storage \
    && chmod -R 775 /var/www/html/public/uploads

# Configurar logs
RUN mkdir -p /var/log/apache2 /var/log/php \
    && touch /var/log/php_errors.log \
    && chown www-data:www-data /var/log/php_errors.log

# Healthcheck optimizado
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/api/v1/health || exit 1

# Exponer puerto
EXPOSE 80

# Comando de inicio optimizado
CMD ["apache2-foreground"]
```

### CRITERIOS DE ACEPTACIÓN

- [ ] Sistema completo de análisis de performance implementado
- [ ] Scripts para optimización de Docker y configuraciones
- [ ] Dockerfile optimizado para producción con OPcache
- [ ] Sistema de monitoreo de métricas en tiempo real
- [ ] Reportes automáticos de performance con recomendaciones
- [ ] Configuración optimizada para GoDaddy hosting
- [ ] Integración con sistema de hooks para notificaciones
- [ ] Documentación completa de optimizaciones

### COMANDOS PARA REPORTAR PROGRESO

```bash
# Al iniciar la tarea
node .kiro/specs/auth-integration/update-status.js start-task warp "W.3" "Iniciando optimización de performance y configuración de producción"

# Para reportar progreso
node .kiro/specs/auth-integration/update-status.js update-progress warp "W.3" "Scripts de análisis implementados, configurando Docker de producción"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task warp "W.3" "Sistema de optimización de performance completado con monitoreo y reportes"
```

## 🎯 PRÓXIMAS TAREAS DESPUÉS DE ESTA

1. **Tarea W.4**: Configuración de deployment automatizado para GoDaddy
2. **Tarea W.5**: Sistema de backup automático y recuperación
3. **Tarea W.6**: Security hardening y análisis de vulnerabilidades

---

**¡Continúa con tu excelente trabajo, Warp!** 🚀 Tu expertise en optimización será crucial para preparar el sistema para producción.

**Enfócate en**: Análisis detallado de performance, optimización de recursos, y preparación para deployment en GoDaddy.
