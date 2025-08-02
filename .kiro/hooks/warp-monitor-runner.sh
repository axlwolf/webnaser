#!/bin/bash

# Warp Monitor - Monitoreo continuo de infraestructura
echo "🤖 Warp Monitor iniciado - Monitoreando infraestructura..."

# Función para reportar estado
warp_status() {
    node .kiro/specs/auth-integration/update-status.js add-comment warp "$1"
}

# Monitoreo continuo
while true; do
    # Verificar estado de contenedores cada 5 minutos
    if docker-compose ps | grep -q "Up"; then
        CONTAINERS_UP=$(docker-compose ps --services --filter "status=running" | wc -l)
        if [ $CONTAINERS_UP -ge 3 ]; then
            echo "✅ Todos los contenedores operativos ($CONTAINERS_UP activos)"
        else
            echo "⚠️  Solo $CONTAINERS_UP contenedores activos"
            warp_status "⚠️ Algunos contenedores no están activos - verificando estado"
        fi
    else
        echo "❌ Problemas con contenedores Docker"
        warp_status "❌ Problemas detectados en contenedores Docker"
    fi
    
    # Verificar uso de memoria
    MEMORY_USAGE=$(docker stats --no-stream --format "{{.MemPerc}}" | head -1 | sed 's/%//')
    if [ "${MEMORY_USAGE%.*}" -gt 80 ]; then
        warp_status "⚠️ Alto uso de memoria detectado: ${MEMORY_USAGE}%"
    fi
    
    sleep 300 # 5 minutos
done
