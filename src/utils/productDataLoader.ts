// Utilidad para cargar datos de productos combinando datos originales con ediciones del admin

import { promociones as originalPromociones } from '../data/promocionesData';
import { empanadas as originalEmpanadas } from '../data/empanadasData';
import { pizzas as originalPizzas } from '../data/pizzasData';
import { pizzasIndi as originalPizzasIndi } from '../data/pizzasIndiData';
import { fitzzas as originalFitzzas } from '../data/fitzzasData';
import { salsas as originalSalsas } from '../data/salsasData';
import { postres as originalPostres } from '../data/postresData';
import {
  adminPromocionesService,
  adminEmpanadasService,
  adminPizzasService,
  adminPizzasIndiService,
  adminFitzzasService,
  adminSalsasService,
  adminPostresService,
} from '../services/adminService';

// Función helper para obtener datos (combina originales con ediciones)
export function getProductData() {
  // Intentar cargar datos editados, si no existen usar los originales
  let promocionesData: any[] = adminPromocionesService.getAll();
  if (promocionesData.length === 0 || !localStorage.getItem('admin_promociones')) {
    // Si no hay datos guardados, usar los originales y agregar precio por defecto
    promocionesData = originalPromociones.map((p, index) => ({
      id: `promo-${index}`,
      titulo: p.titulo,
      descripcion: p.descripcion,
      imagen: p.imagen,
      precio: 0,
      esRecomendado: p.esRecomendado,
    }));
  } else {
    // Convertir precios a string para compatibilidad con el componente Productos
    promocionesData = promocionesData.map(p => ({
      ...p,
      precio: typeof p.precio === 'number' ? p.precio.toString() : (p.precio || '0'),
    }));
  }

  let empanadasData: any[] = adminEmpanadasService.getAll();
  if (empanadasData.length === 0 || !localStorage.getItem('admin_empanadas')) {
    empanadasData = originalEmpanadas.map((e, index) => ({
      ...e,
      id: `empanadas-${index}`,
      categoria: 'Empanadas',
    }));
  }

  let pizzasData: any[] = adminPizzasService.getAll();
  if (pizzasData.length === 0 || !localStorage.getItem('admin_pizzas')) {
    pizzasData = originalPizzas.map((p, index) => ({
      ...p,
      id: `pizzas-${index}`,
      categoria: 'Pizzas',
    }));
  }

  let pizzasIndiData: any[] = adminPizzasIndiService.getAll();
  if (pizzasIndiData.length === 0 || !localStorage.getItem('admin_pizzas_indi')) {
    pizzasIndiData = originalPizzasIndi.map((p, index) => ({
      ...p,
      id: `pizzas-indi-${index}`,
      categoria: 'Pizzas INDI',
    }));
  }

  let fitzzasData: any[] = adminFitzzasService.getAll();
  if (fitzzasData.length === 0 || !localStorage.getItem('admin_fitzzas')) {
    fitzzasData = originalFitzzas.map((f, index) => ({
      ...f,
      id: `fitzzas-${index}`,
      categoria: 'Fitzzas',
    }));
  }

  let salsasData: any[] = adminSalsasService.getAll();
  if (salsasData.length === 0 || !localStorage.getItem('admin_salsas')) {
    salsasData = originalSalsas.map((s, index) => ({
      ...s,
      id: `salsas-${index}`,
      categoria: 'Salsas',
    }));
  }

  let postresData: any[] = adminPostresService.getAll();
  if (postresData.length === 0 || !localStorage.getItem('admin_postres')) {
    postresData = originalPostres.map((p, index) => ({
      ...p,
      id: `postres-${index}`,
      categoria: 'Postres',
    }));
  }

  return {
    promociones: promocionesData,
    empanadas: empanadasData,
    pizzas: pizzasData,
    pizzasIndi: pizzasIndiData,
    fitzzas: fitzzasData,
    salsas: salsasData,
    postres: postresData,
  };
}
