# Agent Hook: Claude Changes Detector

## Configuración del Hook

**Nombre**: Claude Frontend Changes Detector  
**Trigger**: Cambios en archivos frontend  
**Agente**: Kiro (Orquestador)  
**Propósito**: Detectar automáticamente cuando Claude completa tareas y actualizar el sistema de seguimiento

## Trigger Conditions

### Archivos a Monitorear

```
src/frontend/src/auth/**/*
src/frontend/src/components/**/*
src/frontend/src/pages/**/*
src/frontend/src/services/**/*
src/frontend/src/hooks/**/*
src/frontend/src/context/**/*
```

### Patrones de Cambios

- **Nuevos componentes**: `*.tsx`, `*.jsx` en carpetas de componentes
- **Nuevos tests**: `*.test.tsx`, `*.test.jsx`
- **Nuevos estilos**: `*.module.css`, `*.css`
- **Nuevos hooks**: `use*.ts`, `use*.tsx`
- **Nuevos servicios**: `*Service.ts`, `*Service.tsx`

## Acciones Automáticas

### 1. Detección de Tarea Completada

```javascript
// Lógica de detección
if (
  newFiles.includes("LoginForm.tsx") &&
  newFiles.includes("LoginForm.test.tsx") &&
  newFiles.includes("LoginForm.module.css")
) {
  // Actualizar estado automáticamente
  await updateTaskStatus(
    "claude",
    "5.1",
    "completed",
    "LoginForm detectado como completado - archivos principales creados"
  );

  // Notificar a Kiro
  await notifyOrchestrator("Claude ha completado LoginForm", {
    task: "5.1",
    files: newFiles,
    timestamp: new Date().toISOString(),
  });
}
```

### 2. Análisis de Calidad Automático

```javascript
// Verificar criterios de calidad
const qualityChecks = {
  hasTests: newFiles.some((f) => f.includes(".test.")),
  hasStyles: newFiles.some((f) => f.includes(".css")),
  hasTypeScript: newFiles.some((f) => f.includes(".tsx") || f.includes(".ts")),
  followsNaming: newFiles.every((f) => isValidNaming(f)),
};

if (Object.values(qualityChecks).every((check) => check)) {
  await updateTaskStatus(
    "claude",
    getCurrentTask("claude"),
    "quality_approved"
  );
}
```

### 3. Preparación de Siguiente Tarea

```javascript
// Auto-asignar siguiente tarea
const completedTask = detectCompletedTask(changedFiles);
const nextTask = getNextTask("claude", completedTask);

if (nextTask) {
  await prepareNextTask("claude", nextTask);
  await notifyAgent("claude", `Siguiente tarea preparada: ${nextTask.title}`);
}
```

## Configuración del Hook

```json
{
  "name": "claude-changes-detector",
  "trigger": {
    "type": "file_change",
    "paths": [
      "src/frontend/src/auth/**/*",
      "src/frontend/src/components/**/*",
      "src/frontend/src/pages/**/*"
    ],
    "extensions": [".tsx", ".jsx", ".ts", ".js", ".css", ".test.tsx"]
  },
  "agent": "kiro",
  "actions": [
    "detect_task_completion",
    "update_status",
    "notify_orchestrator",
    "prepare_next_task"
  ],
  "conditions": {
    "min_files": 2,
    "required_patterns": ["component", "test"],
    "exclude_patterns": ["node_modules", ".git", "dist"]
  }
}
```

## Notificaciones

### Slack/Discord Integration

```javascript
await sendNotification({
  channel: "#naser-development",
  message:
    `🎉 Claude completó ${taskName}!\n` +
    `📁 Archivos: ${newFiles.join(", ")}\n` +
    `⏰ Tiempo: ${completionTime}\n` +
    `🔄 Siguiente: ${nextTask}`,
});
```

### Sistema de Seguimiento

```javascript
await updateProjectStatus({
  team: "claude",
  task: completedTask,
  status: "completed",
  files: changedFiles,
  metrics: {
    linesOfCode: calculateLOC(changedFiles),
    testCoverage: calculateCoverage(changedFiles),
    complexity: calculateComplexity(changedFiles),
  },
});
```
