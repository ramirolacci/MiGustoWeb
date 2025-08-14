// src/data/pizzasIndiData.ts

export interface PizzaIndi {
  imagen: string;
  titulo: string;
  descripcion: string;
  esRecomendado?: boolean;
  esVegetariano?: boolean;
  esSinGluten?: boolean;
}

export const pizzasIndi: PizzaIndi[] = [
  {
    imagen: "https://i.postimg.cc/T3Szw1qx/INDI-Rucula-Photoroom.png",
    titulo: "Jamón crudo, rúcula y stracciatella INDI",
    descripcion: "Pizza individual con jamón crudo, rúcula fresca y stracciatella.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/j5kP0VYM/Indi-Mortadela-Photoroom.png",
    titulo: "Mortadela, pistacho y stracciatella INDI",
    descripcion: "Pizza individual con mortadela, pistachos y stracciatella.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/BZPG1dns/INDI-Pepperonni-Photoroom.png",
    titulo: "Pepperoni INDI",
    descripcion: "Pizza individual con pepperoni y queso mozzarella."
  },
  {
    imagen: "https://i.postimg.cc/y6DS3YRd/INDI-Jamon-y-morrones-Photoroom.png",
    titulo: "Jamón y morrón INDI",
    descripcion: "Pizza individual con jamón cocido y morrones asados."
  },
  {
    imagen: "https://i.postimg.cc/HkvgMHXY/INDI-Napo-Photoroom.png",
    titulo: "Napolitana INDI",
    descripcion: "Pizza individual con rodajas de tomate fresco y topping de salsa casera de provenzal."
  },
  {
    imagen: "https://i.postimg.cc/sgkTqNRP/INDI-Muzza-Photoroom.png",
    titulo: "Muzza INDI",
    descripcion: "Pizza individual de mozzarella con salsa de tomate casera artesanal."
  }
];
