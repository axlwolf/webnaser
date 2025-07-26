/**
 * LogoutButton Tests - Grupo Naser CMS
 * Tests unitarios completos para el componente LogoutButton
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import { LogoutButton } from './LogoutButton';
import { AuthProvider } from '../../context/AuthContext';
import { AuthState } from '../../types/auth';

// Mock del AuthService
const mockLogout = vi.fn();
const mockAuthState: AuthState = {
  isAuthenticated: true,
  user: {
    id: '1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'admin',
  },
  token: 'mock-token',
  loading: false,
  error: null,
};

// Mock del hook useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    logout: mockLogout,
    state: mockAuthState,
  })),
}));

// Mock global para document.body.style
Object.defineProperty(document.body, 'style', {
  value: {},
  writable: true,
});

describe('LogoutButton', () => {
  const user = userEvent.setup();

  const renderWithAuth = (component: React.ReactElement) => {
    return render(<AuthProvider>{component}</AuthProvider>);
  };

  beforeEach(() => {
    mockLogout.mockClear();
    mockLogout.mockResolvedValue(undefined);
    // Reset body overflow
    document.body.style.overflow = '';
  });

  afterEach(() => {
    // Reset body overflow and mocks
    document.body.style.overflow = '';
    mockLogout.mockReset();
  });

  describe('Renderizado básico', () => {
    test('renderiza el botón de logout con texto por defecto', () => {
      renderWithAuth(<LogoutButton />);

      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
      expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
    });

    test('renderiza texto personalizado cuando se proporciona children', () => {
      renderWithAuth(<LogoutButton>Salir</LogoutButton>);

      expect(screen.getByText('Salir')).toBeInTheDocument();
    });

    test('aplica className personalizada', () => {
      renderWithAuth(<LogoutButton className="custom-class" />);

      const button = screen.getByTestId('logout-button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variantes del componente', () => {
    test('renderiza variante button por defecto', () => {
      renderWithAuth(<LogoutButton />);

      const button = screen.getByTestId('logout-button');
      expect(button.className).toContain('logoutButton');
    });

    test('renderiza variante menu-item correctamente', () => {
      renderWithAuth(<LogoutButton variant="menu-item" />);

      const button = screen.getByTestId('logout-button');
      expect(button.className).toContain('menuItem');
    });

    test('renderiza variante icon correctamente', () => {
      renderWithAuth(<LogoutButton variant="icon" />);

      const button = screen.getByTestId('logout-button');
      expect(button.className).toContain('iconButton');
      expect(button).toHaveAttribute('aria-label', 'Cerrar sesión');
    });
  });

  describe('Tamaños del componente', () => {
    test('aplica tamaño medium por defecto', () => {
      renderWithAuth(<LogoutButton />);

      const button = screen.getByTestId('logout-button');
      expect(button.className).toContain('medium');
    });

    test('aplica tamaño small', () => {
      renderWithAuth(<LogoutButton size="small" />);

      const button = screen.getByTestId('logout-button');
      expect(button.className).toContain('small');
    });

    test('aplica tamaño large', () => {
      renderWithAuth(<LogoutButton size="large" />);

      const button = screen.getByTestId('logout-button');
      expect(button.className).toContain('large');
    });
  });

  describe('Modal de confirmación', () => {
    test('muestra modal de confirmación por defecto', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Confirmar cierre de sesión')).toBeInTheDocument();
      expect(screen.getByText(/¿Estás seguro que deseas cerrar sesión?/)).toBeInTheDocument();
      expect(screen.getByTestId('confirm-logout')).toBeInTheDocument();
      expect(screen.getByTestId('cancel-logout')).toBeInTheDocument();
    });

    test('no muestra modal cuando showConfirmation es false', async () => {
      renderWithAuth(<LogoutButton showConfirmation={false} />);

      await user.click(screen.getByTestId('logout-button'));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    test('cierra modal al hacer clic en cancelar', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      await user.click(screen.getByTestId('cancel-logout'));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(mockLogout).not.toHaveBeenCalled();
    });

    test('cierra modal al hacer clic en el overlay', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      
      const overlay = screen.getByRole('dialog');
      fireEvent.click(overlay);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(mockLogout).not.toHaveBeenCalled();
    });

    test('no cierra modal al hacer clic en el contenido', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      
      const content = screen.getByRole('document');
      fireEvent.click(content);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('cierra modal con tecla Escape', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      await user.keyboard('{Escape}');

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(mockLogout).not.toHaveBeenCalled();
    });

    test('no cierra modal con Escape durante loading', async () => {
      mockLogout.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      await user.click(screen.getByTestId('confirm-logout'));
      await user.keyboard('{Escape}');

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('previene scroll del body cuando modal está abierto', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));

      expect(document.body.style.overflow).toBe('hidden');

      await user.click(screen.getByTestId('cancel-logout'));

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Funcionalidad de logout', () => {
    test('llama a logout cuando se confirma', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      await user.click(screen.getByTestId('confirm-logout'));

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    test('llama a logout directamente cuando showConfirmation es false', async () => {
      renderWithAuth(<LogoutButton showConfirmation={false} />);

      await user.click(screen.getByTestId('logout-button'));

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    test('llama al callback onLogoutSuccess después del logout exitoso', async () => {
      const onLogoutSuccess = vi.fn();
      renderWithAuth(
        <LogoutButton
          showConfirmation={false}
          onLogoutSuccess={onLogoutSuccess}
        />
      );

      await user.click(screen.getByTestId('logout-button'));

      await waitFor(() => {
        expect(onLogoutSuccess).toHaveBeenCalledTimes(1);
      });
    });

    test('maneja errores de logout gracefully', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockLogout.mockRejectedValue(new Error('Logout failed'));

      renderWithAuth(<LogoutButton showConfirmation={false} />);

      await user.click(screen.getByTestId('logout-button'));

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith('Error during logout:', expect.any(Error));
      });

      consoleError.mockRestore();
    });

    test('cierra modal después de logout exitoso', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      await user.click(screen.getByTestId('confirm-logout'));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    test('cierra modal después de error en logout', async () => {
      mockLogout.mockRejectedValue(new Error('Logout failed'));
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      await user.click(screen.getByTestId('confirm-logout'));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Estados de loading', () => {
    test('deshabilita botón durante loading local', async () => {
      mockLogout.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      renderWithAuth(<LogoutButton showConfirmation={false} />);

      await user.click(screen.getByTestId('logout-button'));

      const button = screen.getByTestId('logout-button');
      expect(button).toBeDisabled();
      expect(button.className).toContain('loading');
    });

    test('deshabilita botones del modal durante loading', async () => {
      mockLogout.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      await user.click(screen.getByTestId('confirm-logout'));

      expect(screen.getByTestId('confirm-logout')).toBeDisabled();
      expect(screen.getByTestId('cancel-logout')).toBeDisabled();
    });

    test('muestra texto de loading en botón de confirmación', async () => {
      mockLogout.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));
      await user.click(screen.getByTestId('confirm-logout'));

      expect(screen.getByText('Cerrando sesión...')).toBeInTheDocument();
    });
  });

  describe('Accesibilidad', () => {
    test('tiene aria-label para variante icon', () => {
      renderWithAuth(<LogoutButton variant="icon" />);

      const button = screen.getByTestId('logout-button');
      expect(button).toHaveAttribute('aria-label', 'Cerrar sesión');
    });

    test('modal tiene atributos ARIA correctos', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'logout-modal-title');
    });

    test('enfoca el botón de confirmación al abrir modal', async () => {
      renderWithAuth(<LogoutButton />);

      await user.click(screen.getByTestId('logout-button'));

      await waitFor(() => {
        expect(screen.getByTestId('confirm-logout')).toHaveFocus();
      });
    });

    test('icono SVG tiene aria-hidden', () => {
      renderWithAuth(<LogoutButton />);

      const icon = screen.getByRole('button').querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Integración con AuthContext', () => {
    test('muestra el botón correctamente', () => {
      renderWithAuth(<LogoutButton />);

      const button = screen.getByTestId('logout-button');
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });
  });
});