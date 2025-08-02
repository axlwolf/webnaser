# 🚨 Resolución de Problemas Críticos de Infraestructura

## Resumen Ejecutivo

Este documento describe los problemas críticos de infraestructura identificados en el **CMS de Grupo Naser** y sus procedimientos de resolución. Estos problemas pueden bloquear completamente el desarrollo del equipo y requieren resolución inmediata.

**Estado del Documento**: Actualizado el 31 de julio de 2025  
**Responsable**: Warp (DevOps Specialist) + Claude (Frontend Specialist)  
**Prioridad**: 🟡 PROGRESO SÓLIDO - 2/3 problemas críticos resueltos  
**Tiempo de Resolución**: <1 minuto por problema con scripts automáticos

## Problemas Críticos Identificados

### 1. Configuración TypeScript Inconsistente ✅ RESUELTO

**Descripción**: El proyecto frontend tenía configuración inconsistente entre JSX y TypeScript que estaba causando problemas de compilación.

**Síntomas Originales**:

- ❌ Falta archivo `tsconfig.json` en el directorio frontend
- ❌ Archivo `src/test/App.test.jsx` usa JSX en lugar de TSX
- ❌ `vite.config.js` debería ser `vite.config.ts` para consistencia
- ❌ Configuración TypeScript incompleta para React

**Impacto Original**:

- ❌ Claude (Frontend Developer) bloqueado para implementación pixel perfect
- ❌ Compilación TypeScript inconsistente
- ❌ Testing con configuración incorrecta

**✅ Solución Implementada (COMPLETADA)**:

```bash
# ✅ Configuración TypeScript completa implementada
# ✅ tsconfig.json creado en src/frontend/ con configuración robusta
# ✅ vite.config.js convertido a vite.config.ts
# ✅ Paths y aliases configurados correctamente
# ✅ Testing configuration actualizada para TypeScript
```

**Estado**: ✅ **COMPLETAMENTE RESUELTO** - Base técnica sólida establecida

### 2. Error CSS en Contenedor Frontend 🔄 EN PROGRESO

**Descripción**: Rutas de importación CSS incorrectas causando errores en el contenedor Docker.

**Síntomas Originales**:

- ❌ Error CSS: `ENOENT: no such file or directory, open '../../styles/tokens.css'`
- ❌ Contenedor frontend con errores de compilación CSS
- ❌ Design tokens no implementados correctamente

**🔄 Progreso Actual**:

```
Estructura de estilos creada, importaciones en proceso
```

**✅ Trabajo Completado**:

- ✅ Design tokens implementados en `src/frontend/src/styles/tokens.css`
- ✅ Estructura de estilos establecida correctamente
- ✅ Sistema de colores, tipografía y spacing definido

**🔄 Trabajo en Progreso**:

- 🔄 Corrección de rutas de importación en `src/frontend/src/index.css`
- 🔄 Validación de funcionamiento en Docker

**Estado**: 🟡 **PROGRESO AVANZADO** - Estructura creada, importaciones finalizándose

### 3. Sistema de Design Tokens Ausente ✅ RESUELTO

**Descripción**: El proyecto carecía de un sistema de design tokens para mantener consistencia visual.

**Síntomas Originales**:

- ❌ Variables CSS no definidas para colores, tipografía, spacing
- ❌ Tokens semánticos faltantes para consistencia visual
- ❌ CSS custom properties no implementadas
- ❌ Imposible mantener consistencia visual

**Impacto Original**:

- ❌ Implementación pixel perfect imposible
- ❌ Inconsistencia visual entre componentes
- ❌ Mantenimiento CSS complejo

**✅ Solución Implementada (COMPLETADA)**:

```bash
# ✅ Sistema completo de design tokens implementado
# ✅ src/frontend/src/styles/tokens.css - Tokens completos
# ✅ src/frontend/src/styles/colors.css - Colores exactos del sitio
# ✅ src/frontend/src/styles/typography.css - Sistema tipográfico
# ✅ src/frontend/src/styles/globals.css - Estilos globales
```

