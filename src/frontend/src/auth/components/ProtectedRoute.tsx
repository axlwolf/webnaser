/**
 * Protected Route Component
 * Protects routes that require authentication
 */

import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'editor';
  fallback?: ReactNode;
}

/**
 * ProtectedRoute component that wraps routes requiring authentication
 * @param children - Components to render if authenticated
 * @param requiredRole - Optional role requirement (admin or editor)
 * @param fallback - Optional loading component
 */
export function ProtectedRoute({ 
  children, 
  requiredRole,
  fallback = <div>Cargando...</div>
}: ProtectedRouteProps) {
  const { state } = useAuth();
  const location = useLocation();
  const { isAuthenticated, user, loading } = state;

  // Show loading state while checking authentication
  if (loading) {
    return <>{fallback}</>;
  }

  // If not authenticated, redirect to login with return path
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // If role is required, check user role
  if (requiredRole && user) {
    const hasRequiredRole = checkUserRole(user, requiredRole);
    
    if (!hasRequiredRole) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          margin: '2rem'
        }}>
          <h2 style={{ color: '#dc2626' }}>Acceso Denegado</h2>
          <p>No tienes permisos suficientes para acceder a esta página.</p>
          <p>Rol requerido: <strong>{requiredRole}</strong></p>
          <p>Tu rol actual: <strong>{user.role}</strong></p>
        </div>
      );
    }
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
}

/**
 * Helper function to check if user has required role
 */
function checkUserRole(user: User, requiredRole: 'admin' | 'editor'): boolean {
  // Admin can access everything
  if (user.role === 'admin') {
    return true;
  }

  // Editor can only access editor-level content
  if (user.role === 'editor' && requiredRole === 'editor') {
    return true;
  }

  return false;
}

export default ProtectedRoute;