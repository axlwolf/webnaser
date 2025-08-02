# 🔒 Security & Development Guidelines - Grupo Naser CMS

## 📋 Descripción General

Este documento establece las **pautas de seguridad y desarrollo** para el proyecto Grupo Naser CMS, incluyendo políticas críticas de permisos de archivos, mejores prácticas de seguridad y estándares de desarrollo que todos los desarrolladores y agentes deben seguir.

## 🚨 Política de Permisos de Archivos - CRÍTICA

### ❌ REGLA FUNDAMENTAL: NO MODIFICAR PERMISOS

**NINGÚN DESARROLLADOR O AGENTE DEBE EJECUTAR COMANDOS QUE CAMBIEN PERMISOS DE ARCHIVOS**

Esta política es **CRÍTICA** para mantener la estabilidad del proyecto y evitar problemas de desarrollo que pueden bloquear completamente el trabajo del equipo.

### Comandos Prohibidos Absolutamente

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
sudo npm install -g
sudo composer install
sudo docker
sudo systemctl
```

### Razones Críticas

1. **Problemas de Ownership**:

   - Cambios de `flanuza` a `root` rompen el flujo de trabajo
   - Archivos con permisos root no pueden ser editados por el usuario
   - Conflictos en git por cambios de ownership

2. **Problemas de Desarrollo**:

   - IDEs no pueden acceder a archivos root
   - Scripts de build fallan por permisos
   - Docker containers con problemas de permisos

3. **Problemas de Seguridad**:
   - Escalación innecesaria de privilegios
   - Archivos críticos con permisos incorrectos
   - Vulnerabilidades de seguridad

### Alternativas Seguras

```bash
# ✅ CORRECTO - Comandos seguros
npm install
composer install
docker build -t image:tag .
docker-compose up -d
touch src/components/NewComponent.tsx
mkdir src/pages/NewPage

# ❌ INCORRECTO - Comandos prohibidos
sudo npm install -g
sudo chmod 755 src/
sudo chown root:root package.json
sudo docker build
```

### Detección de Violaciones

```bash
# Detectar archivos con ownership incorrecto
find . -not -user flanuza -not -path "./.git/*" 2>/dev/null

# Detectar archivos con permisos extraños
find . -perm 777 -not -path "./.git/*" 2>/dev/null

# Verificar ownership del proyecto
ls -la | grep -v "flanuza.*staff"
```

## 🛡️ Mejores Prácticas de Seguridad

### 1. Gestión de Dependencias

```bash
# ✅ Verificar vulnerabilidades regularmente
npm audit
composer audit

# ✅ Actualizar dependencias de seguridad
npm update
composer update

# ❌ NUNCA instalar paquetes con sudo
sudo npm install -g package-name
```

### 2. Variables de Entorno

```bash
# ✅ Usar .env para configuración sensible
DB_PASSWORD=secure_password
JWT_SECRET=random_secret_key

# ✅ NUNCA commitear .env al repositorio
echo ".env" >> .gitignore

# ✅ Usar .env.example para documentar variables
cp .env.example .env
```

### 3. Autenticación y Autorización

```php
// ✅ Usar JWT tokens con expiración
$token = JWT::encode($payload, $key, 'HS256');

// ✅ Validar permisos en cada endpoint
if (!$user->hasPermission('admin')) {
    throw new UnauthorizedException();
}

// ✅ Sanitizar inputs
$input = filter_var($input, FILTER_SANITIZE_STRING);
```

### 4. Configuración de Base de Datos

```php
// ✅ Usar prepared statements
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$userId]);

// ❌ NUNCA usar concatenación directa
$query = "SELECT * FROM users WHERE id = " . $userId; // VULNERABLE
```

## 🔧 Estándares de Desarrollo

### 1. Estructura de Código

```typescript
// ✅ Usar TypeScript para type safety
interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ Componentes funcionales con hooks
const UserComponent: React.FC<{ user: User }> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  return <div>{user.name}</div>;
};
```

### 2. Testing Obligatorio

```bash
# ✅ Tests unitarios obligatorios
npm test
composer test

# ✅ Cobertura mínima del 80%
npm run test:coverage

# ✅ Tests de integración
./scripts/testing/test-integration.sh
```

### 3. Linting y Formateo

```bash
# ✅ ESLint para JavaScript/TypeScript
npm run lint
npm run lint:fix

# ✅ PHP CodeSniffer para PHP
composer cs
composer cs-fix

# ✅ Prettier para formateo consistente
npm run format
```

## 🐳 Seguridad en Docker

### 1. Imágenes Seguras

```dockerfile
# ✅ Usar imágenes oficiales y específicas
FROM node:18-alpine

# ✅ Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# ❌ NUNCA usar root en producción
USER root  # INSEGURO
```

### 2. Variables de Entorno en Docker

```yaml
# ✅ docker-compose.yml
services:
  backend:
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password

# ❌ NUNCA hardcodear secretos
environment:
  - DB_PASSWORD=hardcoded_password # INSEGURO
```

### 3. Volúmenes y Permisos

```yaml
# ✅ Volúmenes con permisos correctos
volumes:
  - ./src:/app/src:ro  # read-only cuando sea posible
  - node_modules:/app/node_modules

# ✅ Bind mounts seguros
volumes:
  - ./uploads:/app/uploads:Z  # SELinux context
```

## 📊 Monitoreo y Auditoría

### 1. Logs de Seguridad

```php
// ✅ Logging de eventos de seguridad
Log::warning('Failed login attempt', [
    'ip' => $request->ip(),
    'user_agent' => $request->userAgent(),
    'attempted_email' => $email
]);

