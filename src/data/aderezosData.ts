// src/data/aderezosData.ts

export interface Aderezo {
  imagen: string;
  titulo: string;
  descripcion: string;
  esRecomendado?: boolean;
  esVegetariano?: boolean;
  esSinGluten?: boolean;
}

export const aderezos: Aderezo[] = [
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/277508f2-8f8a-4c0f-9a16-c71309953644.jpg",
    titulo: "Crema de Ajo",
    descripcion: "Salsa cremosa con sabor a ajo, perfecta para acompañar pizzas y empanadas."
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/1b065882-3cbc-491c-a3e8-b4ab16c6e598.jpg",
    titulo: "American Ketchup",
    descripcion: "Ketchup estilo americano, dulce y espeso.",
    esRecomendado: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/610bef95-d2d3-444c-a9a3-78a0d740ff10.jpg",
    titulo: "BBQ",
    descripcion: "Salsa BBQ ahumada con un toque dulce y picante."
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/40ee8691-1694-422a-92c8-79ccc4e663cd.jpg",
    titulo: "Cheddar",
    descripcion: "Salsa cremosa de queso cheddar, ideal para sumergir.",
    esRecomendado: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/6a472c7c-4141-4f5c-8a45-97a8e7465add.jpg",
    titulo: "Chimichurri",
    descripcion: "Salsa tradicional argentina con perejil, ajo y aceite de oliva.",
    esRecomendado: true 
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/e5a56b70-9292-4f24-99c4-3893a8ff6aab.jpg",
    titulo: "Criolla",
    descripcion: "Salsa criolla con cebolla, tomate y pimiento."
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/4853c02b-2c3d-437c-bbae-473a43adc62c.jpg",
    titulo: "Crema Ácida",
    descripcion: "Crema ácida suave y refrescante."
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/07d606fd-89a9-429c-ae3b-2be74aa68027.jpg",
    titulo: "Guacamole",
    descripcion: "Puré de aguacate con limón y especias.",
    esRecomendado: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/22a78616-f748-4c97-8591-47a8006bc59b.jpg",
    titulo: "Picante",
    descripcion: "Salsa picante con un toque de chile."
  }
];
