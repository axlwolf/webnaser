/**
 * Basic tests to verify auth structure is working
 */

import { describe, it, expect } from 'vitest';
import TokenStorage from '../services/TokenStorage';
import { AuthErrorCode } from '../types/auth';

describe('Auth Structure', () => {
  it('should export TokenStorage correctly', () => {
    expect(TokenStorage).toBeDefined();
    expect(typeof TokenStorage.setToken).toBe('function');
    expect(typeof TokenStorage.getToken).toBe('function');
    expect(typeof TokenStorage.removeToken).toBe('function');
  });

  it('should have auth types available', () => {
    expect(AuthErrorCode.INVALID_CREDENTIALS).toBe('AUTH_001');
    expect(AuthErrorCode.INVALID_TOKEN).toBe('AUTH_002');
  });

  it('should handle token storage operations', () => {
    const testToken = 'test-jwt-token';
    
    // Initially no token
    expect(TokenStorage.getToken()).toBeNull();
    
    // Set token
    TokenStorage.setToken(testToken);
    expect(TokenStorage.getToken()).toBe(testToken);
    
    // Remove token
    TokenStorage.removeToken();
    expect(TokenStorage.getToken()).toBeNull();
  });
});