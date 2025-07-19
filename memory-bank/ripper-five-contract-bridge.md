# 🌉 Ripper Five + Contract Bridge Protocol

## Protocolo Híbrido para Colaboración Claude-Gemini

### Versión: 1.0.0
### Proyecto: Grupo Naser CMS (React Frontend + PHP Backend)

---

## 🎯 OVERVIEW

Este protocolo extiende **Ripper Five** con una capa de **Contract Bridge** para permitir colaboración eficiente entre:
- **Claude**: Responsable del Frontend (React público + Panel Admin)
- **Gemini**: Responsable del Backend (PHP API + Base de datos)

---

## 🔄 FASES DEL PROTOCOLO

### **FASE 1: RESEARCH** (Colaborativa)
**Duración**: Hasta completar comprensión mutua del dominio

#### Claude (Frontend):
- Analizar requisitos de UI/UX
- Identificar componentes React necesarios
- Mapear rutas y navegación
- Revisar assets y estilos existentes

#### Gemini (Backend):
- Analizar requisitos de API
- Identificar entidades de dominio
- Mapear relaciones de base de datos
- Revisar restricciones de hosting GoDaddy

#### Compartido:
- Identificar puntos de integración
- Mapear flujos de datos
- Documentar dependencias mutuas

**Output**: Documento de comprensión compartida

---

### **FASE 2: INNOVATE** (Colaborativa)
**Duración**: Hasta alinear visiones técnicas

#### Claude (Frontend):
- Proponer arquitectura React (components, hooks, context)
- Sugerir patrones de estado (Context + Zustand)
- Definir estrategia de testing (Vitest + Testing Library)
- Planificar flujos de usuario

#### Gemini (Backend):
- Proponer arquitectura PHP (MVC + Clean Architecture)
- Definir estructura de API REST
- Planificar esquema de base de datos
- Definir estrategia de autenticación (JWT)

#### Compartido:
- Evaluar trade-offs arquitectónicos
- Alinear decisiones técnicas
- Definir estándares de código

**Output**: Documento de decisiones arquitectónicas

---

### **FASE 3: PLAN** (Independiente)
**Duración**: Hasta tener planes detallados

#### Claude (Frontend):
- Plan detallado de componentes React
- Cronograma de páginas y funcionalidades
- Dependencias entre componentes
- Plan de testing frontend

#### Gemini (Backend):
- Plan detallado de endpoints API
- Cronograma de entidades y servicios
- Migraciones de base de datos
- Plan de testing backend

#### Compartido:
- Sincronizar cronogramas
- Identificar dependencias críticas
- Definir milestones compartidos

**Output**: Planes detallados con cronogramas sincronizados

---

### **FASE 4: CONTRACT** (Colaborativa - NÚCLEO)
**Duración**: Hasta completar todos los contratos

#### 4.1 Definir Contratos de API
```json
{
  "endpoint": "/api/v1/pages",
  "methods": ["GET", "POST", "PUT", "DELETE"],
  "authentication": "JWT Bearer",
  "request_format": "application/json",
  "response_format": "application/json"
}
```

#### 4.2 Especificar Tipos de Datos
```typescript
// Claude - TypeScript
interface Page {
  id: number;
  title: string;
  content: string;
  created_at: string;
}
```

```php
// Gemini - PHP
class Page {
  public int $id;
  public string $title;
  public string $content;
  public string $created_at;
}
```

#### 4.3 Establecer Eventos de Comunicación
```json
{
  "event": "page_created",
  "payload": { "page_id": 123, "title": "Nueva Página" },
  "trigger": "POST /api/v1/pages success"
}
```

#### 4.4 Validar Compatibilidad
- Verificar que ambos lados pueden implementar los contratos
- Validar tipos de datos cruzados
- Confirmar flujos de comunicación

**Output**: Contratos completos en `/contracts/`

---

### **FASE 5: CODE** (Paralela)
**Duración**: Hasta completar implementación

#### Claude (Frontend):
- Implementar componentes React siguiendo contratos
- Crear servicios de API con tipos TypeScript
- Implementar hooks personalizados
- Crear tests unitarios (Vitest)

#### Gemini (Backend):
- Implementar endpoints PHP siguiendo contratos
- Crear modelos y repositorios
- Implementar middleware de autenticación
- Crear tests unitarios (PHPUnit)

#### Sincronización:
- **Puntos de verificación cada 2-3 implementaciones**
- Validar contratos durante desarrollo
- Reportar desviaciones inmediatamente

**Output**: Código funcional en ambos lados

---

### **FASE 6: EXECUTE** (Colaborativa)
**Duración**: Hasta validar integración completa

#### Testing de Contratos:
```bash
# Validar contratos API
npm run test:contracts

# Testing de integración
npm run test:integration
```

