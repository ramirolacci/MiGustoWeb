import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export interface LoyaltyProduct {
  id: string;
  name: string;
  shortDescription: string;
  pointsCost: number;
  imageUrl: string;
  stock?: number;
}

export interface LoyaltySummary {
  userId: number;
  totalPoints: number;
}

// Mock fallback en caso de no contar aún con backend
const mockProducts: LoyaltyProduct[] = [
  {
    id: 'cap-001',
    name: 'Gorra Mi Gusto',
    shortDescription: 'Edición limitada con logo bordado',
    pointsCost: 350,
    imageUrl: '/canjes/Gorra.jpg',
  },
  {
    id: 'cup-002',
    name: 'Vaso térmico',
    shortDescription: 'Acero inoxidable, 500 ml',
    pointsCost: 520,
    imageUrl: '/canjes/vaso.jpg',
  },
  {
    id: 'tshirt-003',
    name: 'Remera Mi Gusto',
    shortDescription: '100% algodón, unisex',
    pointsCost: 690,
    imageUrl: '/canjes/Remera.jpg',
  },
  {
    id: 'coupon-004',
    name: 'Set Termo y Mate',
    shortDescription: 'Set termo 1.4L y mate versión limitada',
    pointsCost: 800,
    imageUrl: '/canjes/termoymate.jpg',
  },
  {
    id: 'board-005',
    name: 'Tabla para empanadas',
    shortDescription: 'Tabla de madera premium para servir empanadas',
    pointsCost: 1200,
    imageUrl: '/canjes/tabla.jpg',
  },
  {
    id: 'car-006',
    name: 'Auto 0 km',
    shortDescription: 'Gran premio especial del programa de canje',
    pointsCost: 100000,
    imageUrl: '/canjes/auto.jpg',
  },
];

export async function getMyLoyalty(): Promise<LoyaltySummary> {
  try {
    const { data } = await axios.get(`${API_BASE}/loyalty/me`);
    return data;
  } catch {
    return { userId: 0, totalPoints: 888 };
  }
}

export async function getRedeemableProducts(): Promise<LoyaltyProduct[]> {
  try {
    const { data } = await axios.get(`${API_BASE}/loyalty/products`);
    return data;
  } catch {
    return mockProducts;
  }
}

export async function redeemProduct(productId: string): Promise<{ ok: boolean; newPoints?: number }> {
  try {
    const { data } = await axios.post(`${API_BASE}/loyalty/redeem`, { productId });
    return data;
  } catch {
    // Mock: descontar puntos localmente no es persistente, solo feedback de UI
    return { ok: true };
  }
}


