#!/usr/bin/env node

/**
 * Script de Actualización de Estado - Sistema de Autenticación
 * 
 * Este script permite a Claude, Gemini y Kiro actualizar fácilmente el estado
 * de sus tareas y comunicarse con el equipo.
 * 
 * Uso:
 * node update-status.js [comando] [opciones]
 * 
 * Comandos disponibles:
 * - start-task [team] [task-id] [message]
 * - complete-task [team] [task-id] [message]
 * - update-progress [team] [task-id] [message]
 * - add-blocker [team] [description] [priority]
 * - resolve-blocker [blocker-id]
 * - add-comment [team] [message]
 * - show-status
 */

const fs = require('fs');
const path = require('path');

class StatusUpdater {
    constructor() {
        this.statusFile = path.join(__dirname, 'status.json');
        this.logFile = path.join(__dirname, 'communication-log.md');
    }

    /**
     * Carga el estado actual
     */
    loadStatus() {
        try {
            const data = fs.readFileSync(this.statusFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('❌ Error al cargar estado:', error.message);
            return null;
        }
    }

    /**
     * Guarda el estado actualizado
     */
    saveStatus(status) {
        try {
            status.last_updated = new Date().toISOString();
            fs.writeFileSync(this.statusFile, JSON.stringify(status, null, 2), 'utf8');
            console.log('✅ Estado actualizado correctamente');
            return true;
        } catch (error) {
            console.error('❌ Error al guardar estado:', error.message);
            return false;
        }
    }

    /**
     * Añade entrada al log de comunicación
     */
    addToLog(type, team, message, taskId = null, additionalInfo = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = `
### ${timestamp} - [${type}] - ${team.toUpperCase()}
**Tarea**: ${taskId || 'N/A'}
**Mensaje**: ${message}
**Estado**: ${additionalInfo.status || 'N/A'}
**Próximo paso**: ${additionalInfo.nextStep || 'N/A'}
**Notas adicionales**: ${additionalInfo.notes || 'Ninguna'}

---
`;

        try {
            fs.appendFileSync(this.logFile, logEntry, 'utf8');
            console.log('📝 Entrada añadida al log de comunicación');
        } catch (error) {
            console.error('❌ Error al escribir en el log:', error.message);
        }
    }

    /**
     * Inicia una tarea
     */
    startTask(team, taskId, message = '') {
        const status = this.loadStatus();
        if (!status) return false;

        if (!status.team_status[team]) {
            console.error(`❌ Equipo '${team}' no encontrado`);
            return false;
        }

        // Actualizar estado del equipo
        status.team_status[team].current_task = taskId;
        status.team_status[team].status = 'in_progress';
        status.team_status[team].last_update = new Date().toISOString();
        status.team_status[team].notes = message;

        // Actualizar métricas
        status.metrics.in_progress_tasks += 1;
        status.metrics.pending_tasks -= 1;

        // Guardar estado
        if (this.saveStatus(status)) {
            this.addToLog('INICIO', team, message, taskId, {
                status: 'in_progress',
                nextStep: 'Trabajando en implementación'
            });
            
            console.log(`🚀 ${team.toUpperCase()} ha iniciado la tarea: ${taskId}`);
            return true;
        }
        return false;
    }

    /**
     * Completa una tarea
     */
    completeTask(team, taskId, message = '') {
        const status = this.loadStatus();
        if (!status) return false;

        if (!status.team_status[team]) {
            console.error(`❌ Equipo '${team}' no encontrado`);
            return false;
        }

        // Añadir a tareas completadas
        const completedTask = {
            task: taskId,
            completed_by: team,
            completed_at: new Date().toISOString(),
            review_status: 'pending_review'
        };
        status.completed_tasks.push(completedTask);

        // Actualizar estado del equipo
        status.team_status[team].status = 'completed';
        status.team_status[team].last_update = new Date().toISOString();
        status.team_status[team].notes = message;

        // Actualizar métricas
        status.metrics.completed_tasks += 1;
        status.metrics.in_progress_tasks -= 1;
        status.metrics.completion_percentage = ((status.metrics.completed_tasks / status.metrics.total_tasks) * 100).toFixed(2);

        // Guardar estado
        if (this.saveStatus(status)) {
            this.addToLog('COMPLETADO', team, message, taskId, {
                status: 'completed',
                nextStep: 'Esperando revisión'
            });
            
            console.log(`🎉 ${team.toUpperCase()} ha completado la tarea: ${taskId}`);
            return true;
        }
        return false;
    }

    /**
     * Actualiza el progreso de una tarea
     */
    updateProgress(team, taskId, message) {
        const status = this.loadStatus();
        if (!status) return false;

        if (!status.team_status[team]) {
            console.error(`❌ Equipo '${team}' no encontrado`);
            return false;
        }

        // Actualizar estado del equipo
        status.team_status[team].last_update = new Date().toISOString();
        status.team_status[team].notes = message;

        // Guardar estado
        if (this.saveStatus(status)) {
            this.addToLog('PROGRESO', team, message, taskId, {
                status: status.team_status[team].status,
                nextStep: 'Continuando con implementación'
            });
            
            console.log(`📈 ${team.toUpperCase()} ha actualizado el progreso de: ${taskId}`);
            return true;
        }
        return false;
    }

    /**
     * Añade un bloqueo
     */
    addBlocker(team, description, priority = 'medium') {
        const status = this.loadStatus();
        if (!status) return false;

        const blockerId = `blocker-${Date.now()}`;
        const blocker = {
            id: blockerId,
            description: description,
            affected_team: team,
            priority: priority,
            created_at: new Date().toISOString(),
            status: 'active'
        };

        status.active_blockers.push(blocker);

        // Actualizar estado del equipo a bloqueado
        if (status.team_status[team]) {
            status.team_status[team].status = 'blocked';
            status.team_status[team].last_update = new Date().toISOString();
            status.team_status[team].notes = `Bloqueado: ${description}`;
        }

        // Guardar estado
        if (this.saveStatus(status)) {
            this.addToLog('BLOQUEO', team, description, null, {
                status: 'blocked',
                nextStep: 'Esperando resolución de bloqueo',
                notes: `Prioridad: ${priority}, ID: ${blockerId}`
            });
            
            console.log(`🚫 ${team.toUpperCase()} ha reportado un bloqueo: ${description}`);
            console.log(`   ID del bloqueo: ${blockerId}`);
            return true;
        }
        return false;
    }

    /**
     * Resuelve un bloqueo
     */
    resolveBlocker(blockerId) {
        const status = this.loadStatus();
        if (!status) return false;

        const blockerIndex = status.active_blockers.findIndex(b => b.id === blockerId);
        if (blockerIndex === -1) {
            console.error(`❌ Bloqueo '${blockerId}' no encontrado`);
            return false;
        }

        const blocker = status.active_blockers[blockerIndex];
        status.active_blockers.splice(blockerIndex, 1);

        // Actualizar estado del equipo afectado
        if (status.team_status[blocker.affected_team]) {
            status.team_status[blocker.affected_team].status = 'in_progress';
            status.team_status[blocker.affected_team].last_update = new Date().toISOString();
            status.team_status[blocker.affected_team].notes = 'Bloqueo resuelto, continuando con la tarea';
        }

        // Guardar estado
        if (this.saveStatus(status)) {
            this.addToLog('RESUELTO', 'kiro', `Bloqueo resuelto: ${blocker.description}`, null, {
                status: 'resolved',
                nextStep: 'Equipo puede continuar',
                notes: `Bloqueo ID: ${blockerId}`
            });
            
            console.log(`✅ Bloqueo resuelto: ${blocker.description}`);
            return true;
        }
        return false;
    }

    /**
     * Añade un comentario general
     */
    addComment(team, message) {
        this.addToLog('COMENTARIO', team, message, null, {
            status: 'active',
            nextStep: 'Continuando con tareas asignadas'
        });
        
        console.log(`💬 ${team.toUpperCase()} ha añadido un comentario`);
        return true;
    }

    /**
     * Muestra el estado actual
     */
    showStatus() {
        const status = this.loadStatus();
        if (!status) return;

        console.log('\n📊 ESTADO ACTUAL DEL PROYECTO:');
        console.log('═'.repeat(60));
        console.log(`Proyecto: ${status.project}`);
        console.log(`Última actualización: ${status.last_updated}`);
        console.log(`Progreso: ${status.metrics.completion_percentage}% (${status.metrics.completed_tasks}/${status.metrics.total_tasks} tareas)`);
        
        console.log('\n👥 ESTADO DE EQUIPOS:');
        Object.entries(status.team_status).forEach(([team, teamStatus]) => {
            const statusEmoji = {
                'pending': '⏳',
                'in_progress': '🔄',
                'completed': '✅',
                'blocked': '🚫',
                'in_review': '👀'
            }[teamStatus.status] || '❓';

            console.log(`\n${team.toUpperCase()}:`);
            console.log(`  ${statusEmoji} Estado: ${teamStatus.status}`);
            console.log(`  📋 Tarea actual: ${teamStatus.current_task}`);
            console.log(`  🕐 Última actualización: ${teamStatus.last_update || 'Nunca'}`);
            console.log(`  📝 Notas: ${teamStatus.notes || 'Sin notas'}`);
        });

        if (status.active_blockers.length > 0) {
            console.log('\n🚫 BLOQUEOS ACTIVOS:');
            status.active_blockers.forEach(blocker => {
                console.log(`  • ${blocker.description}`);
                console.log(`    Equipo afectado: ${blocker.affected_team}`);
                console.log(`    Prioridad: ${blocker.priority}`);
                console.log(`    ID: ${blocker.id}`);
            });
        }

        if (status.completed_tasks.length > 0) {
            console.log('\n✅ TAREAS COMPLETADAS RECIENTES:');
            status.completed_tasks.slice(-5).forEach(task => {
                console.log(`  • ${task.task} (${task.completed_by}) - ${task.completed_at}`);
            });
        }

        console.log('\n' + '═'.repeat(60));
    }

    /**
     * Muestra ayuda
     */
    showHelp() {
        console.log(`
📋 SCRIPT DE ACTUALIZACIÓN DE ESTADO - Sistema de Autenticación

Uso: node update-status.js [comando] [opciones]

COMANDOS DISPONIBLES:

🚀 start-task [equipo] [id-tarea] [mensaje]
   Marca una tarea como iniciada
   Ejemplo: node update-status.js start-task claude "1.2" "Iniciando configuración de estructura"

✅ complete-task [equipo] [id-tarea] [mensaje]
   Marca una tarea como completada
   Ejemplo: node update-status.js complete-task gemini "1.1" "Estructura de backend completada"

📈 update-progress [equipo] [id-tarea] [mensaje]
   Actualiza el progreso de una tarea
   Ejemplo: node update-status.js update-progress claude "1.2" "50% completado, creando componentes"

🚫 add-blocker [equipo] [descripción] [prioridad]
   Reporta un nuevo bloqueo
   Ejemplo: node update-status.js add-blocker gemini "Falta configuración de base de datos" high

✅ resolve-blocker [id-bloqueo]
   Resuelve un bloqueo existente
   Ejemplo: node update-status.js resolve-blocker blocker-1642781234567

💬 add-comment [equipo] [mensaje]
   Añade un comentario general
   Ejemplo: node update-status.js add-comment kiro "Revisando progreso del equipo"

📊 show-status
   Muestra el estado actual del proyecto
   Ejemplo: node update-status.js show-status

❓ help
   Muestra esta ayuda
   Ejemplo: node update-status.js help

EQUIPOS VÁLIDOS: kiro, claude, gemini
PRIORIDADES VÁLIDAS: low, medium, high, critical

EJEMPLOS DE USO COMÚN:

# Claude inicia su tarea
node update-status.js start-task claude "1.2" "Configurando estructura de carpetas frontend"

# Gemini reporta progreso
node update-status.js update-progress gemini "1.1" "Creando directorios y archivos base"

# Kiro completa revisión
node update-status.js complete-task kiro "review-1.3" "Revisión de contrato API completada"

# Ver estado actual
node update-status.js show-status
`);
    }
}

// Función principal
function main() {
    const updater = new StatusUpdater();
    const args = process.argv.slice(2);

    if (args.length === 0) {
        updater.showHelp();
        return;
    }

    const command = args[0].toLowerCase();

    switch (command) {
        case 'start-task':
            if (args.length < 3) {
                console.error('❌ Uso: start-task [equipo] [id-tarea] [mensaje]');
                return;
            }
            updater.startTask(args[1], args[2], args[3] || '');
            break;

        case 'complete-task':
            if (args.length < 3) {
                console.error('❌ Uso: complete-task [equipo] [id-tarea] [mensaje]');
                return;
            }
            updater.completeTask(args[1], args[2], args[3] || '');
            break;

        case 'update-progress':
            if (args.length < 4) {
                console.error('❌ Uso: update-progress [equipo] [id-tarea] [mensaje]');
                return;
            }
            updater.updateProgress(args[1], args[2], args[3]);
            break;

        case 'add-blocker':
            if (args.length < 3) {
                console.error('❌ Uso: add-blocker [equipo] [descripción] [prioridad]');
                return;
            }
            updater.addBlocker(args[1], args[2], args[3] || 'medium');
            break;

        case 'resolve-blocker':
            if (args.length < 2) {
                console.error('❌ Uso: resolve-blocker [id-bloqueo]');
                return;
            }
            updater.resolveBlocker(args[1]);
            break;

        case 'add-comment':
            if (args.length < 3) {
                console.error('❌ Uso: add-comment [equipo] [mensaje]');
                return;
            }
            updater.addComment(args[1], args.slice(2).join(' '));
            break;

        case 'show-status':
            updater.showStatus();
            break;

        case 'help':
        case '--help':
        case '-h':
            updater.showHelp();
            break;

        default:
            console.error(`❌ Comando desconocido: ${command}`);
            console.log('💡 Usa "node update-status.js help" para ver los comandos disponibles');
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = StatusUpdater;