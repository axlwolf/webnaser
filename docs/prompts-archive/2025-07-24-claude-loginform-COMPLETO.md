# PROMPT ESPECÍFICO PARA CLAUDE - IMPLEMENTAR LOGINFORM

## 🎯 CONTEXTO DEL PROYECTO

Estás desarrollando el sistema de autenticación para el **CMS de Grupo Naser**, un sitio web de servicios funerarios que será desplegado en **GoDaddy hosting**.

**Branch actual**: `feature/auth-integration`  
**Tu rol**: Desarrollador Frontend React  
**Progreso actual**: 13.33% (4/30 tareas completadas)

## ✅ LO QUE YA HAS COMPLETADO EXITOSAMENTE

Has implementado una **estructura de autenticación completa y robusta**:

- **AuthContext** (`src/frontend/src/auth/context/AuthContext.tsx`) - Gestión global de estado
- **useAuth hook** (`src/frontend/src/auth/hooks/useAuth.ts`) - Hook personalizado
- **AuthService** (`src/frontend/src/auth/services/AuthService.ts`) - Comunicación con API
- **TokenStorage** (`src/frontend/src/auth/services/TokenStorage.ts`) - Manejo seguro de JWT
- **ApiInterceptor** (`src/frontend/src/auth/services/ApiInterceptor.ts`) - Renovación automática
- **ProtectedRoute** (`src/frontend/src/auth/components/ProtectedRoute.tsx`) - Protección de rutas
- **Tipos TypeScript** (`src/frontend/src/auth/types/auth.ts`) - Tipado completo

## 🎯 TU PRÓXIMA TAREA: IMPLEMENTAR LOGINFORM (Tarea 5.1)

### OBJETIVO

Crear un **formulario de inicio de sesión completo** que integre con tu infraestructura de autenticación ya implementada.

### UBICACIÓN DE ARCHIVOS

```
src/frontend/src/auth/components/LoginForm/
├── LoginForm.tsx          # Componente principal
├── LoginForm.module.css   # Estilos CSS Modules
├── LoginForm.test.tsx     # Tests unitarios
└── index.ts              # Exportaciones
```

### ESPECIFICACIONES TÉCNICAS DETALLADAS

#### 1. COMPONENTE PRINCIPAL (LoginForm.tsx)

```tsx
interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
  className?: string;
}

export function LoginForm({
  onSuccess,
  redirectTo = "/dashboard",
  className,
}: LoginFormProps) {
  // Tu implementación aquí
}
```

**Funcionalidades requeridas**:

- Campos: email (type="email") y password (type="password")
- Validación en tiempo real con mensajes específicos
- Estado de loading durante autenticación
- Manejo de errores de API con mensajes en español
- Botón submit deshabilitado si hay errores de validación
- Enlace "¿Olvidaste tu contraseña?" (href="#" por ahora)
- Integración completa con tu `useAuth` hook

#### 2. VALIDACIONES ESPECÍFICAS

```typescript
// Validaciones requeridas
const emailValidation = {
  required: "El correo electrónico es obligatorio",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Ingresa un correo electrónico válido",
  },
};

const passwordValidation = {
  required: "La contraseña es obligatoria",
  minLength: {
    value: 8,
    message: "La contraseña debe tener al menos 8 caracteres",
  },
};
```

#### 3. ESTILOS (LoginForm.module.css)

**Requisitos de diseño**:

- **Mobile-first**: Responsive desde 320px hasta desktop
- **Colores**: Usar la paleta de Grupo Naser (tonos oscuros, dorados)
- **Tipografía**: Fuentes elegantes, legibles
- **Estados**: hover, focus, error, loading
- **Accesibilidad**: Contraste mínimo 4.5:1

