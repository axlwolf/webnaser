import axios from 'axios';
import { Location } from '../types/admin.types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

export const getAllLocations = async (): Promise<{ data: Location[] }> => {
  const response = await axios.get(`${API_BASE_URL}/locations`);
  return response.data;
};

export const getLocationById = async (id: number): Promise<{ data: Location }> => {
  const response = await axios.get(`${API_BASE_URL}/locations/${id}`);
  return response.data;
};

export const createLocation = async (location: Omit<Location, 'id'>): Promise<{ data: Location }> => {
  const response = await axios.post(`${API_BASE_URL}/locations`, location);
  return response.data;
};

export const updateLocation = async (id: number, location: Partial<Location>): Promise<{ data: Location }> => {
  const response = await axios.put(`${API_BASE_URL}/locations/${id}`, location);
  return response.data;
};

export const deleteLocation = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/locations/${id}`);
};
