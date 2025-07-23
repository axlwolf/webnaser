# Prompt para Claude - Siguiente Batch de Tareas

## Contexto del Proyecto

Estás trabajando en el sistema de autenticación para el CMS de Grupo Naser. Has completado exitosamente la estructura base de autenticación en el frontend React. Ahora necesitas implementar los componentes de UI para completar la experiencia de usuario.

## Estado Actual

### ✅ Completado por ti:

- Estructura de carpetas de autenticación
- AuthContext con gestión completa de estado
- Hook useAuth
- AuthService con métodos de API
- TokenStorage con manejo de JWT
- ApiInterceptor con renovación automática
- Componente ProtectedRoute
- Tipos TypeScript completos

### 🎯 Tu Próxima Tarea: Implementar LoginForm (Tarea 5.1)

## Especificaciones Detalladas

### Ubicación

```
src/frontend/src/auth/components/LoginForm/
├── LoginForm.tsx
├── LoginForm.module.css
├── LoginForm.test.tsx
└── index.ts
```

### Requisitos Funcionales

1. **Formulario de Login**:

   - Campos: email y password
   - Validación en tiempo real
   - Mensajes de error específicos
   - Botón de envío con estado de carga
   - Enlace a recuperación de contraseña

2. **Integración con AuthContext**:

   - Usar hook `useAuth` para login
   - Manejar estados de loading y error
   - Redireccionar después de login exitoso

3. **Validaciones**:

   - Email: formato válido
   - Password: mínimo 8 caracteres
   - Mostrar errores en tiempo real
   - Deshabilitar envío si hay errores

4. **UX/UI**:
   - Diseño responsive (mobile-first)
   - Accesibilidad completa (ARIA labels, keyboard navigation)
   - Indicadores visuales de estado
   - Animaciones suaves para transiciones

### Requisitos Técnicos

1. **Estándares React**:

   - Componente funcional con hooks
   - useState para estado local del formulario
   - useEffect para efectos secundarios
   - React.memo si es necesario para performance

2. **Manejo de Errores**:

   - Errores de validación local
   - Errores de API del backend
   - Mensajes amigables en español
   - Limpieza de errores al corregir

3. **Accesibilidad**:

   - Labels apropiados para screen readers
   - Navegación por teclado
   - Contraste de colores adecuado
   - Mensajes de error anunciados

4. **Testing**:
   - Tests unitarios con React Testing Library
   - Tests de integración con AuthContext
   - Mocks para AuthService
   - Cobertura mínima 80%

### Ejemplo de Estructura

```tsx
interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function LoginForm({
  onSuccess,
  redirectTo = "/dashboard",
}: LoginFormProps) {
  // Implementación aquí
}
```

### Integración con Diseño Existente

- Usar los colores y tipografía del sitio actual de Grupo Naser
- Mantener consistencia con el diseño cinematográfico
- Responsive para todos los dispositivos
- Compatible con GoDaddy hosting

## Archivos de Referencia

Revisa estos archivos para entender el contexto:

- `.kiro/specs/auth-integration/requirements.md`
- `.kiro/specs/auth-integration/design.md`
- `.kiro/specs/auth-integration/api-contract.md`
- `src/frontend/src/auth/context/AuthContext.tsx`
- `src/frontend/src/auth/services/AuthService.ts`

## Criterios de Aceptación

- [ ] Formulario funcional con validación completa
- [ ] Integración exitosa con AuthContext
- [ ] Manejo de errores robusto
- [ ] Diseño responsive y accesible
- [ ] Tests unitarios pasando
- [ ] Documentación de componente
- [ ] Compatible con estándares del proyecto

## Comandos para Reportar Progreso

```bash
# Al iniciar
node .kiro/specs/auth-integration/update-status.js start-task claude "5.1" "Iniciando implementación de LoginForm"

# Para reportar progreso
node .kiro/specs/auth-integration/update-status.js update-progress claude "5.1" "Formulario base implementado, trabajando en validaciones"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task claude "5.1" "LoginForm completado con validaciones, tests y documentación"
```

## Próximas Tareas Después de Esta

1. Tarea 5.4: Componente de cierre de sesión
2. Tarea 5.3: Componentes de recuperación de contraseña
3. Tarea 7.2: Manejo de sesión inactiva

¡Excelente trabajo hasta ahora! Tu implementación de la infraestructura de autenticación ha sido excepcional.
