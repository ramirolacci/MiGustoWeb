import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
const TOKEN_KEY = 'mg_jwt_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function logout() {
  clearToken();
}

export async function login(email: string, password: string) {
  const { data } = await axios.post(`${API_BASE}/auth/login`, { email, password });
  if (data?.accessToken) setToken(data.accessToken);
  return data;
}

export async function getProfile() {
  const token = getToken();
  if (!token) throw new Error('No token');
  const { data } = await axios.get(`${API_BASE}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data?.user;
}

export async function register(email: string, password: string, name?: string) {
  const { data } = await axios.post(`${API_BASE}/auth/register`, { email, password, name });
  if (data?.accessToken) setToken(data.accessToken);
  return data;
}


