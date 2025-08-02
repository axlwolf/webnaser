#!/bin/bash

# Deploy Preparation - Grupo Naser CMS
# Prepara el proyecto para deployment en GoDaddy

set -e

echo "🚀 Preparando deployment para GoDaddy..."

# Parse arguments
ENVIRONMENT="production"
SKIP_TESTS=false
SKIP_BUILD=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --env)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        *)
            echo "Uso: $0 [--env production|staging] [--skip-tests] [--skip-build]"
            exit 1
            ;;
    esac
done

echo "📋 Configuración de deployment:"
echo "   Entorno: $ENVIRONMENT"
echo "   Skip Tests: $SKIP_TESTS"
echo "   Skip Build: $SKIP_BUILD"
echo ""

# Verificar que Docker esté corriendo
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo."
    echo "Por favor inicia Docker Desktop."
    exit 1
fi

# Ejecutar tests antes del deployment (a menos que se omitan)
if [ "$SKIP_TESTS" = false ]; then
    echo "🧪 Ejecutando tests antes del deployment..."
    ./scripts/test.sh --quick
fi

# Crear directorio de deployment
DEPLOY_DIR="deploy-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$DEPLOY_DIR"

echo "📦 Creando build de producción..."

# Build del frontend y admin
if [ "$SKIP_BUILD" = false ]; then
    echo "⚛️  Building frontend..."
    docker exec naser_frontend npm run build
    
    echo "🛡️  Building admin dashboard..."
    docker exec naser_admin npm run build
    
    # Copiar archivos del frontend
    cp -r src/frontend/dist/* "$DEPLOY_DIR/"
    
    # Crear directorio admin y copiar archivos
    mkdir -p "$DEPLOY_DIR/admin"
    cp -r src/admin/dist/* "$DEPLOY_DIR/admin/"
fi

# Preparar archivos del backend
echo "🔧 Preparando backend..."
cp -r api/* "$DEPLOY_DIR/"

# Crear .htaccess optimizado para GoDaddy
cat > "$DEPLOY_DIR/.htaccess" << 'EOF'
# GoDaddy Optimized .htaccess for Grupo Naser CMS

# Enable compression
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

# Enable browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# API Routes
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^api/(.*)$ api/index.php [QSA,L]

# Admin Routes (React Router)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} ^/admin/
RewriteRule ^admin/(.*)$ /admin/index.html [L]

# Frontend Routes (React Router)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteCond %{REQUEST_URI} !^/admin/
RewriteRule . /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Disable directory browsing
Options -Indexes

# Protect sensitive files
<Files ".env*">
    Order allow,deny
    Deny from all
</Files>

<Files "composer.*">
    Order allow,deny
    Deny from all
</Files>
EOF

# Crear archivo de configuración para producción
cat > "$DEPLOY_DIR/.env" << EOF
# Production Environment - Grupo Naser CMS
APP_NAME="Grupo Naser CMS"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://naser.com.mx

# Database (Update with GoDaddy credentials)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=naser_cms_prod
DB_USER=naser_prod_user
DB_PASSWORD=CHANGE_THIS_PASSWORD

# JWT (Generate new secret for production)
JWT_SECRET=GENERATE_NEW_JWT_SECRET_FOR_PRODUCTION
JWT_EXPIRE=3600

# CORS
CORS_ORIGIN=https://naser.com.mx

# File Upload
MAX_UPLOAD_SIZE=16M
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,pdf

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=info@naser.com.mx
MAIL_PASSWORD=CHANGE_THIS_PASSWORD
MAIL_FROM_ADDRESS=info@naser.com.mx
MAIL_FROM_NAME="Grupo Naser"

# Security
BCRYPT_ROUNDS=12
SESSION_LIFETIME=1440

# Logging
LOG_LEVEL=error
LOG_MAX_FILES=3
EOF

# Remover archivos de desarrollo
echo "🧹 Limpiando archivos de desarrollo..."
rm -rf "$DEPLOY_DIR/node_modules" 2>/dev/null || true
rm -rf "$DEPLOY_DIR/vendor" 2>/dev/null || true
rm -f "$DEPLOY_DIR/composer.lock" 2>/dev/null || true
rm -f "$DEPLOY_DIR/package-lock.json" 2>/dev/null || true
rm -f "$DEPLOY_DIR/.env.example" 2>/dev/null || true
rm -f "$DEPLOY_DIR/.env.testing" 2>/dev/null || true

# Instalar dependencias de producción
echo "📦 Instalando dependencias de producción..."
cd "$DEPLOY_DIR"
composer install --no-dev --optimize-autoloader
cd ..

# Crear archivo de instrucciones de deployment
cat > "$DEPLOY_DIR/DEPLOYMENT-INSTRUCTIONS.md" << 'EOF'
# Instrucciones de Deployment - GoDaddy

## Pasos para subir a GoDaddy:

1. **Subir archivos**:
   - Sube todos los archivos de esta carpeta al directorio raíz de tu hosting
   - Asegúrate de que el archivo .htaccess se suba correctamente

2. **Configurar base de datos**:
   - Crea una base de datos MySQL en el panel de GoDaddy
   - Actualiza las credenciales en el archivo .env
   - Ejecuta las migraciones de la carpeta database/migrations

3. **Configurar permisos**:
   - Asegúrate de que la carpeta uploads/ tenga permisos de escritura (755)
   - Verifica que los archivos .env no sean accesibles públicamente

4. **Verificar funcionamiento**:
   - Visita tu sitio web para verificar que carga correctamente
   - Prueba el endpoint /api/v1/health para verificar la API
   - Verifica que el admin panel funcione correctamente

## Configuraciones importantes:

- **JWT_SECRET**: Genera un nuevo secreto para producción
- **DB_PASSWORD**: Usa la contraseña de tu base de datos de GoDaddy
- **MAIL_PASSWORD**: Configura el email para formularios de contacto

## Soporte:

Para soporte técnico, contacta: info@naser.com.mx
EOF

# Crear archivo ZIP para fácil upload
echo "📦 Creando archivo ZIP para deployment..."
zip -r "$DEPLOY_DIR.zip" "$DEPLOY_DIR/" -x "*.DS_Store*" "*/node_modules/*" "*/.git/*"

echo ""
echo "✅ Deployment preparado exitosamente!"
echo ""
echo "📁 Archivos preparados en: $DEPLOY_DIR/"
echo "📦 Archivo ZIP: $DEPLOY_DIR.zip"
echo "📋 Instrucciones: $DEPLOY_DIR/DEPLOYMENT-INSTRUCTIONS.md"
echo ""
echo "🚀 Próximos pasos:"
echo "   1. Revisa el archivo .env en $DEPLOY_DIR/"
echo "   2. Actualiza las credenciales de base de datos"
echo "   3. Genera un nuevo JWT_SECRET"
echo "   4. Sube el archivo ZIP a GoDaddy"
echo "   5. Ejecuta las migraciones de base de datos"
echo ""