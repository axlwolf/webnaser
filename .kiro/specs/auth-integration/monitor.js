#!/usr/bin/env node

/**
 * Monitor de Estado del Proyecto - Sistema de Autenticación
 * 
 * Este script monitorea cambios en el archivo status.json y envía notificaciones
 * cuando hay actualizaciones de estado de las tareas.
 */

const fs = require('fs');
const path = require('path');

class ProjectMonitor {
    constructor() {
        this.statusFile = path.join(__dirname, 'status.json');
        this.logFile = path.join(__dirname, 'communication-log.md');
        this.lastStatus = null;
        this.isMonitoring = false;
    }

    /**
     * Inicia el monitoreo del archivo de estado
     */
    startMonitoring() {
        console.log('🚀 Iniciando monitor del proyecto de autenticación...');
        console.log(`📁 Monitoreando: ${this.statusFile}`);
        
        // Cargar estado inicial
        this.loadCurrentStatus();
        this.isMonitoring = true;

        // Monitorear cambios en el archivo
        fs.watchFile(this.statusFile, { interval: 1000 }, (curr, prev) => {
            if (curr.mtime !== prev.mtime) {
                this.handleStatusChange();
            }
        });

        console.log('✅ Monitor iniciado. Presiona Ctrl+C para detener.\n');
        this.displayCurrentStatus();
    }

    /**
     * Carga el estado actual del archivo JSON
     */
    loadCurrentStatus() {
        try {
            const data = fs.readFileSync(this.statusFile, 'utf8');
            this.lastStatus = JSON.parse(data);
        } catch (error) {
            console.error('❌ Error al cargar estado:', error.message);
            this.lastStatus = null;
        }
    }

    /**
     * Maneja cambios en el archivo de estado
     */
    handleStatusChange() {
        console.log('\n🔄 Cambio detectado en el estado del proyecto...');
        
        const previousStatus = this.lastStatus;
        this.loadCurrentStatus();

        if (!this.lastStatus) {
            console.error('❌ Error al procesar cambio de estado');
            return;
        }

        // Detectar cambios específicos
        this.detectTaskChanges(previousStatus, this.lastStatus);
        this.detectBlockerChanges(previousStatus, this.lastStatus);
        this.displayCurrentStatus();
    }

    /**
     * Detecta cambios en las tareas
     */
    detectTaskChanges(oldStatus, newStatus) {
        if (!oldStatus) return;

        const teams = ['kiro', 'claude', 'gemini'];
        
        teams.forEach(team => {
            const oldTeamStatus = oldStatus.team_status[team];
            const newTeamStatus = newStatus.team_status[team];

            if (oldTeamStatus.status !== newTeamStatus.status) {
                this.notifyTaskStatusChange(team, oldTeamStatus, newTeamStatus);
            }

            if (oldTeamStatus.current_task !== newTeamStatus.current_task) {
                this.notifyTaskChange(team, oldTeamStatus.current_task, newTeamStatus.current_task);
            }
        });

        // Detectar tareas completadas
        if (newStatus.completed_tasks.length > oldStatus.completed_tasks.length) {
            const newCompletedTasks = newStatus.completed_tasks.slice(oldStatus.completed_tasks.length);
            newCompletedTasks.forEach(task => {
                this.notifyTaskCompleted(task);
            });
        }
    }

    /**
     * Detecta cambios en bloqueos
     */
    detectBlockerChanges(oldStatus, newStatus) {
        if (!oldStatus) return;

        // Nuevos bloqueos
        const newBlockers = newStatus.active_blockers.filter(blocker => 
            !oldStatus.active_blockers.some(oldBlocker => oldBlocker.id === blocker.id)
        );

        // Bloqueos resueltos
        const resolvedBlockers = oldStatus.active_blockers.filter(blocker => 
            !newStatus.active_blockers.some(newBlocker => newBlocker.id === blocker.id)
        );

        newBlockers.forEach(blocker => this.notifyNewBlocker(blocker));
        resolvedBlockers.forEach(blocker => this.notifyBlockerResolved(blocker));
    }

