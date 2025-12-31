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
    imagen: "https://i.postimg.cc/Jn1YwrX3/Mexican-Pibil-pork.jpg", 
    imagenDetalle: "https://i.postimg.cc/hGWzWcVs/Mexican-Pibil-Pork.png",
    titulo: "Mexican pibil pork",
    precio: 4000,
    descripcion: "Bondiola de cerdo de larga coccion, Achiote con porotos negros, Crema acida, Cebolla encurtida, Cilantro.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/9a2d8724-46bc-4cde-915f-c958c8e25ef4.jpg",
    imagenDetalle: "https://i.postimg.cc/9FTt4mc3/burger.png",
    titulo: "Big burger",
    precio: 4000,
    descripcion: "Blend de ojo de bife, Tapa de asado, Doble bacon, Cheddar, Pepinillos, Salsa Big.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/0a6315c4-600e-4091-808f-565ff5906571.jpg",
    imagenDetalle: "https://i.postimg.cc/sXTmjwPT/Matambre-a-la-pizza.png",
    titulo: "Matambre a la pizza",
    precio: 4000,
    descripcion: "Matambre tierno ahumado a leña, Muzzarella, Salsa casera de tomate, Gratinado de provolone, Salsa chimichurri.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/brRW2qqg/cheese.jpg",
    imagenDetalle: "https://i.postimg.cc/9Ftb8mKd/cheese-burger.png",
    titulo: "Cheese burger",
    precio: 4000,  
    descripcion: "Blend de ojo de bife y vacio, Doble bacon, Salsa bbq, Mar de cheddar.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/X77DzSVP/vacio.jpg",
    imagenDetalle: "https://i.postimg.cc/Dz32yH1f/VACIO-Y-PROVOLETA.png",
    titulo: "Vacio y provoleta",
    precio: 4000,
    descripcion: "Delicioso vacio asado desmechado, Clásico chimichurri con cebolla, Morrón salteado a fuego lento, Provoleta y muzzarella seleccionada, Semolin en la tapa.",
    esRecomendado: true,
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/W3v5mxWG/american.jpg",
    imagenDetalle: "https://i.postimg.cc/bv0qGgRx/AMERICAN.png",
    titulo: "American chicken",
    precio: 4000,
    descripcion: "Chicken sabroso y dulce, Bacón crujiente braseado, Mar de cheddar.",
    esPremium: true
  },
  {
    imagen: "https://i.postimg.cc/fyWNFt0W/Jamon-y-queso.png",
    imagenCard: "https://i.postimg.cc/yYKCxRG3/jamonyqueso.jpg",
    titulo: "Jamón y queso",
    precio: 3700,
    descripcion: "Jamón cocido feteado, Abundante muzzarella seleccionada.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/3rZBTPXq/jamon-y-huevo.png",
    imagenCard: "https://i.postimg.cc/QxTMKhBq/jamonquesoyhuevo.jpg",
    titulo: "Jamón, huevo y queso",
    precio: 3700,
    descripcion: "Jamón cocido en cubos, Colmado de muzzarella seleccionada, Huevo duro.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/fLCSdvyz/Carne-picante.png",
    imagenCard: "https://i.postimg.cc/VLszd07h/carnepicante.jpg",
    titulo: "Carne picante",
    precio: 3700,
    descripcion: "Corte de paleta premium, Salteado de cebolla y morrón, Verdeo y huevo duro, Especias y ají picante.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/MHHWPC0L/con-aceitunas.png",
    imagenCard: "https://i.postimg.cc/dVkPy28V/carneyaceituna.jpg",
    titulo: "Carne con aceituna",
    precio: 3700,
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
    imagenCard: "https://i.postimg.cc/GpFfFq9n/cortadaacuchillo.jpg",
    titulo: "Carne a cuchillo",
    precio: 3700,
    descripcion: "Carne cuadrada premium con corte a cuchillo artesanal, Mix de morrón y huevo, Toque secreto salteño.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/NMjmpnW9/Carne-Suave.png",
    imagenCard: "https://i.postimg.cc/qqwh2VHT/carnesuave.jpg",
    titulo: "Carne suave",
    precio: 3700,
    descripcion: "Corte de paleta premium, Salteado con cebolla y morrón, Huevo duro, Delicadas especias de nuestra tradición.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/1XtxRybm/Cebolla.png",
    imagenCard: "https://i.postimg.cc/FzVcGk39/cebollayqueso.jpg",
    titulo: "Queso y cebolla",
    precio: 3700,
    descripcion: "Perfecta union muzzarella seleccionada, Salteado de cebolla, Toque de quesardo estacionado.",
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/L5m9pQGp/Roquefort-con-jamon.png",
    imagenCard: "https://i.postimg.cc/wjfr07Qs/roquefortyjamon.jpg",
    titulo: "Roquefort con jamón",
    precio: 3700,
    descripcion: "Jamon cocido feteado, Intenso queso roquefort premium.",
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/NGS2HDk4/pollo.png",
    imagenCard: "https://i.postimg.cc/ZRMKmbm0/pollo.jpg",
    titulo: "Pollo",
    precio: 3700,
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
    imagenCard: "https://i.postimg.cc/43rHvQ7N/cuatroquesos.jpg",
    titulo: "Cuatro quesos",
    precio: 3700,
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
    imagenCard: "https://i.postimg.cc/50C7pgs0/polloychampignon.jpg",
    titulo: "Pollo al champignon",
    precio: 3700,
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
    imagenCard: "https://i.postimg.cc/HLpdqJqQ/choclo.jpg",
    titulo: "Choclo",
    precio: 3700,
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
    imagenCard: "https://i.postimg.cc/1z54pY5D/verdura.jpg",
    titulo: "Verdura",
    precio: 3700,
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
    imagenCard: "https://i.postimg.cc/kXQ5LdV9/calabaza.jpg",
    titulo: "Calabaza",
    precio: 3700,
    descripcion: "Calabaza horneada especiada, abundante muzzarella en tapa integral y semillas.",
    ingredientes: [
      "Calabaza horneada especiada",
      "Abundante muzzarella en tapa integral",
      "Semillas"
    ],
    esVegetariano: true,
    esPremium: false
  },
  {
    imagen: "https://i.postimg.cc/D08fz9NT/panceta-y-ciruela.png",
    imagenCard: "https://i.postimg.cc/HLc1DQSj/pancetayciruela.jpg",
    titulo: "Panceta y ciruela",
    precio: 3700,
    descripcion: "Panceta ahumada feteada, abundante queso muzzarella y ciruelas en pasas.",
    ingredientes: [
      "Panceta ahumada feteada",
      "Abundante queso muzzarella",
      "Ciruelas en pasas"
    ],
    esPremium: false
  }
];
