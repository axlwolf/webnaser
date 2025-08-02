# PROMPT WARP - BATCH 5: Infraestructura Avanzada + Deployment Pipeline

## 🎯 CONTEXTO DEL PROYECTO

El proyecto Grupo Naser CMS está en una fase crítica con **36.67% de progreso**. Claude está resolviendo problemas críticos de frontend y Gemini está desarrollando APIs robustas. Tu misión es crear la infraestructura avanzada y pipeline de deployment que soporte el crecimiento del proyecto.

## 📊 ESTADO ACTUAL

- **Progreso**: 36.67% (11/30 tareas completadas)
- **Infraestructura**: Docker básico implementado
- **Situación**: Necesidad de infraestructura avanzada para producción
- **Tu misión**: Crear pipeline completo de CI/CD y optimizaciones

## 🎯 OBJETIVOS DE ESTA SESIÓN

### FASE 1: INFRAESTRUCTURA AVANZADA

1. **Pipeline CI/CD completo con GitHub Actions**
2. **Optimización Docker para producción**
3. **Monitoreo y logging avanzado**
4. **Backup y recovery automatizado**

### FASE 2: DEPLOYMENT Y OPTIMIZACIÓN

1. **Deployment automatizado a GoDaddy**
2. **Performance monitoring**
3. **Security hardening**
4. **Documentación completa de DevOps**

## 🔧 TAREAS ESPECÍFICAS

### ✅ TAREA W1: Pipeline CI/CD con GitHub Actions

**Objetivo**: Crear pipeline completo de integración y deployment continuo

**Archivo**: `.github/workflows/ci-cd.yml`

**Pipeline Stages**:

```yaml
name: CI/CD Pipeline - Grupo Naser CMS

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"
          cache-dependency-path: src/frontend/package-lock.json

      - name: Install dependencies
        run: cd src/frontend && npm ci

      - name: Run linting
        run: cd src/frontend && npm run lint

      - name: Run tests
        run: cd src/frontend && npm run test:coverage

      - name: Build frontend
        run: cd src/frontend && npm run build

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

  test-backend:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: naser_test
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3

    steps:
      - uses: actions/checkout@v4
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: "8.1"
          extensions: pdo, pdo_mysql, mbstring

      - name: Install dependencies
        run: cd api && composer install --no-dev --optimize-autoloader

      - name: Run PHP CodeSniffer
        run: cd api && composer cs

      - name: Run PHP Mess Detector
        run: cd api && composer md

      - name: Run PHPUnit tests
        run: cd api && composer test
        env:
          DB_HOST: 127.0.0.1
          DB_DATABASE: naser_test
          DB_USERNAME: root
          DB_PASSWORD: root

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: "fs"
          scan-ref: "."
          format: "sarif"
          output: "trivy-results.sarif"

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: "trivy-results.sarif"

  build-and-deploy:
    needs: [test-frontend, test-backend, security-scan]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Build Docker images
        run: |
          docker build -f docker/frontend/Dockerfile.prod -t naser-frontend:latest .
          docker build -f docker/backend/Dockerfile.prod -t naser-backend:latest .

      - name: Run security scan on images
        run: |
          docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
            aquasec/trivy image naser-frontend:latest
          docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
            aquasec/trivy image naser-backend:latest

      - name: Deploy to staging
        run: ./scripts/deploy-staging.sh

      - name: Run E2E tests
        run: ./scripts/run-e2e-tests.sh

      - name: Deploy to production
        if: success()
        run: ./scripts/deploy-production.sh
```

### ✅ TAREA W2: Optimización Docker para Producción

**Objetivo**: Crear imágenes Docker optimizadas para producción

**Archivo**: `docker/frontend/Dockerfile.prod`

```dockerfile
# Multi-stage build para frontend
FROM node:18-alpine AS builder

WORKDIR /app
COPY src/frontend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY src/frontend/ .
RUN npm run build

# Nginx para servir archivos estáticos
FROM nginx:alpine AS production

# Instalar certificados SSL
RUN apk add --no-cache ca-certificates

# Copiar configuración Nginx optimizada
COPY docker/nginx/nginx.prod.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.prod.conf /etc/nginx/conf.d/default.conf

# Copiar archivos build
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar permisos
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Archivo**: `docker/backend/Dockerfile.prod`

```dockerfile
FROM php:8.1-fpm-alpine AS production

