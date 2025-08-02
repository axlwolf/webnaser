import axios from 'axios';
import { LoginCredentials, User } from '../../types/admin.types';

const API_URL = 'http://localhost:3000/api/auth';
const TOKEN_KEY = 'auth_token';

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const authService: AuthService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token, user } = response.data;
    setToken(token);
    return user;
  },
  getCurrentUser: async () => {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  logout: async () => {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    await axios.post(`${API_URL}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    removeToken();
  },
};

export default authService;