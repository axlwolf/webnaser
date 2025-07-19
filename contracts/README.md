# 🤝 Contract Bridge - Contratos Compartidos

Este directorio contiene las especificaciones de contratos compartidos entre el frontend (Claude) y backend (Gemini) para el CMS de Grupo Naser.

## Estructura de Directorios

```
contracts/
├── api/           # Especificaciones de endpoints API
├── types/         # Definiciones de tipos de datos
├── events/        # Contratos de eventos y comunicación
├── schemas/       # Esquemas de validación
└── examples/      # Ejemplos de implementación
```

## Convenciones de Nomenclatura

### Archivos API
- `{entity}-api.json` - Especificación OpenAPI para una entidad
- `{entity}-endpoints.md` - Documentación de endpoints

### Archivos de Tipos
- `{entity}.types.ts` - Definiciones TypeScript
- `{entity}.types.php` - Definiciones PHP equivalentes

### Archivos de Eventos
- `{entity}-events.json` - Especificación de eventos
- `{entity}-flows.md` - Flujos de comunicación

## Uso del Protocolo

### Para Claude (Frontend)
1. Leer contratos en `api/` y `types/`
2. Implementar componentes React según especificaciones
3. Usar tipos TypeScript definidos
4. Seguir flujos de eventos especificados

### Para Gemini (Backend)
1. Leer contratos en `api/` y `types/`
2. Implementar endpoints PHP según especificaciones
3. Usar estructuras de datos equivalentes
4. Emitir eventos según contratos

## Versionado de Contratos

- `v1.0.0` - Versión inicial
- Cambios breaking requieren nueva versión mayor
- Cambios compatibles incrementan versión menor
- Fixes incrementan versión patch

## Validación de Contratos

Los contratos deben validarse antes de implementar:

```bash
# Validar contratos API
npm run validate:contracts

# Generar tipos desde contratos
npm run generate:types
```