// src/data/empanadasData.ts

export interface Empanada {
  imagen: string;
  titulo: string;
  descripcion: string;
  esRecomendado?: boolean;
  esVegetariano?: boolean;
  esSinGluten?: boolean;
  esPremium?: boolean;
}

export const empanadas: Empanada[] = [
  {
    imagen: "https://i.postimg.cc/66dSFkR1/empanada-mexican-pibil-pork.jpg",
    titulo: "Mexican Pibil pork",
    descripcion: "Carne de cerdo marinada en achiote y naranja agria, con cebolla morada y cilantro.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/VLK78mN4/4cac9474-cd35-41f1-a8d9-8e0b2b9ffe86.jpg",
    titulo: "Mexican Veggie",
    descripcion: "Mezcla de vegetales salteados con especias mexicanas, maíz y frijoles negros.",
    esVegetariano: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/zXCf9vzK/burger.png",
    titulo: "Big Burguer",
    descripcion: "Hamburguesa de carne, queso cheddar, panceta, cebolla caramelizada y salsa especial.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/bYQTF0tT/cheese-burguer.png",
    titulo: "Cheese Burguer",
    descripcion: "Hamburguesa de carne con queso cheddar, cebolla y salsa especial.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/4xM2TfNb/Matambre-a-la-pizza.png",
    titulo: "Matambre a la pizza",
    descripcion: "Matambre relleno con salsa de tomate, mozzarella y orégano.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/L5GFXrzr/VACIO-Y-PROVOLETA.png",
    titulo: "Vacio y provoleta",
    descripcion: "Vacio tierno con queso provolone fundido y chimichurri.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://http2.mlstatic.com/D_657313-MLA81773035442_012025-O.jpg",
    titulo: "Jamon y queso",
    descripcion: "Clásica combinación de jamón cocido y queso mozzarella.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/d3WqnkmK/AMERICAN.png",
    titulo: "American Chicken",
    descripcion: "Pollo con salsa barbacoa, cebolla caramelizada y queso cheddar.",
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/3rZBTPXq/jamon-y-huevo.png",
    titulo: "Jamon, huevo y queso",
    descripcion: "Jamón cocido, huevo duro y queso mozzarella.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/fLCSdvyz/Carne-picante.png",
    titulo: "Carne picante",
    descripcion: "Carne picada con cebolla, huevo y ají picante.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/MHHWPC0L/con-aceitunas.png",
    titulo: "Carne con aceituna",
    descripcion: "Carne picada con cebolla, huevo y aceitunas verdes.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/d12LYjrR/Carne-a-cuchillo.png",
    titulo: "Carne a cuchillo",
    descripcion: "Carne cortada a cuchillo con cebolla, huevo y especias.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/NMjmpnW9/Carne-Suave.png",
    titulo: "Carne Suave",
    descripcion: "Carne picada con cebolla y huevo, sin picante.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/1XtxRybm/Cebolla.png",
    titulo: "Queso y Cebolla",
    descripcion: "Queso mozzarella con cebolla caramelizada.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://http2.mlstatic.com/D_612355-MLA81772829538_012025-O.jpg",
    titulo: "Roquefort con jamon",
    descripcion: "Queso roquefort con jamón cocido.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/FRJDQZbH/tomate-y-albahaca.png",
    titulo: "Jamon, tomate y albahaca",
    descripcion: "Jamón cocido con tomate fresco y albahaca.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/NGS2HDk4/pollo.png",
    titulo: "Pollo",
    descripcion: "Pollo desmenuzado con cebolla y especias.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/rw1NF3W3/cuatro-quesos.png",
    titulo: "Cuatro Quesos",
    descripcion: "Mezcla de mozzarella, roquefort, provolone y queso azul.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/rmGWykxP/champi.png",
    titulo: "Pollo al champignon",
    descripcion: "Pollo con champiñones salteados y crema.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/t40x6JkM/choclo.png",
    titulo: "Choclo",
    descripcion: "Maíz cremoso con cebolla y especias.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/zGcQZVmp/verdura.png",
    titulo: "Verdura",
    descripcion: "Mezcla de verduras salteadas con huevo.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://http2.mlstatic.com/D_898239-MLA82051774899_012025-O.jpg",
    titulo: "Calabaza",
    descripcion: "Calabaza asada con cebolla caramelizada y queso.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/D08fz9NT/panceta-y-ciruela.png",
    titulo: "Panceta y Ciruela",
    descripcion: "Panceta con ciruelas pasas y cebolla caramelizada.",
    esPremium: false
  },
  {
    imagen: "https://http2.mlstatic.com/D_968876-MLA82051804859_012025-O.jpg",
    titulo: "Carne",
    descripcion: "Rellenas con carne picada, cebolla, huevo duro y especias clásicas.",
    esRecomendado: true,
    esPremium: false
  }
];
