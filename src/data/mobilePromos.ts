export interface MobilePromoSlide {
  id: string;
  image: string; // desktop image
  href?: string;
  title?: string;
  productName?: string;
  price?: string;
}

// Placeholder: reemplazar imágenes cuando las tengas listas
// Usamos sliders de la home para las destacadas (desktop en card)
export const promosDestacadas: MobilePromoSlide[] = [
  { id: 'd0', image: '/images/sliders/SLIDER 2000X1125 copia.jpg' },
  { id: 'd2', image: '/images/sliders/desktop2.jpg' },
  { id: 'd3', image: '/images/sliders/desktop3.jpg' },
  { id: 'd1', image: '/images/sliders/Generico.jpg' }, // antes era desktop1.jpg
];

export const combosImperdibles: MobilePromoSlide[] = [
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


