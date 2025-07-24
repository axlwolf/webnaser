# Agent Hook: Warp Integration

## Configuración del Hook

**Nombre**: Warp AI Terminal Integration  
**Trigger**: Comandos de terminal y operaciones de desarrollo  
**Agente**: Warp (Tercer Agente)  
**Propósito**: Automatizar operaciones de terminal, deployment y DevOps para el proyecto

## Rol de Warp en la Orquestación

### Responsabilidades Principales

1. **Automatización de DevOps**: Docker, deployment, CI/CD
2. **Gestión de Dependencias**: npm, composer, actualizaciones
3. **Monitoreo de Performance**: Métricas, logs, alertas
4. **Operaciones de Base de Datos**: Migraciones, backups, optimización
5. **Testing Automatizado**: Ejecución de tests, reportes de cobertura
6. **Deployment a GoDaddy**: Preparación y subida de archivos

## Integración con Sistema de Seguimiento

### Actualización de Estado

```bash
# Warp reporta automáticamente sus operaciones
warp-status() {
    node .kiro/specs/auth-integration/update-status.js start-task warp "$1" "$2"
}

warp-complete() {
    node .kiro/specs/auth-integration/update-status.js complete-task warp "$1" "$2"
}

warp-progress() {
    node .kiro/specs/auth-integration/update-status.js update-progress warp "$1" "$2"
}
```

## Hooks Específicos de Warp

### 1. Docker Operations Hook

```json
{
  "name": "warp-docker-operations",
  "trigger": {
    "type": "command",
    "commands": ["docker-compose", "docker"],
    "auto_execute": true
  },
  "actions": [
    "monitor_containers",
    "optimize_performance",
    "manage_volumes",
    "update_status"
  ]
}
```

**Implementación**:

```bash
#!/bin/bash
# .kiro/hooks/warp-docker-monitor.sh

warp-status "docker-monitor" "Monitoreando contenedores Docker"

# Verificar estado de contenedores
CONTAINERS_STATUS=$(docker-compose ps --services --filter "status=running")

if [[ "$CONTAINERS_STATUS" == *"naser_backend"* ]] && [[ "$CONTAINERS_STATUS" == *"naser_frontend"* ]]; then
    warp-progress "docker-monitor" "Todos los contenedores están ejecutándose correctamente"

    # Verificar performance
    MEMORY_USAGE=$(docker stats --no-stream --format "table {{.Container}}\t{{.MemUsage}}")

    # Reportar métricas
    echo "📊 Estado de Contenedores:" > /tmp/docker-status.log
    echo "$MEMORY_USAGE" >> /tmp/docker-status.log

    warp-complete "docker-monitor" "Monitoreo Docker completado - todos los servicios operativos"
else
    warp-status "docker-repair" "Detectados problemas en contenedores, iniciando reparación"
    docker-compose down
    docker-compose up -d
    warp-complete "docker-repair" "Contenedores reiniciados y operativos"
fi
```

### 2. Dependency Management Hook

```json
{
  "name": "warp-dependency-manager",
  "trigger": {
    "type": "file_change",
    "files": [
      "package.json",
      "composer.json",
      "package-lock.json",
      "composer.lock"
    ]
  },
  "actions": [
    "update_dependencies",
    "check_vulnerabilities",
    "optimize_bundles"
  ]
}
```

**Implementación**:

```bash
#!/bin/bash
# .kiro/hooks/warp-dependency-manager.sh

warp-status "dependency-update" "Actualizando dependencias del proyecto"

# Frontend dependencies
if [[ -f "src/frontend/package.json" ]]; then
    cd src/frontend
    npm audit fix
    npm update
    npm run build
    cd ../..
    warp-progress "dependency-update" "Dependencias frontend actualizadas"
fi

# Backend dependencies
if [[ -f "api/composer.json" ]]; then
    docker exec naser_backend composer update
    docker exec naser_backend composer audit
    warp-progress "dependency-update" "Dependencias backend actualizadas"
fi

warp-complete "dependency-update" "Todas las dependencias actualizadas y verificadas"
```

### 3. Testing Automation Hook

```json
{
  "name": "warp-testing-automation",
  "trigger": {
    "type": "schedule",
    "cron": "0 */2 * * *",
    "on_demand": true
  },
  "actions": [
    "run_all_tests",
    "generate_coverage",
    "update_metrics",
    "notify_results"
  ]
}
```

**Implementación**:

