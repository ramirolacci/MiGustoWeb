// src/data/aderezos.ts

export interface Aderezo {
  imagen: string;
  titulo: string;
  descripcion: string;
}

export const aderezos: Aderezo[] = [
  {
    imagen: "https://i.postimg.cc/y8cPmFj4/Mesa-de-trabajo-8.png",
    titulo: "Manteca de Ajo",
    descripcion: "Un toque especial de manteca infusionada con ajo, ideal para realzar sabores."
  },
  {
    imagen: "https://example.com/imagen-tasty.jpg",
    titulo: "Salsa Tasty",
    descripcion: "Salsa cremosa y sabrosa que combina perfecto con carnes y quesos."
  },
  {
    imagen: "https://example.com/imagen-cheddar.jpg",
    titulo: "Cheddar",
    descripcion: "Queso cheddar fundido que aporta un sabor intenso y cremoso."
  },
  {
    imagen: "https://example.com/imagen-ketchup.jpg",
    titulo: "Ketchup",
    descripcion: "Clásico condimento a base de tomate para acompañar tus platos favoritos."
  },
  {
    imagen: "https://example.com/imagen-pesto.jpg",
    titulo: "Pesto de la Casa",
    descripcion: "Delicioso pesto casero con albahaca fresca, nueces y queso parmesano."
  },
  // Agrega más aderezos si querés...
];
