// src/data/empanadasData.ts

export interface Empanada {
  imagen: string;
  imagenDetalle?: string;
  titulo: string;
  precio?: number;
  descripcion: string;
  esRecomendado?: boolean;
  esVegetariano?: boolean;
  esSinGluten?: boolean;
  esPremium?: boolean;
}

export const empanadas: Empanada[] = [
  {
    imagen: "https://i.postimg.cc/66dSFkR1/empanada-mexican-pibil-pork.jpg",
    imagenDetalle: "https://i.postimg.cc/hGWzWcVs/Mexican-Pibil-Pork.png",
    titulo: "Mexican Pibil pork",
    precio: 4000,
    descripcion: "Carne de cerdo marinada en achiote y naranja agria, con cebolla morada y cilantro.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/VLK78mN4/4cac9474-cd35-41f1-a8d9-8e0b2b9ffe86.jpg",
    imagenDetalle: "https://i.postimg.cc/26x2LHzp/Mexican-Veggie.png",
    titulo: "Mexican Veggie",
    precio: 4000,
    descripcion: "Mezcla de vegetales salteados con especias mexicanas, maíz y frijoles negros.",
    esVegetariano: true,
    esPremium: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/9a2d8724-46bc-4cde-915f-c958c8e25ef4.jpg",
    imagenDetalle: "https://i.postimg.cc/9FTt4mc3/burger.png",
    titulo: "Big Burguer",
    precio: 4000,
    descripcion: "Hamburguesa de carne, queso cheddar, panceta, cebolla caramelizada y salsa especial.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/3a48db8e-4dcd-476c-aa07-2a4503c637e1.jpg",
    imagenDetalle: "https://i.postimg.cc/9Ftb8mKd/cheese-burguer.png",
    titulo: "Cheese Burguer",
    precio: 4000,  
    descripcion: "Hamburguesa de carne con queso cheddar, cebolla y salsa especial.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/0a6315c4-600e-4091-808f-565ff5906571.jpg",
    imagenDetalle: "https://i.postimg.cc/sXTmjwPT/Matambre-a-la-pizza.png",
    titulo: "Matambre a la pizza",
    precio: 4000,
    descripcion: "Matambre relleno con salsa de tomate, mozzarella y orégano.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/caaf75a1-068c-48f6-8abc-7f5be9f04e7c.jpg",
    imagenDetalle: "https://i.postimg.cc/Dz32yH1f/VACIO-Y-PROVOLETA.png",
    titulo: "Vacio y provoleta",
    precio: 4000,
    descripcion: "Vacio tierno con queso provolone fundido y chimichurri.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/1d3edfbd-33ae-4928-b656-bec8433d486d.jpg",
    imagenDetalle: "https://i.postimg.cc/bv0qGgRx/AMERICAN.png",
    titulo: "American Chicken",
    precio: 4000,
    descripcion: "Pollo con salsa barbacoa, cebolla caramelizada y queso cheddar.",
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/fyWNFt0W/Jamon-y-queso.png",
    titulo: "Jamon y queso",
    precio: 3700,
    descripcion: "Clásica combinación de jamón cocido y queso mozzarella.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/3rZBTPXq/jamon-y-huevo.png",
    titulo: "Jamon, huevo y queso",
    precio: 3700,
    descripcion: "Jamón cocido, huevo duro y queso mozzarella.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/fLCSdvyz/Carne-picante.png",
    titulo: "Carne picante",
    precio: 3700,
    descripcion: "Carne picada con cebolla, huevo y ají picante.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/MHHWPC0L/con-aceitunas.png",
    titulo: "Carne con aceituna",
    precio: 3700,
    descripcion: "Carne picada con cebolla, huevo y aceitunas verdes.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/d12LYjrR/Carne-a-cuchillo.png",
    titulo: "Carne a cuchillo",
    precio: 3700,
    descripcion: "Carne cortada a cuchillo con cebolla, huevo y especias.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/NMjmpnW9/Carne-Suave.png",
    titulo: "Carne Suave",
    precio: 3700,
    descripcion: "Carne picada con cebolla y huevo, sin picante.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/1XtxRybm/Cebolla.png",
    titulo: "Queso y Cebolla",
    precio: 3700,
    descripcion: "Queso mozzarella con cebolla caramelizada.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/L5m9pQGp/Roquefort-con-jamon.png",
    titulo: "Roquefort con jamon",
    precio: 3700,
    descripcion: "Queso roquefort con jamón cocido.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/FRJDQZbH/tomate-y-albahaca.png",
    titulo: "Jamon, tomate y albahaca",
    precio: 3700,
    descripcion: "Jamón cocido con tomate fresco y albahaca.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/NGS2HDk4/pollo.png",
    titulo: "Pollo",
    precio: 3700,
    descripcion: "Pollo desmenuzado con cebolla y especias.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/rw1NF3W3/cuatro-quesos.png",
    titulo: "Cuatro Quesos",
    precio: 3700,
    descripcion: "Mezcla de mozzarella, roquefort, provolone y queso azul.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/rmGWykxP/champi.png",
    titulo: "Pollo al champignon",
    precio: 3700,
    descripcion: "Pollo con champiñones salteados y crema.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/t40x6JkM/choclo.png",
    titulo: "Choclo",
    precio: 3700,
    descripcion: "Maíz cremoso con cebolla y especias.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/zGcQZVmp/verdura.png",
    titulo: "Verdura",
    precio: 3700,
    descripcion: "Mezcla de verduras salteadas con huevo.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/brr5kQtn/Calabaza.png",
    titulo: "Calabaza",
    precio: 3700,
    descripcion: "Calabaza asada con cebolla caramelizada y queso.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/D08fz9NT/panceta-y-ciruela.png",
    titulo: "Panceta y Ciruela",
    precio: 3700,
    descripcion: "Panceta con ciruelas pasas y cebolla caramelizada.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/hGt9VnSD/carne.png",
    titulo: "Carne",
    precio: 3700,
    descripcion: "Rellenas con carne picada, cebolla, huevo duro y especias clásicas.",
    esRecomendado: true,
    esPremium: false
  }
];