# Instalar extensiones PHP necesarias
RUN apk add --no-cache \
    mysql-client \
    nginx \
    supervisor \
    && docker-php-ext-install pdo pdo_mysql opcache

# Configurar OPcache para producción
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.max_accelerated_files=20000" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.revalidate_freq=0" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini

# Crear usuario no-root
RUN addgroup -g 1000 -S www && \
    adduser -u 1000 -D -S -G www www

WORKDIR /var/www/html

# Copiar código fuente
COPY api/ .
COPY --chown=www:www api/ .

# Instalar dependencias de producción
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Configurar permisos
RUN chown -R www:www /var/www/html && \
    chmod -R 755 /var/www/html

# Configuración de seguridad
RUN echo "expose_php=Off" >> /usr/local/etc/php/conf.d/security.ini && \
    echo "display_errors=Off" >> /usr/local/etc/php/conf.d/security.ini && \
    echo "log_errors=On" >> /usr/local/etc/php/conf.d/security.ini

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD php-fpm-healthcheck || exit 1

USER www
EXPOSE 9000

CMD ["php-fpm"]
```

### ✅ TAREA W3: Sistema de Monitoreo Avanzado

**Objetivo**: Implementar monitoreo completo de aplicación y infraestructura

**Archivo**: `docker/monitoring/docker-compose.monitoring.yml`

```yaml
version: "3.8"

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: naser-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
      - "--web.console.libraries=/etc/prometheus/console_libraries"
      - "--web.console.templates=/etc/prometheus/consoles"
      - "--storage.tsdb.retention.time=200h"
      - "--web.enable-lifecycle"

  grafana:
    image: grafana/grafana:latest
    container_name: naser-grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources

  node-exporter:
    image: prom/node-exporter:latest
    container_name: naser-node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - "--path.procfs=/host/proc"
      - "--path.rootfs=/rootfs"
      - "--path.sysfs=/host/sys"
      - "--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)"

  loki:
    image: grafana/loki:latest
    container_name: naser-loki
    ports:
      - "3100:3100"
    volumes:
      - ./monitoring/loki-config.yml:/etc/loki/local-config.yaml
    command: -config.file=/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    container_name: naser-promtail
    volumes:
      - /var/log:/var/log:ro
      - ./logs:/app/logs:ro
      - ./monitoring/promtail-config.yml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml

volumes:
  prometheus_data:
  grafana_data:
```

**Configuración de Alertas**: `monitoring/alerts.yml`

```yaml
groups:
  - name: naser-cms-alerts
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage detected"
          description: "CPU usage is above 80% for more than 5 minutes"

      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage detected"
          description: "Memory usage is above 85% for more than 5 minutes"

      - alert: DatabaseConnectionFailure
        expr: mysql_up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Database connection failure"
          description: "MySQL database is not responding"

      - alert: HighResponseTime
        expr: http_request_duration_seconds{quantile="0.95"} > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High response time detected"
          description: "95th percentile response time is above 2 seconds"
```

### ✅ TAREA W4: Backup y Recovery Automatizado

**Objetivo**: Sistema robusto de backup y recuperación

**Archivo**: `scripts/backup-system.sh`

```bash
#!/bin/bash

# Sistema de Backup Automatizado - Grupo Naser CMS
# Ejecutar diariamente via cron: 0 2 * * * /path/to/backup-system.sh

set -e

# Configuración
BACKUP_DIR="/backups/naser-cms"
DB_NAME="naser_cms"
DB_USER="root"
DB_PASS="${DB_PASSWORD}"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d_%H%M%S)

# Crear directorio de backup
mkdir -p "$BACKUP_DIR/database"
mkdir -p "$BACKUP_DIR/files"
mkdir -p "$BACKUP_DIR/logs"

echo "🚀 Iniciando backup del sistema - $DATE"

