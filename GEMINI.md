# GEMINI.md

This file provides guidance to Google Gemini when working with code in this repository, with emphasis on backend development and API architecture.

## Project Overview

Grupo Naser is a React-based CMS for funeral services website, **specifically engineered for GoDaddy shared hosting deployment**. This backend-focused project replaces static HTML with a robust PHP API serving React frontends, emphasizing clean API architecture, database management, and server-side processing optimized for shared hosting constraints.

### 🎯 Critical Business Context

- **Hosting Target**: GoDaddy shared hosting with PHP/MySQL limitations
- **Primary Audience**: ISSSTE affiliates requiring accessible service information
- **Migration Scope**: Complete replacement of existing static HTML structure
- **Admin Focus**: Non-technical content administrators need intuitive management
- **Performance Mandate**: Fast loading times essential for user experience

## 🔧 Backend-First Architecture

### 🏗️ Core Backend Architecture (`api/` directory)

```
api/
├── config.php              # 🎯 GoDaddy-optimized configuration hub
├── index.php              # RESTful API entry point
├── controllers/           # 🎯 Clean Architecture controllers
├── models/               # 🎯 Domain entities and business logic
├── services/             # 🎯 Application service layer
├── repositories/         # 🎯 Repository pattern data access
├── middleware/           # 🎯 Security and validation middleware
├── utils/                # 🎯 Shared hosting utilities
├── composer.json         # 🎯 Minimal dependencies (GoDaddy compatible)
├── phpunit.xml          # 🎯 Test configuration with SQLite
├── phpcs.xml            # PSR-12 coding standards
└── phpmd.xml            # Code quality metrics
```

### 🔧 Clean Architecture Implementation

- **Domain Layer**: Core entities (Page, Service, Location, User, Media)
- **Application Layer**: Use cases and business rules
- **Infrastructure Layer**: Database repositories and external services
- **Interface Layer**: API controllers and response formatting

### Three-Tier Client Architecture

- **PHP API Backend**: Primary focus - RESTful API in `api/`
- **React Admin Panel**: Content management in `src/admin/`
- **React Public Frontend**: User-facing app in `src/frontend/`
- **Static Marketing**: HTML pages for SEO and performance

## 🚀 Backend Development Commands (PRIMARY FOCUS)

### PHP API Development (`api/`)

```bash
cd api

# Dependency Management
composer install              # Install all dependencies
composer update               # Update dependencies
composer dump-autoload        # Regenerate autoloader

# Testing & Quality
composer test                 # 🎯 Run PHPUnit test suite
composer test-coverage        # 🎯 Generate coverage reports
composer cs                   # 🎯 Check coding standards (PHPCS)
composer cs-fix              # 🎯 Auto-fix coding standards
composer md                   # 🎯 Run mess detector (PHPMD)

# Development Workflow
php -S localhost:8000 index.php  # 🎯 Start development server
```

### Database Operations

```bash
# Database setup (MySQL/MariaDB)
mysql -u root -p naser_cms < database/schema.sql
mysql -u root -p naser_cms < database/seeds/initial_data.sql

# Migration commands (if applicable)
php database/migrate.php
php database/seed.php
```

## 🎯 Backend Technology Stack (FOCUS AREA)

### Core PHP Architecture

- **PHP Version**: 7.4+ (modern features, typed properties)
- **Architecture**: MVC with Repository pattern
- **Database**: MySQL/MariaDB with PDO
- **Authentication**: JWT tokens with configurable expiry
- **API Design**: RESTful endpoints, JSON responses
- **Error Handling**: Environment-based error reporting

### 🎯 GoDaddy Database Configuration (`api/config.php`)

```php
// GoDaddy MySQL Database Setup
define('DB_HOST', 'localhost');           // GoDaddy MySQL host
define('DB_NAME', 'naser_cms');           // Database name
define('DB_USER', 'root');                // Configurable for production
define('DB_PASS', '');                    // Environment-specific
define('DB_CHARSET', 'utf8mb4');          // Unicode support

// RESTful API Configuration
define('API_VERSION', '1.0');
define('API_BASE_PATH', '/api');
define('JWT_SECRET', 'production_secret_key'); // 256-bit secret
define('JWT_EXPIRY', 86400);              // 24-hour sessions

// GoDaddy-Specific Settings
define('UPLOAD_DIR', __DIR__ . '/../public/uploads/');
define('MAX_UPLOAD_SIZE', 5242880);       // 5MB limit
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'pdf']);

// Shared Hosting Optimizations
date_default_timezone_set('America/Mexico_City');
if (ENV === 'development') {
    // Development CORS and error reporting
    header('Access-Control-Allow-Origin: *');
    error_reporting(E_ALL);
}
```