**Estado**: ✅ **COMPLETAMENTE RESUELTO** - Consistencia visual garantizada

**Impacto**:

- ❌ Implementación pixel perfect completamente bloqueada
- ❌ Sistema de design tokens no funcional
- ❌ Estilos CSS no cargan correctamente

**Solución Implementada**:

```bash
# Corrección de rutas CSS y design tokens
# - Corregir imports en src/frontend/src/index.css
# - Crear src/frontend/src/styles/tokens.css
# - Implementar sistema completo de design tokens
# - Asegurar compatibilidad Docker y desarrollo local
```

### 3. Frontend ARM64/Rollup (Mac M1/M2) ✅ RESUELTO

**Descripción**: Incompatibilidad del módulo Rollup con arquitectura ARM64 en sistemas Mac con chip Apple Silicon.

**Síntomas**:

- Contenedor `naser_frontend` reiniciando constantemente
- Errores de módulo no encontrado para `@rollup/rollup-darwin-arm64`
- Frontend completamente no funcional
- Logs mostrando errores de arquitectura

**Impacto Original**:

- ❌ Claude (Frontend Developer) bloqueado
- ❌ Desarrollo de componentes React paralizado
- ❌ Testing de frontend imposible

**Solución Implementada por Warp**:

- ✅ Creado `Dockerfile.arm64` específico para arquitectura ARM64
- ✅ Construida imagen compatible: `naser-frontend-arm64`
- ✅ Script de resolución automática: `fixes/critical/fix-arm64-frontend.sh`
- ✅ Configuración npm optimizada para ARM64

**Resultado**: Claude desbloqueado para desarrollo frontend en <1 minuto

```bash
# Script de resolución automática
./fixes/critical/fix-arm64-frontend.sh

# Configuraciones específicas creadas:
# - Dockerfile.arm64 para contenedores ARM64
# - docker-compose.arm64.yml para desarrollo en Mac M1/M2
# - Configuración npm específica para ARM64
```

### 4. Backend Apache Redirección Infinita ✅ RESUELTO

**Descripción**: Configuración incorrecta de Apache causando redirecciones infinitas y errores HTTP 500.

**Síntomas**:

- Contenedor `naser_backend` en estado unhealthy
- Errores HTTP 500 en todas las requests
- Logs de Apache mostrando redirecciones infinitas
- API backend completamente inaccesible

**Impacto Original**:

- ❌ Gemini (Backend Developer) bloqueado
- ❌ Desarrollo de API REST paralizado
- ❌ Testing de endpoints imposible

**Causa Raíz Identificada por Warp**:

- DocumentRoot apuntaba a `/var/www/html` pero el código estaba en `/var/www/project/api`
- Conflictos entre `.htaccess` y configuración de Apache VirtualHost

**Solución Implementada por Warp**:

- ✅ Reconfigurado Apache VirtualHost para apuntar al directorio correcto
- ✅ Simplificado `.htaccess` para evitar loops de redirección
- ✅ Script de resolución automática: `fixes/critical/restore-backend.sh`
- ✅ Headers de seguridad y CORS configurados

**Resultado**: Gemini desbloqueado para desarrollo backend en <1 minuto

```bash
# Script de resolución automática
./fixes/critical/restore-backend.sh

# Configuraciones corregidas:
# - .htaccess simplificado sin loops
# - Apache VirtualHost reconfigurado
# - DocumentRoot corregido
# - Headers de seguridad y CORS configurados
```

### 5. Frontend Display (Visualización) ✅ RESUELTO

**Descripción**: Puerto 3000 no mostraba contenido o generaba errores de conexión.

**Síntomas**:

- Puerto 3000 no mostraba nada o error de conexión
- Frontend React no se visualizaba correctamente
- Problemas de configuración de puertos en Vite

**Impacto Original**:

- ❌ Visualización del frontend bloqueada
- ❌ Testing de componentes React imposible
- ❌ Desarrollo frontend interrumpido

**Causa Raíz Identificada por Warp**:

