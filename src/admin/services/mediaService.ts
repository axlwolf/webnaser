import axios from 'axios';
import { MediaItem } from '../types/admin.types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

export const getAllMedia = async (): Promise<{ data: MediaItem[] }> => {
  const response = await axios.get(`${API_BASE_URL}/media`);
  return response.data;
};

export const getMediaById = async (id: number): Promise<{ data: MediaItem }> => {
  const response = await axios.get(`${API_BASE_URL}/media/${id}`);
  return response.data;
};

export const createMedia = async (mediaData: FormData): Promise<{ data: MediaItem }> => {
  const response = await axios.post(`${API_BASE_URL}/media`, mediaData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateMedia = async (id: number, mediaData: FormData): Promise<{ data: MediaItem }> => {
  const response = await axios.put(`${API_BASE_URL}/media/${id}`, mediaData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteMedia = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/media/${id}`);
};
