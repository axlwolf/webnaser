# PROMPT CLAUDE - BATCH 2: Componentes de Cierre de Sesión

## 🎯 CONTEXTO DEL PROYECTO

Estás desarrollando el sistema de autenticación para el **CMS de Grupo Naser**. Has completado exitosamente el **LoginForm** y ahora formas parte de un equipo de **4 agentes coordinados**:

- **Kiro**: Orquestador principal con sistema de hooks automáticos
- **Claude (tú)**: Desarrollador Frontend React
- **Gemini**: Desarrollador Backend PHP
- **Warp**: Especialista DevOps y automatización

**Branch actual**: `feature/auth-integration`  
**Progreso actual**: 36.67% (11/30 tareas completadas)  
**Sistema de hooks**: Activo - detecta automáticamente tus cambios

## ✅ TUS LOGROS ANTERIORES

Has implementado **LoginForm excepcional**:

- ✅ Validaciones en tiempo real perfectas
- ✅ Tests unitarios completos con React Testing Library
- ✅ Accesibilidad total (ARIA, keyboard navigation)
- ✅ Estilos responsive con CSS Modules
- ✅ Integración perfecta con AuthContext
- ✅ Manejo robusto de errores

**Tu trabajo anterior fue calificado como EXCELENTE** 🌟

## 🎯 TU PRÓXIMA TAREA: COMPONENTE DE CIERRE DE SESIÓN (Tarea 5.4)

### OBJETIVO

Crear un **componente de logout completo** que permita a los usuarios cerrar sesión de forma segura y con excelente UX.

### UBICACIÓN DE ARCHIVOS

```
src/frontend/src/auth/components/LogoutButton/
├── LogoutButton.tsx          # Componente principal
├── LogoutButton.module.css   # Estilos CSS Modules
├── LogoutButton.test.tsx     # Tests unitarios
└── index.ts                 # Exportaciones
```

### ESPECIFICACIONES TÉCNICAS DETALLADAS

#### 1. COMPONENTE PRINCIPAL (LogoutButton.tsx)

```tsx
interface LogoutButtonProps {
  variant?: "button" | "menu-item" | "icon";
  size?: "small" | "medium" | "large";
  showConfirmation?: boolean;
  onLogoutSuccess?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function LogoutButton({
  variant = "button",
  size = "medium",
  showConfirmation = true,
  onLogoutSuccess,
  className,
  children,
}: LogoutButtonProps) {
  // Tu implementación aquí
}
```

**Funcionalidades requeridas**:

- **Múltiples variantes**: botón normal, item de menú, solo icono
- **Confirmación opcional**: modal/dialog antes de cerrar sesión
- **Estados visuales**: normal, hover, loading, disabled
- **Integración con AuthContext**: usar hook useAuth
- **Feedback visual**: indicador de loading durante logout
- **Manejo de errores**: mostrar errores si logout falla
- **Accesibilidad completa**: ARIA labels, keyboard support

#### 2. VARIANTES DEL COMPONENTE

**Variante Button (default)**:

```tsx
// Botón estándar con texto e icono
<LogoutButton>Cerrar Sesión</LogoutButton>
```

**Variante Menu Item**:

```tsx
// Para usar en menús dropdown
<LogoutButton variant="menu-item">Cerrar Sesión</LogoutButton>
```

**Variante Icon Only**:

```tsx
// Solo icono para espacios reducidos
<LogoutButton variant="icon" />
```

#### 3. MODAL DE CONFIRMACIÓN

```tsx
// Componente interno para confirmación
interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmationModalProps) {
  // Modal con overlay, animaciones y accesibilidad
}
```

**Características del modal**:

- Overlay semi-transparente
- Animaciones de entrada/salida suaves
- Botones "Confirmar" y "Cancelar"
- Estado de loading durante logout
- Escape key para cancelar
- Focus trap dentro del modal

#### 4. ESTILOS (LogoutButton.module.css)

