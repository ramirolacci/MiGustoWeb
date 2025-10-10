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
  { id: 'i1', image: '/images/promotions/Miniaturas promos 2025-04.jpg', title: 'Promos 2025-04' },
  { id: 'i2', image: '/images/promotions/Miniaturas promos 2025-05.jpg', title: 'Promos 2025-05' },
  { id: 'i3', image: '/images/promotions/Miniaturas promos 2025-07.jpg', title: 'Promos 2025-07' },
];


