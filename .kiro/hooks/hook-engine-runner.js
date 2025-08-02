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
        paths: [
            'docker-compose.yml', 
            'package.json', 
            'composer.json', 
            'scripts/**/*',
            '.github/workflows/**/*',
            'docker/**/*.prod',
            'monitoring/**/*',
            'security/**/*'
        ],
        patterns: ['.yml', '.json', '.sh', '.prod', '.conf']
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
            'CI/CD Pipeline': ['ci-cd.yml', 'workflows'],
            'Docker Production': ['Dockerfile.prod', 'docker-compose.prod.yml'],
            'Monitoring Setup': ['prometheus.yml', 'grafana'],
            'Backup System': ['backup-system.sh', 'recovery-system.sh'],
            'GoDaddy Deployment': ['deploy-godaddy.sh'],
            'Security Hardening': ['security-hardening.sh']
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
