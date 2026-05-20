export interface Salsa {
    titulo: string;
    descripcion: string;
    imagen: string;
    imagenCard?: string;
    esRecomendado?: boolean;
}

export const salsas: Salsa[] = [
    {
        imagen: "https://i.postimg.cc/VsBz44M9/Crema-de-Ajo.png",
        imagenCard: "https://i.postimg.cc/1z3BN1dK/Aderezo-de-Ajo.jpg",
        titulo: "Crema de ajo",
        descripcion: "Salsa cremosa con sabor a ajo, perfecta para acompañar pizzas y empanadas."
    },
    {
        imagen: "https://i.postimg.cc/JzwVLkb7/American-Ketchup.png",
        imagenCard: "https://i.postimg.cc/kg18z6jh/Aderezo-American-Ketchup.jpg",
        titulo: "American ketchup",
        descripcion: "Ketchup estilo americano, dulce y espeso.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/HL2fXvFj/BBQ.png",
        imagenCard: "https://i.postimg.cc/GtK9DVVG/Aderezo-de-BBQ.jpg",
        titulo: "BBQ",
        descripcion: "Salsa BBQ ahumada con un toque dulce y picante."
    },
    {
        imagen: "https://i.postimg.cc/XNhtfC1K/Cheddar.png",
        imagenCard: "https://i.postimg.cc/Px2kQHfJ/Aderezo-de-Cheddar.jpg",
        titulo: "Cheddar",
        descripcion: "Salsa cremosa de queso cheddar, ideal para sumergir.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/7YjGrmsC/Chimichurri.png",
        imagenCard: "https://i.postimg.cc/7L9RpNFn/Aderezo-de-Chimichurri.jpg",
        titulo: "Chimichurri",
        descripcion: "Salsa tradicional argentina con perejil, ajo y aceite de oliva.",
        esRecomendado: true 
    },
    {
        imagen: "https://i.postimg.cc/qvfR5gqy/Criolla.png",
        imagenCard: "https://i.postimg.cc/zGvB6dHD/Aderezo-de-Salsa-Criolla.jpg",
        titulo: "Criolla",
        descripcion: "Salsa criolla con cebolla, tomate y pimiento."
    },
    {
        imagen: "https://i.postimg.cc/VsBz44M9/Crema-de-Ajo.png",
        imagenCard: "https://i.postimg.cc/QxRwZCHK/Aderezo-de-Crema-Acida.jpg",
        titulo: "Crema ácida",
        descripcion: "Crema ácida suave y refrescante."
    },
]; 