### 🎯 GoDaddy-Optimized Dependencies

```json
{
  "require": {
    "php": ">=7.4", // GoDaddy compatibility baseline
    "ext-json": "*", // JSON API responses
    "ext-pdo": "*" // Secure database access
  },
  "require-dev": {
    "phpunit/phpunit": "^9.5", // Comprehensive testing
    "squizlabs/php_codesniffer": "^3.7", // PSR-12 compliance
    "phpmd/phpmd": "^2.13", // Code quality analysis
    "mockery/mockery": "^1.5", // Test mocking
    "fakerphp/faker": "^1.20" // Test data generation
  }
}
```

### 🛡️ Security-First Architecture

- **No External Frameworks**: Minimizes attack surface for shared hosting
- **PSR-4 Autoloading**: Organized namespace structure
- **Input Sanitization**: Every user input validated and cleaned
- **Prepared Statements**: 100% PDO prepared statements for SQL
- **JWT Authentication**: Stateless token-based authentication

````

## 🧪 Testing & Quality Assurance

### 🎯 Frontend Testing Configuration (Vitest)
```javascript
// src/frontend/vitest.config.js
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.js',
        'dist/'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})
````

### 🎯 PHPUnit Test Configuration (`api/phpunit.xml`)

```xml
<testsuites>
    <testsuite name="Unit">
        <directory suffix="Test.php">../tests/unit/backend</directory>
    </testsuite>
    <testsuite name="Integration">
        <directory suffix="Test.php">../tests/integration/api</directory>
        <directory suffix="Test.php">../tests/integration/database</directory>
    </testsuite>
</testsuites>

<!-- GoDaddy-Compatible Test Environment -->
<php>
    <env name="APP_ENV" value="testing"/>
    <env name="DB_CONNECTION" value="sqlite"/>     <!-- In-memory testing -->
    <env name="DB_DATABASE" value=":memory:"/>     <!-- Isolation -->
</php>
```

### 🔧 Automated Security Analysis

- **PHP Security Hook**: Automatic code analysis on file save
- **Vulnerability Scanning**: SQL injection, XSS, authentication checks
- **File Upload Security**: Malware detection and type validation
- **Input Sanitization**: Comprehensive validation checks

### Test Structure & Standards

```
tests/
├── unit/backend/             # 🎯 PHP unit tests
│   ├── controllers/         # Controller logic tests
│   ├── models/             # Model and business logic tests
│   ├── services/           # Service layer tests
│   └── Fixtures/           # Test data and helpers
├── integration/api/         # 🎯 API endpoint tests
├── integration/database/    # 🎯 Database integration tests
└── coverage/               # Generated coverage reports
```

### Quality Metrics

- **Coverage Target**: 80% minimum across all backend components
- **Code Standards**: PSR-12 compliance via PHP CodeSniffer
- **Complexity**: Monitored via PHP Mess Detector
- **Testing Environment**: SQLite in-memory for isolation

## 🏗️ API Architecture Patterns

### MVC + Repository Pattern

```php
// Controllers: Handle HTTP requests
class UserController {
    private UserService $userService;

    public function index(): JsonResponse {
        return $this->userService->getAllUsers();
    }
}

// Services: Business logic layer
class UserService {
    private UserRepository $userRepository;

    public function getAllUsers(): array {
        return $this->userRepository->findAll();
    }
}

// Repositories: Data access layer
class UserRepository {
    private PDO $database;

    public function findAll(): array {
        // Database queries
    }
}
```

### Security Implementation

```php
// JWT Authentication
define('JWT_SECRET', 'production_secret_key');
define('JWT_EXPIRY', 86400);

// File Upload Security
define('UPLOAD_DIR', __DIR__ . '/../public/uploads/');
define('MAX_UPLOAD_SIZE', 5242880); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'pdf']);

// CORS Configuration
if (ENV === 'development') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}
```

## 🗄️ Database Design & Management

### Connection Management

```php
// PDO Configuration (config.php)
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
}
```

### Migration & Seeding Structure

```
database/
├── migrations/              # 🎯 Database schema changes
│   ├── 001_create_users.sql
│   ├── 002_create_posts.sql
│   └── 003_add_indexes.sql
└── seeds/                   # 🎯 Test and initial data
    ├── users_seed.sql
    └── initial_data.sql
