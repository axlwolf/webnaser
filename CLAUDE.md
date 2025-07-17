# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Grupo Naser is a React-based CMS for funeral services website, specifically designed for deployment on **GoDaddy shared hosting**. This project replaces the current static HTML website with a dynamic, manageable solution featuring a React frontend for public users and a React+PHP admin panel for content management.

### Business Requirements

- **Target Audience**: ISSSTE affiliates as primary audience
- **Hosting**: Must be compatible with GoDaddy shared hosting environment
- **Branding**: Maintain current visual identity and preserve all existing content
- **User Experience**: Non-technical administrators must be able to manage content easily
- **Performance**: Fast loading times and mobile responsiveness required

## Architecture

### Three-Tier Structure

- **Static Frontend**: HTML/CSS/JS marketing site (root level)
- **Admin Panel**: React application in `src/admin/`
- **API Backend**: PHP API in `api/` directory
- **Public Frontend**: React frontend in `src/frontend/`

### Key Directories

```
web_naser_23/
├── api/                    # PHP backend API
├── src/admin/             # React admin panel
├── src/frontend/          # React public frontend
├── assets/                # Static assets (CSS, images, JS)
├── tests/                 # Testing infrastructure
├── database/              # Database migrations and seeds
├── memory-bank/           # Project documentation and context
└── [marketing pages].html # Static marketing pages
```

## Development Commands

### Frontend (React Applications)

#### Admin Panel (`src/admin/`)

```bash
cd src/admin
npm run dev          # Development server
npm run build        # Production build
npm run test         # Run tests with Vitest
npm run test:watch   # Watch mode testing
npm run test:coverage # Coverage reports
npm run lint         # ESLint checking
```

#### Public Frontend (`src/frontend/`)

```bash
cd src/frontend
npm run dev          # Development server (port 3000)
npm run build        # Production build to ../../public/static
npm run test         # Run tests with Vitest (configured and working)
npm run test:watch   # Watch mode testing
npm run test:coverage # Coverage reports (configured with 80% threshold)
npm run lint         # ESLint checking
npm run preview      # Preview production build
```

### Backend API (`api/`)

```bash
cd api
composer install      # Install dependencies
composer test         # Run PHPUnit tests
composer cs           # Run PHP CodeSniffer
composer cs-fix       # Fix coding standards
composer md           # Run PHP Mess Detector
composer test-coverage # Generate test coverage
```

## Key Technologies

### Frontend Stack

- **Framework**: React 19.1.0 with Vite
- **Routing**: React Router DOM v7.7.0
- **Testing**: Vitest with Testing Library
- **Styling**: CSS modules with BEM naming convention, mobile-first responsive design
- **State Management**: React Context + Zustand (admin panel), React Query for server state
- **Build Tool**: Vite with optimized build configuration for GoDaddy hosting
- **Browser Support**: Modern browsers + IE11 compatibility with polyfills

### Backend Stack

- **Language**: PHP 7.4+ (GoDaddy compatible)
- **Architecture**: MVC with Repository pattern and Clean Architecture principles
- **Database**: MySQL/MariaDB with PDO connections
- **Authentication**: JWT tokens with secure session management
- **Security**: CSRF protection, password hashing, input sanitization
- **Testing**: PHPUnit 9.5
- **Code Standards**: PSR-4 autoloading, PSR-12 coding standards
- **Dependencies**: Minimal - no framework, native PHP optimized for shared hosting

### Development Tools

- **Code Quality**: ESLint, PHP CodeSniffer, PHP Mess Detector
- **Testing**: Vitest (frontend), PHPUnit (backend)
- **Build**: Vite with custom output to `public/static`

## Build Configuration

### Frontend Build Output

- Admin builds output to default Vite structure
- Public frontend builds to `../../public/static/` for integration with PHP backend
- Optimized chunks: React, Router, vendor separation
- Production builds strip console logs and enable minification

### Path Aliases (Frontend)

