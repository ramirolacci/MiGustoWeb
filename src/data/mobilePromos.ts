export interface MobilePromoSlide {
  id: string;
  image: string; // desktop image
  href?: string;
  title?: string;
}

// Placeholder: reemplazar imágenes cuando las tengas listas
// Usamos sliders de la home para las destacadas (desktop en card)
export const promosDestacadas: MobilePromoSlide[] = [
  { id: 'd2', image: '/images/sliders/desktop2.jpg' },
  { id: 'd3', image: '/images/sliders/desktop3.jpg' },
  { id: 'd1', image: '/images/sliders/desktop1.jpg' },
];

export const combosImperdibles: MobilePromoSlide[] = [
  { id: 'i1', image: 'https://i.postimg.cc/JhGSfFLS/pack-6.jpg', title: 'Pack 6' },
  { id: 'i2', image: 'https://i.postimg.cc/2j2FWSvx/promo-sugerida.jpg', title: 'Promo Sugerida' },
  { id: 'i3', image: 'https://i.postimg.cc/43ghMDtj/pack-18.jpg', title: 'Pack 18' },
  { id: 'i4', image: 'https://i.postimg.cc/3rvY4dzm/pack-3.jpg', title: 'Pack 3' },
  { id: 'i5', image: 'https://i.postimg.cc/gJBjYQXW/promo-ideal.jpg', title: 'Promo Ideal' },
];


