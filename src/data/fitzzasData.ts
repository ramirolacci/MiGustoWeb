// src/data/fitzzasData.ts

export interface Fitzza {
    imagen: string;
    titulo: string;
    descripcion: string;
    esRecomendado?: boolean;
    esVegetariano?: boolean;
    esSinGluten?: boolean;
}

export const fitzzas: Fitzza[] = [
    {
        imagen: "https://i.postimg.cc/KvKVWLM2/769c023c-aad2-4695-8e4a-44620a373397-Photoroom.png",
        titulo: "Fitzza muzza",
        descripcion: "Fitzza con mozzarella y salsa de tomate casera artesanal.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/3rP5Yn7R/efd484b6-e5ca-4658-ae8c-3ecd2671d758-Photoroom.png",
        titulo: "Fitzza napo",
        descripcion: "Fitzza con rodajas de tomate fresco y topping de salsa casera de provenzal."
    },
    {
        imagen: "https://i.postimg.cc/Z5bfSd9n/363935fe-487b-40e2-8978-728ffa5f65f0-Photoroom.png",
        titulo: "Fitzza fugazzetta",
        descripcion: "Fitzza con cebolla blanca y provolone.",
        esVegetariano: true
    },
    {
        imagen: "https://i.postimg.cc/zG4Rjm1N/eb57bd40-3872-458a-b926-903db25dd94a-Photoroom.png",
        titulo: "Fitzza pepperoni",
        descripcion: "Fitzza con pepperoni y queso mozzarella."
    },
    {
        imagen: "https://i.postimg.cc/sgW23vtF/890ba29d-3b08-4651-b10f-dc3f6462b940-Photoroom.png",
        titulo: "Fitzza mortadela, pistacho y stracciatella",
        descripcion: "Fitzza con mortadela, pistachos y stracciatella.",
        esRecomendado: true
    },
    {
        imagen: "https://i.postimg.cc/RZwvj2H4/e4d0be75-1e7a-422e-802d-bded742f4e53-Photoroom.png",
        titulo: "Fitzza Jamón crudo, rúcula y stracciatella",
        descripcion: "Fitzza con jamón crudo, rúcula fresca y stracciatella.",
        esRecomendado: true
    }
];