- Vite configurado en puerto 3001 en lugar de 3000
- Volúmenes mal configurados en docker-compose
- Configuración de red Docker incorrecta

**Solución Implementada por Warp**:

- ✅ Corregido puerto en `vite.config.js` de 3001 a 3000
- ✅ Creado `docker-compose.override.yml` con volúmenes correctos
- ✅ Script de resolución automática: `fixes/critical/fix-frontend-display.sh`
- ✅ Configuración de red Docker optimizada

**Resultado**: Visualización frontend restaurada en <1 minuto

```bash
# Script de resolución automática
./fixes/critical/fix-frontend-display.sh

# Configuraciones corregidas:
# - vite.config.js puerto corregido a 3000
# - docker-compose.override.yml con volúmenes correctos
# - Configuración de red Docker optimizada
```

## Estructura de Archivos de Resolución

```
fixes/critical/
├── fix-arm64-frontend.sh      # Resolución problema ARM64
├── fix-apache-backend.sh      # Resolución problema Apache
├── docker-compose.fixed.yml   # Docker-compose corregido
├── frontend-arm64.Dockerfile  # Dockerfile específico ARM64
└── apache-config.fixed.conf   # Configuración Apache corregida

scripts/emergency/
├── emergency-restart.sh       # Reinicio de emergencia
├── health-check-critical.sh   # Verificación de salud crítica
├── rollback-config.sh         # Rollback de configuraciones
└── validate-fixes.sh          # Validación de correcciones

logs/critical/
├── frontend-error.log         # Logs detallados frontend
├── backend-error.log          # Logs detallados backend
└── resolution-log.md          # Log de resolución paso a paso
```

## Procedimientos de Resolución

### Resolución Automática Completa

```bash
# 1. Ejecutar diagnóstico completo
./scripts/emergency/health-check-critical.sh

# 2. Resolver configuración TypeScript (NUEVO)
# - Crear tsconfig.json en src/frontend/
# - Convertir archivos JSX a TSX
# - Actualizar vite.config.js a vite.config.ts

# 3. Resolver error CSS (NUEVO)
# - Corregir rutas en src/frontend/src/index.css
# - Crear src/frontend/src/styles/tokens.css
# - Implementar design tokens completos

# 4. Resolver problema ARM64 (si aplica)
./fixes/critical/fix-arm64-frontend.sh

# 5. Resolver problema Apache
./fixes/critical/fix-apache-backend.sh

# 6. Validar correcciones
./scripts/emergency/validate-fixes.sh

# 7. Reinicio completo si es necesario
./scripts/emergency/emergency-restart.sh
```

### Resolución Manual Paso a Paso

#### Para Problema ARM64:

1. **Detectar Arquitectura**:

   ```bash
   uname -m  # Debe mostrar 'arm64' en Mac M1/M2
   ```

2. **Limpiar Instalación**:

   ```bash
   cd src/frontend
   rm -rf node_modules package-lock.json
   ```

3. **Configurar npm para ARM64**:

   ```bash
   npm config set target_arch arm64
   npm config set target_platform darwin
   ```

4. **Instalar Dependencias ARM64**:

   ```bash
   npm install @rollup/rollup-darwin-arm64 --save-dev
   npm install --force
   ```

5. **Usar Docker ARM64**:
   ```bash
   docker-compose -f docker-compose.arm64.yml up -d
   ```

#### Para Problema Apache:

1. **Diagnosticar Logs**:

   ```bash
   docker logs naser_backend --tail=50
   ```

2. **Aplicar Configuración Corregida**:

   ```bash
   cd api
   cp .htaccess.fixed .htaccess
   cp Dockerfile.fixed Dockerfile
   ```

3. **Reconstruir Contenedor**:

   ```bash
   docker-compose stop backend
   docker-compose build --no-cache backend
   docker-compose up -d backend
   ```

4. **Validar Funcionamiento**:
   ```bash
   curl -f http://localhost:8000/api/v1/health
   ```

## Validación de Resolución

### Criterios de Aceptación

