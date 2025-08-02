#!/bin/bash

echo "📊 ESTADO DEL SISTEMA DE HOOKS"
echo "════════════════════════════════════════"

# Hook Engine
if [ -f ".kiro/hooks/hook-engine.pid" ]; then
    HOOK_PID=$(cat .kiro/hooks/hook-engine.pid)
    if ps -p $HOOK_PID > /dev/null 2>&1; then
        echo "✅ Hook Engine: Activo (PID: $HOOK_PID)"
    else
        echo "❌ Hook Engine: Inactivo"
    fi
else
    echo "❌ Hook Engine: No iniciado"
fi

# Warp Monitor
if [ -f ".kiro/hooks/warp-monitor.pid" ]; then
    WARP_PID=$(cat .kiro/hooks/warp-monitor.pid)
    if ps -p $WARP_PID > /dev/null 2>&1; then
        echo "✅ Warp Monitor: Activo (PID: $WARP_PID)"
    else
        echo "❌ Warp Monitor: Inactivo"
    fi
else
    echo "❌ Warp Monitor: No iniciado"
fi

echo ""
echo "📈 ESTADÍSTICAS"
echo "════════════════"
echo "Agentes monitoreados: Claude, Gemini, Warp"
echo "Archivos bajo vigilancia: $(find src/frontend api tests -name "*.tsx" -o -name "*.php" 2>/dev/null | wc -l)"
echo "Última actividad: $(date)"

echo ""
echo "📋 COMANDOS ÚTILES"
echo "════════════════════"
echo "Ver logs Hook Engine: tail -f .kiro/hooks/logs/hook-engine.log"
echo "Ver logs Warp Monitor: tail -f .kiro/hooks/logs/warp-monitor.log"
echo "Estado del proyecto: node .kiro/specs/auth-integration/update-status.js show-status"
