/**
 * Token Storage Service for JWT management
 * Handles secure storage and retrieval of JWT tokens
 */

import { TokenPayload } from '../types/auth';

const TOKEN_KEY = 'naser_auth_token';
const USER_KEY = 'naser_auth_user';

export class TokenStorage {
  /**
   * Store JWT token in localStorage
   */
  static setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  /**
   * Retrieve JWT token from localStorage
   */
  static getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  /**
   * Remove JWT token from localStorage
   */
  static removeToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }

  /**
   * Store user data in localStorage
   */
  static setUser(user: any): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  }

  /**
   * Retrieve user data from localStorage
   */
  static getUser(): any | null {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  }

  /**
   * Decode JWT token payload (without verification)
   * Used to get expiration time and basic info
   */
  static decodeToken(token: string): TokenPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload) as TokenPayload;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  /**
   * Check if token is expired (client-side check only)
   */
  static isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return true;

    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  }

  /**
   * Check if token will expire soon (within 30 minutes)
   */
  static shouldRefreshToken(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return false;

    const currentTime = Date.now() / 1000;
    const thirtyMinutes = 30 * 60; // 30 minutes in seconds
    
    return (payload.exp - currentTime) < thirtyMinutes;
  }

  /**
   * Clear all auth-related data from storage
   */
  static clearAll(): void {
    this.removeToken();
  }
}

export default TokenStorage;