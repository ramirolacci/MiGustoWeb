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
    imagen: "https://http2.mlstatic.com/D_865566-MLA81824729602_012025-O.jpg",
    titulo: "Big Burguer",
    descripcion: "Hamburguesa de carne, queso cheddar, panceta, cebolla caramelizada y salsa especial.",
    esRecomendado: true
  },
  {
    imagen: "https://http2.mlstatic.com/D_708722-MLA81772680988_012025-O.jpg",
    titulo: "Cheese Burguer",
    descripcion: "Hamburguesa de carne con queso cheddar, cebolla y salsa especial.",
    esRecomendado: true
  },
  {
    imagen: "https://i.postimg.cc/pLNHKfDg/0a6315c4-600e-4091-808f-565ff5906571.jpg",
    titulo: "Matambre a la pizza",
    descripcion: "Matambre relleno con salsa de tomate, mozzarella y orégano.",
    esRecomendado: true
  },
  {
    imagen: "https://http2.mlstatic.com/D_690001-MLA82051607857_012025-O.jpg",
    titulo: "Vacio y provoleta",
    descripcion: "Vacio tierno con queso provolone fundido y chimichurri.",
    esRecomendado: true
  },
  {
    imagen: "https://http2.mlstatic.com/D_657313-MLA81773035442_012025-O.jpg",
    titulo: "Jamon y queso",
    descripcion: "Clásica combinación de jamón cocido y queso mozzarella."
  },
  {
    imagen: "https://http2.mlstatic.com/D_837617-MLA81772889380_012025-O.jpg",
    titulo: "American Chicken",
    descripcion: "Pollo con salsa barbacoa, cebolla caramelizada y queso cheddar."
  },
  {
    imagen: "https://i.postimg.cc/TYdkFpTp/empanada-jamon-queso-huevo.jpg",
    titulo: "Jamon, huevo y queso",
    descripcion: "Jamón cocido, huevo duro y queso mozzarella."
  },
  {
    imagen: "https://http2.mlstatic.com/D_968876-MLA82051804859_012025-O.jpg",
    titulo: "Carne picante",
    descripcion: "Carne picada con cebolla, huevo y ají picante."
  },
  {
    imagen: "https://http2.mlstatic.com/D_637227-MLA81772799854_012025-O.jpg",
    titulo: "Carne con aceituna",
    descripcion: "Carne picada con cebolla, huevo y aceitunas verdes."
  },
  {
    imagen: "https://http2.mlstatic.com/D_846733-MLA81772829870_012025-O.jpg",
    titulo: "Carne al cuchillo",
    descripcion: "Carne cortada a cuchillo con cebolla, huevo y especias."
  },
  {
    imagen: "https://http2.mlstatic.com/D_869289-MLA81772680822_012025-O.jpg",
    titulo: "Carne Suave",
    descripcion: "Carne picada con cebolla y huevo, sin picante."
  },
  {
    imagen: "https://http2.mlstatic.com/D_676600-MLA82051597547_012025-O.jpg",
    titulo: "Queso y Cebolla",
    descripcion: "Queso mozzarella con cebolla caramelizada.",
    esVegetariano: true
  },
  {
    imagen: "https://http2.mlstatic.com/D_612355-MLA81772829538_012025-O.jpg",
    titulo: "Roquefort con jamon",
    descripcion: "Queso roquefort con jamón cocido."
  },
  {
    imagen: "https://http2.mlstatic.com/D_822465-MLA81772829454_012025-O.jpg",
    titulo: "Jamon, tomate y albahaca",
    descripcion: "Jamón cocido con tomate fresco y albahaca."
  },
  {
    imagen: "https://http2.mlstatic.com/D_672831-MLA81772690602_012025-O.jpg",
    titulo: "Pollo",
    descripcion: "Pollo desmenuzado con cebolla y especias."
  },
  {
    imagen: "https://http2.mlstatic.com/D_674941-MLA81772829782_012025-O.jpg",
    titulo: "Cuatro Quesos",
    descripcion: "Mezcla de mozzarella, roquefort, provolone y queso azul.",
    esVegetariano: true
  },
  {
    imagen: "https://http2.mlstatic.com/D_899043-MLA81772759720_012025-O.jpg",
    titulo: "Pollo al champignon",
    descripcion: "Pollo con champiñones salteados y crema."
  },
  {
    imagen: "https://http2.mlstatic.com/D_925394-MLA82051764975_012025-O.jpg",
    titulo: "Choclo",
    descripcion: "Maíz cremoso con cebolla y especias.",
    esVegetariano: true
  },
  {
    imagen: "https://http2.mlstatic.com/D_639159-MLA81773035660_012025-O.jpg",
    titulo: "Verdura",
    descripcion: "Mezcla de verduras salteadas con huevo.",
    esVegetariano: true
  },
  {
    imagen: "https://http2.mlstatic.com/D_898239-MLA82051774899_012025-O.jpg",
    titulo: "Calabaza",
    descripcion: "Calabaza asada con cebolla caramelizada y queso.",
    esVegetariano: true
  },
  {
    imagen: "https://http2.mlstatic.com/D_669370-MLA81772690672_012025-O.jpg",
    titulo: "Panceta y Ciruela",
    descripcion: "Panceta con ciruelas pasas y cebolla caramelizada."
  }
];
