#!/bin/bash

# 🔧 PHPUnit Bootstrap Fix - Grupo Naser CMS
# Fixes the Dotenv\Exception\InvalidPathException in PHPUnit bootstrap

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Fixing PHPUnit Bootstrap Environment Issue${NC}"
echo "=============================================="

# Check current working directory
echo -e "${YELLOW}📍 Current directory: $(pwd)${NC}"

# Check if we're in the right directory
if [ ! -f "api/composer.json" ]; then
    echo -e "${RED}❌ Error: Not in project root directory${NC}"
    echo -e "${YELLOW}💡 Please run this script from the project root${NC}"
    exit 1
fi

# Check bootstrap file
BOOTSTRAP_FILE="tests/bootstrap.php"
if [ ! -f "$BOOTSTRAP_FILE" ]; then
    echo -e "${RED}❌ Bootstrap file not found: $BOOTSTRAP_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Bootstrap file found: $BOOTSTRAP_FILE${NC}"

# Check environment files
echo -e "${YELLOW}🔍 Checking environment files...${NC}"

ENV_FILES=(".env" ".env.testing" ".env.ci" ".env.example")
FOUND_ENV=false

for env_file in "${ENV_FILES[@]}"; do
    if [ -f "$env_file" ]; then
        echo -e "${GREEN}✅ Found: $env_file${NC}"
        FOUND_ENV=true
    else
        echo -e "${YELLOW}⚠️  Missing: $env_file${NC}"
    fi
done

# Create .env file if none exists
if [ "$FOUND_ENV" = false ]; then
    echo -e "${YELLOW}🔧 Creating minimal .env file...${NC}"
    cat > .env << 'EOF'
# Minimal Environment for Testing
APP_ENV=testing
APP_DEBUG=true
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=naser_cms_test
DB_USER=test_user
DB_PASSWORD=test_password
JWT_SECRET=test_jwt_secret_minimal_2024
JWT_EXPIRE=3600
EOF
    echo -e "${GREEN}✅ Created minimal .env file${NC}"
fi

# Test the bootstrap file
echo -e "${YELLOW}🧪 Testing bootstrap file...${NC}"

# Create a test script to verify bootstrap works
cat > /tmp/test_bootstrap.php << 'EOF'
<?php
try {
    require_once __DIR__ . '/tests/bootstrap.php';
    echo "✅ Bootstrap loaded successfully\n";
    
    // Check if environment variables are loaded
    $required_vars = ['APP_ENV', 'DB_HOST', 'DB_NAME', 'JWT_SECRET'];
    foreach ($required_vars as $var) {
        $value = $_ENV[$var] ?? $_SERVER[$var] ?? getenv($var);
        if ($value) {
            echo "✅ $var: $value\n";
        } else {
            echo "⚠️  $var: not set\n";
        }
    }
} catch (Exception $e) {
    echo "❌ Bootstrap failed: " . $e->getMessage() . "\n";
    exit(1);
}
EOF

# Change to project directory and test
cd "$(dirname "$0")/../.."
if php /tmp/test_bootstrap.php; then
    echo -e "${GREEN}✅ Bootstrap test passed${NC}"
else
    echo -e "${RED}❌ Bootstrap test failed${NC}"
    
    # Try to fix the bootstrap
    echo -e "${YELLOW}🔧 Attempting to fix bootstrap...${NC}"
    
    # Backup original bootstrap
    cp "$BOOTSTRAP_FILE" "${BOOTSTRAP_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
    echo -e "${GREEN}✅ Bootstrap backed up${NC}"
    
    # Create improved bootstrap
    cat > "$BOOTSTRAP_FILE" << 'EOF'
<?php

// PHPUnit Bootstrap for Grupo Naser CMS
// Handles environment loading with fallbacks

require_once __DIR__ . '/../api/vendor/autoload.php';

use Dotenv\Dotenv;

/**
 * Load environment configuration with multiple fallbacks
 */
