#!/bin/bash

# Create frontend directory structure (if not exists)
mkdir -p src/frontend/src/components
mkdir -p src/frontend/src/pages
mkdir -p src/frontend/src/hooks
mkdir -p src/frontend/src/context
mkdir -p src/frontend/src/services
mkdir -p src/frontend/src/utils
mkdir -p src/frontend/src/assets
mkdir -p src/frontend/src/styles

# Create admin directory structure
mkdir -p src/admin/components
mkdir -p src/admin/pages
mkdir -p src/admin/hooks
mkdir -p src/admin/context
mkdir -p src/admin/services
mkdir -p src/admin/utils

# Create API directory structure
mkdir -p api/controllers
mkdir -p api/models
mkdir -p api/services
mkdir -p api/repositories
mkdir -p api/middleware
mkdir -p api/utils

# Create database directory structure
mkdir -p database/migrations
mkdir -p database/seeds

# Create tests directory structure
mkdir -p tests/unit/frontend/components
mkdir -p tests/unit/frontend/services
mkdir -p tests/unit/frontend/utils
mkdir -p tests/unit/backend/controllers
mkdir -p tests/unit/backend/models
mkdir -p tests/unit/backend/services
mkdir -p tests/integration/api
mkdir -p tests/integration/components
mkdir -p tests/integration/database
mkdir -p tests/e2e/admin
mkdir -p tests/e2e/public

# Create public directory structure
mkdir -p public/uploads
mkdir -p public/static

echo "Project structure created successfully!"