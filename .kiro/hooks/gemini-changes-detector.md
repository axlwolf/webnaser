# Agent Hook: Gemini Changes Detector

## Configuración del Hook

**Nombre**: Gemini Backend Changes Detector  
**Trigger**: Cambios en archivos backend  
**Agente**: Kiro (Orquestador)  
**Propósito**: Detectar automáticamente cuando Gemini completa tareas y actualizar el sistema de seguimiento

## Trigger Conditions

### Archivos a Monitorear

```
api/models/**/*
api/repositories/**/*
api/services/**/*
api/controllers/**/*
api/middleware/**/*
tests/unit/backend/**/*
tests/integration/**/*
```

### Patrones de Cambios

- **Nuevos modelos**: `*Model.php`, `*.php` en `/models/`
- **Nuevos repositorios**: `*Repository.php` en `/repositories/`
- **Nuevos servicios**: `*Service.php` en `/services/`
- **Nuevos controladores**: `*Controller.php` en `/controllers/`
- **Nuevos tests**: `*Test.php` en `/tests/`
- **Migraciones**: `*.sql`, archivos de migración

## Acciones Automáticas

### 1. Detección de Tarea Completada

```php
// Lógica de detección en PHP/JavaScript híbrido
if (newFiles.includes('UserRepository.php') &&
    newFiles.includes('UserRepositoryTest.php') &&
    testsPass('UserRepositoryTest')) {

    // Actualizar estado automáticamente
    await updateTaskStatus('gemini', '2.2', 'completed',
        'UserRepository detectado como completado - implementación y tests listos');

    // Ejecutar tests automáticamente
    const testResults = await runTests('UserRepositoryTest');

    // Notificar resultados
    await notifyOrchestrator('Gemini completó UserRepository', {
        task: '2.2',
        files: newFiles,
        testResults: testResults,
        timestamp: new Date().toISOString()
    });
}
```

### 2. Validación Automática de Código

```javascript
// Verificar estándares PHP
const phpStandards = {
  hasNamespace: checkNamespace(newFiles),
  hasDocBlocks: checkDocBlocks(newFiles),
  hasTests: newFiles.some((f) => f.includes("Test.php")),
  followsPSR4: checkPSR4Compliance(newFiles),
  hasTypeHints: checkTypeHints(newFiles),
};

// Ejecutar PHP CodeSniffer automáticamente
const codeStyleResults = await runPHPCS(newFiles);

// Ejecutar tests automáticamente
const testResults = await runPHPUnit(getTestFiles(newFiles));

if (allChecksPass(phpStandards, codeStyleResults, testResults)) {
  await updateTaskStatus(
    "gemini",
    getCurrentTask("gemini"),
    "quality_approved"
  );
}
```

### 3. Integración con Base de Datos

```javascript
// Detectar cambios en esquema
if (newFiles.some((f) => f.includes(".sql") || f.includes("migration"))) {
  await runDatabaseMigrations();
  await validateDatabaseSchema();
  await notifyOrchestrator("Esquema de base de datos actualizado");
}

// Verificar integridad de datos
if (newFiles.some((f) => f.includes("Repository.php"))) {
  await runIntegrationTests();
  await validateDataIntegrity();
}
```

## Configuración del Hook

```json
{
  "name": "gemini-changes-detector",
  "trigger": {
    "type": "file_change",
    "paths": [
      "api/models/**/*",
      "api/repositories/**/*",
      "api/services/**/*",
      "api/controllers/**/*",
      "tests/unit/backend/**/*",
      "tests/integration/**/*"
    ],
    "extensions": [".php", ".sql"]
  },
  "agent": "kiro",
  "actions": [
    "detect_task_completion",
    "run_tests",
    "validate_code_style",
    "update_status",
    "run_migrations",
    "notify_orchestrator"
  ],
  "conditions": {
    "min_files": 1,
    "required_patterns": ["class", "namespace"],
    "exclude_patterns": ["vendor", ".git", "cache"]
  },
  "validation": {
    "phpcs": true,
    "phpunit": true,
    "phpmd": true
  }
}
```

### Comandos Automáticos

```bash
# Tests automáticos al detectar cambios
./scripts/test-docker.sh --filter=$(getChangedTestClass)

# Validación de estilo de código
docker exec naser_backend composer cs

# Análisis de calidad
docker exec naser_backend composer md

# Migración de base de datos si es necesario
docker exec naser_backend php migrate.php
```

## Métricas Automáticas

### Análisis de Código

```javascript
const metrics = {
  linesOfCode: calculatePHPLOC(newFiles),
  cyclomaticComplexity: calculateComplexity(newFiles),
  testCoverage: getTestCoverage(),
  codeQuality: getCodeQualityScore(),
  securityIssues: runSecurityScan(newFiles),
};

await updateProjectMetrics("gemini", metrics);
```

### Notificaciones Inteligentes

```javascript
// Solo notificar si hay cambios significativos
if (metrics.testCoverage > 80 && metrics.codeQuality > 8) {
  await sendNotification({
    type: "success",
    message: `🚀 Gemini completó ${taskName} con excelente calidad!`,
    details: {
      coverage: `${metrics.testCoverage}%`,
      quality: `${metrics.codeQuality}/10`,
      files: newFiles.length,
    },
  });
}
```