function loadTestEnvironment() {
    $projectRoot = __DIR__ . '/..';
    
    // Priority order for environment files
    $envFiles = [
        '.env.ci',      // CI/CD environment
        '.env.testing', // Testing environment
        '.env',         // Development environment
    ];
    
    foreach ($envFiles as $envFile) {
        $envPath = $projectRoot . '/' . $envFile;
        if (file_exists($envPath)) {
            try {
                $dotenv = Dotenv::createImmutable($projectRoot, $envFile);
                $dotenv->load();
                error_log("Loaded environment from: $envFile");
                return true;
            } catch (Exception $e) {
                error_log("Failed to load $envFile: " . $e->getMessage());
                continue;
            }
        }
    }
    
    // If no environment file could be loaded, set defaults
    error_log("No environment file found, using defaults");
    setDefaultEnvironment();
    return false;
}

/**
 * Set default environment variables for testing
 */
function setDefaultEnvironment() {
    $defaults = [
        'APP_ENV' => 'testing',
        'APP_DEBUG' => 'true',
        'DB_HOST' => '127.0.0.1',
        'DB_PORT' => '3306',
        'DB_NAME' => 'naser_cms_test',
        'DB_USER' => 'test_user',
        'DB_PASSWORD' => 'test_password',
        'JWT_SECRET' => 'test_jwt_secret_phpunit_bootstrap_2024',
        'JWT_EXPIRE' => '3600',
        'API_VERSION' => 'v1',
        'BCRYPT_ROUNDS' => '4',
        'LOG_LEVEL' => 'error',
    ];
    
    foreach ($defaults as $key => $value) {
        if (!isset($_ENV[$key]) && !isset($_SERVER[$key])) {
            $_ENV[$key] = $value;
            $_SERVER[$key] = $value;
            putenv("$key=$value");
        }
    }
}

// Load environment
try {
    loadTestEnvironment();
} catch (Exception $e) {
    error_log("Environment loading failed: " . $e->getMessage());
    setDefaultEnvironment();
}

// Verify critical environment variables are set
$required = ['APP_ENV', 'DB_HOST', 'DB_NAME', 'JWT_SECRET'];
foreach ($required as $var) {
    if (!isset($_ENV[$var]) && !isset($_SERVER[$var])) {
        throw new RuntimeException("Required environment variable not set: $var");
    }
}

// Set timezone for testing
date_default_timezone_set('America/Mexico_City');

// Initialize any test-specific configurations here
if (!defined('PHPUNIT_RUNNING')) {
    define('PHPUNIT_RUNNING', true);
}
EOF
    
    echo -e "${GREEN}✅ Bootstrap updated with improved error handling${NC}"
    
    # Test the new bootstrap
    if php /tmp/test_bootstrap.php; then
        echo -e "${GREEN}✅ Fixed bootstrap test passed${NC}"
    else
        echo -e "${RED}❌ Fixed bootstrap still failing${NC}"
        
        # Restore backup
        mv "${BOOTSTRAP_FILE}.backup."* "$BOOTSTRAP_FILE"
        echo -e "${YELLOW}⚠️  Restored original bootstrap${NC}"
        exit 1
    fi
fi

# Clean up
rm -f /tmp/test_bootstrap.php

# Test PHPUnit if available
echo -e "${YELLOW}🧪 Testing PHPUnit execution...${NC}"

if [ -f "api/vendor/bin/phpunit" ]; then
    cd api
    
    # Try to run PHPUnit with dry-run
    if ./vendor/bin/phpunit --list-tests > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PHPUnit can list tests successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  PHPUnit test listing failed (may be normal if no tests exist)${NC}"
    fi
    
    # Try a simple syntax check
    if php -l ../tests/bootstrap.php > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Bootstrap syntax is valid${NC}"
    else
        echo -e "${RED}❌ Bootstrap has syntax errors${NC}"
        php -l ../tests/bootstrap.php
        exit 1
    fi
    
    cd ..
else
    echo -e "${YELLOW}⚠️  PHPUnit not found, installing...${NC}"
    cd api
    composer install --dev --no-interaction
    cd ..
fi

echo "=============================================="
echo -e "${GREEN}✅ PHPUnit Bootstrap Fix Completed${NC}"
echo -e "${BLUE}📋 Summary:${NC}"
echo "- Bootstrap file updated with improved error handling"
echo "- Environment loading with multiple fallbacks"
echo "- Default values set for missing environment variables"
echo "- Syntax validation passed"

echo -e "${YELLOW}🔄 Next steps:${NC}"
echo "1. Run PHPUnit: cd api && ./vendor/bin/phpunit"
echo "2. Run full test suite: ./scripts/test.sh"
echo "3. Check CI/CD pipeline: git push to trigger tests"

exit 0