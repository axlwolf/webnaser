# Sistema de Monitoreo y Comunicación en Tiempo Real

Este sistema permite a Kiro (Orquestador), Claude (Frontend) y Gemini (Backend) comunicarse y coordinar su trabajo en tiempo real durante el desarrollo del feature de autenticación.

## 🚀 Inicio Rápido

### 1. Iniciar el Sistema de Monitoreo

```bash
# Hacer ejecutable el script de inicio
chmod +x start-monitoring.sh

# Iniciar el monitor
./start-monitoring.sh start
```

### 2. Verificar Estado

```bash
# Ver estado actual del proyecto
./start-monitoring.sh status

# Ver logs del monitor
./start-monitoring.sh logs
```

### 3. Actualizar Estado de Tareas

```bash
# Claude inicia su tarea
node update-status.js start-task claude "1.2" "Configurando estructura de carpetas frontend"

# Gemini reporta progreso
node update-status.js update-progress gemini "1.1" "Creando directorios y archivos base"

# Kiro completa una tarea
node update-status.js complete-task kiro "1.3" "Contrato API completado y documentado"
```

## 📁 Archivos del Sistema

| Archivo                | Descripción                                 |
| ---------------------- | ------------------------------------------- |
| `status.json`          | Estado actual del proyecto y equipos        |
| `communication-log.md` | Log de comunicación entre equipos           |
| `monitor.js`           | Script que monitorea cambios en tiempo real |
| `update-status.js`     | Script para actualizar estado de tareas     |
| `start-monitoring.sh`  | Script de inicio y gestión del sistema      |

## 🛠️ Comandos Disponibles

### Sistema de Monitoreo

```bash
./start-monitoring.sh start     # Iniciar monitor
./start-monitoring.sh stop      # Detener monitor
./start-monitoring.sh status    # Ver estado actual
./start-monitoring.sh restart   # Reiniciar monitor
./start-monitoring.sh logs      # Ver logs del monitor
./start-monitoring.sh help      # Mostrar ayuda
```

### Actualización de Estado

```bash
# Iniciar una tarea
node update-status.js start-task [equipo] [id-tarea] [mensaje]

# Completar una tarea
node update-status.js complete-task [equipo] [id-tarea] [mensaje]

# Actualizar progreso
node update-status.js update-progress [equipo] [id-tarea] [mensaje]

# Reportar bloqueo
node update-status.js add-blocker [equipo] [descripción] [prioridad]

# Resolver bloqueo
node update-status.js resolve-blocker [id-bloqueo]

# Añadir comentario
node update-status.js add-comment [equipo] [mensaje]

# Ver estado
node update-status.js show-status

# Ver ayuda
node update-status.js help
```

## 👥 Flujo de Trabajo para Equipos

### Para Claude (Frontend)

1. **Iniciar trabajo diario**:

   ```bash
   node update-status.js start-task claude "1.2" "Iniciando configuración de estructura frontend"
   ```

2. **Reportar progreso cada 2-3 horas**:

   ```bash
   node update-status.js update-progress claude "1.2" "Creados directorios base, trabajando en componentes"
   ```

3. **Completar tarea**:

   ```bash
   node update-status.js complete-task claude "1.2" "Estructura de carpetas completada, archivos base creados"
   ```

4. **Reportar bloqueos**:
   ```bash
   node update-status.js add-blocker claude "Necesito clarificación sobre estructura de tokens JWT" medium
   ```

### Para Gemini (Backend)

1. **Iniciar trabajo diario**:

   ```bash
   node update-status.js start-task gemini "1.1" "Configurando estructura de carpetas backend"
   ```

2. **Reportar progreso**:

   ```bash
   node update-status.js update-progress gemini "1.1" "Creando clases base y configurando autoloading"
   ```

3. **Completar tarea**:

   ```bash
   node update-status.js complete-task gemini "1.1" "Estructura backend completada, tests configurados"
   ```

4. **Reportar bloqueos**:
   ```bash
   node update-status.js add-blocker gemini "Falta configuración de base de datos para tests" high
   ```

### Para Kiro (Orquestador)

1. **Monitorear estado**:

   ```bash
   ./start-monitoring.sh status
   ```

2. **Resolver bloqueos**:

   ```bash
   node update-status.js resolve-blocker blocker-1642781234567
   ```

3. **Añadir comentarios de coordinación**:
   ```bash
   node update-status.js add-comment kiro "Revisando integración entre componentes de Claude y Gemini"
   ```

## 📊 Interpretación del Estado

### Estados de Equipo

- `pending`: Esperando iniciar trabajo
- `in_progress`: Trabajando activamente en una tarea
- `completed`: Tarea completada, esperando revisión
- `blocked`: Bloqueado, no puede continuar
- `in_review`: Tarea en proceso de revisión

### Prioridades de Bloqueos

- `low`: No urgente, puede esperar
- `medium`: Importante, resolver pronto
- `high`: Urgente, resolver hoy
- `critical`: Crítico, resolver inmediatamente

## 🔔 Notificaciones

El sistema genera notificaciones automáticas cuando:

- Un equipo inicia una nueva tarea
- Un equipo completa una tarea
- Se reporta un nuevo bloqueo
- Se resuelve un bloqueo
- Hay cambios en el estado del proyecto

## 📝 Log de Comunicación

El archivo `communication-log.md` mantiene un registro cronológico de todas las actividades:

- Inicio y finalización de tareas
- Reportes de progreso
- Bloqueos y resoluciones
- Comentarios y comunicación entre equipos

## 🚨 Resolución de Problemas

### El monitor no inicia

```bash
# Verificar que Node.js esté instalado
node --version

# Verificar permisos
chmod +x start-monitoring.sh
chmod +x monitor.js
chmod +x update-status.js

# Reiniciar el sistema
./start-monitoring.sh restart
```

### Error al actualizar estado

```bash
# Verificar que el archivo status.json existe
ls -la status.json

# Verificar sintaxis del comando
node update-status.js help

# Ver logs para más detalles
./start-monitoring.sh logs
```

### Monitor se detiene inesperadamente

```bash
# Ver logs para identificar el error
./start-monitoring.sh logs

# Reiniciar el monitor
./start-monitoring.sh restart
```

## 🔧 Personalización

### Cambiar intervalo de monitoreo

Editar `monitor.js` y cambiar la variable `CHECK_INTERVAL` (en milisegundos).

### Añadir nuevos tipos de notificación

Modificar las funciones `detectTaskChanges` y `detectBlockerChanges` en `monitor.js`.

### Personalizar formato de logs

Editar la función `addToLog` en `update-status.js`.

## 📞 Soporte

Para problemas o dudas sobre el sistema de monitoreo:

1. Revisar los logs: `./start-monitoring.sh logs`
2. Verificar el estado: `./start-monitoring.sh status`
3. Consultar este README
4. Contactar a Kiro (Orquestador) para asistencia

---

**Última actualización**: 2025-07-21  
**Versión**: 1.0  
**Autor**: Kiro (Orquestador del Proyecto)
