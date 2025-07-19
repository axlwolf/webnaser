import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

interface Location {
  id: number;
  name: string;
  slug: string;
  city: string;
  phone: string;
}

interface Service {
  id: number;
  name: string;
  slug: string;
  category: string;
}

interface GlobalState {
  // UI State
  isMenuOpen: boolean;
  theme: 'light' | 'dark';
  isLoading: boolean;
  
  // Auth State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // App State
  currentLocation: Location | null;
  selectedService: Service | null;
  contactFormData: any;
  
  // Actions
  setMenuOpen: (isOpen: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (isLoading: boolean) => void;
  
  // Auth Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  
  // App Actions
  setCurrentLocation: (location: Location | null) => void;
  setSelectedService: (service: Service | null) => void;
  setContactFormData: (data: any) => void;
  clearContactForm: () => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      // Initial UI State
      isMenuOpen: false,
      theme: 'light',
      isLoading: false,
      
      // Initial Auth State
      user: null,
      token: null,
      isAuthenticated: false,
      
      // Initial App State
      currentLocation: null,
      selectedService: null,
      contactFormData: null,
      
      // UI Actions
      setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
      setTheme: (theme) => set({ theme }),
      setLoading: (isLoading) => set({ isLoading }),
      
      // Auth Actions
      setUser: (user) => set({ user }),
      setToken: (token) => {
        set({ token });
        if (token) {
          localStorage.setItem('auth_token', token);
        } else {
          localStorage.removeItem('auth_token');
        }
      },
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      
      login: (user, token) => {
        set({ 
          user, 
          token, 
          isAuthenticated: true 
        });
        localStorage.setItem('auth_token', token);
      },
      
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
        localStorage.removeItem('auth_token');
      },
      
      // App Actions
      setCurrentLocation: (location) => set({ currentLocation: location }),
      setSelectedService: (service) => set({ selectedService: service }),
      setContactFormData: (data) => set({ contactFormData: data }),
      clearContactForm: () => set({ contactFormData: null }),
    }),
    {
      name: 'naser-global-storage',
      partialize: (state) => ({
        // Only persist these values
        theme: state.theme,
        currentLocation: state.currentLocation,
        contactFormData: state.contactFormData,
        // Don't persist auth state (handled by API Client)
      }),
    }
  )
);

// Selectors for better performance
export const useAuth = () => useGlobalStore((state) => ({
  user: state.user,
  token: state.token,
  isAuthenticated: state.isAuthenticated,
  login: state.login,
  logout: state.logout,
}));

export const useUI = () => useGlobalStore((state) => ({
  isMenuOpen: state.isMenuOpen,
  theme: state.theme,
  isLoading: state.isLoading,
  setMenuOpen: state.setMenuOpen,
  setTheme: state.setTheme,
  setLoading: state.setLoading,
}));

export const useApp = () => useGlobalStore((state) => ({
  currentLocation: state.currentLocation,
  selectedService: state.selectedService,
  contactFormData: state.contactFormData,
  setCurrentLocation: state.setCurrentLocation,
  setSelectedService: state.setSelectedService,
  setContactFormData: state.setContactFormData,
  clearContactForm: state.clearContactForm,
}));