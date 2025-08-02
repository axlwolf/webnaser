/**
 * Status Monitor para el Feature de Autenticación
 * 
 * Este script monitorea cambios en el archivo status.json y envía notificaciones
 * cuando se detectan actualizaciones. También proporciona una API simple para
 * que los miembros del equipo actualicen su estado.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuración
const STATUS_FILE = path.join(__dirname, 'status.json');
const PORT = process.env.PORT || 3030;
const CHECK_INTERVAL = 5000; // 5 segundos

// Estado en memoria
let currentStatus = null;
let lastModified = null;

// Cargar estado inicial
function loadStatus() {
  try {
    const data = fs.readFileSync(STATUS_FILE, 'utf8');
    currentStatus = JSON.parse(data);
    const stats = fs.statSync(STATUS_FILE);
    lastModified = stats.mtime;
    console.log('Estado cargado correctamente');
  } catch (error) {
    console.error('Error al cargar el estado:', error);
    process.exit(1);
  }
}

// Verificar cambios en el archivo
function checkForChanges() {
  try {
    const stats = fs.statSync(STATUS_FILE);
    if (stats.mtime > lastModified) {
      console.log('Cambios detectados en el archivo de estado');
      const data = fs.readFileSync(STATUS_FILE, 'utf8');
      const newStatus = JSON.parse(data);
      
      // Detectar cambios específicos
      detectTaskChanges(currentStatus, newStatus);
      detectTeamStatusChanges(currentStatus, newStatus);
      
      // Actualizar estado en memoria
      currentStatus = newStatus;
      lastModified = stats.mtime;
    }
  } catch (error) {
    console.error('Error al verificar cambios:', error);
  }
}

// Detectar cambios en tareas
function detectTaskChanges(oldStatus, newStatus) {
  if (!oldStatus || !newStatus) return;
  
  Object.keys(newStatus.tasks).forEach(taskId => {
    const oldTask = oldStatus.tasks[taskId];
    const newTask = newStatus.tasks[taskId];
    
    // Si la tarea no existía antes o ha cambiado de estado
    if (!oldTask || oldTask.status !== newTask.status) {
      console.log(`Tarea ${taskId} actualizada: ${newTask.status}`);
      
      // Crear notificación
      if (newTask.status === 'in_progress') {
        addNotification(newStatus, {
          type: 'task_started',
          message: `${newTask.assignedTo} ha iniciado la tarea ${taskId}: ${newTask.title}`
        });
      } else if (newTask.status === 'completed') {
        addNotification(newStatus, {
          type: 'task_completed',
          message: `${newTask.assignedTo} ha completado la tarea ${taskId}: ${newTask.title}`
        });
      } else if (newTask.status === 'in_review') {
        addNotification(newStatus, {
          type: 'task_in_review',
          message: `La tarea ${taskId}: ${newTask.title} está lista para revisión`
        });
      }
    }
    
    // Si hay nuevos comentarios
    if (oldTask && newTask.comments.length > oldTask.comments.length) {
      const newComment = newTask.comments[newTask.comments.length - 1];
      console.log(`Nuevo comentario en tarea ${taskId} por ${newComment.author}`);
      
      addNotification(newStatus, {
        type: 'new_comment',
        message: `${newComment.author} comentó en la tarea ${taskId}: ${newComment.text.substring(0, 50)}...`
      });
    }
  });
}

// Detectar cambios en estado del equipo
function detectTeamStatusChanges(oldStatus, newStatus) {
  if (!oldStatus || !newStatus) return;
  
  ['kiro', 'claude', 'gemini'].forEach(member => {
    const oldMemberStatus = oldStatus.teamStatus[member];
    const newMemberStatus = newStatus.teamStatus[member];
    
    // Si el estado ha cambiado
    if (oldMemberStatus.status !== newMemberStatus.status) {
      console.log(`Estado de ${member} actualizado: ${newMemberStatus.status}`);
      
      addNotification(newStatus, {
        type: 'status_change',
        message: `${member} ahora está ${newMemberStatus.status}`
      });
    }
    
    // Si el mensaje ha cambiado
    if (oldMemberStatus.message !== newMemberStatus.message) {
      console.log(`Mensaje de ${member} actualizado: ${newMemberStatus.message}`);
      
      addNotification(newStatus, {
        type: 'message_update',
        message: `${member}: "${newMemberStatus.message}"`
      });
    }
  });
}

// Añadir notificación
function addNotification(status, notificationData) {
  const notification = {
    id: `notif-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...notificationData,
    read: {
      kiro: false,
      claude: false,
      gemini: false
    }
  };
  
  status.notifications.unshift(notification);
  
  // Limitar a 50 notificaciones
  if (status.notifications.length > 50) {
    status.notifications = status.notifications.slice(0, 50);
  }
  
  // Guardar estado actualizado
  saveStatus(status);
  
  // Enviar notificación (aquí se podría integrar con un sistema de notificaciones real)
  console.log('NOTIFICACIÓN:', notification.message);
}

// Guardar estado
function saveStatus(status) {
  try {
    status.lastUpdated = new Date().toISOString();
    fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2), 'utf8');
    console.log('Estado guardado correctamente');
  } catch (error) {
    console.error('Error al guardar el estado:', error);
  }
}

// API HTTP simple
function startServer() {
  const server = http.createServer((req, res) => {
    // Habilitar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Manejar preflight OPTIONS
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    
    // Ruta para obtener estado actual
    if (req.method === 'GET' && req.url === '/status') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(currentStatus));
      return;
    }
    
    // Ruta para actualizar estado de un miembro
    if (req.method === 'POST' && req.url.startsWith('/update/')) {
      const member = req.url.split('/')[2];
      
      if (!['kiro', 'claude', 'gemini'].includes(member)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Miembro no válido' }));
        return;
      }
      
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          const update = JSON.parse(body);
          
          // Actualizar estado del miembro
          if (update.status) {
            currentStatus.teamStatus[member].status = update.status;
          }
          
          if (update.message) {
            currentStatus.teamStatus[member].message = update.message;
          }
          
          if (update.currentTask) {
            currentStatus.teamStatus[member].currentTask = update.currentTask;
          }
          
          currentStatus.teamStatus[member].lastActivity = new Date().toISOString();
          
          // Guardar cambios
          saveStatus(currentStatus);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Datos inválidos' }));
        }
      });
      
      return;
    }
    
    // Ruta para actualizar estado de una tarea
    if (req.method === 'POST' && req.url.startsWith('/task/')) {
      const taskId = req.url.split('/')[2];
      
      if (!currentStatus.tasks[taskId]) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Tarea no encontrada' }));
        return;
      }
      
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          const update = JSON.parse(body);
          const task = currentStatus.tasks[taskId];
          
          // Actualizar estado de la tarea
          if (update.status) {
            task.status = update.status;
            
            if (update.status === 'in_progress' && !task.startedAt) {
              task.startedAt = new Date().toISOString();
            } else if (update.status === 'completed' && !task.completedAt) {
              task.completedAt = new Date().toISOString();
            } else if (update.status === 'in_review' && !task.reviewedAt) {
              task.reviewedAt = new Date().toISOString();
            }
          }
          
          // Añadir comentario
          if (update.comment && update.author) {
            task.comments.push({
              author: update.author,
              timestamp: new Date().toISOString(),
              text: update.comment
            });
          }
          
          // Guardar cambios
          saveStatus(currentStatus);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Datos inválidos' }));
        }
      });
      
      return;
    }
    
    // Ruta para marcar notificaciones como leídas
    if (req.method === 'POST' && req.url.startsWith('/read-notifications/')) {
      const member = req.url.split('/')[2];
      
      if (!['kiro', 'claude', 'gemini'].includes(member)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Miembro no válido' }));
        return;
      }
      
      // Marcar todas las notificaciones como leídas para este miembro
      currentStatus.notifications.forEach(notification => {
        notification.read[member] = true;
      });
      
      // Guardar cambios
      saveStatus(currentStatus);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
      return;
    }
    
    // Ruta no encontrada
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  });
  
  server.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
}

// Iniciar monitor
function start() {
  console.log('Iniciando Status Monitor...');
  loadStatus();
  setInterval(checkForChanges, CHECK_INTERVAL);
  startServer();
  console.log('Status Monitor iniciado correctamente');
}

// Iniciar
start();