# 1. Backup de Base de Datos
echo "📊 Creando backup de base de datos..."
mysqldump -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" | gzip > "$BACKUP_DIR/database/db_backup_$DATE.sql.gz"

# 2. Backup de Archivos de Aplicación
echo "📁 Creando backup de archivos..."
tar -czf "$BACKUP_DIR/files/app_backup_$DATE.tar.gz" \
    --exclude='node_modules' \
    --exclude='vendor' \
    --exclude='.git' \
    --exclude='logs' \
    /var/www/html/

# 3. Backup de Configuraciones
echo "⚙️ Creando backup de configuraciones..."
tar -czf "$BACKUP_DIR/files/config_backup_$DATE.tar.gz" \
    /etc/nginx/ \
    /etc/php/ \
    docker-compose*.yml \
    .env*

# 4. Backup de Logs
echo "📋 Creando backup de logs..."
tar -czf "$BACKUP_DIR/logs/logs_backup_$DATE.tar.gz" logs/

# 5. Verificar integridad de backups
echo "🔍 Verificando integridad de backups..."
gzip -t "$BACKUP_DIR/database/db_backup_$DATE.sql.gz"
tar -tzf "$BACKUP_DIR/files/app_backup_$DATE.tar.gz" > /dev/null
tar -tzf "$BACKUP_DIR/files/config_backup_$DATE.tar.gz" > /dev/null

# 6. Limpiar backups antiguos
echo "🧹 Limpiando backups antiguos (>$RETENTION_DAYS días)..."
find "$BACKUP_DIR" -type f -mtime +$RETENTION_DAYS -delete

# 7. Subir a almacenamiento remoto (opcional)
if [ -n "$AWS_S3_BUCKET" ]; then
    echo "☁️ Subiendo backup a S3..."
    aws s3 sync "$BACKUP_DIR" "s3://$AWS_S3_BUCKET/naser-cms-backups/"
fi

# 8. Generar reporte
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
echo "✅ Backup completado exitosamente"
echo "📊 Tamaño total: $BACKUP_SIZE"
echo "📅 Fecha: $DATE"

# 9. Notificación (opcional)
if [ -n "$SLACK_WEBHOOK" ]; then
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"✅ Backup de Naser CMS completado - $DATE - Tamaño: $BACKUP_SIZE\"}" \
        "$SLACK_WEBHOOK"
fi

echo "🎉 Proceso de backup finalizado"
```

**Script de Recovery**: `scripts/recovery-system.sh`

```bash
#!/bin/bash

# Sistema de Recovery - Grupo Naser CMS
# Uso: ./recovery-system.sh [fecha_backup] [tipo: db|files|full]

set -e

BACKUP_DIR="/backups/naser-cms"
BACKUP_DATE="$1"
RECOVERY_TYPE="${2:-full}"

if [ -z "$BACKUP_DATE" ]; then
    echo "❌ Error: Especifica la fecha del backup (YYYYMMDD_HHMMSS)"
    echo "Uso: $0 20250731_020000 [db|files|full]"
    exit 1
fi

echo "🔄 Iniciando recovery del sistema - $BACKUP_DATE"

case $RECOVERY_TYPE in
    "db")
        echo "📊 Restaurando base de datos..."
        gunzip -c "$BACKUP_DIR/database/db_backup_$BACKUP_DATE.sql.gz" | mysql -u root -p naser_cms
        ;;
    "files")
        echo "📁 Restaurando archivos..."
        tar -xzf "$BACKUP_DIR/files/app_backup_$BACKUP_DATE.tar.gz" -C /
        ;;
    "full")
        echo "🔄 Restauración completa..."
        # Restaurar base de datos
        gunzip -c "$BACKUP_DIR/database/db_backup_$BACKUP_DATE.sql.gz" | mysql -u root -p naser_cms
        # Restaurar archivos
        tar -xzf "$BACKUP_DIR/files/app_backup_$BACKUP_DATE.tar.gz" -C /
        # Restaurar configuraciones
        tar -xzf "$BACKUP_DIR/files/config_backup_$BACKUP_DATE.tar.gz" -C /
        ;;
    *)
        echo "❌ Tipo de recovery inválido: $RECOVERY_TYPE"
        exit 1
        ;;
