// src/data/pizzasIndis.ts

export interface PizzaIndi {
  imagen: string;
  titulo: string;
  descripcion: string;
}

export const pizzasIndis: PizzaIndi[] = [
  {
    imagen: "https://example.com/imagen-pizza-jamon-crudo.jpg",
    titulo: "Jamon crudo, rucula y stracciatella",
    descripcion: "Muzza, jamon crudo, rucula, stracciatella con aceite de oliva y pimienta negra con un toque de manteca de ajo en los bordes."
  },
  {
    imagen: "https://example.com/imagen-pizza-burger.jpg",
    titulo: "Burger",
    descripcion: "Muzza con blend de ojo de bife y vaco decorado con salsa tasty, cheddar y ketchup con un leve toque de manteca de ajo en los bordes."
  },
  {
    imagen: "https://example.com/imagen-pizza-mortadela.jpg",
    titulo: "Mortadela, pistacho y stracciatella",
    descripcion: "Muzza, stracciatella di bufala y gruyere con fetas de mortadela con pistacho, pesto de la casa con un toque de manteca de ajo en los bordes."
  },
  {
    imagen: "https://example.com/imagen-pizza-pepperoni.jpg",
    titulo: "Pepperoni",
    descripcion: "Muzza con rodajas de pepperoni con un toque de manteca de ajo en los bordes."
  },
  {
    imagen: "https://example.com/imagen-pizza-jamon-morron.jpg",
    titulo: "Jamon y morron",
    descripcion: "Muzza fetas de jamon cocido y morron asado con un toque de manteca de ajo en los bordes."
  },
  {
    imagen: "https://example.com/imagen-pizza-muzza.jpg",
    titulo: "Muzza",
    descripcion: "Muzza con salsa de tomate y un leve toque de manteca de ajo en los bordes."
  },
  {
    imagen: "https://example.com/imagen-pizza-napolitana.jpg",
    titulo: "Napolitana",
    descripcion: "Muzza con rodajas de tomate fresco, topping de salsa casera de provenzal y leve toque de manteca de ajo en los bordes."
  }
];