#### Testing End-to-End:
- Flujos completos usuario → frontend → API → base de datos
- Validar autenticación y autorización
- Verificar manejo de errores

#### Deployment:
- Build coordinado (frontend + backend)
- Validación en staging
- Deploy a producción (GoDaddy)

**Output**: Sistema integrado y funcional

---

## 📁 ESTRUCTURA DE CONTRATOS

```
contracts/
├── api/
│   ├── auth-api.json           # Autenticación
│   ├── pages-api.json          # Gestión de páginas
│   ├── services-api.json       # Servicios funerarios
│   └── locations-api.json      # Ubicaciones
├── types/
│   ├── auth.types.ts           # Tipos de autenticación
│   ├── pages.types.ts          # Tipos de páginas
│   ├── services.types.ts       # Tipos de servicios
│   └── locations.types.ts      # Tipos de ubicaciones
├── events/
│   ├── page-events.json        # Eventos de páginas
│   └── auth-events.json        # Eventos de autenticación
├── schemas/
│   ├── validation.json         # Esquemas de validación
│   └── database.sql            # Esquemas de base de datos
└── examples/
    ├── api-usage.md            # Ejemplos de uso de API
    └── component-examples.tsx   # Ejemplos de componentes
```

---

## 🔧 HERRAMIENTAS DE VALIDACIÓN

### Para Claude (Frontend):
```bash
# Validar tipos TypeScript
npm run type-check

# Validar contratos
npm run validate:contracts

# Generar tipos desde contratos
npm run generate:types

# Testing con contratos
npm run test:contracts
```

### Para Gemini (Backend):
```bash
# Validar contratos PHP
composer validate:contracts

# Generar clases desde contratos
composer generate:classes

# Testing con contratos
composer test:contracts
```

---

## 🎯 PATRONES DE COMUNICACIÓN

### 1. **Sincronización de Implementación**
- Implementar contratos en el mismo orden
- Validar cada contrato antes de continuar
- Reportar desviaciones inmediatamente

### 2. **Manejo de Cambios**
- Cambios en contratos requieren aprobación mutua
- Versionado semántico para contratos
- Backward compatibility cuando sea posible

### 3. **Resolución de Conflictos**
- Priorizar la experiencia del usuario
- Considerar restricciones técnicas de cada lado
- Documentar decisiones en `/contracts/decisions/`

---

## 🚀 FLUJO DE TRABAJO TÍPICO

### Sprint Planning:
1. **RESEARCH**: Analizar requisitos de la funcionalidad
2. **INNOVATE**: Proponer soluciones técnicas
3. **PLAN**: Crear planes detallados
4. **CONTRACT**: Definir contratos específicos
5. **CODE**: Implementar en paralelo
6. **EXECUTE**: Validar e integrar

### Daily Sync:
- Estado de implementación actual
- Validación de contratos
- Identificación de bloqueadores
- Ajustes necesarios

### Review Process:
- Validar contratos antes de implementar
- Code review cruzado en puntos críticos
- Testing de integración conjunto

---

## 📊 MÉTRICAS DE ÉXITO

### Calidad de Contratos:
- **100%** de contratos validados antes de implementar
- **0** desviaciones no documentadas
- **< 2** iteraciones por contrato

### Eficiencia de Colaboración:
- **< 24h** para resolver conflictos de contratos
- **> 90%** de implementaciones exitosas en primera iteración
- **100%** de tests de integración pasando

### Calidad de Código:
- **80%** cobertura de tests (frontend + backend)
- **0** errores de linting
- **< 1** bug por funcionalidad implementada

---

## 🔄 VERSIONADO DE CONTRATOS

### Semantic Versioning:
- **MAJOR**: Cambios breaking (incompatibles)
- **MINOR**: Nuevas funcionalidades (compatibles)
- **PATCH**: Fixes y mejoras menores

### Ejemplo:
```
v1.0.0 → v1.1.0 (nuevo endpoint)
v1.1.0 → v2.0.0 (cambio en estructura de respuesta)
v2.0.0 → v2.0.1 (fix en validación)
```

---

## 🎯 PRÓXIMOS PASOS

### Implementación Inmediata:
1. Completar estructura `/contracts/`
2. Crear contrato de autenticación
3. Implementar primer endpoint (auth)
4. Validar flujo completo

### Roadmap:
- **Week 1**: Contratos de autenticación
- **Week 2**: Contratos de páginas
- **Week 3**: Contratos de servicios
- **Week 4**: Contratos de ubicaciones
- **Week 5**: Testing e integración completa

---

**Protocolo creado por**: Claude + Gemini Collaboration Framework  
**Versión**: 1.0.0  
**Fecha**: 18 de julio de 2025