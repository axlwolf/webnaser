# 🎛️ Admin Dashboard Configuration - DevOps Setup

**Fecha**: 1 de agosto de 2025  
**Estado**: ✅ Configuración completada por Warp  
**Relacionado**: `WARP-TASK-ADMIN-DASHBOARD-CONFIG.md`, `docs/ADMIN-DASHBOARD.md`

## 📊 Resumen de Cambios

Este documento resume las configuraciones DevOps implementadas para optimizar el desarrollo y deployment del Admin Dashboard de Grupo Naser CMS.

## 🚀 Scripts Agregados al Package.json Raíz

### Scripts de Admin Dashboard

```json
{
  "scripts": {
    // === ADMIN DASHBOARD SCRIPTS ===
    "dev:admin": "cd src/admin && npm run dev",
    "build:admin": "cd src/admin && npm run build",
    "test:admin": "cd src/admin && npm run test",
    "lint:admin": "cd src/admin && npm run lint",

    // === COMBINED SCRIPTS ===
    "dev:all": "concurrently \"npm run dev:frontend\" \"npm run dev:admin\"",
    "build:all": "npm run build:frontend && npm run build:admin",
    "test:all:complete": "npm run test:frontend && npm run test:admin && npm run test:backend",
    "lint:all:complete": "npm run lint:frontend && npm run lint:admin && npm run lint:backend",

    // === DEPLOYMENT SCRIPTS ===
    "deploy:admin:staging": "npm run build:admin && ./scripts/deploy-admin-staging.sh",
    "deploy:admin:production": "npm run build:admin && ./scripts/deploy-admin-production.sh"
  }
}
```

### Nueva Dependencia

- **concurrently**: `^8.2.2` - Para ejecutar frontend y admin simultáneamente

## 🐳 Configuración Docker

### Archivos Docker Preparados

```
docker/admin/
├── Dockerfile.prod           # Multi-stage build optimizado
├── nginx.admin.conf         # Configuración Nginx específica
└── docker-compose.admin.yml # Compose para admin standalone
```

### Características Docker

- **Multi-stage build** para optimización de tamaño
- **Nginx optimizado** con headers de seguridad
- **Health checks** automáticos
- **Proxy API** configurado para desarrollo
- **Gzip compression** habilitado

## ⚙️ Configuración Vite Optimizada

### Archivo: `src/admin/vite.config.ts`

**Características principales**:

- **Puerto dedicado**: 3001 para admin dashboard
- **Proxy API**: Redirección automática a backend (puerto 8000)
- **Code splitting**: Chunks optimizados por categoría
- **Alias de imports**: Paths absolutos configurados
- **Testing integrado**: Vitest con coverage
- **Build optimizado**: Terser para producción

### Manual Chunks Strategy

```typescript
manualChunks: {
  vendor: ["react", "react-dom", "react-router-dom"],
  ui: ["@headlessui/react", "@heroicons/react"],
  forms: ["react-hook-form", "react-quill"],
  charts: ["chart.js", "react-chartjs-2"],
  utils: ["axios", "date-fns", "jwt-decode"]
}
```

## 🚀 Scripts de Deployment

### Staging Deployment

**Archivo**: `scripts/deploy-admin-staging.sh`

**Proceso automatizado**:

1. Build del admin dashboard
2. Creación de package comprimido
3. Upload a servidor staging
4. Deployment automático
5. Health check de verificación
6. Cleanup automático

### Production Deployment

**Archivo**: `scripts/deploy-admin-production.sh`

**Características**:

- Validaciones adicionales de seguridad
- Backup automático antes del deployment
- Rollback automático en caso de fallo
- Notificaciones de estado

## 🔄 CI/CD Integration

### GitHub Actions Jobs

```yaml
# Nuevo job para admin dashboard
test-admin:
  runs-on: ubuntu-latest
  steps:
    - name: Install admin dependencies
    - name: Run admin linting
    - name: Run admin tests with coverage
    - name: Build admin dashboard
    - name: Upload coverage reports

build-admin-docker:
  needs: [test-admin]
  steps:
    - name: Build admin Docker image
    - name: Test Docker image health
```

### Pipeline Benefits

- **Testing paralelo** para admin dashboard
- **Coverage reports** automáticos
- **Docker image testing** antes de deployment
- **Health checks** integrados

## 📊 Puertos y Servicios

### Configuración de Puertos

