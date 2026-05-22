import { assetUrl } from '../utils/assetUrl';
// Servicio para gestionar sliders del home y promociones móviles

const STORAGE_KEYS = {
  SLIDES_DESKTOP: 'admin_slides_desktop',
  SLIDES_MOBILE: 'admin_slides_mobile',
  PROMOS_DESTACADAS: 'admin_promos_destacadas',
  COMBOS_IMPERDIBLES: 'admin_combos_imperdibles',
};

export interface SliderImage {
  id: string;
  image: string;
  order?: number;
}

export interface MobilePromoSlide {
  id: string;
  image: string;
  href?: string;
  title?: string;
  productName?: string;
  price?: string;
}

// Slides del home (desktop y mobile)
const defaultSlidesDesktop = [
  assetUrl('/images/sliders/SLIDER 2000X1125 copia.jpg'),
  assetUrl('/images/sliders/Generico.jpg'),
  assetUrl('/images/sliders/desktop2.jpg'),
  assetUrl('/images/sliders/desktop3.jpg'),
];

const defaultSlidesMobile = defaultSlidesDesktop;

// Promociones destacadas y combos imperdibles
const defaultPromosDestacadas: MobilePromoSlide[] = [
  { id: 'd0', image: assetUrl('/images/sliders/SLIDER 2000X1125 copia.jpg') },
  { id: 'd2', image: assetUrl('/images/sliders/desktop2.jpg') },
  { id: 'd3', image: assetUrl('/images/sliders/desktop3.jpg') },
  { id: 'd1', image: assetUrl('/images/sliders/Generico.jpg') },
];

const defaultCombosImperdibles: MobilePromoSlide[] = [
  {
    id: 'i1',
    image: 'https://i.postimg.cc/JhGSfFLS/pack-6.jpg',
    title: 'Pack 6',
    productName: 'Pack 6 Empanadas',
    price: '$22.000'
  },
  {
    id: 'i2',
    image: 'https://i.postimg.cc/2j2FWSvx/promo-sugerida.jpg',
    title: 'Promo Sugerida',
    productName: 'Promo Sugerida',
    price: '$14.000'
  },
  {
    id: 'i3',
    image: 'https://i.postimg.cc/43ghMDtj/pack-18.jpg',
    title: 'Pack 18',
    productName: 'Pack 18 Empanadas',
    price: '$61.000'
  },
  {
    id: 'i4',
    image: 'https://i.postimg.cc/3rvY4dzm/pack-3.jpg',
    title: 'Pack 3',
    productName: 'Pack 3 Empanadas',
    price: '$11.000'
  },
  {
    id: 'i5',
    image: 'https://i.postimg.cc/tCB0NkX6/7d4309d1-cba5-4b39-bb4e-75711a4d1526.jpg',
    title: 'Promo Ideal',
    productName: 'Combo Ideal',
    price: '$12.000'
  },
];

function getStoredData<T>(storageKey: string, defaultData: T): T {
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

function saveData<T>(storageKey: string, data: T): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${storageKey}:`, error);
  }
}

// Servicio para slides del home
export const sliderService = {
  getDesktopSlides: (): string[] => {
    const stored = getStoredData<string[]>(STORAGE_KEYS.SLIDES_DESKTOP, []);
    return stored.length > 0 ? stored : defaultSlidesDesktop;
  },

  saveDesktopSlides: (slides: string[]): void => {
    saveData(STORAGE_KEYS.SLIDES_DESKTOP, slides);
  },

  getMobileSlides: (): string[] => {
    const stored = getStoredData<string[]>(STORAGE_KEYS.SLIDES_MOBILE, []);
    return stored.length > 0 ? stored : defaultSlidesMobile;
  },

  saveMobileSlides: (slides: string[]): void => {
    saveData(STORAGE_KEYS.SLIDES_MOBILE, slides);
  },
};

// Servicio para promociones destacadas
export const promosDestacadasService = {
  getAll: (): MobilePromoSlide[] => {
    const stored = getStoredData<MobilePromoSlide[]>(STORAGE_KEYS.PROMOS_DESTACADAS, []);
    return stored.length > 0 ? stored : defaultPromosDestacadas;
  },

  save: (promos: MobilePromoSlide[]): void => {
    saveData(STORAGE_KEYS.PROMOS_DESTACADAS, promos);
  },

  add: (promo: MobilePromoSlide): void => {
    const all = promosDestacadasService.getAll();
    const newPromo = {
      ...promo,
      id: promo.id || `promo-${Date.now()}`,
    };
    all.push(newPromo);
    promosDestacadasService.save(all);
  },

  update: (id: string, updates: Partial<MobilePromoSlide>): void => {
    const all = promosDestacadasService.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      promosDestacadasService.save(all);
    }
  },

  delete: (id: string): void => {
    const all = promosDestacadasService.getAll();
    const filtered = all.filter(p => p.id !== id);
    promosDestacadasService.save(filtered);
  },
};

// Servicio para combos imperdibles
export const combosImperdiblesService = {
  getAll: (): MobilePromoSlide[] => {
    const stored = getStoredData<MobilePromoSlide[]>(STORAGE_KEYS.COMBOS_IMPERDIBLES, []);
    return stored.length > 0 ? stored : defaultCombosImperdibles;
  },

  save: (combos: MobilePromoSlide[]): void => {
    saveData(STORAGE_KEYS.COMBOS_IMPERDIBLES, combos);
  },

  add: (combo: MobilePromoSlide): void => {
    const all = combosImperdiblesService.getAll();
    const newCombo = {
      ...combo,
      id: combo.id || `combo-${Date.now()}`,
    };
    all.push(newCombo);
    combosImperdiblesService.save(all);
  },

  update: (id: string, updates: Partial<MobilePromoSlide>): void => {
    const all = combosImperdiblesService.getAll();
    const index = all.findIndex(c => c.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      combosImperdiblesService.save(all);
    }
  },

  delete: (id: string): void => {
    const all = combosImperdiblesService.getAll();
    const filtered = all.filter(c => c.id !== id);
    combosImperdiblesService.save(filtered);
  },
};
