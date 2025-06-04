// src/data/pizzas.ts

export interface Pizza {
    imagen: string;
    titulo: string;
    descripcion: string;
    esRecomendado?: boolean;
    esVegetariano?: boolean;
    esSinGluten?: boolean;
}

export const pizzas: Pizza[] = [
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Muzzarella",
        descripcion: "Pizza grande de Muzzarella elaborada con salsa de tomate casera artesanal.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/SKgTg4kk/Doble-Muzza.png",
        titulo: "Doble Muzzarella",
        descripcion: "Pizza grande de Muzzarella doble elaborada con salsa de tomate casera artesanal.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/5NZMmwpn/Muzza-con-Jamon.png",
        titulo: "Muzzarella con Jamón",
        descripcion: "Pizza grande de Muzzarella elaborada con jamón cocido y salsa de tomate.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Jamón con Morrones",
        descripcion: "Pizza grande de Muzzarella elaborada con jamón cocido y morrones asados."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Napolitana",
        descripcion: "Pizza grande de queso Muzzarella elaborada con rodajas de tomate fresco y topping de salsa casera de provenzal.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Napolitana con Jamón",
        descripcion: "Pizza grande de queso Muzzarella elaborada con jamón cocido, rodajas de tomate fresco y topping de salsa casera de provenzal."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Provolone",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso provolone, salsa de tomate, con orégano y ají molido."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Provolone con Jamón",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso provolone, jamón cocido, salsa de tomate, con orégano y ají molido."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Panceta",
        descripcion: "Pizza grande de Muzzarella elaborada con panceta."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Roquefort",
        descripcion: "Pizza grande de queso muzzarella y queso roquefort."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Roquefort con Jamón",
        descripcion: "Pizza grande de queso muzzarella, queso roquefort y jamón cocido."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Calabresa",
        descripcion: "Pizza grande de queso Muzzarella y fetas de calabresa.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Calabresa con Jamón",
        descripcion: "Pizza grande de queso Muzzarella, fetas de calabresa y jamón cocido."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Cuatro Quesos",
        descripcion: "Pizza 4 quesos mezcla de queso muzzarella elaborada con queso roquefort y provolone.",
        esVegetariano: true
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Provenzal",
        descripcion: "Pizza grande de queso Muzzarella elaborada con ajo deshidratado y perejil.",
        esVegetariano: true
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Fugazzeta",
        descripcion: "Pizza grande de queso Muzzarella elaborada con cebolla blanca y provolone.",
        esVegetariano: true,
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Fugazzeta con Panceta",
        descripcion: "Pizza grande de queso Muzzarella elaborada con cebolla blanca, panceta y provolone."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Fugazzeta con Jamón",
        descripcion: "Pizza grande de queso Muzzarella elaborada con cebolla blanca, jamón cocido y provolone."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Anchoas",
        descripcion: "Pizza grande de queso Muzzarella elaborada con salsa de tomate, anchoas y alcaparras."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Jamón con Ananá",
        descripcion: "Pizza grande de queso Muzzarella elaborada con salsa de tomate, jamón cocido, ananá en rodajas, orégano y cerezas."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Caprese",
        descripcion: "Pizza grande de queso Muzzarella elaborada con hojas de albahaca, tomate y aceite de oliva.",
        esVegetariano: true
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Jamón, Tomate y Huevo",
        descripcion: "Pizza grande de queso Muzzarella elaborada con tomate fresco, jamón y huevo cocidos."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Muzzarella con Huevo",
        descripcion: "Pizza grande de queso Muzzarella elaborada con tomate fresco y huevo cocido.",
        esVegetariano: true
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Jamón y Huevo",
        descripcion: "Pizza grande de queso Muzzarella elaborada con jamón y huevo cocidos."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Jamón, Tomate, Huevo, Roquefort",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso roquefort, tomate fresco y huevo cocido."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Provolone, Jamón y Longaniza",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso provolone, jamón cocido y fetas de longaniza."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Provolone, Jamón y Morrón",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso provolone, jamón cocido y morrones asados."
    },
    {
        imagen: "https://i.postimg.cc/3wsp8DxN/Muzza.jpg",
        titulo: "Panceta y Verdeo",
        descripcion: "Pizza grande de queso Muzzarella elaborada con panceta y verdeo."
    }
];
