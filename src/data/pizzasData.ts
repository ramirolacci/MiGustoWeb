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
        imagen: "https://i.postimg.cc/50Lkjt7H/Muzza-Photoroom.png",
        titulo: "Muzzarella",
        descripcion: "Pizza grande de Muzzarella elaborada con salsa de tomate casera artesanal.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/50Lkjt7H/Muzza-Photoroom.png",
        titulo: "Doble muzzarella",
        descripcion: "Pizza grande de Muzzarella doble elaborada con salsa de tomate casera artesanal.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/7hPMDPpr/Muzza-con-Jamon-Photoroom.png",
        titulo: "Muzzarella con jamón",
        descripcion: "Pizza grande de Muzzarella elaborada con jamón cocido y salsa de tomate.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/Y9rmLn81/Jamon-con-morrones-Photoroom.png",
        titulo: "Jamón con morrones",
        descripcion: "Pizza grande de Muzzarella elaborada con jamón cocido y morrones asados."
    },
    {
        imagen: "https://i.postimg.cc/gcv2bqDp/Napo-Photoroom.png",
        titulo: "Napolitana",
        descripcion: "Pizza grande de queso Muzzarella elaborada con rodajas de tomate fresco y topping de salsa casera de provenzal.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/pL9NRPHj/Napo-con-Jamon-Photoroom.png",
        titulo: "Napolitana con jamón",
        descripcion: "Pizza grande de queso Muzzarella elaborada con jamón cocido, rodajas de tomate fresco y topping de salsa casera de provenzal."
    },
    {
        imagen: "https://i.postimg.cc/zfSx1QVW/Provolone-Photoroom.png",
        titulo: "Provolone",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso provolone, salsa de tomate, con orégano y ají molido."
    },
    {
        imagen: "https://i.postimg.cc/RZvRLRPZ/Provolone-con-Jamon-Photoroom.png",
        titulo: "Provolone con jamón",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso provolone, jamón cocido, salsa de tomate, con orégano y ají molido."
    },
    {
        imagen: "https://i.postimg.cc/Kc9v8stP/Panceta-Photoroom.png",
        titulo: "Panceta",
        descripcion: "Pizza grande de Muzzarella elaborada con panceta."
    },
    {
        imagen: "https://i.postimg.cc/g0CLNcYH/Roquefort-Photoroom.png",
        titulo: "Roquefort",
        descripcion: "Pizza grande de queso muzzarella y queso roquefort."
    },
    {
        imagen: "https://i.postimg.cc/HWqHnJ62/Roquefort-con-Jamon-Photoroom.png",
        titulo: "Roquefort con jamón",
        descripcion: "Pizza grande de queso muzzarella, queso roquefort y jamón cocido."
    },
    {
        imagen: "https://i.postimg.cc/Gm3fmdnK/Calabresa-Photoroom.png",
        titulo: "Calabresa",
        descripcion: "Pizza grande de queso Muzzarella y fetas de calabresa.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/NFfXrJs3/Calabresa-con-Jaon-Photoroom.png",
        titulo: "Calabresa con jamón",
        descripcion: "Pizza grande de queso Muzzarella, fetas de calabresa y jamón cocido."
    },
    {
        imagen: "https://i.postimg.cc/9MqmgyxD/Cuatro-Quesos-Photoroom.png",
        titulo: "Cuatro quesos",
        descripcion: "Pizza 4 quesos mezcla de queso muzzarella elaborada con queso roquefort y provolone.",
        esVegetariano: true
    },
    {
        imagen: "https://i.postimg.cc/V6FG8VZp/Provenzal-Photoroom.png",
        titulo: "Provenzal",
        descripcion: "Pizza grande de queso Muzzarella elaborada con ajo deshidratado y perejil.",
        esVegetariano: true
    },
    {
        imagen: "https://i.postimg.cc/HLdbgkGW/Fugazzeta-Photoroom.png",
        titulo: "Fugazzeta",
        descripcion: "Pizza grande de queso Muzzarella elaborada con cebolla blanca y provolone.",
        esVegetariano: true,
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/135Ft5Rv/Fugazzeta-con-Panceta-Photoroom.png",
        titulo: "Fugazzeta con panceta",
        descripcion: "Pizza grande de queso Muzzarella elaborada con cebolla blanca, panceta y provolone."
    },
    {
        imagen: "https://i.postimg.cc/WbqKyTcf/Fugazzeta-con-Jamon-Photoroom.png",
        titulo: "Fugazzeta con jamón",
        descripcion: "Pizza grande de queso Muzzarella elaborada con cebolla blanca, jamón cocido y provolone."
    },
    {
        imagen: "https://i.postimg.cc/90ZkrYbH/Anchoas-Photoroom.png",
        titulo: "Anchoas",
        descripcion: "Pizza grande de queso Muzzarella elaborada con salsa de tomate, anchoas y alcaparras."
    },
    {
        imagen: "https://i.postimg.cc/W36rzDZf/Jamon-con-Anana-Photoroom.png",
        titulo: "Jamón con ananá",
        descripcion: "Pizza grande de queso Muzzarella elaborada con salsa de tomate, jamón cocido, ananá en rodajas, orégano y cerezas."
    },
    {
        imagen: "https://i.postimg.cc/MGwpT9Yq/Caprese-Photoroom.png",
        titulo: "Caprese",
        descripcion: "Pizza grande de queso Muzzarella elaborada con hojas de albahaca, tomate y aceite de oliva.",
        esVegetariano: true
    },
    {
        imagen: "https://i.postimg.cc/TYHkfSf5/Jamon-Tomate-y-Huevo-Photoroom.png",
        titulo: "Jamón, tomate y huevo",
        descripcion: "Pizza grande de queso Muzzarella elaborada con tomate fresco, jamón y huevo cocidos."
    },
    {
        imagen: "https://i.postimg.cc/dVygXvrV/Muzza-con-Huevo-Photoroom.png",
        titulo: "Muzzarella con huevo",
        descripcion: "Pizza grande de queso Muzzarella elaborada con tomate fresco y huevo cocido.",
        esVegetariano: true
    },
    {
        imagen: "https://i.postimg.cc/hGhsw1Hb/Jamon-y-huevo-Photoroom.png",
        titulo: "Jamón y huevo",
        descripcion: "Pizza grande de queso Muzzarella elaborada con jamón y huevo cocidos."
    },
    {
        imagen: "https://i.postimg.cc/3NMHWRgV/Jamon-tomate-huevo-y-roquefort-Photoroom.png",
        titulo: "Jamón, tomate, huevo y roquefort",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso roquefort, tomate fresco y huevo cocido."
    },
    {
        imagen: "https://i.postimg.cc/15fpy3Ws/Provo-Jamon-y-Longaniza-Photoroom.png",
        titulo: "Provolone, jamón y longaniza",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso provolone, jamón cocido y fetas de longaniza."
    },
    {
        imagen: "https://i.postimg.cc/c4BryyW0/Provolone-Jamon-y-Morron-Photoroom.png",
        titulo: "Provolone, jamón y morrón",
        descripcion: "Pizza grande de queso Muzzarella elaborada con queso provolone, jamón cocido y morrones asados."
    },
    {
        imagen: "https://i.postimg.cc/R05SNg4X/Panceta-y-verdeo-Photoroom.png",
        titulo: "Panceta y verdeo",
        descripcion: "Pizza grande de queso Muzzarella elaborada con panceta y verdeo."
    }
];
