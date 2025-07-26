/**
 * API Interceptor for Authentication
 * Handles automatic token injection and refresh
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import TokenStorage from './TokenStorage';
import AuthService from './AuthService';

export class ApiInterceptor {
  private static instance: AxiosInstance | null = null;

  /**
   * Create and configure axios instance with auth interceptors
   */
  static create(): AxiosInstance {
    if (this.instance) {
      return this.instance;
    }

    const baseURL = import.meta.env.VITE_API_URL || '/api/v1';

    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupRequestInterceptor();
    this.setupResponseInterceptor();

    return this.instance;
  }

  /**
   * Setup request interceptor to add auth token
   */
  private static setupRequestInterceptor(): void {
    this.instance!.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = TokenStorage.getToken();
        
        if (token && !TokenStorage.isTokenExpired(token)) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /**
   * Setup response interceptor to handle token refresh
   */
  private static setupResponseInterceptor(): void {
    this.instance!.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Attempt to refresh token
            const newToken = await AuthService.refreshToken();
            
            // Update the original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            // Retry the original request
            return this.instance!(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear auth and redirect to login
            TokenStorage.clearAll();
            
            // Only redirect if we're not already on login page
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login';
            }
            
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Get the configured axios instance
   */
  static getInstance(): AxiosInstance {
    if (!this.instance) {
      return this.create();
    }
    
    return this.instance;
  }
}

// Export singleton instance
export const authApiClient = ApiInterceptor.getInstance();
export default ApiInterceptor;