esac

echo "✅ Recovery completado exitosamente"
```

### ✅ TAREA W5: Deployment Automatizado a GoDaddy

**Objetivo**: Pipeline de deployment específico para GoDaddy hosting

**Archivo**: `scripts/deploy-godaddy.sh`

```bash
#!/bin/bash

# Deployment automatizado a GoDaddy - Grupo Naser CMS
# Uso: ./deploy-godaddy.sh [staging|production]

set -e

ENVIRONMENT="${1:-staging}"
BUILD_DIR="build"
GODADDY_HOST="${GODADDY_HOST}"
GODADDY_USER="${GODADDY_USER}"
GODADDY_PATH="${GODADDY_PATH}"

echo "🚀 Iniciando deployment a GoDaddy ($ENVIRONMENT)"

# 1. Preparar build de producción
echo "📦 Creando build de producción..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Build frontend
cd src/frontend
npm run build
cp -r dist/* "../$BUILD_DIR/"
cd ../..

# Preparar backend
cp -r api/* "$BUILD_DIR/"
cd "$BUILD_DIR"
composer install --no-dev --optimize-autoloader
cd ..

# 2. Optimizar para GoDaddy
echo "⚙️ Optimizando para GoDaddy hosting..."

# Crear .htaccess para Apache
cat > "$BUILD_DIR/.htaccess" << 'EOF'
# Grupo Naser CMS - GoDaddy Configuration

# Habilitar compresión
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Rewrite rules para React Router
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # API routes
    RewriteRule ^api/(.*)$ api/index.php [QSA,L]

    # React Router - todas las rutas van a index.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# Bloquear acceso a archivos sensibles
<Files ".env">
    Order allow,deny
    Deny from all
</Files>

<Files "composer.json">
    Order allow,deny
    Deny from all
</Files>
EOF

# 3. Configurar variables de entorno para GoDaddy
echo "🔧 Configurando variables de entorno..."
cat > "$BUILD_DIR/.env.production" << EOF
# Grupo Naser CMS - Production Environment

# Database
DB_HOST=${GODADDY_DB_HOST}
DB_DATABASE=${GODADDY_DB_NAME}
DB_USERNAME=${GODADDY_DB_USER}
DB_PASSWORD=${GODADDY_DB_PASS}

# Application
APP_ENV=production
APP_DEBUG=false
APP_URL=${GODADDY_APP_URL}

# Security
JWT_SECRET=${JWT_SECRET}
ENCRYPTION_KEY=${ENCRYPTION_KEY}

# Email
MAIL_HOST=${GODADDY_MAIL_HOST}
MAIL_PORT=587
MAIL_USERNAME=${GODADDY_MAIL_USER}
MAIL_PASSWORD=${GODADDY_MAIL_PASS}
EOF

# 4. Crear package para upload
echo "📦 Creando package para upload..."
tar -czf "naser-cms-$ENVIRONMENT-$(date +%Y%m%d_%H%M%S).tar.gz" -C "$BUILD_DIR" .

# 5. Upload via SFTP
echo "📤 Subiendo archivos a GoDaddy..."
if command -v lftp &> /dev/null; then
    lftp -c "
        set sftp:auto-confirm yes;
        open sftp://$GODADDY_USER@$GODADDY_HOST;
        cd $GODADDY_PATH;
        put naser-cms-$ENVIRONMENT-*.tar.gz;
        quit
    "
else
    echo "⚠️ LFTP no encontrado. Usando rsync..."
    rsync -avz --delete "$BUILD_DIR/" "$GODADDY_USER@$GODADDY_HOST:$GODADDY_PATH/"
fi

# 6. Ejecutar comandos post-deployment
echo "🔄 Ejecutando comandos post-deployment..."
ssh "$GODADDY_USER@$GODADDY_HOST" << 'EOF'
cd $GODADDY_PATH
tar -xzf naser-cms-*.tar.gz
rm naser-cms-*.tar.gz
chmod -R 755 .
chown -R $USER:$USER .
EOF

# 7. Verificar deployment
echo "🔍 Verificando deployment..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$GODADDY_APP_URL")
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Deployment exitoso - Sitio respondiendo correctamente"
else
    echo "❌ Error en deployment - HTTP Status: $HTTP_STATUS"
    exit 1
fi

# 8. Limpiar archivos temporales
rm -rf "$BUILD_DIR"
rm -f naser-cms-*.tar.gz

echo "🎉 Deployment a GoDaddy completado exitosamente"
```

### ✅ TAREA W6: Performance Monitoring

**Objetivo**: Sistema de monitoreo de performance en tiempo real

**Archivo**: `monitoring/performance-monitor.js`

```javascript
// Performance Monitor - Grupo Naser CMS
// Monitoreo en tiempo real de métricas de performance

const express = require("express");
const prometheus = require("prom-client");
const responseTime = require("response-time");

const app = express();

// Métricas de Prometheus
const httpRequestDuration = new prometheus.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

const httpRequestsTotal = new prometheus.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const activeConnections = new prometheus.Gauge({
  name: "active_connections",
  help: "Number of active connections",
});

// Middleware para métricas
app.use(
  responseTime((req, res, time) => {
    const route = req.route ? req.route.path : req.path;
    const labels = {
      method: req.method,
      route: route,
      status_code: res.statusCode,
    };

    httpRequestDuration.observe(labels, time / 1000);
    httpRequestsTotal.inc(labels);
  })
);

// Endpoint de métricas
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || "1.0.0",
  });
});

// Métricas de sistema
setInterval(() => {
  const memUsage = process.memoryUsage();

  // Registrar métricas de memoria
  prometheus.register
    .getSingleMetric("nodejs_heap_size_used_bytes")
    ?.set(memUsage.heapUsed);
  prometheus.register
    .getSingleMetric("nodejs_heap_size_total_bytes")
    ?.set(memUsage.heapTotal);

  // Registrar conexiones activas (simulado)
  activeConnections.set(Math.floor(Math.random() * 100));
}, 5000);

const PORT = process.env.METRICS_PORT || 9091;
app.listen(PORT, () => {
  console.log(`📊 Performance Monitor running on port ${PORT}`);
});
```

### ✅ TAREA W7: Security Hardening

**Objetivo**: Implementar medidas de seguridad avanzadas

**Archivo**: `security/security-hardening.sh`

```bash
#!/bin/bash

# Security Hardening - Grupo Naser CMS
# Implementa medidas de seguridad avanzadas

set -e

echo "🔒 Iniciando Security Hardening..."

# 1. Configurar firewall
echo "🛡️ Configurando firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3306/tcp  # MySQL (solo desde localhost)
ufw --force enable

# 2. Configurar fail2ban
echo "🚫 Configurando fail2ban..."
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
EOF

systemctl restart fail2ban

# 3. Configurar SSL/TLS
echo "🔐 Configurando SSL/TLS..."
# Generar certificado auto-firmado para desarrollo
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/naser.key \
    -out /etc/ssl/certs/naser.crt \
    -subj "/C=MX/ST=CDMX/L=Mexico/O=Grupo Naser/CN=naser.com.mx"

# 4. Configurar headers de seguridad en Nginx
cat > /etc/nginx/conf.d/security-headers.conf << 'EOF'
# Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# Ocultar versión de Nginx
server_tokens off;
EOF

# 5. Configurar rate limiting
cat > /etc/nginx/conf.d/rate-limiting.conf << 'EOF'
# Rate Limiting
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=general:10m rate=1r/s;

# Aplicar límites
location /api/auth/login {
    limit_req zone=login burst=3 nodelay;
}

location /api/ {
    limit_req zone=api burst=20 nodelay;
}

location / {
    limit_req zone=general burst=10 nodelay;
}
EOF

# 6. Configurar logging de seguridad
echo "📋 Configurando logging de seguridad..."
mkdir -p /var/log/naser-security

# Configurar logrotate
cat > /etc/logrotate.d/naser-security << 'EOF'
/var/log/naser-security/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
EOF

# 7. Configurar monitoreo de integridad de archivos
echo "🔍 Configurando monitoreo de integridad..."
cat > /etc/cron.daily/file-integrity-check << 'EOF'
#!/bin/bash
# File Integrity Check

WATCH_DIRS="/var/www/html /etc/nginx /etc/php"
CHECKSUM_FILE="/var/log/naser-security/checksums.txt"
ALERT_EMAIL="admin@naser.com.mx"

# Generar checksums actuales
find $WATCH_DIRS -type f -exec md5sum {} \; > /tmp/current_checksums.txt

# Comparar con checksums anteriores
if [ -f "$CHECKSUM_FILE" ]; then
    if ! diff -q "$CHECKSUM_FILE" /tmp/current_checksums.txt > /dev/null; then
        echo "⚠️ ALERTA: Cambios detectados en archivos críticos" | \
            mail -s "Naser CMS - File Integrity Alert" "$ALERT_EMAIL"

        # Log de cambios
        diff "$CHECKSUM_FILE" /tmp/current_checksums.txt >> \
            /var/log/naser-security/integrity-changes.log
    fi
fi

# Actualizar checksums
mv /tmp/current_checksums.txt "$CHECKSUM_FILE"
EOF

chmod +x /etc/cron.daily/file-integrity-check

# 8. Configurar backup de configuraciones de seguridad
echo "💾 Configurando backup de seguridad..."
cat > /etc/cron.weekly/security-config-backup << 'EOF'
#!/bin/bash
# Security Configuration Backup

BACKUP_DIR="/backups/security-config"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

# Backup de configuraciones críticas
tar -czf "$BACKUP_DIR/security-config-$DATE.tar.gz" \
    /etc/nginx/ \
    /etc/fail2ban/ \
    /etc/ufw/ \
    /etc/ssl/ \
    /var/log/naser-security/

# Limpiar backups antiguos (>30 días)
find "$BACKUP_DIR" -type f -mtime +30 -delete
EOF

chmod +x /etc/cron.weekly/security-config-backup

echo "✅ Security Hardening completado"
echo "🔒 Medidas implementadas:"
echo "  - Firewall configurado"
echo "  - Fail2ban activo"
echo "  - SSL/TLS configurado"
echo "  - Headers de seguridad"
echo "  - Rate limiting"
echo "  - Logging de seguridad"
echo "  - Monitoreo de integridad"
echo "  - Backup de configuraciones"
```

## 📋 CRITERIOS DE ÉXITO

### Infraestructura

- ✅ Pipeline CI/CD funcionando completamente
- ✅ Docker optimizado para producción
- ✅ Monitoreo en tiempo real operativo
- ✅ Sistema de backup automatizado
- ✅ Deployment a GoDaddy funcional

### Seguridad

- ✅ Security hardening implementado
- ✅ Certificados SSL configurados
- ✅ Rate limiting activo
- ✅ Monitoreo de integridad funcionando
- ✅ Logs de seguridad completos

### Performance

- ✅ Métricas de performance capturadas
- ✅ Alertas configuradas
- ✅ Dashboards de Grafana operativos
- ✅ Optimizaciones aplicadas
- ✅ Health checks funcionando

## 🚀 COMANDOS ÚTILES

```bash
# CI/CD
git push origin main  # Trigger pipeline

# Monitoreo
docker-compose -f docker/monitoring/docker-compose.monitoring.yml up -d

# Backup
./scripts/backup-system.sh

# Recovery
./scripts/recovery-system.sh 20250731_020000 full

# Deployment
./scripts/deploy-godaddy.sh production

# Security
./security/security-hardening.sh
```

## 🎯 RESULTADO ESPERADO

Al final de esta sesión:

1. **Infraestructura robusta** - Pipeline CI/CD completo y funcional
2. **Monitoreo avanzado** - Métricas, alertas y dashboards operativos
3. **Seguridad hardened** - Medidas de seguridad implementadas
4. **Deployment automatizado** - Pipeline a GoDaddy funcional
5. **Documentación completa** - Procesos documentados y automatizados

**¡Tu expertise en DevOps es fundamental para la escalabilidad y confiabilidad del proyecto!**

---

**Prioridad**: 🟡 ALTA  
**Estimación**: 6-8 horas  
**Dependencias**: Docker básico (completado)  
**Siguiente**: Optimización continua y mantenimiento
