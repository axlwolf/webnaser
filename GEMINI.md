# GEMINI.md

This file provides guidance to Gemini when collaborating with Claude on the Grupo Naser CMS project. This document explains the **Contract Bridge Protocol** for AI-AI collaboration and the Docker environment setup.

## Project Overview

Grupo Naser is a React-based CMS for funeral services designed for **GoDaddy shared hosting**. The project uses a collaborative approach where:

- **Claude**: Handles frontend React development (`src/frontend/`, `/src/components/`)
- **Gemini**: Handles backend PHP development (`api/`, `/database/`)
- **Shared**: Docker environment, database schema, and API contracts

## 🐳 Docker Environment

### Quick Start for Gemini

```bash
# 1. Initial setup (first time only)
cp .env.example .env

# 2. Start complete environment
./scripts/dev.sh

# 3. Your backend will be available at:
# - API Backend: http://localhost:8000
# - Database: localhost:3306 (naser_user/naser_pass_2024)
# - phpMyAdmin: http://localhost:8080
```

### Development Commands

```bash
# Daily development
./scripts/test.sh           # Run all tests
docker-compose logs -f      # View real-time logs
docker-compose restart backend  # Restart your service

# Backend-specific commands
docker exec naser_backend composer install
docker exec naser_backend composer test
docker exec naser_backend composer cs-fix

# Database operations
docker exec naser_db mysql -u naser_user -p naser_cms
```

### Your Development Area

**Primary Responsibility**: `/api/` directory
```
api/
├── 🐳 Dockerfile              # Your container config
├── docker/                    # Apache & PHP configs
├── src/                       # Your PHP source code
├── config/                    # Configuration files
├── tests/                     # PHPUnit tests
├── composer.json              # PHP dependencies (now includes vlucas/phpdotenv)
├── config.php                 # Updated to use environment variables from Docker
└── index.php                  # Entry point
```

**Database**: `/database/` directory
```
database/
├── migrations/                # MySQL migrations
│   └── 001_initial_schema.sql # ✅ Ready to use
└── seeds/                     # Sample data
```

## API Implementation Guide

### Required Endpoints

#### Authentication (`/api/v1/auth/`)
```php
POST /login       - User authentication
POST /logout      - User logout  
POST /refresh     - Token refresh
GET  /me          - Current user info
```

#### Pages (`/api/v1/pages/`)
```php
GET    /          - List all pages
GET    /{id}      - Get specific page
POST   /          - Create new page
PUT    /{id}      - Update page
DELETE /{id}      - Delete page
```

#### Services (`/api/v1/services/`)
```php
GET    /          - List all services
GET    /{id}      - Get specific service
POST   /          - Create new service
PUT    /{id}      - Update service
DELETE /{id}      - Delete service
```

#### Locations (`/api/v1/locations/`)
```php
GET    /          - List all locations
GET    /{id}      - Get specific location
POST   /          - Create new location
PUT    /{id}      - Update location
DELETE /{id}      - Delete location
```

#### Contacts (`/api/v1/contacts/`)
```php
GET    /          - List all contacts (admin)
GET    /{id}      - Get specific contact (admin)
POST   /          - Create new contact (public)
PUT    /{id}      - Update contact status (admin)
DELETE /{id}      - Delete contact (admin)
```

### Response Format Standards

All responses must follow this format:

```json
// Success Response
{
    "success": true,
    "data": { ... },
    "message": "Operación exitosa",
    "timestamp": "2025-07-18T10:30:00-06:00"
}

// Error Response  
{
    "success": false,
    "error": "validation_error",
    "message": "Datos inválidos",
    "violations": {
        "email": "El email es obligatorio",
        "password": "La contraseña debe tener al menos 6 caracteres"
    },
    "timestamp": "2025-07-18T10:30:00-06:00"
}
```

### Spanish Localization

All messages must be in **Mexican Spanish (es-MX)**:

```php
$errorMessages = [
    'required' => 'Este campo es obligatorio',
    'email' => 'Ingresa un email válido',
    'unique' => 'Este valor ya existe',
    'unauthorized' => 'No tienes permisos para realizar esta acción',
    'not_found' => 'El recurso solicitado no fue encontrado',
    'server_error' => 'Error del servidor. Inténtalo más tarde.',
];
```

### Database Configuration

Use these environment variables (from Docker):

```php
$config = [
    'host' => $_ENV['DB_HOST'] ?? 'database',
    'port' => $_ENV['DB_PORT'] ?? '3306',
    'database' => $_ENV['DB_NAME'] ?? 'naser_cms',
    'username' => $_ENV['DB_USER'] ?? 'naser_user',
    'password' => $_ENV['DB_PASSWORD'] ?? 'naser_pass_2024',
    'charset' => 'utf8mb4',
    'timezone' => 'America/Mexico_City',
];
```

### Security Requirements

1. **Input Validation**: Sanitize all inputs
2. **SQL Injection**: Use prepared statements exclusively
3. **Authentication**: JWT tokens with proper validation
4. **CORS**: Configured for frontend domain
5. **File Upload**: Strict validation and size limits

## Testing Requirements

Maintain **80% minimum coverage** with PHPUnit:

```bash
docker exec naser_backend composer test
docker exec naser_backend composer test-coverage
```

## Next Steps for Gemini

1.  **✅ Environment Ready**: Docker environment is configured and backend `config.php` is updated to use environment variables.
2.  **✅ Database Schema**: Available in `/database/migrations/`
3.  **🔄 Implement APIs**: Start with authentication endpoints
4.  **🔄 Testing**: Implement PHPUnit tests with 80% coverage
5.  **🔄 Integration**: Test with Claude's frontend components

Start with the authentication API (`/api/v1/auth/`) as it's foundational for all other endpoints.

The frontend is ready and waiting for your API implementation! 🚀