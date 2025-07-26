# Prompt para Claude - Siguiente Batch de Tareas

## Contexto del Proyecto

Estás desarrollando el sistema de autenticación para el CMS de Grupo Naser. Has completado exitosamente la estructura base de autenticación en el frontend, incluyendo AuthContext, hooks, servicios y componentes de protección de rutas.

## Estado Actual

### ✅ Completado por Ti

- Estructura completa de carpetas de autenticación
- AuthContext con gestión de estado completa
- Hook useAuth para facilitar el uso
- AuthService con todos los métodos de API
- TokenStorage con manejo seguro de JWT
- ApiInterceptor con renovación automática de tokens
- Componente ProtectedRoute con manejo de roles
- Tipos TypeScript completos

### 🔄 En Progreso por Gemini

- UserRepository (Tarea 2.2) - Implementación de repositorio de usuarios

## Tu Próxima Tarea: Implementar LoginForm

### Objetivo

Crear un componente de formulario de inicio de sesión completo y funcional que integre con el sistema de autenticación ya implementado.

### Especificaciones Técnicas

**Ubicación**: `src/frontend/src/auth/components/LoginForm/`

**Archivos a crear**:

- `LoginForm.tsx` - Componente principal
- `LoginForm.module.css` - Estilos del componente
- `LoginForm.test.tsx` - Tests unitarios
- `index.ts` - Exportaciones

### Requisitos Funcionales

1. **Formulario de Login**:

   - Campos: email y password
   - Validación en tiempo real
   - Mensajes de error específicos
   - Botón de envío con estado de carga

2. **Integración con AuthContext**:

   - Usar hook `useAuth` para login
   - Manejar estados de loading y error
   - Redirección automática después del login exitoso

3. **Experiencia de Usuario**:

   - Indicador visual de carga durante login
   - Mensajes de error claros en español
   - Formulario responsive (mobile-first)
   - Accesibilidad completa (ARIA labels, keyboard navigation)

4. **Validación**:
   - Email: formato válido requerido
   - Password: mínimo 8 caracteres
   - Validación en tiempo real con feedback visual
   - Prevenir envío con datos inválidos

### Requisitos de Diseño

1. **Estilo Visual**:

   - Seguir la identidad visual de Grupo Naser
   - Colores: tonos oscuros y dorados (según diseño existente)
   - Tipografía legible y profesional
   - Espaciado consistente

2. **Responsive Design**:

   - Mobile-first approach
   - Breakpoints: 320px, 768px, 1024px
   - Formulario centrado y bien proporcionado
   - Botones táctiles apropiados para móvil

3. **Estados Visuales**:
   - Estado normal, hover, focus, disabled
   - Indicadores de error claros
   - Animaciones sutiles para transiciones

### Ejemplo de Estructura

```tsx
interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
  className?: string;
}

export function LoginForm({
  onSuccess,
  redirectTo = "/admin",
  className,
}: LoginFormProps) {
  // Implementación aquí
}
```

### Validaciones Específicas

```typescript
const validationRules = {
  email: {
    required: "El correo electrónico es requerido",
    pattern: "Ingrese un correo electrónico válido",
  },
  password: {
    required: "La contraseña es requerida",
    minLength: "La contraseña debe tener al menos 8 caracteres",
  },
};
```

### Tests Requeridos

1. **Renderizado**:

   - Renderiza correctamente
   - Muestra campos de email y password
   - Botón de envío presente

2. **Validación**:

   - Valida email inválido
   - Valida contraseña corta
   - Previene envío con datos inválidos

3. **Integración**:
   - Llama a AuthService.login correctamente
   - Maneja errores de API
   - Redirecciona después del login exitoso

### Consideraciones Especiales

1. **Seguridad**:

   - No almacenar contraseñas en estado local
   - Limpiar formulario después del envío
   - Manejar tokens de forma segura

2. **Accesibilidad**:

   - Labels apropiados para screen readers
   - Navegación por teclado funcional
   - Contraste de colores adecuado
   - Mensajes de error anunciados

3. **Performance**:
   - Debounce para validación en tiempo real
   - Memoización de funciones de validación
   - Lazy loading si es necesario

### Comandos de Reporte

**Al iniciar**:

```bash
node .kiro/specs/auth-integration/update-status.js start-task claude "5.1" "Iniciando implementación de LoginForm con validación y diseño responsive"
```

**Durante desarrollo** (cada 2-3 horas):

```bash
node .kiro/specs/auth-integration/update-status.js update-progress claude "5.1" "Progreso: [descripción del avance]"
```

**Al completar**:

```bash
node .kiro/specs/auth-integration/update-status.js complete-task claude "5.1" "LoginForm completado con validación, tests y diseño responsive"
```

### Recursos Disponibles

- Contrato API: `.kiro/specs/auth-integration/api-contract.md`
- Diseño del sistema: `.kiro/specs/auth-integration/design.md`
- AuthService ya implementado y funcional
- Tipos TypeScript definidos en `src/auth/types/`

### Próxima Tarea Sugerida

Después de completar LoginForm, considera implementar:

- Componente de cierre de sesión (Tarea 5.4)
- Componentes de recuperación de contraseña (Tarea 5.3)

---

**Preparado por**: Kiro (Orquestador)  
**Fecha**: 2025-07-22  
**Prioridad**: Alta
