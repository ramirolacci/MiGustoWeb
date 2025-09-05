import axios from 'axios';
import { getToken } from './auth';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  mgid: string;
  phone?: string;
  birthdate?: string;
  documentId?: string;
}

function authHeaders() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}

export async function getMe(): Promise<UserProfile> {
  const { data } = await axios.get(`${API_BASE}/users/me`, { headers: authHeaders() });
  return data;
}

export async function updateMe(partial: Partial<UserProfile>): Promise<UserProfile> {
  const { data } = await axios.put(`${API_BASE}/users/me`, partial, { headers: authHeaders() });
  return data;
}


