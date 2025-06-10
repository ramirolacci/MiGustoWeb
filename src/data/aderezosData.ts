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
    imagen: "https://i.postimg.cc/VsBz44M9/Crema-de-Ajo.png",
    titulo: "Crema de Ajo",
    descripcion: "Salsa cremosa con sabor a ajo, perfecta para acompañar pizzas y empanadas."
  },
  {
    imagen: "https://i.postimg.cc/JzwVLkb7/American-Ketchup.png",
    titulo: "American Ketchup",
    descripcion: "Ketchup estilo americano, dulce y espeso.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/HL2fXvFj/BBQ.png",
    titulo: "BBQ",
    descripcion: "Salsa BBQ ahumada con un toque dulce y picante."
  },
  {
    imagen: "https://i.postimg.cc/XNhtfC1K/Cheddar.png",
    titulo: "Cheddar",
    descripcion: "Salsa cremosa de queso cheddar, ideal para sumergir.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/7YjGrmsC/Chimichurri.png",
    titulo: "Chimichurri",
    descripcion: "Salsa tradicional argentina con perejil, ajo y aceite de oliva.",
    esRecomendado: true 
  },
  {
    imagen: "https://i.postimg.cc/qvfR5gqy/Criolla.png",
    titulo: "Criolla",
    descripcion: "Salsa criolla con cebolla, tomate y pimiento."
  },
  {
    imagen: "https://i.postimg.cc/VsBz44M9/Crema-de-Ajo.png",
    titulo: "Crema Ácida",
    descripcion: "Crema ácida suave y refrescante."
  },
  {
    imagen: "https://i.postimg.cc/LXs611QK/Guacamole.png",
    titulo: "Guacamole",
    descripcion: "Puré de aguacate con limón y especias.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/CL8MkY71/Picante.png",
    titulo: "Picante",
    descripcion: "Salsa picante con un toque de chile."
  }
];