```bash
#!/bin/bash
# .kiro/hooks/warp-testing-automation.sh

warp-status "testing-suite" "Ejecutando suite completa de tests"

# Backend tests
echo "🧪 Ejecutando tests backend..."
BACKEND_RESULTS=$(./scripts/test-docker.sh --coverage-text)
BACKEND_EXIT_CODE=$?

# Frontend tests
echo "🧪 Ejecutando tests frontend..."
cd src/frontend
FRONTEND_RESULTS=$(npm test -- --coverage --watchAll=false)
FRONTEND_EXIT_CODE=$?
cd ../..

# Generar reporte consolidado
cat > /tmp/test-report.md << EOF
# Reporte de Tests - $(date)

## Backend Tests
Exit Code: $BACKEND_EXIT_CODE
\`\`\`
$BACKEND_RESULTS
\`\`\`

## Frontend Tests
Exit Code: $FRONTEND_EXIT_CODE
\`\`\`
$FRONTEND_RESULTS
\`\`\`
EOF

if [[ $BACKEND_EXIT_CODE -eq 0 ]] && [[ $FRONTEND_EXIT_CODE -eq 0 ]]; then
    warp-complete "testing-suite" "Todos los tests pasaron correctamente - proyecto estable"
else
    warp-status "testing-fix" "Detectados fallos en tests, notificando al equipo"
    # Notificar a Kiro sobre fallos
    node .kiro/specs/auth-integration/update-status.js add-comment warp "Tests fallaron - requiere atención del equipo"
fi
```

### 4. Deployment Preparation Hook

```json
{
  "name": "warp-deployment-prep",
  "trigger": {
    "type": "manual",
    "command": "warp-deploy-prep"
  },
  "actions": [
    "build_production",
    "optimize_assets",
    "prepare_godaddy_package",
    "validate_deployment"
  ]
}
```

**Implementación**:

```bash
#!/bin/bash
# .kiro/hooks/warp-deployment-prep.sh

warp-status "deployment-prep" "Preparando deployment para GoDaddy"

# Crear directorio de deployment
mkdir -p deployment/godaddy

# Build frontend para producción
cd src/frontend
npm run build
cp -r dist/* ../../deployment/godaddy/
cd ../..

# Preparar backend para GoDaddy
cp -r api/* deployment/godaddy/api/
cd deployment/godaddy/api
composer install --no-dev --optimize-autoloader
cd ../../..

# Optimizar para GoDaddy
warp-progress "deployment-prep" "Optimizando archivos para shared hosting"

# Crear .htaccess optimizado
cat > deployment/godaddy/.htaccess << 'EOF'
# GoDaddy Optimized .htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^api/(.*)$ api/index.php [QSA,L]
RewriteRule ^(.*)$ index.html [QSA,L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Compression
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
EOF

# Crear package para upload
cd deployment
tar -czf godaddy-deployment-$(date +%Y%m%d-%H%M%S).tar.gz godaddy/
cd ..

warp-complete "deployment-prep" "Package de deployment listo para GoDaddy"
```

## Configuración de Warp en Sistema de Seguimiento

### Actualizar status.json para incluir Warp

```json
{
  "team_status": {
    "kiro": { ... },
    "claude": { ... },
    "gemini": { ... },
    "warp": {
      "current_task": null,
      "status": "active",
      "last_update": null,
      "next_task": "Monitoreo continuo de infraestructura",
      "notes": "Agente DevOps - automatización y deployment"
    }
  }
}
```

### Tareas Específicas de Warp

```markdown
## Tareas de Warp (DevOps)

- [ ] W.1 Configurar monitoreo continuo de contenedores
- [ ] W.2 Automatizar testing suite completa
- [ ] W.3 Optimizar performance de desarrollo
- [ ] W.4 Preparar pipeline de deployment
- [ ] W.5 Configurar backup automático de base de datos
- [ ] W.6 Implementar alertas de sistema
- [ ] W.7 Optimizar bundle sizes para GoDaddy
- [ ] W.8 Configurar SSL y security headers
```

## Comandos de Warp

```bash
# Comandos principales de Warp
warp-monitor          # Monitoreo general del sistema
warp-test-all         # Ejecutar todos los tests
warp-deploy-prep      # Preparar deployment
warp-optimize         # Optimizar performance
warp-backup           # Backup de base de datos
warp-security-scan    # Escaneo de seguridad
warp-metrics          # Generar métricas del proyecto
```

## Integración con Orquestación

Warp se integra perfectamente con el sistema de orquestación existente:

1. **Reporta automáticamente** su estado usando los scripts de update-status
2. **Monitorea continuamente** la infraestructura y performance
3. **Ejecuta tareas automáticas** basadas en triggers de archivos
4. **Notifica al orquestador** sobre problemas o completitud de tareas
5. **Prepara deployments** cuando el código está listo

Esto convierte el sistema en una **orquestación de 4 agentes**:

- **Kiro**: Orquestador principal
- **Claude**: Frontend React
- **Gemini**: Backend PHP
- **Warp**: DevOps y automatización
