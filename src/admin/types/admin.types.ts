export interface User {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface AuthService {
  login: (credentials: LoginCredentials) => Promise<User>;
  getCurrentUser: () => Promise<User | null>;
  logout: () => Promise<void>;
}

export interface DashboardStats {
  pages: {
    total: number;
    published: number;
    drafts: number;
    recent: Page[];
  };
  services: {
    total: number;
    byCategory: Record<string, number>;
    featured: Service[];
  };
  locations: {
    total: number;
    active: number;
    services: Record<string, number>;
  };
  system: {
    diskUsage: number;
    memoryUsage: number;
    uptime: string;
    lastBackup: string;
  };
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  name: string;
  category: 'prevision' | 'inmediata' | 'cremacion' | 'traslados' | 'velacion';
  description: string;
  features: string[];
  priceRange: string;
  image: string;
  gallery: string[];
  isFeatured: boolean;
  status: 'active' | 'inactive';
  locations: string[];
}

export interface Location {
  id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: Record<string, string>;
  services: string[];
  images: string[];
  isMain: boolean;
  status: 'active' | 'inactive';
}