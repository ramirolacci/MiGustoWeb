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
        imagen: "https://i.postimg.cc/3wDKXLCG/Franu-Chocolate-Amargo.png",
        esRecomendado: true
    },
    {
        titulo: "Franuí Chocolate Con Leche",
        descripcion: "Irresistible postre de chocolate con leche, una combinación perfecta de dulzura y cremosidad.",
        imagen: "https://i.postimg.cc/SQD3sVhq/Franu-Chocolate-Con-Leche.png",
        esRecomendado: true
    },
    {
        titulo: "Franuí Pink",
        descripcion: "Exquisito postre con un toque especial, ideal para los que buscan algo diferente y delicioso.",
        imagen: "https://i.postimg.cc/3JGX6J96/Franu-Pink.png",
        esRecomendado: true
    }
]; 