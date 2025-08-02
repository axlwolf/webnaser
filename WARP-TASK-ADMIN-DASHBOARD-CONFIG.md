# 🎛️ TAREA WARP: Configuración y Optimización Admin Dashboard

## 🎯 CONTEXTO

Qwen está desarrollando el dashboard de administración (`src/admin/`) y necesita optimización de la configuración de build, scripts y deployment. Esta es una tarea perfecta para Warp como especialista en DevOps.

## 📊 ESTADO ACTUAL DETECTADO

### ✅ Lo que ya existe:

- `src/admin/package.json` - Configuración básica de Qwen
- Scripts básicos en package.json raíz
- Dependencias admin instaladas

### 🔧 Lo que necesita optimización:

- Scripts de desarrollo y build optimizados
- Configuración de deployment
- Integración con CI/CD pipeline
- Optimización de bundle size
- Configuración de testing avanzada

---

## 🚀 TAREAS ESPECÍFICAS PARA WARP

### ✅ TAREA W-ADMIN-1: Optimización de Scripts del Package.json Raíz

**Objetivo**: Mejorar los scripts de gestión del admin dashboard

**Archivo**: `package.json` (raíz)

**Scripts actuales a mejorar**:

```json
{
  "scripts": {
    "dev:admin": "cd src/admin && npm run dev"
    // Agregar scripts faltantes...
  }
}
```

**Scripts optimizados propuestos**:

```json
{
  "scripts": {
    // === ADMIN DASHBOARD SCRIPTS ===
    "dev:admin": "cd src/admin && npm run dev",
    "build:admin": "cd src/admin && npm run build",
    "test:admin": "cd src/admin && npm run test",
    "test:admin:watch": "cd src/admin && npm run test:watch",
    "test:admin:coverage": "cd src/admin && npm run test:coverage",
    "lint:admin": "cd src/admin && npm run lint",
    "preview:admin": "cd src/admin && npm run preview",

    // === COMBINED SCRIPTS ===
    "dev:all": "concurrently \"npm run dev:frontend\" \"npm run dev:admin\"",
    "build:all": "npm run build:frontend && npm run build:admin",
    "test:all": "npm run test:frontend && npm run test:admin && npm run test:backend",
    "lint:all": "npm run lint:frontend && npm run lint:admin && npm run lint:backend",

    // === DEPLOYMENT SCRIPTS ===
    "deploy:admin:staging": "npm run build:admin && ./scripts/deploy-admin-staging.sh",
    "deploy:admin:production": "npm run build:admin && ./scripts/deploy-admin-production.sh",
    "deploy:full:staging": "npm run build:all && ./scripts/deploy-full-staging.sh",
    "deploy:full:production": "npm run build:all && ./scripts/deploy-full-production.sh",

    // === DEVELOPMENT HELPERS ===
    "clean:admin": "cd src/admin && rm -rf dist node_modules && npm install",
    "reset:admin": "cd src/admin && rm -rf node_modules package-lock.json && npm install",
    "analyze:admin": "cd src/admin && npm run build -- --analyze",

    // === DOCKER SCRIPTS ===
    "docker:admin:dev": "docker-compose -f docker-compose.admin.yml up -d",
    "docker:admin:build": "docker build -f docker/admin/Dockerfile.prod -t naser-admin:latest .",

    // === MAINTENANCE ===
    "update:admin": "cd src/admin && npm update",
    "audit:admin": "cd src/admin && npm audit",
    "audit:admin:fix": "cd src/admin && npm audit fix"
  }
}
```

### ✅ TAREA W-ADMIN-2: Optimización del Package.json del Admin

**Objetivo**: Optimizar la configuración específica del admin dashboard

**Archivo**: `src/admin/package.json`

**Mejoras propuestas**:

