# Sistema de Archivado Automático de PROMPT Files

Este sistema automatiza el movimiento de archivos `PROMPT-[agent]-BATCH-*.md` desde el directorio raíz hacia `docs/prompts-archive/` cuando se cierra una sesión de trabajo.

## Hooks Creados

### 1. `prompt-archive-on-commit.kiro.hook`

- **Activación:** Antes de cada commit que incluya archivos PROMPT
- **Función:** Detecta archivos PROMPT y los mueve si es un commit de cierre de sesión
- **Automático:** Sí

### 2. `session-close-detector.kiro.hook`

- **Activación:** Antes de cualquier commit
- **Función:** Analiza el mensaje de commit y contexto para detectar cierre de sesión
- **Automático:** Sí

### 3. `manual-prompt-archive.kiro.hook`

- **Activación:** Manual (desde la UI de Kiro)
- **Función:** Permite archivar archivos PROMPT cuando se solicite explícitamente
- **Automático:** No

## Script Auxiliar

### `scripts/archive-prompts.sh`

Script bash que realiza el movimiento físico de archivos.

**Uso:**

```bash
# Modo dry-run (solo muestra qué haría)
./scripts/archive-prompts.sh --dry-run

# Ejecutar archivado real
./scripts/archive-prompts.sh
```

**Características:**

- ✅ Busca automáticamente archivos `PROMPT-*-BATCH-*.md`
- ✅ Crea backups si el archivo ya existe en destino
- ✅ Genera timestamps para documentación
- ✅ Sugiere comandos git para commit
- ✅ Modo dry-run para testing

## Palabras Clave de Detección

El sistema detecta cierre de sesión buscando estas palabras en commits:

- `sesión`, `session`
- `final`, `end`, `close`, `cierre`
- `día`, `day`, `jornada`
- `resumen`, `summary`
- `batch`, `lote`

## Flujo de Trabajo

1. **Durante el desarrollo:** Los archivos PROMPT permanecen en el directorio raíz
2. **Al hacer commit de cierre:** Los hooks detectan automáticamente y mueven archivos
3. **Archivado manual:** Usa el hook manual desde la UI de Kiro cuando necesites
4. **Resultado:** Directorio raíz limpio, historial organizado en `docs/prompts-archive/`

## Archivos Procesados

El sistema maneja estos patrones:

- `PROMPT-CLAUDE-BATCH-*.md`
- `PROMPT-GEMINI-BATCH-*.md`
- `PROMPT-WARP-BATCH-*.md`
- Cualquier archivo que siga `PROMPT-[agent]-BATCH-*.md`

## Directorio Destino

Todos los archivos se mueven a: `docs/prompts-archive/`

## Activación de Hooks

Los hooks se activan automáticamente. Para usar el hook manual:

1. Abre la UI de Kiro
2. Ve a "Agent Hooks"
3. Busca "Manual PROMPT Archive"
4. Haz clic en "Run Hook"

## Troubleshooting

Si necesitas mover archivos manualmente:

```bash
# Ver qué archivos se moverían
./scripts/archive-prompts.sh --dry-run

# Mover archivos
./scripts/archive-prompts.sh

# Commit los cambios
git add docs/prompts-archive/ .
git commit -m "Archive PROMPT files from session $(date '+%Y-%m-%d')"
```