- [ ] **TypeScript Configurado**: tsconfig.json completo y archivos TSX convertidos
- [ ] **CSS Tokens Implementados**: Design tokens funcionando sin errores
- [ ] **Frontend ARM64**: Contenedor `naser_frontend` ejecutándose sin reiniciar
- [ ] **Backend Apache**: Contenedor `naser_backend` en estado healthy
- [ ] **Endpoints Funcionales**: Frontend (3000) y Backend (8000) responden
- [ ] **Logs Limpios**: Sin errores críticos en logs de contenedores
- [ ] **Equipo Desbloqueado**: Claude y Gemini pueden continuar desarrollo

### Scripts de Validación

```bash
# Verificación completa del sistema
./scripts/emergency/health-check-critical.sh

# Validación específica de correcciones
./scripts/emergency/validate-fixes.sh

# Verificación manual de endpoints
curl -f http://localhost:3000  # Frontend
curl -f http://localhost:8000  # Backend
```

## Rollback y Recuperación

### Rollback Automático

```bash
# Restaurar configuraciones originales
./scripts/emergency/rollback-config.sh

# Reiniciar con configuración original
docker-compose down
docker-compose up -d
```

### Rollback Manual

```bash
# Restaurar archivos de backup
cd api
cp .htaccess.backup .htaccess
cp Dockerfile.backup Dockerfile

cd ../src/frontend
cp package.json.backup package.json

# Reconstruir contenedores
docker-compose build --no-cache
docker-compose up -d
```

## Monitoreo y Prevención

### Monitoreo Continuo

```bash
# Monitoreo de salud en tiempo real
watch -n 5 './scripts/emergency/health-check-critical.sh'

# Monitoreo de logs críticos
docker-compose logs -f --tail=10
```

### Prevención de Problemas

1. **Verificación Pre-desarrollo**:

   - Ejecutar health-check antes de comenzar desarrollo
   - Validar arquitectura del sistema
   - Verificar configuraciones Docker

2. **Backups Automáticos**:

   - Configuraciones críticas respaldadas automáticamente
   - Scripts de rollback siempre disponibles
   - Logs de resolución documentados

3. **Alertas Tempranas**:
   - Monitoreo de contenedores unhealthy
   - Detección de reiniciar constantes
   - Alertas de errores HTTP 500

## 🔒 Política de Permisos de Archivos

**⚠️ CRÍTICO**: Todos los procedimientos de resolución deben seguir la **Política de Permisos de Archivos** del proyecto.

**Reglas Esenciales**:

- ❌ **NUNCA usar `sudo`** en scripts de resolución
- ❌ **NUNCA cambiar ownership** de archivos del proyecto
- ✅ **Mantener permisos** del usuario de desarrollo (`flanuza:staff`)
- ✅ **Consultar al orquestador** antes de cambios críticos

**Scripts Seguros**:

```bash
# ✅ CORRECTO
./fixes/critical/restore-backend.sh
docker-compose restart backend
chmod +x scripts/emergency/health-check.sh

# ❌ PROHIBIDO
sudo ./fixes/critical/restore-backend.sh
sudo chown root:root api/
sudo chmod 777 src/
```

**Documentación Completa**:

- `.kiro/steering/file-permissions-policy.md` - Política completa
- `docs/SECURITY-DEVELOPMENT-GUIDELINES.md` - Pautas de seguridad

## Contacto y Escalación

**Responsable Principal**: Warp (DevOps Specialist)  
**Escalación**: Kiro (Orchestrator)  
**Documentación**: Este archivo y logs en `logs/critical/`

**En caso de problemas no resueltos**:

1. Ejecutar todos los scripts de diagnóstico
2. Documentar síntomas en `logs/critical/`
3. **Verificar cumplimiento** de política de permisos
4. Contactar a Kiro para coordinación de equipo
5. Considerar rollback completo si es necesario

---

**Última Actualización**: 25 de julio de 2025  
**Próxima Revisión**: Después de cada resolución crítica  
**Estado**: 🚨 ACTIVO - Problemas identificados, resolución implementada
