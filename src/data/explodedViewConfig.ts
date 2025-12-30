export interface ExplodedIngredient {
    id: number;
    name: string;
    x: number;
    y: number;
    align: 'left' | 'right' | 'center';
    mobileX?: number;
    mobileY?: number;
    mobileAlign?: 'left' | 'right' | 'center';
}

export interface ExplodedProductConfig {
    id: string;
    name: string;
    image: string;
    modelUrl: string;
    cameraOrbit: string;
    ingredients: ExplodedIngredient[];
}

export const explodedProductConfigs: Record<string, ExplodedProductConfig> = {
    'Cheese burger': {
        id: 'cheeseburger-001',
        name: 'Cheeseburger',
        image: '/images/final/empanada-cheese-burger.png',
        modelUrl: '/models/cheese-burger-3D.glb',
        cameraOrbit: '180deg 100deg 2.9m',
        ingredients: [
            { id: 1, name: 'Salsa bbq', x: 15, y: 25, align: 'left', mobileX: 50, mobileY: 18, mobileAlign: 'center' },
            { id: 2, name: 'Mar de\ncheddar', x: 75, y: 30, align: 'right', mobileX: 78, mobileY: 28, mobileAlign: 'right' },
            { id: 3, name: 'Doble bacon', x: 75, y: 65, align: 'right', mobileX: 78, mobileY: 82, mobileAlign: 'left' },
            { id: 4, name: 'Blend de\nOjo de Bife', x: 15, y: 50, align: 'left', mobileX: 25, mobileY: 30, mobileAlign: 'left' },
            { id: 5, name: 'Vacio', x: 15, y: 75, align: 'left', mobileX: 35, mobileY: 82, mobileAlign: 'left' },
        ]
    },
    'Mexican pibil pork': {
        id: 'mexican-pibil-pork-001',
        name: 'Mexican pibil pork',
        image: '/images/final/empanada-mexican-pibil-pork.png',
        modelUrl: '/models/mexican-pibil-pork-3D.glb',
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Bondiola de cerdo\nde larga coccion', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Achiote con\nporotos negros', x: 15, y: 60, align: 'left', mobileX: 20, mobileY: 80, mobileAlign: 'left' },
            { id: 3, name: 'Crema acida', x: 75, y: 25, align: 'right', mobileX: 80, mobileY: 20, mobileAlign: 'right' },
            { id: 4, name: 'Cebolla encurtida', x: 75, y: 50, align: 'right', mobileX: 80, mobileY: 50, mobileAlign: 'right' },
            { id: 5, name: 'Cilantro', x: 75, y: 75, align: 'right', mobileX: 80, mobileY: 80, mobileAlign: 'right' },
        ]
    },
    'Big burger': {
        id: 'big-burger-001',
        name: 'Big burger',
        image: '/images/final/empanada-big-burger.png',
        modelUrl: '/models/big-burger-3D.glb',
        cameraOrbit: '45deg 65deg 1.7m', // Copying from copy local in Productos.tsx
        ingredients: [
            { id: 1, name: 'Blend de\nojo de bife', x: 15, y: 20, align: 'left', mobileX: 20, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Tapa de asado', x: 15, y: 50, align: 'left', mobileX: 20, mobileY: 50, mobileAlign: 'left' },
            { id: 3, name: 'Doble bacon', x: 15, y: 80, align: 'left', mobileX: 20, mobileY: 80, mobileAlign: 'left' },
            { id: 4, name: 'Cheddar', x: 75, y: 30, align: 'right', mobileX: 80, mobileY: 30, mobileAlign: 'right' },
            { id: 5, name: 'Pepinillos', x: 75, y: 55, align: 'right', mobileX: 80, mobileY: 55, mobileAlign: 'right' },
            { id: 6, name: 'Salsa Big', x: 75, y: 80, align: 'right', mobileX: 80, mobileY: 80, mobileAlign: 'right' },
        ]
    },
    'Matambre a la pizza': {
        id: 'matambre-pizza-001',
        name: 'Matambre a la pizza',
        image: '/images/final/empanada-matambre -alapizza.png',
        modelUrl: '/models/Matambre-a-la-Pizza-3D.glb',
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Matambre tierno\nahumado a leña', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Muzzarella', x: 15, y: 50, align: 'left', mobileX: 20, mobileY: 50, mobileAlign: 'left' },
            { id: 3, name: 'Salsa casera\nde tomate', x: 30, y: 75, align: 'left', mobileX: 20, mobileY: 80, mobileAlign: 'left' },
            { id: 4, name: 'Gratinado de\nprovolone', x: 75, y: 30, align: 'right', mobileX: 80, mobileY: 30, mobileAlign: 'right' },
            { id: 5, name: 'Salsa chimichurri', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Vacio y provoleta': {
        id: 'vacio-provoleta-001',
        name: 'Vacio y provoleta',
        image: '/images/final/empanada-vacio-yprovoleta.png',
        modelUrl: '/models/vacio-provoleta-3D.glb',
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Delicioso vacio\nasado desmechado', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Clásico chimichurri\ncon cebolla', x: 15, y: 50, align: 'left', mobileX: 20, mobileY: 50, mobileAlign: 'left' },
            { id: 3, name: 'Morrón salteado\na fuego lento', x: 15, y: 75, align: 'left', mobileX: 20, mobileY: 80, mobileAlign: 'left' },
            { id: 4, name: 'Provoleta y\nmuzzarella', x: 75, y: 30, align: 'right', mobileX: 80, mobileY: 30, mobileAlign: 'right' },
            { id: 5, name: 'Semolin en la tapa', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'American chicken': {
        id: 'american-chicken-001',
        name: 'American chicken',
        image: '/images/final/empanada-american-chicken.png',
        modelUrl: '/models/american-chicken-3D.glb',
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Chicken sabroso\ny dulce', x: 15, y: 30, align: 'left', mobileX: 20, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Bacón crujiente\nbraseado', x: 75, y: 30, align: 'right', mobileX: 80, mobileY: 30, mobileAlign: 'right' },
            { id: 3, name: 'Mar de cheddar', x: 15, y: 70, align: 'left', mobileX: 20, mobileY: 70, mobileAlign: 'left' },
        ]
    }
};