```

## 🔧 Frontend Integration Points

### React Applications (Context for API)

- **Admin Panel** (`src/admin/`): Axios-based API consumption
- **Public Frontend** (`src/frontend/`): React Router with API integration
- **Build Integration**: Frontend builds to `public/static/` for PHP serving

### Frontend Integration Commands (Context for Backend)

```bash
# React Admin Panel
cd src/admin && npm run dev        # Development server for testing API
cd src/admin && npm run build      # Production build for deployment
cd src/admin && npm run test       # Frontend API integration tests

# React Public Frontend
cd src/frontend && npm run dev     # Port 3000 development with API proxy
cd src/frontend && npm run build   # Build to ../../public/static for PHP serving
cd src/frontend && npm run test    # API consumption testing
```

## 📋 Ripper Five Backend Development Protocol

### 🎯 Mode-Based Backend Development (.kiro/specs/)

1. **RESEARCH Mode**: Analyze existing codebase and requirements
2. **INNOVATE Mode**: Design API architecture and database schema
3. **PLAN Mode**: Create implementation batches (3-5 items max)
4. **CODE Mode**: Implement with Clean Architecture principles
5. **EXECUTE Mode**: Test, validate, and security scan

### 🏗️ Backend Implementation Strategy

- **Batch 1**: Domain entities and repository interfaces
- **Batch 2**: Database repositories and migrations
- **Batch 3**: Application services and use cases
- **Batch 4**: API controllers and middleware
- **Batch 5**: Security hardening and optimization

### 🔧 Quality Standards

- **File Size Limit**: 500 lines maximum per file
- **PSR-12 Compliance**: Enforced via PHP CodeSniffer
- **Security First**: Every endpoint security-reviewed
- **Test Coverage**: 80% minimum across all backend components

### Key Backend Patterns

- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic separation
- **Dependency Injection**: Constructor injection for testability
- **Configuration Management**: Environment-based settings
- **Error Handling**: Consistent JSON error responses
- **Validation**: Input sanitization and validation

## 🔐 Security & Environment Configuration

### Environment-Based Configuration

```php
// Development Environment
if (ENV === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    // Permissive CORS for development
}

// Production Environment
if (ENV === 'production') {
    error_reporting(0);
    ini_set('display_errors', 0);
    // Strict security headers
}
```

### Authentication & Authorization

- **JWT Implementation**: Token-based authentication
- **Session Management**: Configurable token expiry
- **File Upload Security**: Size and type restrictions
- **SQL Injection Prevention**: PDO prepared statements
- **XSS Protection**: Input sanitization

## 📝 Important Backend Files

### Configuration & Setup

- `api/config.php` - 🎯 Core API configuration
- `api/composer.json` - 🎯 Dependencies and scripts
- `api/index.php` - API entry point and routing
- `api/phpunit.xml` - 🎯 Testing configuration

### Documentation (Backend Context)

- `memory-bank/ripperFive.md` - Development protocol
- `memory-bank/techContext.md` - Technical specifications
- `memory-bank/activeContext.md` - Current development status

## 🎯 Backend Development Priorities

### Primary Focus Areas

1. **🏗️ Clean Architecture Implementation**: Hexagonal pattern with clear boundaries
2. **🔐 Security-First Development**: GoDaddy-compatible security measures
3. **🚀 GoDaddy Optimization**: Shared hosting performance and compatibility
4. **📊 Database Design**: Efficient schema for content management
5. **🔧 API Architecture**: RESTful endpoints with proper HTTP semantics
6. **🧪 Comprehensive Testing**: Unit, integration, and security testing
7. **📈 Performance Optimization**: Query efficiency and response caching
8. **🛡️ Input Validation**: Robust sanitization and validation layers

### 📋 Implementation Reference

- **Requirements**: `.kiro/specs/react-cms-godaddy/requirements.md`
- **Architecture**: `.kiro/specs/react-cms-godaddy/design.md`
- **Tasks**: `.kiro/specs/react-cms-godaddy/tasks.md`
- **Standards**: `.kiro/steering/php-standards.md`
- **Security**: `.kiro/hooks/php-security-check.json`

### 🎯 Success Criteria

- **GoDaddy Deployment Ready**: All code compatible with shared hosting
- **Security Hardened**: Comprehensive protection against common vulnerabilities
- **Performance Optimized**: Fast response times under shared hosting constraints
- **Content Migration**: Seamless transition from existing static website
- **Admin-Friendly**: Intuitive content management for non-technical users

The backend architecture serves as the foundation for both admin and public frontends, making robust, secure, and GoDaddy-optimized API design critical to the entire application's success.
