# 🔒 ANÁLISIS DE PERMISOS Y REGLAS PARA AGENTES

## 🚨 PROBLEMA IDENTIFICADO

Se detectaron archivos críticos del proyecto con owner `root` en lugar de `flanuza`, lo que puede causar:

- Conflictos de permisos
- Problemas de acceso
- Inconsistencias en el desarrollo
- Errores en CI/CD

## 📊 ARCHIVOS AFECTADOS

### ⚠️ Archivos críticos con owner root:

```bash
-rw-r--r--@ 1 root staff tailwind.config.js
-rw-r--r--@ 1 root staff postcss.config.js
-rw-r--r--@ 1 root staff src/index.tsx
-rw-r--r--@ 1 root staff src/App.tsx
-rw-r--r--@ 1 root staff .git/config
```

## 🔍 CAUSA PROBABLE

Los agentes (especialmente cuando ejecutan comandos con Docker o sudo) pueden crear archivos con permisos de root, causando inconsistencias.

## 🛠️ SOLUCIÓN INMEDIATA

### 1. Corregir permisos actuales:

```bash
sudo chown -R flanuza:staff .
find . -name "node_modules" -prune -o -type f -exec chmod 644 {} \;
find . -name "node_modules" -prune -o -type d -exec chmod 755 {} \;
```

### 2. Verificar corrección:

```bash
find . -maxdepth 2 -user root -not -path "./node_modules/*" -type f
```

## 📋 REGLAS PARA AGENTES

### 🎯 REGLA 1: NUNCA USAR SUDO

```markdown
❌ PROHIBIDO:

- sudo npm install
- sudo docker run
- sudo chmod
- sudo chown
- Cualquier comando con sudo

✅ PERMITIDO:

- npm install (sin sudo)
- docker run (sin sudo)
- chmod en archivos propios
```

### 🎯 REGLA 2: VERIFICAR PERMISOS ANTES DE CREAR ARCHIVOS

```bash
# Antes de crear archivos, verificar usuario actual
whoami  # Debe ser 'flanuza'

# Si es root, cambiar a usuario correcto
su flanuza
```

### 🎯 REGLA 3: USAR DOCKER SIN ROOT

```bash
# Configurar Docker para usuario sin privilegios
docker run --user $(id -u):$(id -g) ...

# O usar docker-compose con user mapping
services:
  app:
    user: "${UID}:${GID}"
```

### 🎯 REGLA 4: COMANDOS SEGUROS PARA AGENTES

```bash
# ✅ SEGUROS
npm install
npm run build
composer install
git add/commit/push
docker-compose up (sin sudo)

# ❌ PELIGROSOS
sudo npm install
sudo docker run
sudo chmod -R 777
sudo chown -R root
```

## 🔧 SCRIPT DE VERIFICACIÓN AUTOMÁTICA

### Crear script de verificación de permisos:

```bash
#!/bin/bash
# scripts/check-permissions.sh

echo "🔍 Verificando permisos del proyecto..."

# Buscar archivos con owner root (excluyendo node_modules)
ROOT_FILES=$(find . -maxdepth 3 -user root -not -path "./node_modules/*" -not -path "./.git/*" -type f)

if [ -n "$ROOT_FILES" ]; then
    echo "⚠️  ARCHIVOS CON PERMISOS ROOT DETECTADOS:"
    echo "$ROOT_FILES"
    echo ""
    echo "🔧 Para corregir, ejecuta:"
    echo "sudo chown -R flanuza:staff ."
    exit 1
else
    echo "✅ Todos los permisos están correctos"
    exit 0
fi
```

## 🎛️ REGLAS ESPECÍFICAS POR AGENTE

### 🎨 CLAUDE (Frontend)

```markdown
✅ PUEDE:

- Crear componentes React (.tsx, .jsx)
- Modificar estilos CSS
- Actualizar package.json
- Ejecutar npm scripts

❌ NO PUEDE:

- Usar sudo para instalar dependencias
- Cambiar permisos de sistema
- Ejecutar Docker como root
```

### 🔧 GEMINI (Backend)

```markdown
✅ PUEDE:

- Crear archivos PHP
- Ejecutar composer commands
- Modificar configuraciones API
- Crear migraciones de BD

❌ NO PUEDE:

- Usar sudo para PHP/Composer
- Cambiar permisos de archivos del sistema
- Ejecutar comandos de sistema como root
```

### ⚡ WARP (DevOps)

```markdown
✅ PUEDE:

- Configurar Docker Compose
- Crear scripts de deployment
- Modificar configuraciones CI/CD
- Gestionar contenedores

❌ NO PUEDE:

- Usar sudo en scripts de deployment
- Cambiar ownership de archivos a root
- Ejecutar Docker con privilegios elevados
```

### 🎛️ QWEN (Admin Dashboard)

```markdown
✅ PUEDE:

- Crear componentes de admin
- Configurar dependencias npm
- Crear páginas y servicios
- Ejecutar builds de desarrollo

❌ NO PUEDE:

- Instalar dependencias con sudo
- Cambiar permisos de archivos
- Ejecutar comandos de sistema
```

## 🚨 SISTEMA DE ALERTAS

### Pre-commit hook para verificar permisos:

```bash
#!/bin/bash
# .husky/pre-commit

echo "🔍 Verificando permisos antes del commit..."

# Ejecutar script de verificación
./scripts/check-permissions.sh

if [ $? -ne 0 ]; then
    echo "❌ Commit bloqueado por problemas de permisos"
    exit 1
fi

echo "✅ Permisos verificados correctamente"
```

## 📋 CHECKLIST DE VERIFICACIÓN

### Antes de cada sesión:

- [ ] Verificar que usuario actual es 'flanuza'
- [ ] Comprobar que no hay archivos con owner root
- [ ] Ejecutar script de verificación de permisos
- [ ] Configurar Docker sin sudo si es necesario

### Durante desarrollo:

- [ ] No usar sudo en comandos
- [ ] Verificar permisos de archivos creados
- [ ] Usar docker-compose con user mapping
- [ ] Reportar si se necesitan permisos especiales

### Antes de commit:

- [ ] Ejecutar verificación automática de permisos
- [ ] Corregir cualquier archivo con owner incorrecto
- [ ] Verificar que scripts son ejecutables por usuario
- [ ] Confirmar que no hay conflictos de permisos

## 🎯 IMPLEMENTACIÓN INMEDIATA

1. **Corregir permisos actuales**
2. **Crear script de verificación**
3. **Agregar pre-commit hook**
4. **Documentar reglas para agentes**
5. **Configurar Docker sin privilegios**

---

**🔒 OBJETIVO: Mantener consistencia de permisos y evitar problemas de acceso en el proyecto**
