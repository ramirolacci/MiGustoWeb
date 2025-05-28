// src/data/empanadasIndis.ts

export interface Empanada {
  imagen: string;
  titulo: string;
  descripcion: string;
}

export const empanadas: Empanada[] = [
  {
    imagen: "https://example.com/imagen-empanada-carne.jpg",
    titulo: "Carne",
    descripcion: "Rellenas con carne picada, cebolla, huevo duro y especias clásicas."
  },
  {
    imagen: "https://example.com/imagen-empanada-jamon-queso.jpg",
    titulo: "Jamón y Queso",
    descripcion: "Deliciosa mezcla de jamón cocido y queso derretido."
  },
  {
    imagen: "https://example.com/imagen-empanada-pollo.jpg",
    titulo: "Pollo",
    descripcion: "Rellenas con pollo desmenuzado, cebolla y condimentos suaves."
  },
  {
    imagen: "https://example.com/imagen-empanada-caprese.jpg",
    titulo: "Caprese",
    descripcion: "Mozzarella, tomate y albahaca fresca para un sabor italiano."
  },
  {
    imagen: "https://example.com/imagen-empanada-queso.jpg",
    titulo: "Queso",
    descripcion: "Clásicas empanadas rellenas con queso mozzarella fundido."
  },
  {
    imagen: "https://example.com/imagen-empanada-humana.jpg",
    titulo: "Humita",
    descripcion: "Dulce mezcla de maíz, cebolla y salsa blanca cremosa."
  }
];