```css
/* Variante Button */
.logoutButton {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #dc2626; /* Rojo para logout */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logoutButton:hover:not(:disabled) {
  background-color: #b91c1c;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.logoutButton:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Variante Menu Item */
.menuItem {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menuItem:hover {
  background-color: #f3f4f6;
}

/* Variante Icon Only */
.iconButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.iconButton:hover:not(:disabled) {
  background-color: #b91c1c;
  transform: scale(1.05);
}

/* Tamaños */
.small {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

.large {
  padding: 1rem 2rem;
  font-size: 1rem;
}

/* Loading state */
.loading {
  position: relative;
  color: transparent;
}

.loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Modal styles */
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modalContent {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.2s ease;
}

.modalTitle {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.modalMessage {
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.modalActions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.confirmButton {
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.cancelButton {
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

#### 5. IMPLEMENTACIÓN DETALLADA

```tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./LogoutButton.module.css";

// Iconos (puedes usar react-icons o crear SVGs)
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H4v16h10v-2h2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h10z" />
  </svg>
);

export function LogoutButton({
  variant = "button",
  size = "medium",
  showConfirmation = true,
  onLogoutSuccess,
  className,
  children,
}: LogoutButtonProps) {
  const { logout, state } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoutClick = () => {
    if (showConfirmation) {
      setShowModal(true);
    } else {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      onLogoutSuccess?.();
    } catch (error) {
      console.error("Error during logout:", error);
      // El error se maneja en AuthContext
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const getButtonClass = () => {
    const baseClass =
      styles[
        variant === "icon"
          ? "iconButton"
          : variant === "menu-item"
          ? "menuItem"
          : "logoutButton"
      ];
    const sizeClass = styles[size];
    const loadingClass = isLoading ? styles.loading : "";

    return `${baseClass} ${sizeClass} ${loadingClass} ${
      className || ""
    }`.trim();
  };

  const buttonContent = () => {
    if (variant === "icon") {
      return <LogoutIcon />;
    }

    return (
      <>
        <LogoutIcon />
        {children || "Cerrar Sesión"}
      </>
    );
  };

  return (
    <>
      <button
        type="button"
        className={getButtonClass()}
        onClick={handleLogoutClick}
        disabled={isLoading || state.loading}
        aria-label={variant === "icon" ? "Cerrar sesión" : undefined}
      >
        {buttonContent()}
      </button>

      {showModal && (
        <ConfirmationModal
          isOpen={showModal}
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
```

#### 6. TESTS UNITARIOS (LogoutButton.test.tsx)

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LogoutButton } from "./LogoutButton";
import { AuthProvider } from "../../context/AuthContext";

// Mock del AuthService
const mockLogout = jest.fn();
jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    logout: mockLogout,
    state: { loading: false, error: null },
  }),
}));

describe("LogoutButton", () => {
  const renderWithAuth = (component: React.ReactElement) => {
    return render(<AuthProvider>{component}</AuthProvider>);
  };

  beforeEach(() => {
    mockLogout.mockClear();
  });

  test("renders logout button with default text", () => {
    renderWithAuth(<LogoutButton />);

    expect(
      screen.getByRole("button", { name: /cerrar sesión/i })
    ).toBeInTheDocument();
  });

  test("renders custom children text", () => {
    renderWithAuth(<LogoutButton>Salir</LogoutButton>);

    expect(screen.getByRole("button", { name: /salir/i })).toBeInTheDocument();
  });

  test("shows confirmation modal by default", async () => {
    const user = userEvent.setup();
    renderWithAuth(<LogoutButton />);

    await user.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(
      screen.getByText(/¿estás seguro que deseas cerrar sesión?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirmar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cancelar/i })
    ).toBeInTheDocument();
  });

  test("calls logout directly when showConfirmation is false", async () => {
    const user = userEvent.setup();
    mockLogout.mockResolvedValue({});

    renderWithAuth(<LogoutButton showConfirmation={false} />);

    await user.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("calls logout when confirmation is accepted", async () => {
    const user = userEvent.setup();
    mockLogout.mockResolvedValue({});

    renderWithAuth(<LogoutButton />);

    await user.click(screen.getByRole("button", { name: /cerrar sesión/i }));
    await user.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("closes modal when cancelled", async () => {
    const user = userEvent.setup();
    renderWithAuth(<LogoutButton />);

    await user.click(screen.getByRole("button", { name: /cerrar sesión/i }));
    await user.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(
      screen.queryByText(/¿estás seguro que deseas cerrar sesión?/i)
    ).not.toBeInTheDocument();
    expect(mockLogout).not.toHaveBeenCalled();
  });

  test("renders icon variant correctly", () => {
    renderWithAuth(<LogoutButton variant="icon" />);

    const button = screen.getByRole("button", { name: /cerrar sesión/i });
    expect(button).toHaveClass("iconButton");
  });

  test("renders menu-item variant correctly", () => {
    renderWithAuth(<LogoutButton variant="menu-item" />);

    const button = screen.getByRole("button", { name: /cerrar sesión/i });
    expect(button).toHaveClass("menuItem");
  });

  test("calls onLogoutSuccess callback", async () => {
    const onLogoutSuccess = jest.fn();
    const user = userEvent.setup();
    mockLogout.mockResolvedValue({});

    renderWithAuth(
      <LogoutButton
        showConfirmation={false}
        onLogoutSuccess={onLogoutSuccess}
      />
    );

    await user.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    await waitFor(() => {
      expect(onLogoutSuccess).toHaveBeenCalledTimes(1);
    });
  });

  test("handles logout errors gracefully", async () => {
    const user = userEvent.setup();
    mockLogout.mockRejectedValue(new Error("Logout failed"));

    renderWithAuth(<LogoutButton showConfirmation={false} />);

    await user.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    // El error se maneja en AuthContext, no debe romper el componente
    expect(
      screen.getByRole("button", { name: /cerrar sesión/i })
    ).toBeInTheDocument();
  });

  test("closes modal with Escape key", async () => {
    const user = userEvent.setup();
    renderWithAuth(<LogoutButton />);

    await user.click(screen.getByRole("button", { name: /cerrar sesión/i }));
    await user.keyboard("{Escape}");

    expect(
      screen.queryByText(/¿estás seguro que deseas cerrar sesión?/i)
    ).not.toBeInTheDocument();
  });
});
```

### CRITERIOS DE ACEPTACIÓN

- [ ] Componente funcional con múltiples variantes (button, menu-item, icon)
- [ ] Modal de confirmación con animaciones suaves
- [ ] Integración perfecta con AuthContext existente
- [ ] Estados visuales apropiados (loading, disabled, hover)
- [ ] Accesibilidad completa (ARIA, keyboard, focus trap)
- [ ] Tests unitarios con cobertura >90%
- [ ] Estilos responsive y consistentes con LoginForm
- [ ] Manejo robusto de errores
- [ ] Documentación de uso del componente

### COMANDOS PARA REPORTAR PROGRESO

```bash
# Al iniciar la tarea
node .kiro/specs/auth-integration/update-status.js start-task claude "5.4" "Iniciando implementación de LogoutButton con múltiples variantes"

# Para reportar progreso
node .kiro/specs/auth-integration/update-status.js update-progress claude "5.4" "Componente base implementado, trabajando en modal de confirmación"

# Al completar
node .kiro/specs/auth-integration/update-status.js complete-task claude "5.4" "LogoutButton completado con todas las variantes, modal, tests y documentación"
```

### INTEGRACIÓN CON SISTEMA DE HOOKS

El **sistema de hooks automático** detectará cuando completes esta tarea:

- Detectará la creación de `LogoutButton.tsx`, `LogoutButton.test.tsx`, etc.
- Actualizará automáticamente el estado del proyecto
- Notificará a Kiro sobre tu progreso
- Preparará la siguiente tarea automáticamente

### PRÓXIMAS TAREAS DESPUÉS DE ESTA

1. **Tarea 5.3**: Componentes de recuperación de contraseña
2. **Tarea 7.2**: Manejo de sesión inactiva
3. **Integración end-to-end**: Pruebas completas con Gemini

---

**¡Tu LoginForm anterior fue excepcional!** 🌟 Estoy seguro de que este LogoutButton será igual de impresionante.

**Enfócate en**: UX fluida, accesibilidad total, y múltiples variantes para máxima flexibilidad.