    /**
     * Notifica cambio de estado de tarea
     */
    notifyTaskStatusChange(team, oldStatus, newStatus) {
        const statusEmojis = {
            'pending': '⏳',
            'in_progress': '🔄',
            'completed': '✅',
            'blocked': '🚫',
            'in_review': '👀'
        };

        console.log(`\n📋 ${team.toUpperCase()} - Cambio de estado:`);
        console.log(`   Tarea: ${newStatus.current_task}`);
        console.log(`   Estado: ${statusEmojis[oldStatus.status]} ${oldStatus.status} → ${statusEmojis[newStatus.status]} ${newStatus.status}`);
        console.log(`   Notas: ${newStatus.notes || 'Sin notas'}`);
    }

    /**
     * Notifica cambio de tarea
     */
    notifyTaskChange(team, oldTask, newTask) {
        console.log(`\n🔄 ${team.toUpperCase()} - Nueva tarea asignada:`);
        console.log(`   Anterior: ${oldTask}`);
        console.log(`   Nueva: ${newTask}`);
    }

    /**
     * Notifica tarea completada
     */
    notifyTaskCompleted(task) {
        console.log(`\n🎉 ¡TAREA COMPLETADA!`);
        console.log(`   Tarea: ${task.task}`);
        console.log(`   Completada por: ${task.completed_by.toUpperCase()}`);
        console.log(`   Fecha: ${task.completed_at}`);
        console.log(`   Estado de revisión: ${task.review_status}`);
    }

    /**
     * Notifica nuevo bloqueo
     */
    notifyNewBlocker(blocker) {
        console.log(`\n🚫 NUEVO BLOQUEO DETECTADO:`);
        console.log(`   ID: ${blocker.id}`);
        console.log(`   Descripción: ${blocker.description}`);
        console.log(`   Afectado: ${blocker.affected_team}`);
        console.log(`   Prioridad: ${blocker.priority}`);
    }

    /**
     * Notifica bloqueo resuelto
     */
    notifyBlockerResolved(blocker) {
        console.log(`\n✅ BLOQUEO RESUELTO:`);
        console.log(`   ID: ${blocker.id}`);
        console.log(`   Descripción: ${blocker.description}`);
    }

    /**
     * Muestra el estado actual del proyecto
     */
    displayCurrentStatus() {
        if (!this.lastStatus) return;

        console.log('\n📊 ESTADO ACTUAL DEL PROYECTO:');
        console.log('═'.repeat(50));
        console.log(`Proyecto: ${this.lastStatus.project}`);
        console.log(`Última actualización: ${this.lastStatus.last_updated}`);
        console.log(`Progreso general: ${this.lastStatus.metrics.completion_percentage}% (${this.lastStatus.metrics.completed_tasks}/${this.lastStatus.metrics.total_tasks})`);
        
        console.log('\n👥 ESTADO DE EQUIPOS:');
        Object.entries(this.lastStatus.team_status).forEach(([team, status]) => {
            const statusEmoji = {
                'pending': '⏳',
                'in_progress': '🔄',
                'completed': '✅',
                'blocked': '🚫',
                'in_review': '👀'
            }[status.status] || '❓';

            console.log(`\n${team.toUpperCase()}:`);
            console.log(`  ${statusEmoji} Estado: ${status.status}`);
            console.log(`  📋 Tarea actual: ${status.current_task}`);
            console.log(`  📝 Notas: ${status.notes || 'Sin notas'}`);
        });

        if (this.lastStatus.active_blockers.length > 0) {
            console.log('\n🚫 BLOQUEOS ACTIVOS:');
            this.lastStatus.active_blockers.forEach(blocker => {
                console.log(`  • ${blocker.description} (${blocker.affected_team})`);
            });
        }

        console.log('\n' + '═'.repeat(50));
    }

    /**
     * Detiene el monitoreo
     */
    stopMonitoring() {
        if (this.isMonitoring) {
            fs.unwatchFile(this.statusFile);
            this.isMonitoring = false;
            console.log('\n🛑 Monitor detenido.');
        }
    }
}

// Inicializar y ejecutar monitor
const monitor = new ProjectMonitor();

// Manejar señales de terminación
process.on('SIGINT', () => {
    console.log('\n\n🛑 Deteniendo monitor...');
    monitor.stopMonitoring();
    process.exit(0);
});

process.on('SIGTERM', () => {
    monitor.stopMonitoring();
    process.exit(0);
});

// Iniciar monitoreo
monitor.startMonitoring();