| Servicio        | Puerto | URL                   | Descripción             |
| --------------- | ------ | --------------------- | ----------------------- |
| Frontend Public | 3000   | http://localhost:3000 | Sitio público React     |
| Admin Dashboard | 3001   | http://localhost:3001 | Panel de administración |
| Backend API     | 8000   | http://localhost:8000 | API PHP                 |
| phpMyAdmin      | 8080   | http://localhost:8080 | Gestión de BD           |

### Desarrollo Simultáneo

```bash
# Iniciar todo el stack
npm run dev:all

# Esto ejecuta:
# - Frontend en puerto 3000
# - Admin Dashboard en puerto 3001
# - Backend API en puerto 8000 (via Docker)
```

## 🔧 Comandos de Desarrollo

### Comandos Básicos

```bash
# Admin Dashboard específico
npm run dev:admin           # Desarrollo admin (puerto 3001)
npm run build:admin         # Build admin para producción
npm run test:admin          # Tests admin con watch mode
npm run lint:admin          # Linting admin dashboard

# Comandos combinados
npm run dev:all             # Frontend + Admin simultáneamente
npm run build:all           # Build completo (frontend + admin)
npm run test:all:complete   # Tests completos (frontend + admin + backend)
npm run lint:all:complete   # Linting completo
```

### Comandos de Deployment

```bash
# Staging
npm run deploy:admin:staging     # Deploy admin a staging
npm run deploy:full:staging      # Deploy completo a staging

# Production
npm run deploy:admin:production  # Deploy admin a producción
npm run deploy:full:production   # Deploy completo a producción
```

### Comandos de Mantenimiento

```bash
# Limpieza y reset
npm run clean:admin         # Limpiar dist y node_modules
npm run reset:admin         # Reset completo con reinstalación
npm run analyze:admin       # Análisis de bundle size

# Docker
npm run docker:admin:dev    # Iniciar admin en Docker
npm run docker:admin:build  # Build imagen Docker admin

# Auditoría
npm run audit:admin         # Auditoría de seguridad
npm run audit:admin:fix     # Fix automático de vulnerabilidades
```

## 🎯 Beneficios de la Configuración

### Para Qwen (Admin Developer)

- ✅ **Entorno optimizado** para desarrollo eficiente
- ✅ **Hot reload** configurado con proxy API
- ✅ **Testing automatizado** con coverage
- ✅ **Build process** optimizado para performance
- ✅ **Scripts de deployment** listos para usar

### Para el Proyecto

- ✅ **Desarrollo paralelo** frontend + admin sin conflictos
- ✅ **CI/CD integration** completa
- ✅ **Docker containerization** para consistencia
- ✅ **Performance optimization** con code splitting
- ✅ **Deployment automatizado** con health checks

### Para el Equipo

- ✅ **Comandos unificados** para todo el stack
- ✅ **Configuración consistente** entre desarrolladores
- ✅ **Testing paralelo** para mayor velocidad
- ✅ **Monitoreo automático** de salud del sistema

## 🔍 Próximos Pasos

### Para Qwen

1. **Inicializar proyecto admin**: `cd src/admin && npm install`
2. **Configurar dependencias**: Instalar paquetes según especificaciones
3. **Iniciar desarrollo**: `npm run dev:admin`
4. **Verificar proxy API**: Confirmar conexión con backend

### Para el Equipo

1. **Actualizar dependencias**: `npm install` en raíz para obtener `concurrently`
2. **Probar comandos nuevos**: `npm run dev:all` para desarrollo completo
3. **Verificar CI/CD**: Confirmar que nuevos jobs funcionan correctamente

## 📚 Documentación Relacionada

- **`WARP-TASK-ADMIN-DASHBOARD-CONFIG.md`**: Especificaciones técnicas detalladas
- **`docs/ADMIN-DASHBOARD.md`**: Especificaciones funcionales del admin
- **`PROMPT-QWEN-BATCH-1-ADMIN-DASHBOARD.md`**: Instrucciones para Qwen
- **`docker/admin/`**: Configuraciones Docker específicas
- **`scripts/deploy-admin-*.sh`**: Scripts de deployment

---

**Configuración completada por**: Warp (DevOps Specialist)  
**Fecha**: 1 de agosto de 2025  
**Estado**: ✅ Lista para implementación por Qwen  
**Próxima actualización**: Al completar implementación del admin dashboard
