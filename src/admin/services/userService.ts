import axios from 'axios';
import { AdminUser } from '../types/admin.types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

export const getAllUsers = async (): Promise<{ data: AdminUser[] }> => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const getUserById = async (id: number): Promise<{ data: AdminUser }> => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (userData: Omit<AdminUser, 'id'>): Promise<{ data: AdminUser }> => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (id: number, userData: Partial<AdminUser>): Promise<{ data: AdminUser }> => {
  const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/users/${id}`);
};
