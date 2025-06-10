interface Postre {
    titulo: string;
    descripcion: string;
    imagen: string;
    esRecomendado?: boolean;
}

export const postres: Postre[] = [
    {
        titulo: "Franuí Chocolate Amargo",
        descripcion: "Delicioso postre de chocolate amargo, perfecto para los amantes del chocolate intenso.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/1b6778c0-2379-4bcd-bde1-d0cce35e0a17.jpg",
        esRecomendado: true
    },
    {
        titulo: "Franuí Chocolate Con Leche",
        descripcion: "Irresistible postre de chocolate con leche, una combinación perfecta de dulzura y cremosidad.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/652e1d7f-a532-47cd-a1e2-9619a5e939b9.jpg",
        esRecomendado: true
    },
    {
        titulo: "Franuí Pink",
        descripcion: "Exquisito postre con un toque especial, ideal para los que buscan algo diferente y delicioso.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/78d4cc67-91e5-4e46-b0cc-6096b2c27698.jpg",
        esRecomendado: true
    }
]; 