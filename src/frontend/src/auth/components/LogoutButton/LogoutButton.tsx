/**
 * LogoutButton Component - Grupo Naser CMS
 * Componente de cierre de sesión con múltiples variantes y confirmación
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './LogoutButton.module.css';

// Icono de logout
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H4v16h10v-2h2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h10z" />
  </svg>
);

// Props para el modal de confirmación
interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

// Modal de confirmación
function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus trap - enfocar el primer botón
      const confirmButton = document.querySelector('[data-testid="confirm-logout"]') as HTMLButtonElement;
      if (confirmButton) {
        confirmButton.focus();
      }
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel} role="dialog" aria-modal="true" aria-labelledby="logout-modal-title">
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <h2 id="logout-modal-title" className={styles.modalTitle}>
          Confirmar cierre de sesión
        </h2>
        <p className={styles.modalMessage}>
          ¿Estás seguro que deseas cerrar sesión? Tendrás que iniciar sesión nuevamente para acceder al panel de administración.
        </p>
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isLoading}
            data-testid="cancel-logout"
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`${styles.confirmButton} ${isLoading ? styles.loading : ''}`}
            onClick={onConfirm}
            disabled={isLoading}
            data-testid="confirm-logout"
          >
            {isLoading ? 'Cerrando sesión...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Props del componente principal
export interface LogoutButtonProps {
  variant?: 'button' | 'menu-item' | 'icon';
  size?: 'small' | 'medium' | 'large';
  showConfirmation?: boolean;
  onLogoutSuccess?: () => void;
  className?: string;
  children?: React.ReactNode;
}

// Componente principal
export function LogoutButton({
  variant = 'button',
  size = 'medium',
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
      console.error('Error during logout:', error);
      // El error se maneja en AuthContext
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const getButtonClass = () => {
    const baseClass = 
      variant === 'icon' 
        ? styles.iconButton
        : variant === 'menu-item'
        ? styles.menuItem
        : styles.logoutButton;
    
    const sizeClass = styles[size];
    const loadingClass = (isLoading || state.loading) ? styles.loading : '';

    return `${baseClass} ${sizeClass} ${loadingClass} ${className || ''}`.trim();
  };

  const buttonContent = () => {
    if (variant === 'icon') {
      return <LogoutIcon />;
    }

    return (
      <>
        <LogoutIcon />
        {children || 'Cerrar Sesión'}
      </>
    );
  };

  const ariaLabel = variant === 'icon' ? 'Cerrar sesión' : undefined;

  return (
    <>
      <button
        type="button"
        className={getButtonClass()}
        onClick={handleLogoutClick}
        disabled={isLoading || state.loading}
        aria-label={ariaLabel}
        data-testid="logout-button"
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

export default LogoutButton;