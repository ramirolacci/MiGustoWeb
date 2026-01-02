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
        cameraOrbit: '55deg 35deg 3m',
        ingredients: [
            { id: 1, name: 'Bondiola de cerdo\nde larga coccion', x: 15, y: 25, align: 'left', mobileX: 30, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Achiote con\nporotos negros', x: 15, y: 60, align: 'left', mobileX: 30, mobileY: 80, mobileAlign: 'left' },
            { id: 3, name: 'Crema acida', x: 75, y: 25, align: 'right', mobileX: 70, mobileY: 20, mobileAlign: 'right' },
            { id: 4, name: 'Cebolla encurtida', x: 75, y: 50, align: 'right', mobileX: 70, mobileY: 65, mobileAlign: 'right' },
            { id: 5, name: 'Cilantro', x: 75, y: 75, align: 'right', mobileX: 70, mobileY: 80, mobileAlign: 'right' },
        ]
    },
    'Big burger': {
        id: 'big-burger-001',
        name: 'Big burger',
        image: '/images/final/empanada-big-burger.png',
        modelUrl: '/models/big-burger-3D.glb',
        cameraOrbit: '50deg 65deg 3m',
        ingredients: [
            { id: 1, name: 'Blend de\nojo de bife', x: 28, y: 20, align: 'left', mobileX: 20, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Tapa de asado', x: 15, y: 50, align: 'left', mobileX: 20, mobileY: 50, mobileAlign: 'left' },
            { id: 3, name: 'Doble bacon', x: 15, y: 80, align: 'left', mobileX: 20, mobileY: 80, mobileAlign: 'left' },
            { id: 4, name: 'Pepinillos', x: 75, y: 10, align: 'right', mobileX: 80, mobileY: 30, mobileAlign: 'right' },
            { id: 5, name: 'Cheddar', x: 75, y: 65, align: 'right', mobileX: 80, mobileY: 55, mobileAlign: 'right' },
            { id: 6, name: 'Salsa Big', x: 75, y: 88, align: 'right', mobileX: 80, mobileY: 80, mobileAlign: 'right' },
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
            { id: 2, name: 'Clásico\nchimichurri con cebolla', x: 15, y: 50, align: 'left', mobileX: 20, mobileY: 50, mobileAlign: 'left' },
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
    },
    'Jamón y queso': {
        id: 'jamon-queso-001',
        name: 'Jamón y queso',
        image: 'https://i.postimg.cc/yYKCxRG3/jamonyqueso.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido\nfeteado', x: 15, y: 40, align: 'left', mobileX: 20, mobileY: 40, mobileAlign: 'left' },
            { id: 2, name: 'Abundante\nmuzzarella seleccionada', x: 75, y: 60, align: 'right', mobileX: 80, mobileY: 60, mobileAlign: 'right' },
        ]
    },
    'Jamón, huevo y queso': {
        id: 'jamon-huevo-queso-001',
        name: 'Jamón, huevo y queso',
        image: 'https://i.postimg.cc/QxTMKhBq/jamonquesoyhuevo.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido\nen cubos', x: 15, y: 30, align: 'left', mobileX: 20, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Colmado de\nmuzzarella seleccionada', x: 75, y: 40, align: 'right', mobileX: 80, mobileY: 40, mobileAlign: 'right' },
            { id: 3, name: 'Huevo duro', x: 15, y: 70, align: 'left', mobileX: 20, mobileY: 70, mobileAlign: 'left' },
        ]
    },
    'Carne picante': {
        id: 'carne-picante-001',
        name: 'Carne picante',
        image: 'https://i.postimg.cc/VLszd07h/carnepicante.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Corte de paleta\npremium', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Salteado de cebolla\ny morrón', x: 15, y: 50, align: 'left', mobileX: 20, mobileY: 50, mobileAlign: 'left' },
            { id: 3, name: 'Verdeo y\nhuevo duro', x: 75, y: 35, align: 'right', mobileX: 80, mobileY: 35, mobileAlign: 'right' },
            { id: 4, name: 'Especias y\nají picante', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Carne con aceituna': {
        id: 'carne-aceituna-001',
        name: 'Carne con aceituna',
        image: 'https://i.postimg.cc/dVkPy28V/carneyaceituna.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Corte de paleta\npremium', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Salteado de cebolla,\nmorrón, verdeo\ncon huevo duro', x: 15, y: 50, align: 'left', mobileX: 20, mobileY: 50, mobileAlign: 'left' },
            { id: 3, name: 'Abundantes rodajas\nde aceitunas verdes', x: 75, y: 35, align: 'right', mobileX: 80, mobileY: 35, mobileAlign: 'right' },
            { id: 4, name: 'Delicadas especias', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Carne a cuchillo': {
        id: 'carne-cuchillo-001',
        name: 'Carne a cuchillo',
        image: 'https://i.postimg.cc/GpFfFq9n/cortadaacuchillo.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Carne cuadrada premium\ncon corte a cuchillo\nartesanal', x: 15, y: 35, align: 'left', mobileX: 20, mobileY: 35, mobileAlign: 'left' },
            { id: 2, name: 'Mix de morrón\ny huevo', x: 75, y: 40, align: 'right', mobileX: 80, mobileY: 40, mobileAlign: 'right' },
            { id: 3, name: 'Toque secreto\nsalteño', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Carne suave': {
        id: 'carne-suave-001',
        name: 'Carne suave',
        image: 'https://i.postimg.cc/qqwh2VHT/carnesuave.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Corte de paleta\npremium', x: 15, y: 30, align: 'left', mobileX: 20, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Salteado con\ncebolla y morrón', x: 15, y: 60, align: 'left', mobileX: 20, mobileY: 60, mobileAlign: 'left' },
            { id: 3, name: 'Huevo duro', x: 75, y: 40, align: 'right', mobileX: 80, mobileY: 40, mobileAlign: 'right' },
            { id: 4, name: 'Delicadas especias\nde nuestra tradición', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Queso y cebolla': {
        id: 'queso-cebolla-001',
        name: 'Queso y cebolla',
        image: 'https://i.postimg.cc/FzVcGk39/cebollayqueso.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Perfecta union\nmuzzarella seleccionada', x: 15, y: 35, align: 'left', mobileX: 20, mobileY: 35, mobileAlign: 'left' },
            { id: 2, name: 'Salteado\nde cebolla', x: 75, y: 40, align: 'right', mobileX: 80, mobileY: 40, mobileAlign: 'right' },
            { id: 3, name: 'Toque de quesardo\nestacionado', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Roquefort con jamón': {
        id: 'roquefort-jamon-001',
        name: 'Roquefort con jamón',
        image: 'https://i.postimg.cc/wjfr07Qs/roquefortyjamon.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido\nfeteado', x: 15, y: 40, align: 'left', mobileX: 20, mobileY: 40, mobileAlign: 'left' },
            { id: 2, name: 'Intenso queso\nroquefort premium', x: 75, y: 60, align: 'right', mobileX: 80, mobileY: 60, mobileAlign: 'right' },
        ]
    },
    'Pollo': {
        id: 'pollo-001',
        name: 'Pollo',
        image: 'https://i.postimg.cc/ZRMKmbm0/pollo.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Suprema de pollo\ncortada en trozos\na base de cebolla', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Morrón y\nsalsa de especias', x: 15, y: 55, align: 'left', mobileX: 20, mobileY: 55, mobileAlign: 'left' },
            { id: 3, name: 'Cocinado\na fuego lento', x: 75, y: 40, align: 'right', mobileX: 80, mobileY: 40, mobileAlign: 'right' },
            { id: 4, name: 'Finalizado con\nhuevo duro', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Cuatro quesos': {
        id: 'cuatro-quesos-001',
        name: 'Cuatro quesos',
        image: 'https://i.postimg.cc/43rHvQ7N/cuatroquesos.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Blend de abundante\nqueso muzzarella', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Quesardo\nseleccionado', x: 15, y: 50, align: 'left', mobileX: 20, mobileY: 50, mobileAlign: 'left' },
            { id: 3, name: 'Roquefort\nintenso', x: 75, y: 35, align: 'right', mobileX: 80, mobileY: 35, mobileAlign: 'right' },
            { id: 4, name: 'Provolone\nestacionado', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Pollo al champignon': {
        id: 'pollo-champignon-001',
        name: 'Pollo al champignon',
        image: 'https://i.postimg.cc/50C7pgs0/polloychampignon.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Suprema de pollo\ncortada en trozos', x: 15, y: 35, align: 'left', mobileX: 20, mobileY: 35, mobileAlign: 'left' },
            { id: 2, name: 'Cremosa salsa\nbechamel', x: 75, y: 40, align: 'right', mobileX: 80, mobileY: 40, mobileAlign: 'right' },
            { id: 3, name: 'Champignon fresco\nsalteado', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Choclo': {
        id: 'choclo-001',
        name: 'Choclo',
        image: 'https://i.postimg.cc/HLpdqJqQ/choclo.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Deliciosa mezcla\nde choclo entero', x: 15, y: 30, align: 'left', mobileX: 20, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Choclo\ncremoso', x: 15, y: 60, align: 'left', mobileX: 20, mobileY: 60, mobileAlign: 'left' },
            { id: 3, name: 'Especias', x: 75, y: 40, align: 'right', mobileX: 80, mobileY: 40, mobileAlign: 'right' },
            { id: 4, name: 'Abundante queso\nmuzzarella', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Verdura': {
        id: 'verdura-001',
        name: 'Verdura',
        image: 'https://i.postimg.cc/1z54pY5D/verdura.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Salteado de espinaca,\ncebolla, morrón,\npuerro y verdeo', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Cremosa salsa\nbechamel', x: 15, y: 55, align: 'left', mobileX: 20, mobileY: 55, mobileAlign: 'left' },
            { id: 3, name: 'Rebosada de abundante\nmuzzarella', x: 75, y: 40, align: 'right', mobileX: 80, mobileY: 40, mobileAlign: 'right' },
            { id: 4, name: 'Queso sardo\nestacionado', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Calabaza': {
        id: 'calabaza-001',
        name: 'Calabaza',
        image: 'https://i.postimg.cc/kXQ5LdV9/calabaza.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Calabaza horneada\nespeciada', x: 15, y: 40, align: 'left', mobileX: 20, mobileY: 40, mobileAlign: 'left' },
            { id: 2, name: 'Abundante muzzarella\nen tapa integral', x: 75, y: 50, align: 'right', mobileX: 80, mobileY: 50, mobileAlign: 'right' },
            { id: 3, name: 'Semillas', x: 75, y: 75, align: 'right', mobileX: 80, mobileY: 75, mobileAlign: 'right' },
        ]
    },
    'Panceta y ciruela': {
        id: 'panceta-ciruela-001',
        name: 'Panceta y ciruela',
        image: 'https://i.postimg.cc/HLc1DQSj/pancetayciruela.jpg',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Panceta ahumada\nfeteada', x: 15, y: 35, align: 'left', mobileX: 20, mobileY: 35, mobileAlign: 'left' },
            { id: 2, name: 'Abundante queso\nmuzzarella', x: 75, y: 45, align: 'right', mobileX: 80, mobileY: 45, mobileAlign: 'right' },
            { id: 3, name: 'Ciruelas\nen pasas', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    }
};
