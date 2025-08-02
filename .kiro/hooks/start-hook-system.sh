#!/bin/bash

# Sistema de Hooks para Orquestación - Grupo Naser CMS
# Inicia el monitoreo automático de cambios de Claude, Gemini y Warp

echo "🚀 Iniciando sistema de hooks para orquestación de 4 agentes..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Crear directorio de logs si no existe
mkdir -p .kiro/hooks/logs

# Verificar dependencias
echo -e "${BLUE}🔍 Verificando dependencias...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no encontrado${NC}"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no encontrado${NC}"
    exit 1
fi

# Instalar dependencias de Node.js si es necesario
if [ ! -f "node_modules/chokidar/package.json" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias de hooks...${NC}"
    npm install chokidar --save-dev
fi

echo -e "${GREEN}✅ Dependencias verificadas${NC}"
echo ""

# Función para verificar si un proceso está ejecutándose
check_process() {
    local pid_file=$1
    local process_name=$2
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            echo -e "${YELLOW}⚠️  $process_name ya está ejecutándose (PID: $pid)${NC}"
            return 0
        else
            rm "$pid_file"
        fi
    fi
    return 1
}

# Verificar si el sistema ya está ejecutándose
if check_process ".kiro/hooks/hook-engine.pid" "Hook Engine"; then
    echo -e "${BLUE}💡 Para reiniciar el sistema, ejecuta: .kiro/hooks/restart-hook-system.sh${NC}"
    exit 0
fi

echo -e "${BLUE}🔧 Iniciando componentes del sistema...${NC}"

# 1. Inicializar Hook Engine principal
echo -e "${BLUE}📡 Iniciando Hook Engine...${NC}"
cat > .kiro/hooks/hook-engine-runner.js << 'EOF'
const chokidar = require('chokidar');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🤖 Hook Engine iniciado - Monitoreando cambios...');

// Configuración de watchers
const watchers = {
    claude: {
        paths: ['src/frontend/src/auth/**/*', 'src/frontend/src/components/**/*'],
        patterns: ['.tsx', '.jsx', '.ts', '.js', '.css', '.test.tsx']
    },
    gemini: {
        paths: ['api/models/**/*', 'api/repositories/**/*', 'api/services/**/*', 'tests/unit/backend/**/*'],
        patterns: ['.php']
    },
    warp: {
        paths: ['docker-compose.yml', 'package.json', 'composer.json', 'scripts/**/*'],
        patterns: ['.yml', '.json', '.sh']
    }
};

// Función para detectar completitud de tareas
function detectTaskCompletion(agent, filePath) {
    const completionPatterns = {
        claude: {
            'LoginForm': ['LoginForm.tsx', 'LoginForm.test.tsx', 'LoginForm.module.css'],
            'LogoutButton': ['LogoutButton.tsx', 'LogoutButton.test.tsx'],
            'ProtectedRoute': ['ProtectedRoute.tsx', 'ProtectedRoute.test.tsx']
        },
        gemini: {
            'UserRepository': ['UserRepository.php', 'UserRepositoryTest.php'],
            'AuthService': ['AuthService.php', 'AuthServiceTest.php'],
            'JwtService': ['JwtService.php', 'JwtServiceTest.php']
        },
        warp: {
            'DockerOptimization': ['docker-compose.yml'],
            'TestingAutomation': ['test-docker.sh', 'test-frontend.sh']
        }
    };

    const fileName = path.basename(filePath);
    const patterns = completionPatterns[agent] || {};
    
    for (const [taskName, requiredFiles] of Object.entries(patterns)) {
        if (requiredFiles.some(file => fileName.includes(file.replace(/\.[^.]+$/, '')))) {
            return taskName;
        }
    }
    
    return null;
}

// Función para actualizar estado
function updateTaskStatus(agent, task, status, message) {
    const command = `node .kiro/specs/auth-integration/update-status.js ${status}-task ${agent} "${task}" "${message}"`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error actualizando estado: ${error.message}`);
        } else {
            console.log(`✅ Estado actualizado: ${agent} - ${task} - ${status}`);
        }
    });
}

// Inicializar watchers para cada agente
Object.entries(watchers).forEach(([agent, config]) => {
    const watcher = chokidar.watch(config.paths, {
        ignored: /(node_modules|vendor|\.git)/,
        persistent: true,
        ignoreInitial: true
    });

    watcher.on('add', (filePath) => {
        console.log(`📄 ${agent.toUpperCase()}: Nuevo archivo - ${filePath}`);
        
        const taskName = detectTaskCompletion(agent, filePath);
        if (taskName) {
            console.log(`🎉 Posible tarea completada detectada: ${agent} - ${taskName}`);
            updateTaskStatus(agent, taskName, 'complete', `Detectado automáticamente: ${path.basename(filePath)}`);
        }
    });

    watcher.on('change', (filePath) => {
        console.log(`📝 ${agent.toUpperCase()}: Archivo modificado - ${filePath}`);
        
        // Actualizar progreso si es un archivo relevante
        if (config.patterns.some(pattern => filePath.includes(pattern))) {
            const message = `Trabajando en: ${path.basename(filePath)}`;
            exec(`node .kiro/specs/auth-integration/update-status.js add-comment ${agent} "${message}"`, () => {});
        }
    });

    console.log(`👀 Watcher iniciado para ${agent.toUpperCase()}: ${config.paths.join(', ')}`);
});

// Mantener el proceso vivo
process.on('SIGINT', () => {
    console.log('\n🛑 Hook Engine detenido');
    process.exit(0);
});

console.log('🎯 Hook Engine completamente inicializado');
console.log('📊 Monitoreando cambios de Claude, Gemini y Warp...');
EOF

# Ejecutar Hook Engine en segundo plano
nohup node .kiro/hooks/hook-engine-runner.js > .kiro/hooks/logs/hook-engine.log 2>&1 &
HOOK_PID=$!
echo $HOOK_PID > .kiro/hooks/hook-engine.pid

echo -e "${GREEN}✅ Hook Engine iniciado (PID: $HOOK_PID)${NC}"

# 2. Inicializar monitoreo de Warp
echo -e "${BLUE}🐳 Iniciando monitoreo Warp (Docker)...${NC}"
cat > .kiro/hooks/warp-monitor-runner.sh << 'EOF'
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
EOF

chmod +x .kiro/hooks/warp-monitor-runner.sh
nohup .kiro/hooks/warp-monitor-runner.sh > .kiro/hooks/logs/warp-monitor.log 2>&1 &
WARP_PID=$!
echo $WARP_PID > .kiro/hooks/warp-monitor.pid

echo -e "${GREEN}✅ Warp Monitor iniciado (PID: $WARP_PID)${NC}"

# 3. Inicializar sistema de seguimiento automático
echo -e "${BLUE}📊 Iniciando sistema de seguimiento automático...${NC}"
node .kiro/specs/auth-integration/update-status.js add-comment kiro "🤖 Sistema de hooks iniciado - Monitoreo automático activo para Claude, Gemini y Warp"

# 4. Crear script de estado del sistema
cat > .kiro/hooks/system-status.sh << 'EOF'
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
EOF

chmod +x .kiro/hooks/system-status.sh

echo ""
echo -e "${GREEN}🎉 SISTEMA DE HOOKS COMPLETAMENTE INICIALIZADO${NC}"
echo ""
echo -e "${BLUE}📊 Estado del sistema:${NC}"
echo -e "   Hook Engine: ${GREEN}Activo${NC} (PID: $HOOK_PID)"
echo -e "   Warp Monitor: ${GREEN}Activo${NC} (PID: $WARP_PID)"
echo ""
echo -e "${BLUE}🎯 Agentes monitoreados:${NC}"
echo -e "   👨‍💻 Claude: Frontend React (src/frontend/)"
echo -e "   🔧 Gemini: Backend PHP (api/, tests/)"
echo -e "   🐳 Warp: DevOps (docker, scripts, config)"
echo ""
echo -e "${BLUE}📋 Comandos útiles:${NC}"
echo -e "   Estado: ${YELLOW}.kiro/hooks/system-status.sh${NC}"
echo -e "   Logs: ${YELLOW}tail -f .kiro/hooks/logs/hook-engine.log${NC}"
echo -e "   Detener: ${YELLOW}.kiro/hooks/stop-hook-system.sh${NC}"
echo ""
echo -e "${GREEN}✨ El sistema detectará automáticamente cuando Claude y Gemini completen tareas${NC}"