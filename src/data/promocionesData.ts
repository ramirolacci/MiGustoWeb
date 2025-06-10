interface Promocion {
    titulo: string;
    descripcion: string;
    imagen: string;
    esRecomendado?: boolean;
}

export const promociones: Promocion[] = [
    {
        titulo: "Pack 3 Empanadas",
        descripcion: "Pack especial de 3 empanadas. Ideal para una comida rápida y deliciosa. Incluye 1 salsa a eleccion.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/c3d7a1d0-89b4-4c47-bf82-f92c5a83f0dc.jpg",
        esRecomendado: true
    },
    {
        titulo: "Pack 6 Empanadas",
        descripcion: "Pack medio de 6 empanadas. Perfecto para compartir. Incluye 2 salsas a eleccion.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/0a6c286d-8ec5-4978-b059-ec4b544882d0.jpg",
        esRecomendado: true
    },
    {
        titulo: "Pack 8 Empanadas",
        descripcion: "Pack grande de 8 empanadas. Ideal para grupos pequeños. Incluye 2 salsas a eleccion.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/b6b61047-4fc8-4363-9493-b162a64d432b.jpg",
        esRecomendado: true
    },
    {
        titulo: "Pack 12 Empanadas",
        descripcion: "Pack familiar de 12 empanadas. Perfecto para reuniones. Incluye 3 salsas a eleccion.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/31986e6d-2e89-496d-a5b2-fc562796e0f8.jpg",
        esRecomendado: true
    },
    {
        titulo: "Pack 18 Empanadas",
        descripcion: "Pack gigante de 18 empanadas. Ideal para eventos y fiestas. Incluye 5 salsas a eleccion.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/a9f1f79b-5489-49a8-9b75-03cf78b71b7f.png",
        esRecomendado: true
    },
    {
        titulo: "Promo Pareja",
        descripcion: "Media Muzza grande + Media Jamon y Morron grande + 2 empanadas. Combo especial para dos personas.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/50e950c9-3419-4cf5-a4b1-a93f36f46fa7.jpg",
        esRecomendado: true
    },
    {
        titulo: "Promo Clasica",
        descripcion: "Pack de 6 empanadas. Incluye 2 salsas a eleccion.",
        imagen: "https://pedidosya.dhmedia.io/image/pedidosya/products/6e1635de-e2fe-4c55-a1e6-4c35338d2622.jpg",
        esRecomendado: true
    },
    {
        titulo: "Promo Ideal",
        descripcion: "Pack de 2 empanadas + 1 Lata de 354ml + 1 salsa a eleccion.",
        imagen: "https://i.postimg.cc/nznVB4tH/Promo-Ideal.jpg",
        esRecomendado: true
    }
]; 