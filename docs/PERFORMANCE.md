# 📊 Sistema de Performance y Optimización

## Resumen Ejecutivo

Este documento describe el sistema completo de análisis, monitoreo y optimización de performance implementado en el **CMS de Grupo Naser**. El sistema incluye análisis automático de recursos, optimización de Docker, monitoreo en tiempo real y generación de reportes detallados.

**Estado del Documento**: Actualizado el 25 de julio de 2025  
**Responsable**: Warp (DevOps Specialist)  
**Integración**: Sistema de hooks de Kiro para notificaciones automáticas

## Arquitectura del Sistema de Performance

### Componentes Principales

```
scripts/performance/
├── analyze-performance.sh     # Análisis completo del sistema
├── optimize-docker.sh         # Optimización de contenedores
├── monitor-metrics.sh         # Monitoreo en tiempo real
├── optimize-database.sh       # Optimización de MySQL
└── generate-performance-report.sh  # Reportes consolidados

reports/performance/
├── [timestamp]/
│   ├── performance-report.md   # Reporte principal
│   ├── system-resources.json  # Métricas del sistema
│   ├── docker-stats.txt       # Estadísticas de contenedores
│   ├── response-times.txt     # Tiempos de respuesta
│   └── mysql-*.txt           # Métricas de base de datos

monitoring/
├── prometheus.yml             # Configuración de Prometheus
├── grafana-dashboard.json     # Dashboard de métricas
├── alertmanager.yml          # Configuración de alertas
└── docker-compose.monitoring.yml  # Stack de monitoreo
```

## Scripts de Performance

### 1. Análisis Completo de Performance

```bash
# Ejecutar análisis completo
./scripts/performance/analyze-performance.sh

# Características:
# - Análisis de recursos del sistema (CPU, memoria, disco)
# - Estadísticas de contenedores Docker
# - Métricas de base de datos MySQL
# - Tiempos de respuesta de endpoints web
# - Generación automática de recomendaciones
```

**Métricas Analizadas:**

- **Sistema**: CPU, memoria, disco, procesos
- **Docker**: Uso de recursos por contenedor, imágenes, volúmenes
- **Base de Datos**: Consultas lentas, uptime, estadísticas
- **Web**: Tiempos de respuesta de endpoints críticos

### 2. Optimización de Docker

```bash
# Optimizar configuración Docker
./scripts/performance/optimize-docker.sh

# Optimizaciones incluidas:
# - Limpieza de imágenes no utilizadas
# - Optimización de Dockerfile para producción
# - Configuración de límites de recursos
# - Habilitación de OPcache para PHP
```

**Optimizaciones Aplicadas:**

- **Multi-stage builds**: Reducción del tamaño de imágenes
- **Alpine Linux**: Imágenes base más ligeras
- **OPcache**: Aceleración de PHP habilitada
- **Resource limits**: Límites de CPU y memoria configurados

### 3. Monitoreo en Tiempo Real

```bash
# Iniciar monitoreo continuo
./scripts/performance/monitor-metrics.sh

# Métricas monitoreadas:
# - Uso de recursos en tiempo real
# - Estado de contenedores
# - Tiempos de respuesta de API
# - Alertas automáticas por umbrales
```

## Configuración de Producción Optimizada

### Dockerfile de Producción

```dockerfile
# Optimizaciones implementadas en docker/production/Dockerfile.prod

# OPcache para PHP
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=10000
opcache.revalidate_freq=2

# Configuración PHP optimizada
memory_limit=256M
max_execution_time=60
upload_max_filesize=10M
expose_php=Off
display_errors=Off
```

### Configuración Apache Optimizada

```apache
# Configuración en docker/production/apache.prod.conf

# Compresión
LoadModule deflate_module modules/mod_deflate.so
<Location />
    SetOutputFilter DEFLATE
    SetEnvIfNoCase Request_URI \
        \.(?:gif|jpe?g|png)$ no-gzip dont-vary
</Location>

# Cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

## Métricas y Umbrales

### Umbrales de Alerta

| Métrica          | Advertencia | Crítico | Acción             |
| ---------------- | ----------- | ------- | ------------------ |
| CPU              | >70%        | >90%    | Optimizar procesos |
| Memoria          | >80%        | >95%    | Aumentar límites   |
| Disco            | >85%        | >95%    | Limpiar archivos   |
| Tiempo Respuesta | >2s         | >5s     | Optimizar código   |
| Consultas DB     | >100ms      | >500ms  | Optimizar queries  |

### Métricas de Performance

```json
{
  "timestamp": "2025-07-25T10:30:00-06:00",
  "system": {
    "cpu_usage": "45.2%",
    "memory_usage": "67.8%",
    "disk_usage": "34.1%",
    "load_average": "1.23"
  },
  "docker": {
    "containers_running": 4,
    "total_memory_usage": "1.2GB",
    "total_cpu_usage": "23.4%"
  },
  "database": {
    "connections": 12,
    "slow_queries": 0,
    "uptime": "72h 15m",
    "query_cache_hit_rate": "94.2%"
  },
  "web": {
    "frontend_response_time": "0.245s",
    "backend_response_time": "0.123s",
    "api_response_time": "0.089s"
  }
}
```

## Reportes de Performance

### Reporte Automático

Los reportes se generan automáticamente en `reports/performance/[timestamp]/`:

```markdown
# 🚀 Reporte de Análisis de Performance