```json
{
  "name": "naser-cms-admin",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "Admin Dashboard for Grupo Naser CMS",
  "scripts": {
    "start": "vite --host 0.0.0.0 --port 3001",
    "dev": "vite --host 0.0.0.0 --port 3001",
    "build": "vite build --mode production",
    "build:staging": "vite build --mode staging",
    "build:analyze": "vite build --mode production --analyze",
    "lint": "eslint . --ext js,jsx,ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext js,jsx,ts,tsx --fix",
    "preview": "vite preview --host 0.0.0.0 --port 4001",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage --reporter=html",
    "test:ui": "vitest --ui",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist node_modules",
    "reset": "npm run clean && npm install"
  },
  "dependencies": {
    // Dependencias actuales + nuevas optimizaciones
    "axios": "^1.6.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.7.0",
    "react-hook-form": "^7.48.2",
    "react-quill": "^2.0.0",
    "jwt-decode": "^4.0.0",
    "zustand": "^4.4.7",

    // Nuevas dependencias para admin dashboard
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "react-hot-toast": "^2.4.1",
    "react-dropzone": "^14.2.3",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    // DevDependencies actuales + optimizaciones
    "@eslint/js": "^9.30.1",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@vitejs/plugin-react": "^4.6.0",
    "eslint": "^9.30.1",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "jsdom": "^23.0.1",
    "vite": "^7.0.4",
    "vitest": "^1.0.4",

    // Nuevas dev dependencies para optimización
    "@vitest/coverage-v8": "^1.0.4",
    "@vitest/ui": "^1.0.4",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite-bundle-analyzer": "^0.7.0",
    "vite-plugin-pwa": "^0.17.4",
    "workbox-window": "^7.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### ✅ TAREA W-ADMIN-3: Configuración Vite Optimizada

**Objetivo**: Crear configuración Vite optimizada para el admin dashboard

**Archivo**: `src/admin/vite.config.js` → `src/admin/vite.config.ts`

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // PWA plugin para admin dashboard
    ...(mode === "production"
      ? [
          // Plugins de producción
        ]
      : []),
  ],

  // Configuración de desarrollo
  server: {
    port: 3001,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Configuración de build
  build: {
    outDir: "dist",
    sourcemap: mode !== "production",
    minify: mode === "production" ? "terser" : false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@headlessui/react", "@heroicons/react"],
          forms: ["react-hook-form", "react-quill"],
          charts: ["chart.js", "react-chartjs-2"],
          utils: ["axios", "date-fns", "jwt-decode"],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
      },
    },
  },

  // Alias para imports
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@/components": resolve(__dirname, "src/components"),
      "@/pages": resolve(__dirname, "src/pages"),
      "@/hooks": resolve(__dirname, "src/hooks"),
      "@/services": resolve(__dirname, "src/services"),
      "@/utils": resolve(__dirname, "src/utils"),
      "@/types": resolve(__dirname, "src/types"),
    },
  },

  // Configuración de testing
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/test/", "**/*.d.ts", "**/*.config.*"],
    },
  },

  // Optimizaciones
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "axios", "zustand"],
  },
}));
```

### ✅ TAREA W-ADMIN-4: Docker Configuration para Admin

**Objetivo**: Crear configuración Docker específica para el admin dashboard

**Archivo**: `docker/admin/Dockerfile.prod`

```dockerfile
# Multi-stage build para admin dashboard
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY src/admin/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY src/admin/ .

# Build optimizado
RUN npm run build

# Nginx para servir admin dashboard
FROM nginx:alpine AS production

# Instalar certificados SSL
RUN apk add --no-cache ca-certificates

# Copiar configuración Nginx para admin
COPY docker/admin/nginx.admin.conf /etc/nginx/conf.d/default.conf

# Copiar archivos build
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar permisos
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Health check específico para admin
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/admin/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Archivo**: `docker/admin/nginx.admin.conf`

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Configuración específica para admin SPA
    location / {
        try_files $uri $uri/ /index.html;

        # Headers de seguridad para admin
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;" always;
    }

    # API proxy para admin
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

### ✅ TAREA W-ADMIN-5: Scripts de Deployment

**Objetivo**: Crear scripts de deployment específicos para el admin dashboard

**Archivo**: `scripts/deploy-admin-staging.sh`

```bash
#!/bin/bash

# Deploy Admin Dashboard to Staging
set -e

echo "🚀 Deploying Admin Dashboard to Staging..."

# Variables
ADMIN_BUILD_DIR="src/admin/dist"
STAGING_HOST="${STAGING_HOST}"
STAGING_USER="${STAGING_USER}"
STAGING_PATH="${STAGING_ADMIN_PATH}"

# 1. Build admin dashboard
echo "📦 Building admin dashboard..."
cd src/admin
npm run build:staging
cd ../..

