// src/data/pizzasIndiData.ts

export interface PizzaIndi {
  imagen: string;
  imagenCard?: string;
  titulo: string;
  descripcion: string;
  esRecomendado?: boolean;
  esVegetariano?: boolean;
  esSinGluten?: boolean;
}

export const pizzasIndi: PizzaIndi[] = [
  {
    imagen: "https://i.postimg.cc/T3Szw1qx/INDI-Rucula-Photoroom.png",
    imagenCard: "https://i.postimg.cc/4d9P4ND6/Jamon-Crudo-Rucula-y-Stracciatella-INDI.jpg",
    titulo: "Jamón crudo, rúcula y stracciatella INDI",
    descripcion: "Pizza individual con jamón crudo, rúcula fresca y stracciatella.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/j5kP0VYM/Indi-Mortadela-Photoroom.png",
    imagenCard: "https://i.postimg.cc/SxPcXb7R/Mortadela-Pistacho-y-Stracciatella-Indi.jpg",
    titulo: "Mortadela, pistacho y stracciatella INDI",
    descripcion: "Pizza individual con mortadela, pistachos y stracciatella.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/BZPG1dns/INDI-Pepperonni-Photoroom.png",
    imagenCard: "https://i.postimg.cc/xTJffrCt/Perpperoni-INDI.jpg",
    titulo: "Pepperoni INDI",
    descripcion: "Pizza individual con pepperoni y queso mozzarella."
  },
  {
    imagen: "https://i.postimg.cc/y6DS3YRd/INDI-Jamon-y-morrones-Photoroom.png",
    imagenCard: "https://i.postimg.cc/6pKpYjW0/Jamon-y-morron-INDI.jpg",
    titulo: "Jamón y morrón INDI",
    descripcion: "Pizza individual con jamón cocido y morrones asados."
  },
  {
    imagen: "https://i.postimg.cc/HkvgMHXY/INDI-Napo-Photoroom.png",
    imagenCard: "https://i.postimg.cc/Y2m2kKhp/Napolitana-INDI.jpg",
    titulo: "Napolitana INDI",
    descripcion: "Pizza individual con rodajas de tomate fresco y topping de salsa casera de provenzal."
  },
  {
    imagen: "https://i.postimg.cc/sgkTqNRP/INDI-Muzza-Photoroom.png",
    imagenCard: "https://i.postimg.cc/287D8zYh/Muzza-Indi.jpg",
    titulo: "Muzza INDI",
    descripcion: "Pizza individual de mozzarella con salsa de tomate casera artesanal."
  }
];