**Timestamp**: 2025-07-25 10:30:00
**Proyecto**: Grupo Naser CMS
**Analizado por**: Warp (DevOps)

## 📊 Resumen Ejecutivo

### Recursos del Sistema

- CPU: 45.2% (Normal)
- Memoria: 67.8% (Normal)
- Disco: 34.1% (Normal)

### Performance Docker

- 4 contenedores ejecutándose
- Uso total de memoria: 1.2GB
- Uso total de CPU: 23.4%

### Performance Web

- Frontend: 0.245s (Excelente)
- Backend: 0.123s (Excelente)
- API: 0.089s (Excelente)

## 🎯 Recomendaciones

- ✅ Sistema funcionando óptimamente
- ✅ Todos los umbrales dentro de rangos normales
- ✅ Tiempos de respuesta excelentes

## 🚀 Próximos Pasos

1. Continuar monitoreo regular
2. Implementar cache de aplicación
3. Optimizar consultas de base de datos
```

### Dashboard de Métricas

```bash
# Iniciar dashboard de monitoreo
docker-compose -f monitoring/docker-compose.monitoring.yml up -d

# Acceder a:
# - Prometheus: http://localhost:9090
# - Grafana: http://localhost:3001
# - AlertManager: http://localhost:9093
```

## Optimizaciones Específicas

### Para GoDaddy Hosting

```apache
# Configuración .htaccess optimizada para GoDaddy
RewriteEngine On

# Compresión GZIP
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

# Cache de navegador
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/icon "access plus 1 year"
    ExpiresByType text/plain "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
</IfModule>
```

### Optimización de Base de Datos

```sql
-- Índices optimizados para consultas frecuentes
CREATE INDEX idx_pages_status_slug ON pages(status, slug);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_locations_active ON locations(active);

-- Configuración MySQL optimizada
SET GLOBAL query_cache_size = 268435456;
SET GLOBAL query_cache_type = ON;
SET GLOBAL innodb_buffer_pool_size = 536870912;
```

## Automatización y Integración

### Integración con Sistema de Hooks

```javascript
// .kiro/hooks/performance-monitor.js
// Hook automático para monitoreo de performance

const performanceHook = {
  trigger: "on-deploy",
  action: "run-performance-analysis",
  script: "./scripts/performance/analyze-performance.sh",
  notify: true,
  threshold: {
    response_time: "2s",
    memory_usage: "80%",
    cpu_usage: "70%",
  },
};
```

### Monitoreo Continuo

```bash
# Script de monitoreo continuo
./scripts/performance/continuous-monitoring.sh

# Características:
# - Ejecuta análisis cada 5 minutos
# - Genera alertas automáticas
# - Integra con sistema de hooks de Kiro
# - Reportes diarios automáticos
```

## Comandos de Performance

### Análisis Rápido

```bash
# Análisis completo del sistema
./scripts/performance/analyze-performance.sh

# Solo métricas del sistema
./scripts/performance/system-metrics.sh

# Solo análisis Docker
./scripts/performance/docker-analysis.sh

# Solo tiempos de respuesta web
./scripts/performance/web-performance.sh
```

### Optimización

```bash
# Optimización completa
./scripts/performance/optimize-all.sh

# Solo optimización Docker
./scripts/performance/optimize-docker.sh

# Solo optimización de base de datos
./scripts/performance/optimize-database.sh

# Limpiar archivos temporales
./scripts/performance/cleanup-temp.sh
```

### Monitoreo

```bash
# Monitoreo en tiempo real
./scripts/performance/monitor-realtime.sh

# Generar reporte de performance
./scripts/performance/generate-report.sh

# Verificar umbrales de alerta
./scripts/performance/check-thresholds.sh
```

## Troubleshooting de Performance

### Problemas Comunes

1. **Alto uso de memoria**:

   ```bash
   # Identificar procesos que consumen memoria
   docker stats --no-stream

   # Optimizar configuración PHP
   ./scripts/performance/optimize-php-memory.sh
   ```

2. **Tiempos de respuesta lentos**:

   ```bash
   # Analizar tiempos de respuesta
   ./scripts/performance/analyze-response-times.sh

   # Optimizar consultas de base de datos
   ./scripts/performance/optimize-database-queries.sh
   ```

3. **Alto uso de CPU**:

   ```bash
   # Identificar procesos que consumen CPU
   docker exec naser_backend top

   # Optimizar configuración Apache
   ./scripts/performance/optimize-apache.sh
   ```

## Roadmap de Performance

### Próximas Implementaciones

1. **Cache de Aplicación**: Redis para cache de sesiones y datos
2. **CDN Integration**: Configuración para CDN de GoDaddy
3. **Database Sharding**: Preparación para escalabilidad
4. **Load Balancing**: Configuración para múltiples instancias
5. **Advanced Monitoring**: Métricas de negocio y user experience

### Métricas Objetivo

- **Tiempo de Respuesta**: <1s para todas las páginas
- **Uso de Memoria**: <70% en promedio
- **Uso de CPU**: <50% en promedio
- **Uptime**: >99.9%
- **Time to First Byte**: <200ms

---

**Última Actualización**: 25 de julio de 2025  
**Próxima Revisión**: Semanal o después de cambios significativos  
**Responsable**: Warp (DevOps Specialist)  
**Integración**: Sistema de hooks de Kiro para automatización
