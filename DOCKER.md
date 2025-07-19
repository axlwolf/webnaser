# 🐳 Docker Setup - Grupo Naser CMS

Este documento explica cómo configurar y usar el entorno Docker para el desarrollo y producción del CMS de Grupo Naser.

## 📋 Requisitos Previos

- Docker Desktop 4.0+ instalado y corriendo
- Docker Compose 2.0+
- Git (para clonado del repositorio)
- 4GB+ RAM disponible para contenedores

## 🚀 Inicio Rápido

### 1. Configuración Inicial

```bash
# Clonar el repositorio
git clone <repository-url>
cd web_naser_23

# Crear archivo de configuración
cp .env.example .env

# Iniciar entorno de desarrollo
./scripts/dev.sh
```

### 2. URLs de Desarrollo

Después de ejecutar el script, tendrás disponible:

- **Frontend React**: http://localhost:3000
- **Backend PHP API**: http://localhost:8000
- **Sitio Completo**: http://localhost
- **phpMyAdmin**: http://localhost:8080
- **Base de Datos**: localhost:3306

## 🏗️ Arquitectura del Proyecto

### Servicios Docker

| Servicio | Puerto | Descripción |
|----------|---------|-------------|
| `frontend` | 3000 | React + Vite con hot reload |
| `backend` | 8000 | PHP 8.2 + Apache |
| `database` | 3306 | MySQL 8.0 |
| `phpmyadmin` | 8080 | Administrador de BD |
| `webserver` | 80 | Nginx (simula GoDaddy) |

### Estructura de Directorios

```
web_naser_23/
├── api/                    # Backend PHP
│   ├── Dockerfile
│   └── docker/
├── src/frontend/           # Frontend React
│   ├── Dockerfile
│   └── nginx.conf
├── docker/                 # Configuraciones Docker
├── scripts/                # Scripts de automatización
├── database/               # Migraciones y seeds
├── docker-compose.yml      # Desarrollo
└── docker-compose.prod.yml # Producción
```

## 🛠️ Comandos de Desarrollo

### Scripts Automatizados

```bash
# Iniciar desarrollo
./scripts/dev.sh

# Ejecutar tests
./scripts/test.sh

# Desplegar a producción
./scripts/deploy.sh
```

### Comandos Docker Manuales

```bash
# Construir e iniciar servicios
docker-compose up -d --build

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f frontend

# Parar todos los servicios
docker-compose down

# Reiniciar un servicio
docker-compose restart backend

# Ejecutar comando en contenedor
docker exec naser_backend composer install
docker exec naser_frontend npm install

# Acceder al shell de un contenedor
docker exec -it naser_backend bash
docker exec -it naser_frontend sh
```

## 🗄️ Base de Datos

### Credenciales de Desarrollo

- **Host**: localhost:3306
- **Usuario**: naser_user
- **Contraseña**: naser_pass_2024
- **Base de datos**: naser_cms
- **Root password**: naser_root_2024

### Conexión desde Host

```bash
mysql -h localhost -P 3306 -u naser_user -p naser_cms
```

### Backup y Restore

```bash
# Backup
docker exec naser_db mysqldump -u naser_user -pnaser_pass_2024 naser_cms > backup.sql

# Restore
docker exec -i naser_db mysql -u naser_user -pnaser_pass_2024 naser_cms < backup.sql
```

## 🔧 Configuración Avanzada

### Variables de Entorno

Edita el archivo `.env` para personalizar:

```env
# Base de datos
DB_HOST=database
DB_PORT=3306
DB_NAME=naser_cms
DB_USER=naser_user
DB_PASSWORD=naser_pass_2024

# API
JWT_SECRET=tu_secreto_jwt
CORS_ORIGIN=http://localhost:3000

# Email
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_password
```

### Hot Reload

- **Frontend**: Automático con Vite
- **Backend**: Volúmenes montados para cambios instantáneos

### Desarrollo en Equipo

1. **Gemini (Backend)**: Trabajar en `/api`
2. **Claude (Frontend)**: Trabajar en `/src/frontend`
3. **Ambos**: Compartir base de datos y API

## 🚀 Producción

### Preparación

```bash
# Crear archivo de producción
cp .env.example .env.prod

# Configurar secretos
mkdir secrets
echo "tu_password_mysql_root" > secrets/mysql_root_password.txt
echo "tu_password_mysql" > secrets/mysql_password.txt
```

### Despliegue

```bash
# Despliegue automatizado
./scripts/deploy.sh

# Manual
docker-compose -f docker-compose.prod.yml up -d --build
```

### Diferencias Producción vs Desarrollo

| Aspecto | Desarrollo | Producción |
|---------|------------|------------|
| PHP | Debug habilitado | Debug deshabilitado |
| React | Hot reload | Build optimizado |
| Base de datos | Passwords simples | Secrets seguros |
| SSL | No | Sí (certificados) |
| Logs | Verbose | Solo errores |
| Caché | Deshabilitado | Redis habilitado |

## 🛡️ Seguridad

### Desarrollo

- Passwords simples para facilidad
- CORS abierto
- Debug habilitado
- Sin SSL

### Producción

- Secrets en archivos separados
- CORS restrictivo
- Debug deshabilitado
- SSL/TLS obligatorio
- Logs de seguridad

## 🐛 Troubleshooting

### Problemas Comunes

#### Puerto ocupado

```bash
# Verificar puertos ocupados
lsof -i :3000
lsof -i :8000

# Cambiar puertos en docker-compose.yml
```

#### Contenedor no inicia

```bash
# Ver logs detallados
docker-compose logs -f service_name

# Reconstruir desde cero
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### Base de datos no conecta

```bash
# Verificar estado
docker-compose ps

# Reiniciar servicio
docker-compose restart database

# Verificar logs
docker-compose logs database
```

#### Permisos en Linux/Mac

```bash
# Ajustar permisos
sudo chown -R $USER:$USER api/
sudo chown -R $USER:$USER src/
```

### Limpieza del Sistema

```bash
# Parar todos los contenedores
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Limpiar imágenes no usadas
docker image prune

# Limpiar todo (¡cuidado!)
docker system prune -a
```

## 📊 Monitoreo

### Health Checks

```bash
# Verificar estado de servicios
curl http://localhost/api/v1/health
curl http://localhost:3000

# Logs en tiempo real
docker-compose logs -f --tail=100
```

### Métricas

```bash
# Uso de recursos
docker stats

# Espacio en disco
docker system df
```

## 🤝 Colaboración

### Flujo de Trabajo Recomendado

1. **Pull** del repositorio
2. **Ejecutar** `./scripts/dev.sh`
3. **Desarrollar** en tu área asignada
4. **Probar** con `./scripts/test.sh`
5. **Commit** y push de cambios
6. **Deploy** con `./scripts/deploy.sh`

### Sincronización entre Desarrolladores

```bash
# Actualizar contenedores después de pull
docker-compose pull
docker-compose up -d --build

# Sincronizar base de datos
# (instrucciones específicas según necesidad)
```