```javascript
'@': 'src'
'@components': 'src/components'
'@pages': 'src/pages'
'@hooks': 'src/hooks'
'@context': 'src/context'
'@services': 'src/services'
'@utils': 'src/utils'
'@styles': 'src/styles'
'@assets': 'src/assets'
```

## Testing Standards

### Coverage Requirements

- **Global Thresholds**: 80% (branches, functions, lines, statements)
- **Frontend**: Vitest with jsdom environment
- **Backend**: PHPUnit with in-memory SQLite for tests

### Test Structure

```
tests/
├── unit/backend/          # PHP unit tests
├── integration/api/       # API integration tests
├── integration/database/  # Database tests
├── e2e/                   # End-to-end tests
└── coverage/              # Generated coverage reports
```

## Database Configuration

### Development Setup

- **Host**: localhost
- **Database**: naser_cms
- **User**: root (development)
- **Charset**: utf8mb4
- **Timezone**: America/Mexico_City

### Test Environment

- **Connection**: SQLite in-memory
- **Isolation**: Each test runs in isolated environment
- **Fixtures**: Available in `tests/unit/backend/Fixtures/`

## Important Files

### Configuration

- `api/config.php` - PHP API configuration with GoDaddy compatibility
- `src/frontend/vite.config.js` - Frontend build configuration optimized for shared hosting
- `api/phpunit.xml` - PHP testing configuration
- `api/composer.json` - PHP dependencies and scripts

### Project Specifications (.kiro/)

- `.kiro/steering/project-context.md` - Core project context and business requirements
- `.kiro/specs/react-cms-godaddy/requirements.md` - Detailed functional requirements
- `.kiro/specs/react-cms-godaddy/design.md` - Complete system architecture and design
- `.kiro/specs/react-cms-godaddy/tasks.md` - Implementation plan and task breakdown
- `.kiro/steering/php-standards.md` - PHP development standards and GoDaddy compatibility
- `.kiro/steering/react-standards.md` - React development standards and best practices
- `.kiro/hooks/php-security-check.json` - Automated security analysis hook

### Documentation

- `memory-bank/ripperFive.md` - Ripper Five Optimized development protocol
- `memory-bank/memory-bank.md` - Project context and scope
- `memory-bank/activeContext.md` - Current development context

## Development Protocols

This project follows the **Ripper Five Optimized Protocol** for AI-assisted development (detailed in `memory-bank/ripperFive.md`):

### Mode-Based Development

1. **RESEARCH**: Understanding existing code and architecture
2. **INNOVATE**: Brainstorming solutions and approaches
3. **PLAN**: Creating detailed implementation plans in manageable batches
4. **CODE**: Writing actual implementations
5. **EXECUTE**: Testing and verification

### Global Operating Principles

- **Project Awareness**: Always read project documentation before starting work
- **Code Structure**: Maximum file size of 500 lines, clear modular organization
- **Testing Requirements**: Unit tests for all new functionality (expected, edge, failure cases)
- **Task Management**: Track completion and document discoveries
- **Clean Architecture**: Implement hexagonal pattern with clear layer separation

### Batch Implementation Strategy

- Small batches: 3-5 items per batch for maintainability
- Layer-based batching: Foundation → Logic → Interface → Integration
- Clear pause points between batches for review
- Adaptive sizing based on complexity

## Security Considerations

### Comprehensive Security Implementation

- **Authentication**: Secure password hashing with `password_hash()`, JWT tokens
- **Input Validation**: Always sanitize user input, use prepared statements
- **CSRF Protection**: Implement CSRF tokens for all forms
- **File Upload Security**: Type validation, size limits, malware scanning
- **XSS Prevention**: Proper output encoding and Content Security Policy
- **SQL Injection Prevention**: PDO prepared statements exclusively

### Security Hooks

- **Automated Security Checks**: PHP security hook analyzes code on save
- **Security Review**: Checks for SQL injection, XSS, authentication issues
- **File Upload Validation**: Thorough validation of uploaded content

### Environment Security

- **Development**: Error reporting enabled, permissive CORS for testing
- **Production**: Error reporting disabled, strict security headers
- **GoDaddy Compatibility**: Security measures compatible with shared hosting limitations
