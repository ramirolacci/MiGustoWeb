// src/data/empanadasData.ts

export interface Empanada {
  imagen: string;
  imagenDetalle?: string;
  imagenCard?: string;
  titulo: string;
  precio?: number;
  descripcion: string;
  esRecomendado?: boolean;
  esVegetariano?: boolean;
  esSinGluten?: boolean;
  esPremium?: boolean;
  ingredientes?: string[];
}

export const empanadas: Empanada[] = [
  {
    imagen: "https://i.postimg.cc/FKpbMKyM/Miniaturas-Mexican-Pibil-pork.jpg",
    imagenDetalle: "/images/empanadas/empanada-mexican-pibil-pork.png",
    imagenCard: "https://i.postimg.cc/FKpbMKyM/Miniaturas-Mexican-Pibil-pork.jpg",
    titulo: "Mexican pibil pork",
    precio: 4700,
    descripcion: "Bondiola de cerdo de larga coccion, Achiote con porotos negros, Crema acida, Cebolla encurtida, Cilantro.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/9a2d8724-46bc-4cde-915f-c958c8e25ef4.jpg",
    imagenDetalle: "/images/empanadas/empanada-big-burger.png",
    titulo: "Big burger",
    precio: 4700,
    descripcion: "Blend de ojo de bife, Tapa de asado, Doble bacon, Cheddar, Pepinillos, Salsa Big.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/0a6315c4-600e-4091-808f-565ff5906571.jpg",
    imagenDetalle: "/images/empanadas/empanada-matambre -alapizza.png",
    titulo: "Matambre a la pizza",
    precio: 4700,
    descripcion: "Matambre tierno ahumado a leña, Muzzarella, Salsa casera de tomate, Gratinado de provolone, Salsa chimichurri.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/brRW2qqg/cheese.jpg",
    imagenDetalle: "/images/empanadas/empanada-cheese-burger.png",
    titulo: "Cheese burger",
    precio: 4700,
    descripcion: "Blend de ojo de bife y vacio, Doble bacon, Salsa bbq, Mar de cheddar.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/X77DzSVP/vacio.jpg",
    imagenDetalle: "/images/empanadas/empanada-vacio-yprovoleta.png",
    titulo: "Vacio y provoleta",
    precio: 4700,
    descripcion: "Delicioso vacio asado desmechado, Clásico chimichurri con cebolla, Morrón salteado a fuego lento, Provoleta y muzzarella seleccionada, Semolin en la tapa.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/W3v5mxWG/american.jpg",
    imagenDetalle: "/images/empanadas/empanada-american-chicken.png",
    titulo: "American chicken",
    precio: 4700,
    descripcion: "Chicken sabroso y dulce, Bacón crujiente braseado, Mar de cheddar.",
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/fyWNFt0W/Jamon-y-queso.png",
    imagenDetalle: "/images/empanadas/Jamon-y-queso.png",
    imagenCard: "https://i.postimg.cc/yYKCxRG3/jamonyqueso.jpg",
    titulo: "Jamón y queso",
    precio: 4355,
    descripcion: "Jamón cocido feteado, Abundante muzzarella seleccionada.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/ZYQn5y42/jamon-queso-y-huevo-emp.jpg",
    imagenDetalle: "https://i.postimg.cc/ZYQn5y42/jamon-queso-y-huevo-emp.jpg",
    imagenCard: "https://i.postimg.cc/ZYQn5y42/jamon-queso-y-huevo-emp.jpg",
    titulo: "Jamón, huevo y queso",
    precio: 4355,
    descripcion: "Jamón cocido en cubos, Colmado de muzzarella seleccionada, Huevo duro.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/fLCSdvyz/Carne-picante.png",
    imagenDetalle: "/images/empanadas/Carne-picante.png",
    imagenCard: "https://i.postimg.cc/VLszd07h/carnepicante.jpg",
    titulo: "Carne picante",
    precio: 4355,
    descripcion: "Corte de paleta premium, Salteado de cebolla y morrón, Verdeo y huevo duro, Especias y ají picante.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/MHHWPC0L/con-aceitunas.png",
    imagenDetalle: "/images/empanadas/con-aceitunas.png",
    imagenCard: "https://i.postimg.cc/dVkPy28V/carneyaceituna.jpg",
    titulo: "Carne con aceituna",
    precio: 4355,
    descripcion: "Corte de paleta premium, salteado de cebolla, morrón, verdeo con huevo duro, abundantes rodajas de aceitunas verdes y delicadas especias.",
    ingredientes: [
      "Corte de paleta premium",
      "Salteado de cebolla, morrón, verdeo con huevo duro",
      "Abundante rodajas de aceitunas verdes",
      "Delicadas especias"
    ],
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/d12LYjrR/Carne-a-cuchillo.png",
    imagenDetalle: "/images/empanadas/Carne-a-cuchillo.png",
    imagenCard: "https://i.postimg.cc/GpFfFq9n/cortadaacuchillo.jpg",
    titulo: "Carne a cuchillo",
    precio: 4355,
    descripcion: "Carne cuadrada premium con corte a cuchillo artesanal, Mix de morrón y huevo, Toque secreto salteño.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/NMjmpnW9/Carne-Suave.png",
    imagenDetalle: "/images/empanadas/Carne-Suave.png",
    imagenCard: "https://i.postimg.cc/qqwh2VHT/carnesuave.jpg",
    titulo: "Carne suave",
    precio: 4355,
    descripcion: "Corte de paleta premium, Salteado con cebolla y morrón, Huevo duro, Delicadas especias de nuestra tradición.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/1XtxRybm/Cebolla.png",
    imagenDetalle: "/images/empanadas/Cebolla.png",
    imagenCard: "https://i.postimg.cc/FzVcGk39/cebollayqueso.jpg",
    titulo: "Queso y cebolla",
    precio: 4355,
    descripcion: "Perfecta union muzzarella seleccionada, Salteado de cebolla, Toque de quesardo estacionado.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/L5m9pQGp/Roquefort-con-jamon.png",
    imagenDetalle: "/images/empanadas/Roquefort-con-jamon.png",
    imagenCard: "https://i.postimg.cc/wjfr07Qs/roquefortyjamon.jpg",
    titulo: "Roquefort con jamón",
    precio: 4355,
    descripcion: "Jamon cocido feteado, Intenso queso roquefort premium.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/NGS2HDk4/pollo.png",
    imagenDetalle: "/images/empanadas/pollo.png",
    imagenCard: "https://i.postimg.cc/ZRMKmbm0/pollo.jpg",
    titulo: "Pollo",
    precio: 4355,
    descripcion: "Suprema de pollo cortada en trozos a base de cebolla, morrón y salsa de especias, cocinado a fuego lento y finalizado con huevo duro.",
    ingredientes: [
      "Suprema de pollo cortada en trozos a base de cebolla",
      "Morrón y salsa de especias",
      "Cocinado a fuego lento",
      "Finalizado con huevo duro"
    ],
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/rw1NF3W3/cuatro-quesos.png",
    imagenDetalle: "/images/empanadas/cuatro-quesos.png",
    imagenCard: "https://i.postimg.cc/43rHvQ7N/cuatroquesos.jpg",
    titulo: "Cuatro quesos",
    precio: 4355,
    descripcion: "Blend de abundante queso muzzarella, quesardo seleccionado, roquefort intenso y provolone estacionado.",
    ingredientes: [
      "Blend de abundante queso muzzarella",
      "Quesardo seleccionado",
      "Roquefort intenso",
      "Provolone estacionado"
    ],
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/rmGWykxP/champi.png",
    imagenDetalle: "/images/empanadas/champi.png",
    imagenCard: "https://i.postimg.cc/50C7pgs0/polloychampignon.jpg",
    titulo: "Pollo al champignon",
    precio: 4355,
    descripcion: "Suprema de pollo cortada en trozos, cremosa salsa bechamel y champignon fresco salteado.",
    ingredientes: [
      "Suprema de pollo cortada en trozos",
      "Cremosa salsa bechamel",
      "Champignon fresco salteado"
    ],
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/t40x6JkM/choclo.png",
    imagenDetalle: "/images/empanadas/choclo.png",
    imagenCard: "https://i.postimg.cc/HLpdqJqQ/choclo.jpg",
    titulo: "Choclo",
    precio: 4355,
    descripcion: "Deliciosa mezcla de choclo entero, choclo cremoso, especias y abundante queso muzzarella.",
    ingredientes: [
      "Deliciosa mezcla de choclo entero",
      "Choclo cremoso",
      "Especias",
      "Abundante queso muzzarella"
    ],
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/zGcQZVmp/verdura.png",
    imagenDetalle: "https://i.postimg.cc/zGcQZVmp/verdura.png",
    imagenCard: "https://i.postimg.cc/1z54pY5D/verdura.jpg",
    titulo: "Verdura",
    precio: 4355,
    descripcion: "Salteado de espinaca, cebolla, morrón, puerro y verdeo, cremosa salsa bechamel, rebosada de abundante muzzarella y queso sardo estacionado.",
    ingredientes: [
      "Salteado de espinaca, cebolla, morrón, puerro y verdeo",
      "Cremosa salsa bechamel",
      "Rebosada de abundante muzzarella",
      "Queso sardo estacionado"
    ],
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/brr5kQtn/Calabaza.png",
    imagenDetalle: "https://i.postimg.cc/brr5kQtn/Calabaza.png",
    imagenCard: "https://i.postimg.cc/kXQ5LdV9/calabaza.jpg",
    titulo: "Calabaza",
    precio: 4355,
    descripcion: "Calabaza horneada especiada, abundante muzzarella en tapa integral y semillas.",
    ingredientes: [
      "Calabaza horneada especiada",
      "Abundante muzzarella en tapa integral",
      "Semillas"
    ],
    esVegetariano: true,
    esPremium: false
  }
];
