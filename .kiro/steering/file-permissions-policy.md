---
inclusion: always
---

# 🔒 POLÍTICA DE PERMISOS DE ARCHIVOS - GRUPO NASER CMS

## 🚨 REGLA CRÍTICA: NO MODIFICAR PERMISOS

### ❌ PROHIBIDO ABSOLUTAMENTE

**NINGÚN AGENTE DEBE EJECUTAR COMANDOS QUE CAMBIEN PERMISOS DE ARCHIVOS**

```bash
# ❌ COMANDOS PROHIBIDOS - NO USAR JAMÁS
sudo chown
sudo chmod
chown
chmod (excepto en casos muy específicos)
sudo su
su -
sudo -i
sudo mkdir
sudo touch
sudo rm
sudo mv (con archivos de sistema)
```

## 🎯 RAZONES CRÍTICAS

### 1. **PROBLEMAS DE OWNERSHIP**

- Cambios de `flanuza` a `root` rompen el flujo de trabajo
- Archivos con permisos root no pueden ser editados por el usuario
- Conflictos en git por cambios de ownership

### 2. **PROBLEMAS DE DESARROLLO**

- IDEs no pueden acceder a archivos root
- Scripts de build fallan por permisos
- Docker containers con problemas de permisos

### 3. **PROBLEMAS DE SEGURIDAD**

- Escalación innecesaria de privilegios
- Archivos críticos con permisos incorrectos
- Vulnerabilidades de seguridad

## ✅ REGLAS PARA AGENTES

### 🎨 CLAUDE (Frontend)

```bash
# ✅ PERMITIDO
npm install
npm run build
npm test
touch src/components/NewComponent.tsx
mkdir src/pages/NewPage

# ❌ PROHIBIDO
sudo npm install -g
sudo chmod 755 src/
sudo chown root:root package.json
```

### 🔧 GEMINI (Backend)

```bash
# ✅ PERMITIDO
composer install
php artisan migrate
touch api/controllers/NewController.php
mkdir api/services

# ❌ PROHIBIDO
sudo composer install
sudo chmod 777 api/
sudo chown www-data:www-data api/
sudo php artisan serve
```

### ⚡ WARP (DevOps)

```bash
# ✅ PERMITIDO
docker build -t image:tag .
docker-compose up -d
./scripts/deploy.sh
mkdir docker/new-service

# ❌ PROHIBIDO
sudo docker
sudo chmod 755 /var/www/
sudo chown root:root docker-compose.yml
sudo systemctl start docker
```

### 🎛️ QWEN (Admin Dashboard)

```bash
# ✅ PERMITIDO
npm install
npm run dev
touch src/admin/components/NewComponent.tsx
mkdir src/admin/pages

# ❌ PROHIBIDO
sudo npm install
sudo chmod 755 src/admin/
sudo chown root:root src/admin/package.json
```

## 🛡️ ALTERNATIVAS SEGURAS

### En lugar de `sudo chmod`:

```bash
# ❌ NO HACER
sudo chmod 755 file.txt

# ✅ HACER (si realmente necesario)
# Consultar con el orquestador primero
# Usar permisos mínimos necesarios
```

### En lugar de `sudo chown`:

```bash
# ❌ NO HACER
sudo chown root:root file.txt

# ✅ HACER
# Mantener ownership del usuario actual (flanuza)
# Si necesitas cambios, consultar con orquestador
```

### Para Docker:

```bash
# ✅ CORRECTO
docker build -t image:tag .
docker-compose up -d

# ❌ INCORRECTO
sudo docker build -t image:tag .
sudo docker-compose up -d
```

## 🚨 DETECCIÓN DE VIOLACIONES

### Comandos de Monitoreo

```bash
# Detectar archivos con ownership incorrecto
find . -not -user flanuza -not -path "./.git/*" 2>/dev/null

# Detectar archivos con permisos extraños
find . -perm 777 -not -path "./.git/*" 2>/dev/null

# Verificar ownership del proyecto
ls -la | grep -v "flanuza.*staff"
```

### Alertas Automáticas

Si se detectan cambios de permisos:

1. **Alerta inmediata** al orquestador
2. **Reversión automática** si es posible
3. **Documentación** del problema
4. **Prevención** de futuros cambios

## 🔧 CORRECCIÓN DE PROBLEMAS

### Si hay archivos con permisos incorrectos:

```bash
# Restaurar ownership correcto (solo si necesario)
# CONSULTAR CON ORQUESTADOR PRIMERO
sudo chown -R flanuza:staff /path/to/project

# Restaurar permisos estándar
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
find . -name "*.sh" -exec chmod 755 {} \;
```

## 📋 CHECKLIST PARA AGENTES

Antes de ejecutar cualquier comando, pregúntate:

- [ ] ¿Este comando requiere `sudo`?
- [ ] ¿Va a cambiar ownership de archivos?
- [ ] ¿Va a modificar permisos del sistema?
- [ ] ¿Puede causar problemas de acceso?

**Si la respuesta es SÍ a cualquiera: NO EJECUTAR**

## 🎯 PRINCIPIOS FUNDAMENTALES

### 1. **PRINCIPIO DE MENOR PRIVILEGIO**

- Usar solo los permisos mínimos necesarios
- No escalar privilegios innecesariamente
- Mantener ownership del usuario de desarrollo

### 2. **PRINCIPIO DE CONSISTENCIA**

- Todos los archivos del proyecto deben pertenecer a `flanuza:staff`
- Permisos estándar: 644 para archivos, 755 para directorios
- Scripts ejecutables: 755

### 3. **PRINCIPIO DE REVERSIBILIDAD**

- Cualquier cambio debe ser reversible
- Documentar cambios de permisos si son necesarios
- Consultar antes de hacer cambios críticos

## 🚀 CUMPLIMIENTO

### Para Orquestador (Kiro)

- Monitorear cambios de permisos
- Alertar sobre violaciones
- Corregir problemas detectados
- Educar a agentes sobre políticas

### Para Agentes

- **NUNCA usar sudo** sin consultar
- **NUNCA cambiar ownership** de archivos
- **CONSULTAR** antes de comandos dudosos
- **REPORTAR** problemas de permisos

---

## ⚠️ ADVERTENCIA FINAL

**CUALQUIER VIOLACIÓN DE ESTA POLÍTICA PUEDE ROMPER EL PROYECTO**

Los cambios de permisos pueden causar:

- Pérdida de acceso a archivos
- Fallos en builds y deployments
- Problemas de seguridad
- Conflictos en control de versiones

**CUANDO TENGAS DUDAS: PREGUNTA AL ORQUESTADOR**

---

**Política establecida**: 1 de agosto de 2025  
**Aplicable a**: Todos los agentes (Claude, Gemini, Warp, Qwen)  
**Revisión**: Mensual o cuando sea necesario