```css
/* Ejemplo de estructura base */
.loginForm {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  /* Más estilos aquí */
}

.formGroup {
  margin-bottom: 1.5rem;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #d4af37; /* Dorado de Grupo Naser */
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submitButton {
  width: 100%;
  padding: 0.75rem;
  background-color: #d4af37;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submitButton:hover:not(:disabled) {
  background-color: #b8941f;
}

.submitButton:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.loading {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

#### 4. TESTS UNITARIOS (LoginForm.test.tsx)

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { AuthProvider } from "../../context/AuthContext";

// Mock del AuthService
jest.mock("../../services/AuthService");

describe("LoginForm", () => {
  const renderWithAuth = (component: React.ReactElement) => {
    return render(<AuthProvider>{component}</AuthProvider>);
  };

  test("renders login form fields", () => {
    renderWithAuth(<LoginForm />);

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors for invalid inputs", async () => {
    const user = userEvent.setup();
    renderWithAuth(<LoginForm />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    await user.type(emailInput, "invalid-email");
    await user.type(passwordInput, "123");
    await user.tab(); // Trigger blur

    expect(
      screen.getByText(/ingresa un correo electrónico válido/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/la contraseña debe tener al menos 8 caracteres/i)
    ).toBeInTheDocument();
  });

  test("submits form with valid credentials", async () => {
    const mockLogin = jest.fn().mockResolvedValue({});
    const user = userEvent.setup();

    renderWithAuth(<LoginForm />);

    await user.type(
      screen.getByLabelText(/correo electrónico/i),
      "admin@naser.com.mx"
    );
    await user.type(screen.getByLabelText(/contraseña/i), "password123");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "admin@naser.com.mx",
        password: "password123",
      });
    });
  });

  // Más tests aquí...
});
```

#### 5. ACCESIBILIDAD REQUERIDA

- **Labels**: Todos los inputs deben tener labels asociados
- **ARIA**: Usar aria-describedby para mensajes de error
- **Keyboard**: Navegación completa por teclado
- **Screen readers**: Anunciar errores y cambios de estado
- **Focus management**: Focus visible y lógico

```tsx
// Ejemplo de implementación accesible
<div className={styles.formGroup}>
  <label htmlFor="email" className={styles.label}>
    Correo electrónico
  </label>
  <input
    id="email"
    type="email"
    className={`${styles.input} ${emailError ? styles.inputError : ""}`}
    value={email}
    onChange={handleEmailChange}
    aria-describedby={emailError ? "email-error" : undefined}
    aria-invalid={!!emailError}
  />
  {emailError && (
    <div id="email-error" className={styles.error} role="alert">
      {emailError}
    </div>
  )}
</div>
```

### INTEGRACIÓN CON TU INFRAESTRUCTURA EXISTENTE

#### Usar tu AuthContext:

```tsx
import { useAuth } from "../../hooks/useAuth";

export function LoginForm({
  onSuccess,
  redirectTo = "/dashboard",
}: LoginFormProps) {
  const { login, state } = useAuth();
  const { loading, error } = state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      onSuccess?.();
      // Redirección manejada por AuthContext
    } catch (error) {
      // Error manejado por AuthContext
    }
  };
}
```

### CRITERIOS DE ACEPTACIÓN

- [ ] Formulario funcional con validación en tiempo real
- [ ] Integración exitosa con AuthContext existente
- [ ] Manejo robusto de errores de API
- [ ] Diseño responsive y accesible
- [ ] Tests unitarios con cobertura >80%
- [ ] Mensajes en español
- [ ] Compatible con GoDaddy hosting
- [ ] Seguimiento de estándares React del proyecto

### COMANDOS PARA REPORTAR PROGRESO

```bash
# Al iniciar la tarea
node .kiro/specs/auth-integration/update-status.js start-task claude "5.1" "Iniciando implementación de LoginForm con validaciones y tests"

# Para reportar progreso (cada 2-3 horas)
node .kiro/specs/auth-integration/update-status.js update-progress claude "5.1" "Formulario base implementado, trabajando en validaciones y estilos"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task claude "5.1" "LoginForm completado con validaciones, tests, accesibilidad y documentación"
```

### ARCHIVOS DE REFERENCIA

Revisa estos archivos para contexto completo:

- `.kiro/specs/auth-integration/requirements.md` - Requisitos del sistema
- `.kiro/specs/auth-integration/design.md` - Diseño técnico
- `.kiro/specs/auth-integration/api-contract.md` - Contrato de API
- `src/frontend/src/auth/context/AuthContext.tsx` - Tu implementación de contexto
- `src/frontend/src/auth/services/AuthService.ts` - Tu servicio de API

### PRÓXIMAS TAREAS DESPUÉS DE ESTA

1. **Tarea 5.4**: Componente de cierre de sesión
2. **Tarea 5.3**: Componentes de recuperación de contraseña
3. **Tarea 7.2**: Manejo de sesión inactiva

---

**¡Tu trabajo anterior ha sido excepcional!** La infraestructura que implementaste es sólida y profesional. Este LoginForm será la interfaz que los usuarios verán de tu excelente trabajo técnico.

**Enfócate en**: UX fluida, accesibilidad completa, y integración perfecta con tu AuthContext existente.
