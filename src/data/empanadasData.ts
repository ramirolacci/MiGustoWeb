// src/data/empanadasData.ts

export interface Empanada {
  imagen: string;
  titulo: string;
  descripcion: string;
  esRecomendado?: boolean;
  esVegetariano?: boolean;
  esSinGluten?: boolean;
}

export const empanadas: Empanada[] = [
  {
    imagen: "https://i.postimg.cc/66dSFkR1/empanada-mexican-pibil-pork.jpg",
    titulo: "Mexican Pibil pork",
    descripcion: "Carne de cerdo marinada en achiote y naranja agria, con cebolla morada y cilantro.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/VLK78mN4/4cac9474-cd35-41f1-a8d9-8e0b2b9ffe86.jpg",
    titulo: "Mexican Veggie",
    descripcion: "Mezcla de vegetales salteados con especias mexicanas, maíz y frijoles negros.",
    esVegetariano: true
  },
  {
    imagen: "https://i.postimg.cc/zXCf9vzK/burger.png",
    titulo: "Big Burguer",
    descripcion: "Hamburguesa de carne, queso cheddar, panceta, cebolla caramelizada y salsa especial.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/bYQTF0tT/cheese-burguer.png",
    titulo: "Cheese Burguer",
    descripcion: "Hamburguesa de carne con queso cheddar, cebolla y salsa especial.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/4xM2TfNb/Matambre-a-la-pizza.png",
    titulo: "Matambre a la pizza",
    descripcion: "Matambre relleno con salsa de tomate, mozzarella y orégano.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/L5GFXrzr/VACIO-Y-PROVOLETA.png",
    titulo: "Vacio y provoleta",
    descripcion: "Vacio tierno con queso provolone fundido y chimichurri.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/fyWNFt0W/Jamon-y-queso.png",
    titulo: "Jamon y queso",
    descripcion: "Clásica combinación de jamón cocido y queso mozzarella."
  },
  {
    imagen: "https://i.postimg.cc/d3WqnkmK/AMERICAN.png",
    titulo: "American Chicken",
    descripcion: "Pollo con salsa barbacoa, cebolla caramelizada y queso cheddar."
  },
  {
    imagen: "https://i.postimg.cc/3rZBTPXq/jamon-y-huevo.png",
    titulo: "Jamon, huevo y queso",
    descripcion: "Jamón cocido, huevo duro y queso mozzarella."
  },
  {
    imagen: "https://i.postimg.cc/fLCSdvyz/Carne-picante.png",
    titulo: "Carne picante",
    descripcion: "Carne picada con cebolla, huevo y ají picante."
  },
  {
    imagen: "https://i.postimg.cc/MHHWPC0L/con-aceitunas.png",
    titulo: "Carne con aceituna",
    descripcion: "Carne picada con cebolla, huevo y aceitunas verdes."
  },
  {
    imagen: "https://i.postimg.cc/d12LYjrR/Carne-a-cuchillo.png",
    titulo: "Carne a cuchillo",
    descripcion: "Carne cortada a cuchillo con cebolla, huevo y especias."
  },
  {
    imagen: "https://i.postimg.cc/NMjmpnW9/Carne-Suave.png",
    titulo: "Carne Suave",
    descripcion: "Carne picada con cebolla y huevo, sin picante."
  },
  {
    imagen: "https://i.postimg.cc/1XtxRybm/Cebolla.png",
    titulo: "Queso y Cebolla",
    descripcion: "Queso mozzarella con cebolla caramelizada.",
    esVegetariano: true
  },
  {
    imagen: "https://i.postimg.cc/L5m9pQGp/Roquefort-con-jamon.png",
    titulo: "Roquefort con jamon",
    descripcion: "Queso roquefort con jamón cocido."
  },
  {
    imagen: "https://i.postimg.cc/FRJDQZbH/tomate-y-albahaca.png",
    titulo: "Jamon, tomate y albahaca",
    descripcion: "Jamón cocido con tomate fresco y albahaca."
  },
  {
    imagen: "https://i.postimg.cc/NGS2HDk4/pollo.png",
    titulo: "Pollo",
    descripcion: "Pollo desmenuzado con cebolla y especias."
  },
  {
    imagen: "https://i.postimg.cc/rw1NF3W3/cuatro-quesos.png",
    titulo: "Cuatro Quesos",
    descripcion: "Mezcla de mozzarella, roquefort, provolone y queso azul.",
    esVegetariano: true
  },
  {
    imagen: "https://i.postimg.cc/rmGWykxP/champi.png",
    titulo: "Pollo al champignon",
    descripcion: "Pollo con champiñones salteados y crema."
  },
  {
    imagen: "https://i.postimg.cc/t40x6JkM/choclo.png",
    titulo: "Choclo",
    descripcion: "Maíz cremoso con cebolla y especias.",
    esVegetariano: true
  },
  {
    imagen: "https://i.postimg.cc/zGcQZVmp/verdura.png",
    titulo: "Verdura",
    descripcion: "Mezcla de verduras salteadas con huevo.",
    esVegetariano: true
  },
  {
    imagen: "https://i.postimg.cc/brr5kQtn/Calabaza.png",
    titulo: "Calabaza",
    descripcion: "Calabaza asada con cebolla caramelizada y queso.",
    esVegetariano: true
  },
  {
    imagen: "https://i.postimg.cc/D08fz9NT/panceta-y-ciruela.png",
    titulo: "Panceta y Ciruela",
    descripcion: "Panceta con ciruelas pasas y cebolla caramelizada."
  }
];