// ✅ Logging de cambios críticos
Log::info('User permissions changed', [
    'admin_id' => $adminId,
    'target_user_id' => $userId,
    'new_permissions' => $permissions
]);
```

### 2. Monitoreo de Archivos

```bash
# ✅ Monitoreo de cambios de permisos
./scripts/security/monitor-file-permissions.sh

# ✅ Detección de archivos sospechosos
find . -name "*.php" -perm 777 -exec ls -la {} \;

# ✅ Verificación de integridad
./scripts/security/verify-file-integrity.sh
```

### 3. Auditoría de Dependencias

```bash
# ✅ Auditoría regular de npm
npm audit --audit-level moderate

# ✅ Auditoría de Composer
composer audit

# ✅ Escaneo de vulnerabilidades Docker
docker scan naser_frontend:latest

# 🔒 Sistema Automatizado de Vulnerabilidades (Nuevo)
./scripts/security/scan-vulnerabilities.sh      # Escaneo completo automatizado
./scripts/security/update-dependencies.sh       # Actualización automática
./scripts/security/generate-security-report.sh  # Reporte de seguridad
```

## 🚨 Respuesta a Incidentes

### 1. Detección de Problemas de Permisos

```bash
# Detectar y reportar problemas
./scripts/security/detect-permission-violations.sh

# Restaurar permisos correctos (solo si es necesario)
# CONSULTAR CON ORQUESTADOR PRIMERO
sudo chown -R flanuza:staff /path/to/project
```

### 2. Respuesta a Vulnerabilidades

```bash
# 1. Identificar vulnerabilidad
npm audit
composer audit

# 2. Actualizar dependencias afectadas
npm update package-name
composer update vendor/package

# 3. Verificar que no se rompa funcionalidad
npm test
composer test

# 4. Documentar cambios
git commit -m "security: update package-name to fix CVE-XXXX"
```

### 3. Rollback de Emergencia

```bash
# Rollback automático si hay problemas críticos
./scripts/emergency/rollback-config.sh

# Restaurar desde backup
./scripts/emergency/restore-from-backup.sh

# Verificar integridad del sistema
./scripts/security/verify-system-integrity.sh
```

## 📋 Checklist de Seguridad

### Pre-Commit Checklist

- [ ] ¿He usado algún comando con `sudo`?
- [ ] ¿He cambiado permisos de archivos?
- [ ] ¿He añadido nuevas dependencias?
- [ ] ¿He ejecutado `npm audit` y `composer audit`?
- [ ] ¿He añadido tests para nueva funcionalidad?
- [ ] ¿He verificado que no hay secretos hardcodeados?
- [ ] ¿He actualizado documentación si es necesario?

### Pre-Deploy Checklist

- [ ] ¿Están todas las variables de entorno configuradas?
- [ ] ¿He verificado permisos de archivos en producción?
- [ ] ¿He ejecutado tests completos?
- [ ] ¿He verificado configuración de seguridad?
- [ ] ¿He preparado plan de rollback?
- [ ] ¿He notificado al equipo sobre el deploy?

## 🎯 Cumplimiento y Responsabilidades

### Para Desarrolladores

- **NUNCA usar sudo** sin consultar con el orquestador
- **Seguir políticas de permisos** estrictamente
- **Reportar problemas** de seguridad inmediatamente
- **Mantener dependencias** actualizadas
- **Escribir tests** para toda nueva funcionalidad

### Para DevOps (Warp)

- **Monitorear permisos** de archivos regularmente
- **Mantener herramientas** de seguridad actualizadas
- **Crear scripts** de detección y corrección
- **Documentar procedimientos** de emergencia
- **Auditar configuraciones** de Docker y servicios

### Para Orquestador (Kiro)

- **Coordinar respuesta** a incidentes de seguridad
- **Revisar cambios** críticos de configuración
- **Mantener documentación** actualizada
- **Facilitar comunicación** entre agentes
- **Asegurar cumplimiento** de políticas

## 📞 Contacto y Escalación

### Reportar Problemas de Seguridad

1. **Problemas de permisos**: Contactar inmediatamente al orquestador
2. **Vulnerabilidades**: Crear issue en GitHub con etiqueta `security`
3. **Incidentes críticos**: Ejecutar procedimientos de emergencia
4. **Dudas sobre políticas**: Consultar este documento o preguntar al orquestador

### Recursos Adicionales

- **Gestión de Vulnerabilidades**: `docs/SECURITY-VULNERABILITY-MANAGEMENT.md`
- **Política de Permisos Completa**: `.kiro/steering/file-permissions-policy.md`
- **Scripts de Emergencia**: `scripts/emergency/`
- **Herramientas de Seguridad**: `scripts/security/`
- **Documentación DevOps**: `docs/DEVOPS-INFRASTRUCTURE.md`

---

## ⚠️ ADVERTENCIA FINAL

**EL INCUMPLIMIENTO DE ESTAS POLÍTICAS PUEDE COMPROMETER LA SEGURIDAD Y ESTABILIDAD DEL PROYECTO**

Estas pautas no son sugerencias, son **requisitos obligatorios** para todos los miembros del equipo. El incumplimiento puede resultar en:

- Pérdida de acceso a archivos críticos
- Fallos en builds y deployments
- Vulnerabilidades de seguridad
- Bloqueo completo del desarrollo
- Conflictos en control de versiones

**CUANDO TENGAS DUDAS: PREGUNTA AL ORQUESTADOR**

---

**Política establecida**: 2 de agosto de 2025  
**Aplicable a**: Todos los desarrolladores y agentes  
**Revisión**: Mensual o cuando sea necesario  
**Mantenido por**: Kiro (Orquestador) + Warp (DevOps)
