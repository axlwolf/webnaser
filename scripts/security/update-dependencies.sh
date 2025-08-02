#!/bin/bash

# Security Dependency Updates - Grupo Naser CMS
# Actualiza dependencias con enfoque en seguridad

set -e

echo "🔒 Actualizando dependencias de seguridad..."

# Parse arguments
DRY_RUN=false
FORCE_UPDATE=false
BACKEND_ONLY=false
FRONTEND_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --force)
            FORCE_UPDATE=true
            shift
            ;;
        --backend-only)
            BACKEND_ONLY=true
            shift
            ;;
        --frontend-only)
            FRONTEND_ONLY=true
            shift
            ;;
        *)
            echo "Uso: $0 [--dry-run] [--force] [--backend-only] [--frontend-only]"
            exit 1
            ;;
    esac
done

# Verificar que Docker esté corriendo
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo."
    echo "Por favor inicia Docker Desktop."
    exit 1
fi

# Crear backup de archivos de dependencias
echo "💾 Creando backup de archivos de dependencias..."
BACKUP_DIR="backups/dependencies-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

cp package.json "$BACKUP_DIR/" 2>/dev/null || true
cp package-lock.json "$BACKUP_DIR/" 2>/dev/null || true
cp api/composer.json "$BACKUP_DIR/" 2>/dev/null || true
cp api/composer.lock "$BACKUP_DIR/" 2>/dev/null || true

# Frontend dependency updates
if [ "$BACKEND_ONLY" = false ]; then
    echo "⚛️  Verificando dependencias del frontend..."
    
    # Audit npm dependencies
    echo "🔍 Ejecutando npm audit..."
    if [ "$DRY_RUN" = true ]; then
        docker exec naser_frontend npm audit
    else
        docker exec naser_frontend npm audit fix
        
        if [ "$FORCE_UPDATE" = true ]; then
            docker exec naser_frontend npm audit fix --force
        fi
    fi
    
    # Update specific security-critical packages
    echo "📦 Actualizando paquetes críticos de seguridad..."
    CRITICAL_PACKAGES=(
        "axios"
        "react"
        "react-dom"
        "react-router-dom"
        "@tinymce/tinymce-react"
    )
    
    for package in "${CRITICAL_PACKAGES[@]}"; do
        if [ "$DRY_RUN" = false ]; then
            echo "   Actualizando $package..."
            docker exec naser_frontend npm update "$package" || echo "⚠️  No se pudo actualizar $package"
        else
            echo "   [DRY RUN] Actualizaría $package"
        fi
    done
fi

# Backend dependency updates
if [ "$FRONTEND_ONLY" = false ]; then
    echo "🔧 Verificando dependencias del backend..."
    
    # Composer security check
    echo "🔍 Ejecutando composer audit..."
    docker exec naser_backend composer audit || echo "⚠️  Composer audit no disponible"
    
    # Update composer dependencies
    if [ "$DRY_RUN" = false ]; then
        echo "📦 Actualizando dependencias de Composer..."
        docker exec naser_backend composer update --with-dependencies
        
        # Update specific security-critical packages
        CRITICAL_PHP_PACKAGES=(
            "firebase/php-jwt"
            "vlucas/phpdotenv"
        )
        
        for package in "${CRITICAL_PHP_PACKAGES[@]}"; do
            echo "   Actualizando $package..."
            docker exec naser_backend composer update "$package" || echo "⚠️  No se pudo actualizar $package"
        done
    else
        echo "[DRY RUN] Actualizaría dependencias de Composer"
    fi
fi

# Run security scans
echo "🔍 Ejecutando escaneos de seguridad..."

# Trivy scan if available
if command -v trivy >/dev/null 2>&1; then
    echo "🛡️  Ejecutando Trivy scan..."
    trivy fs . --severity HIGH,CRITICAL --format table
else
    echo "⚠️  Trivy no está instalado. Instálalo para escaneos de seguridad avanzados."
fi

# Generate security report
echo "📊 Generando reporte de seguridad..."
REPORT_DIR="security-reports"
mkdir -p "$REPORT_DIR"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

cat > "$REPORT_DIR/dependency-update-$TIMESTAMP.md" << EOF
# Dependency Security Update Report

**Date**: $(date)
**Mode**: $([ "$DRY_RUN" = true ] && echo "Dry Run" || echo "Live Update")
**Force Update**: $FORCE_UPDATE
**Backend Only**: $BACKEND_ONLY
**Frontend Only**: $FRONTEND_ONLY

## Backup Location
Dependencies backed up to: $BACKUP_DIR/

## Frontend Updates
$([ "$BACKEND_ONLY" = false ] && echo "✅ Processed" || echo "⏭️  Skipped")

## Backend Updates  
$([ "$FRONTEND_ONLY" = false ] && echo "✅ Processed" || echo "⏭️  Skipped")

## Security Scan Results
$([ "$DRY_RUN" = false ] && echo "✅ Completed" || echo "⏭️  Skipped (Dry Run)")

## Next Steps
1. Run tests to verify updates: \`./scripts/test.sh\`
2. Review changes in package files
3. Test application functionality
4. Deploy if all tests pass

## Rollback Instructions
If issues occur, restore from backup:
\`\`\`bash
cp $BACKUP_DIR/package.json .
cp $BACKUP_DIR/package-lock.json .
cp $BACKUP_DIR/composer.json api/
cp $BACKUP_DIR/composer.lock api/
\`\`\`
EOF

# Run tests if not in dry run mode
if [ "$DRY_RUN" = false ]; then
    echo "🧪 Ejecutando tests para verificar actualizaciones..."
    ./scripts/test.sh --quick || echo "⚠️  Algunos tests fallaron. Revisa los cambios."
fi

echo ""
echo "✅ Actualización de dependencias completada!"
echo "📊 Reporte guardado en: $REPORT_DIR/dependency-update-$TIMESTAMP.md"
echo "💾 Backup disponible en: $BACKUP_DIR/"
echo ""

if [ "$DRY_RUN" = true ]; then
    echo "🔄 Para aplicar los cambios, ejecuta sin --dry-run:"
    echo "   ./scripts/security/update-dependencies.sh"
else
    echo "🔧 Próximos pasos recomendados:"
    echo "   1. Revisar cambios: git diff"
    echo "   2. Ejecutar tests completos: ./scripts/test.sh"
    echo "   3. Probar aplicación manualmente"
    echo "   4. Commit cambios si todo funciona"
fi
echo ""