# 2. Create deployment package
echo "📦 Creating deployment package..."
tar -czf admin-staging-$(date +%Y%m%d_%H%M%S).tar.gz -C "$ADMIN_BUILD_DIR" .

# 3. Upload to staging
echo "📤 Uploading to staging server..."
scp admin-staging-*.tar.gz "$STAGING_USER@$STAGING_HOST:$STAGING_PATH/"

# 4. Deploy on server
echo "🔄 Deploying on staging server..."
ssh "$STAGING_USER@$STAGING_HOST" << EOF
cd $STAGING_PATH
tar -xzf admin-staging-*.tar.gz
rm admin-staging-*.tar.gz
chmod -R 755 .
EOF

# 5. Health check
echo "🔍 Running health check..."
HEALTH_URL="https://$STAGING_HOST/admin/"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL")

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Admin dashboard deployed successfully to staging"
else
    echo "❌ Deployment failed - HTTP Status: $HTTP_STATUS"
    exit 1
fi

# Cleanup
rm -f admin-staging-*.tar.gz

echo "🎉 Admin dashboard staging deployment completed"
```

### ✅ TAREA W-ADMIN-6: Docker Compose para Admin

**Archivo**: `docker-compose.admin.yml`

```yaml
version: "3.8"

services:
  admin-dashboard:
    build:
      context: .
      dockerfile: docker/admin/Dockerfile.prod
    container_name: naser-admin-dashboard
    ports:
      - "3001:80"
    environment:
      - NODE_ENV=production
      - VITE_API_URL=http://localhost:8000/api
    volumes:
      - admin_logs:/var/log/nginx
    depends_on:
      - backend
    networks:
      - naser-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/admin/"]
      interval: 30s
      timeout: 10s
      retries: 3

  backend:
    build:
      context: .
      dockerfile: docker/backend/Dockerfile.prod
    container_name: naser-backend
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=production
    networks:
      - naser-network

volumes:
  admin_logs:

networks:
  naser-network:
    driver: bridge
```

### ✅ TAREA W-ADMIN-7: CI/CD Integration

**Objetivo**: Integrar admin dashboard en el pipeline CI/CD

**Archivo**: `.github/workflows/ci-cd.yml` (actualización)

```yaml
# Agregar job para admin dashboard
test-admin:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: "18"
        cache: "npm"
        cache-dependency-path: src/admin/package-lock.json

    - name: Install admin dependencies
      run: cd src/admin && npm ci

    - name: Run admin linting
      run: cd src/admin && npm run lint

    - name: Run admin tests
      run: cd src/admin && npm run test:coverage

    - name: Build admin dashboard
      run: cd src/admin && npm run build

    - name: Upload admin coverage
      uses: codecov/codecov-action@v3
      with:
        directory: src/admin/coverage

build-admin-docker:
  needs: [test-admin]
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'

  steps:
    - uses: actions/checkout@v4

    - name: Build admin Docker image
      run: docker build -f docker/admin/Dockerfile.prod -t naser-admin:latest .

    - name: Test admin Docker image
      run: |
        docker run -d --name test-admin -p 3001:80 naser-admin:latest
        sleep 10
        curl -f http://localhost:3001/admin/ || exit 1
        docker stop test-admin
```

---

## 📊 BENEFICIOS DE ESTA IMPLEMENTACIÓN

### ✅ Para Qwen (Admin Developer)

- **Scripts optimizados** para desarrollo eficiente
- **Build process** optimizado para performance
- **Testing** configurado y automatizado
- **Hot reload** y proxy API configurados

### ✅ Para el Proyecto

- **Deployment automatizado** del admin dashboard
- **CI/CD integration** completa
- **Docker containerization** para consistencia
- **Performance optimization** con code splitting

### ✅ Para Warp (DevOps)

- **Tarea perfecta** para sus habilidades
- **Integración** con infraestructura existente
- **Monitoreo** y health checks
- **Escalabilidad** preparada

---

## 🎯 RESULTADO ESPERADO

Al completar estas tareas, Warp habrá:

1. **Optimizado completamente** la configuración del admin dashboard
2. **Integrado** el admin en el pipeline CI/CD
3. **Creado** scripts de deployment automatizado
4. **Configurado** Docker para el admin dashboard
5. **Preparado** la infraestructura para producción

**¿Te parece que esta sería una excelente tarea para Warp?** 🚀
