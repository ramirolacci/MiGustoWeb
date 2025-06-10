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
    imagen: "https://i.postimg.cc/TYSrn4mW/INDI-Rucula.jpg",
    titulo: "Jamón Crudo, Rúcula y Stracciatella INDI",
    descripcion: "Pizza individual con jamón crudo, rúcula fresca y stracciatella.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/TYP9Vb4B/Indi-Mortadela.jpg",
    titulo: "Mortadela, Pistacho y Stracciatella INDI",
    descripcion: "Pizza individual con mortadela, pistachos y stracciatella.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/ydXPPyBC/Indi-Burger.jpg",
    titulo: "Burger INDI",
    descripcion: "Pizza individual con hamburguesa, queso cheddar, cebolla caramelizada y salsa especial.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/7PK1Z6Z9/INDI-Pepperonni.jpg",
    titulo: "Pepperoni INDI",
    descripcion: "Pizza individual con pepperoni y queso mozzarella."
  },
  {
    imagen: "https://i.postimg.cc/kMssRsfx/INDI-Jamon-y-morrones.jpg",
    titulo: "Jamón y Morrón INDI",
    descripcion: "Pizza individual con jamón cocido y morrones asados."
  },
  {
    imagen: "https://i.postimg.cc/63wVy4Zj/INDI-Napo.jpg",
    titulo: "Napolitana INDI",
    descripcion: "Pizza individual con rodajas de tomate fresco y topping de salsa casera de provenzal."
  },
  {
    imagen: "https://i.postimg.cc/P5gQnR5k/INDI-Muzza.jpg",
    titulo: "Muzza INDI",
    descripcion: "Pizza individual de mozzarella con salsa de tomate casera artesanal."
  }
];
