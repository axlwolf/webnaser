/**
 * Authentication Service for API communication
 * Handles all auth-related API calls
 */

import { 
  LoginCredentials, 
  LoginResponse, 
  User, 
  ApiResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest
} from '../types/auth';
import TokenStorage from './TokenStorage';

const API_BASE = '/api/v1/auth';

export class AuthService {
  /**
   * Login user with credentials
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data: ApiResponse<LoginResponse> = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || 'Error al iniciar sesión');
    }

    // Store token and user data
    if (data.data) {
      TokenStorage.setToken(data.data.token);
      TokenStorage.setUser(data.data.user);
    }

    return data.data!;
  }

  /**
   * Logout current user
   */
  static async logout(): Promise<void> {
    const token = TokenStorage.getToken();
    
    try {
      const response = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Clear local storage regardless of response
      // This ensures user is logged out even if API call fails
      TokenStorage.clearAll();

      if (!response.ok) {
        console.warn('Logout API call failed, but local storage cleared');
      }
    } catch (error) {
      // Clear local storage even if network request fails
      TokenStorage.clearAll();
      console.warn('Logout failed, but local storage cleared:', error);
    }
  }

  /**
   * Get current user information
   */
  static async getCurrentUser(): Promise<User> {
    const token = TokenStorage.getToken();
    
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_BASE}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data: ApiResponse<{ user: User }> = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || 'Error al obtener información del usuario');
    }

    // Update stored user data
    if (data.data?.user) {
      TokenStorage.setUser(data.data.user);
    }

    return data.data!.user;
  }

  /**
   * Refresh JWT token
   */
  static async refreshToken(): Promise<string> {
    const token = TokenStorage.getToken();
    
    if (!token) {
      throw new Error('No token to refresh');
    }

    const response = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data: ApiResponse<{ token: string; expires_at: string }> = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || 'Error al renovar token');
    }

    // Store new token
    if (data.data?.token) {
      TokenStorage.setToken(data.data.token);
    }

    return data.data!.token;
  }

  /**
   * Request password reset
   */
  static async forgotPassword(request: ForgotPasswordRequest): Promise<void> {
    const response = await fetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data: ApiResponse = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || 'Error al solicitar recuperación de contraseña');
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(request: ResetPasswordRequest): Promise<void> {
    const response = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data: ApiResponse = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || 'Error al restablecer contraseña');
    }
  }

  /**
   * Check if user is authenticated (has valid token)
   */
  static isAuthenticated(): boolean {
    const token = TokenStorage.getToken();
    if (!token) return false;

    // Check if token is expired (client-side check)
    return !TokenStorage.isTokenExpired(token);
  }

  /**
   * Get stored user data
   */
  static getStoredUser(): User | null {
    return TokenStorage.getUser();
  }
}

export default AuthService;