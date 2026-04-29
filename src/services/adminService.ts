// Servicio para gestionar datos de administración
// Guarda los cambios en localStorage (en producción debería usar un backend)

import { promociones } from '../data/promocionesData';
import { empanadas } from '../data/empanadasData';
import { pizzas } from '../data/pizzasData';
import { pizzasIndi } from '../data/pizzasIndiData';
import { fitzzas } from '../data/fitzzasData';
import { salsas } from '../data/salsasData';
import { postres } from '../data/postresData';

// Claves de almacenamiento
const STORAGE_KEYS = {
  PROMOCIONES: 'admin_promociones',
  EMPANADAS: 'admin_empanadas',
  PIZZAS: 'admin_pizzas',
  PIZZAS_INDI: 'admin_pizzas_indi',
  FITZZAS: 'admin_fitzzas',
  SALSAS: 'admin_salsas',
  POSTRES: 'admin_postres',
};

// Tipos
export interface AdminProduct {
  id?: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  imagenDetalle?: string;
  imagenCard?: string;
  precio?: number | string;
  esRecomendado?: boolean;
  esVegetariano?: boolean;
  esSinGluten?: boolean;
  esPremium?: boolean;
  ingredientes?: string[];
  categoria: string;
}

export interface AdminPromocion {
  id?: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  precio: number | string;
  esRecomendado?: boolean;
}

// Función para obtener datos (combina datos originales con ediciones guardadas)
function getStoredData<T>(storageKey: string, defaultData: T[]): T[] {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error loading ${storageKey}:`, error);
  }
  return defaultData;
}

// Función para guardar datos
function saveData<T>(storageKey: string, data: T[]): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${storageKey}:`, error);
  }
}

// Servicios para Promociones
export const adminPromocionesService = {
  getAll: (): AdminPromocion[] => {
    const stored = getStoredData<AdminPromocion>(STORAGE_KEYS.PROMOCIONES, []);
    if (stored.length > 0) {
      return stored;
    }
    // Si no hay datos guardados, convertir los datos originales y agregar precio por defecto
    return promociones.map((p, index) => ({
      id: `promo-${index}`,
      titulo: p.titulo,
      descripcion: p.descripcion,
      imagen: p.imagen,
      precio: 0, // Precio por defecto, se puede editar
      esRecomendado: p.esRecomendado,
    }));
  },

  save: (promociones: AdminPromocion[]): void => {
    saveData(STORAGE_KEYS.PROMOCIONES, promociones);
  },

  add: (promocion: AdminPromocion): void => {
    const all = adminPromocionesService.getAll();
    const newPromo = {
      ...promocion,
      id: `promo-${Date.now()}`,
    };
    all.push(newPromo);
    adminPromocionesService.save(all);
  },

  update: (id: string, updates: Partial<AdminPromocion>): void => {
    const all = adminPromocionesService.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      adminPromocionesService.save(all);
    }
  },

  delete: (id: string): void => {
    const all = adminPromocionesService.getAll();
    const filtered = all.filter(p => p.id !== id);
    adminPromocionesService.save(filtered);
  },
};

// Servicio genérico para productos
function createProductService<T extends AdminProduct>(
  storageKey: string,
  defaultData: any[],
  categoria: string
) {
  const service = {
    getAll: (): AdminProduct[] => {
      const stored = getStoredData<AdminProduct>(storageKey, []);
      if (stored.length > 0) {
        return stored;
      }
      // Convertir datos originales agregando id y categoria
      return defaultData.map((item, index) => ({
        ...item,
        id: `${categoria.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        categoria,
        precio: item.precio || 0,
      })) as AdminProduct[];
    },

    save: (products: AdminProduct[]): void => {
      saveData(storageKey, products);
    },

    add: (product: AdminProduct): void => {
      const all = service.getAll();
      const newProduct: AdminProduct = {
        ...product,
        id: `${categoria.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        categoria,
      };
      all.push(newProduct);
      service.save(all);
    },

    update: (id: string, updates: Partial<AdminProduct>): void => {
      const all = service.getAll();
      const index = all.findIndex(p => p.id === id);
      if (index !== -1) {
        all[index] = { ...all[index], ...updates };
        service.save(all);
      }
    },

    delete: (id: string): void => {
      const all = service.getAll();
      const filtered = all.filter(p => p.id !== id);
      service.save(filtered);
    },
  };
  return service;
}

// Servicios específicos por categoría
export const adminEmpanadasService = createProductService(
  STORAGE_KEYS.EMPANADAS,
  empanadas as AdminProduct[],
  'Empanadas'
);

export const adminPizzasService = createProductService(
  STORAGE_KEYS.PIZZAS,
  pizzas as AdminProduct[],
  'Pizzas'
);

export const adminPizzasIndiService = createProductService(
  STORAGE_KEYS.PIZZAS_INDI,
  pizzasIndi as AdminProduct[],
  'Pizzas INDI'
);

export const adminFitzzasService = createProductService(
  STORAGE_KEYS.FITZZAS,
  fitzzas as AdminProduct[],
  'Fitzzas'
);

export const adminSalsasService = createProductService(
  STORAGE_KEYS.SALSAS,
  salsas as AdminProduct[],
  'Salsas'
);

export const adminPostresService = createProductService(
  STORAGE_KEYS.POSTRES,
  postres as AdminProduct[],
  'Postres'
);

// Función helper para obtener el servicio según la categoría
export function getProductService(categoria: string) {
  switch (categoria) {
    case 'Empanadas':
      return adminEmpanadasService;
    case 'Pizzas':
      return adminPizzasService;
    case 'Pizzas INDI':
      return adminPizzasIndiService;
    case 'Fitzzas':
      return adminFitzzasService;
    case 'Salsas':
      return adminSalsasService;
    case 'Postres':
      return adminPostresService;
    default:
      return adminEmpanadasService;
  }
}
