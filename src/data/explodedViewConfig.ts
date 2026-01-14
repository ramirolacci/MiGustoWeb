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
            { id: 2, name: 'Mar de\ncheddar', x: 75, y: 30, align: 'right', mobileX: 72, mobileY: 28, mobileAlign: 'right' },
            { id: 3, name: 'Doble bacon', x: 75, y: 65, align: 'right', mobileX: 78, mobileY: 80, mobileAlign: 'left' },
            { id: 4, name: 'Blend de\nOjo de Bife', x: 15, y: 50, align: 'left', mobileX: 28, mobileY: 30, mobileAlign: 'left' },
            { id: 5, name: 'Vacio', x: 15, y: 75, align: 'left', mobileX: 35, mobileY: 75, mobileAlign: 'left' },
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
            { id: 2, name: 'Achiote con\nporotos negros', x: 15, y: 60, align: 'left', mobileX: 30, mobileY: 73, mobileAlign: 'left' },
            { id: 3, name: 'Crema acida', x: 75, y: 25, align: 'right', mobileX: 70, mobileY: 20, mobileAlign: 'right' },
            { id: 4, name: 'Cebolla encurtida', x: 75, y: 50, align: 'right', mobileX: 74, mobileY: 70, mobileAlign: 'right' },
            { id: 5, name: 'Cilantro', x: 75, y: 75, align: 'right', mobileX: 48, mobileY: 83, mobileAlign: 'right' },
        ]
    },
    'Big burger': {
        id: 'big-burger-001',
        name: 'Big burger',
        image: '/images/final/empanada-big-burger.png',
        modelUrl: '/models/big-burger-3D.glb',
        cameraOrbit: '50deg 65deg 3m',
        ingredients: [
            { id: 1, name: 'Blend de\nojo de bife', x: 28, y: 20, align: 'left', mobileX: 28, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Tapa de asado', x: 20, y: 50, align: 'left', mobileX: 55, mobileY: 15, mobileAlign: 'left' },
            { id: 3, name: 'Doble bacon', x: 15, y: 80, align: 'left', mobileX: 27, mobileY: 70, mobileAlign: 'left' },
            { id: 4, name: 'Pepinillos', x: 75, y: 10, align: 'right', mobileX: 70, mobileY: 30, mobileAlign: 'right' },
            { id: 5, name: 'Cheddar', x: 75, y: 65, align: 'right', mobileX: 73, mobileY: 67, mobileAlign: 'right' },
            { id: 6, name: 'Salsa Big', x: 75, y: 88, align: 'right', mobileX: 50, mobileY: 80, mobileAlign: 'right' },
        ]
    },
    'Matambre a la pizza': {
        id: 'matambre-pizza-001',
        name: 'Matambre a la pizza',
        image: '/images/final/empanada-matambre -alapizza.png',
        modelUrl: '/models/Matambre-a-la-Pizza-3D.glb',
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Matambre tierno\nahumado a leña', x: 15, y: 25, align: 'left', mobileX: 28, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Muzzarella', x: 20, y: 50, align: 'left', mobileX: 60, mobileY: 17, mobileAlign: 'left' },
            { id: 3, name: 'Salsa casera\nde tomate', x: 30, y: 75, align: 'left', mobileX: 28, mobileY: 75, mobileAlign: 'left' },
            { id: 4, name: 'Gratinado de\nprovolone', x: 75, y: 30, align: 'right', mobileX: 72, mobileY: 30, mobileAlign: 'right' },
            { id: 5, name: 'Salsa chimichurri', x: 75, y: 70, align: 'right', mobileX: 73, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Vacio y provoleta': {
        id: 'vacio-provoleta-001',
        name: 'Vacio y provoleta',
        image: '/images/final/empanada-vacio-yprovoleta.png',
        modelUrl: '/models/vacio-provoleta-3D.glb',
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Delicioso vacio\nasado desmechado', x: 15, y: 25, align: 'left', mobileX: 28, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Clásico chimichurri con cebolla', x: 20, y: 50, align: 'left', mobileX: 70, mobileY: 83, mobileAlign: 'left' },
            { id: 3, name: 'Morrón salteado\na fuego lento', x: 15, y: 75, align: 'left', mobileX: 28, mobileY: 70, mobileAlign: 'left' },
            { id: 4, name: 'Provoleta y\nmuzzarella', x: 75, y: 30, align: 'right', mobileX: 72, mobileY: 25, mobileAlign: 'right' },
            { id: 5, name: 'Semolin en la tapa', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 67, mobileAlign: 'right' },
        ]
    },
    'American chicken': {
        id: 'american-chicken-001',
        name: 'American chicken',
        image: '/images/final/empanada-american-chicken.png',
        modelUrl: '/models/american-chicken-3D.glb',
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Chicken sabroso\ny dulce', x: 15, y: 30, align: 'left', mobileX: 28, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Bacón crujiente\nbraseado', x: 75, y: 30, align: 'right', mobileX: 72, mobileY: 30, mobileAlign: 'right' },
            { id: 3, name: 'Mar de cheddar', x: 15, y: 70, align: 'left', mobileX: 20, mobileY: 70, mobileAlign: 'left' },
        ]
    },
    'Jamón y queso': {
        id: 'jamon-queso-001',
        name: 'Jamón y queso',
        image: 'https://i.postimg.cc/fyWNFt0W/Jamon-y-queso.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido\nfeteado', x: 15, y: 40, align: 'left', mobileX: 50, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Abundante muzzarella seleccionada', x: 75, y: 60, align: 'right', mobileX: 30, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Jamón, huevo y queso': {
        id: 'jamon-huevo-queso-001',
        name: 'Jamón, huevo y queso',
        image: 'https://i.postimg.cc/3rZBTPXq/jamon-y-huevo.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido en cubos', x: 15, y: 30, align: 'left', mobileX: 40, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Colmado de muzzarella seleccionada', x: 75, y: 40, align: 'right', mobileX: 40, mobileY: 70, mobileAlign: 'right' },
            { id: 3, name: 'Huevo duro', x: 20, y: 70, align: 'left', mobileX: 20, mobileY: 70, mobileAlign: 'left' },
        ]
    },
    'Carne picante': {
        id: 'carne-picante-001',
        name: 'Carne picante',
        image: 'https://i.postimg.cc/fLCSdvyz/Carne-picante.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Corte de paleta\npremium', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Salteado de cebolla\ny morrón', x: 20, y: 50, align: 'left', mobileX: 30, mobileY: 70, mobileAlign: 'left' },
            { id: 3, name: 'Verdeo y\nhuevo duro', x: 75, y: 35, align: 'right', mobileX: 80, mobileY: 35, mobileAlign: 'right' },
            { id: 4, name: 'Especias y\nají picante', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Carne con aceituna': {
        id: 'carne-aceituna-001',
        name: 'Carne con aceituna',
        image: 'https://i.postimg.cc/MHHWPC0L/con-aceitunas.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Corte de paleta\npremium', x: 15, y: 25, align: 'left', mobileX: 20, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Salteado de cebolla,\nmorrón, verdeo\ncon huevo duro', x: 20, y: 50, align: 'left', mobileX: 35, mobileY: 70, mobileAlign: 'left' },
            { id: 3, name: 'Abundantes rodajas\nde aceitunas verdes', x: 75, y: 35, align: 'right', mobileX: 70, mobileY: 25, mobileAlign: 'right' },
            { id: 4, name: 'Delicadas especias', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Carne a cuchillo': {
        id: 'carne-cuchillo-001',
        name: 'Carne a cuchillo',
        image: 'https://i.postimg.cc/d12LYjrR/Carne-a-cuchillo.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Carne cuadrada premium\ncon corte a cuchillo\nartesanal', x: 15, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Mix de morrón\ny huevo', x: 75, y: 40, align: 'right', mobileX: 60, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Toque secreto\nsalteño', x: 75, y: 70, align: 'right', mobileX: 70, mobileY: 80, mobileAlign: 'right' },
        ]
    },
    'Carne suave': {
        id: 'carne-suave-001',
        name: 'Carne suave',
        image: 'https://i.postimg.cc/NMjmpnW9/Carne-Suave.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Corte de paleta\npremium', x: 15, y: 30, align: 'left', mobileX: 27, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Salteado con\ncebolla y morrón', x: 20, y: 60, align: 'left', mobileX: 27, mobileY: 75, mobileAlign: 'left' },
            { id: 3, name: 'Huevo duro', x: 75, y: 40, align: 'right', mobileX: 73, mobileY: 30, mobileAlign: 'right' },
            { id: 4, name: 'Delicadas especias\nde nuestra tradición', x: 75, y: 70, align: 'right', mobileX: 73, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Queso y cebolla': {
        id: 'queso-cebolla-001',
        name: 'Queso y cebolla',
        image: 'https://i.postimg.cc/1XtxRybm/Cebolla.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Perfecta union\nmuzzarella seleccionada', x: 15, y: 35, align: 'left', mobileX: 27, mobileY: 27, mobileAlign: 'left' },
            { id: 2, name: 'Salteado\nde cebolla', x: 75, y: 40, align: 'right', mobileX: 73, mobileY: 35, mobileAlign: 'right' },
            { id: 3, name: 'Toque de quesardo\nestacionado', x: 75, y: 70, align: 'right', mobileX: 73, mobileY: 75, mobileAlign: 'right' },
        ]
    },
    'Roquefort con jamón': {
        id: 'roquefort-jamon-001',
        name: 'Roquefort con jamón',
        image: 'https://i.postimg.cc/L5m9pQGp/Roquefort-con-jamon.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido\nfeteado', x: 15, y: 40, align: 'left', mobileX: 27, mobileY: 27, mobileAlign: 'left' },
            { id: 2, name: 'Intenso queso\nroquefort premium', x: 75, y: 60, align: 'right', mobileX: 72, mobileY: 75, mobileAlign: 'right' },
        ]
    },
    'Pollo': {
        id: 'pollo-001',
        name: 'Pollo',
        image: 'https://i.postimg.cc/NGS2HDk4/pollo.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Suprema de pollo\ncortada en trozos\na base de cebolla', x: 15, y: 25, align: 'left', mobileX: 28, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Morrón y\nsalsa de especias', x: 20, y: 55, align: 'left', mobileX: 28, mobileY: 70, mobileAlign: 'left' },
            { id: 3, name: 'Cocinado\na fuego lento', x: 75, y: 40, align: 'right', mobileX: 72, mobileY: 30, mobileAlign: 'right' },
            { id: 4, name: 'Finalizado con\nhuevo duro', x: 75, y: 70, align: 'right', mobileX: 72, mobileY: 75, mobileAlign: 'right' },
        ]
    },
    'Cuatro quesos': {
        id: 'cuatro-quesos-001',
        name: 'Cuatro quesos',
        image: 'https://i.postimg.cc/rw1NF3W3/cuatro-quesos.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Blend de abundante\nqueso muzzarella', x: 15, y: 25, align: 'left', mobileX: 28, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Quesardo\nseleccionado', x: 20, y: 50, align: 'left', mobileX: 28, mobileY: 70, mobileAlign: 'left' },
            { id: 3, name: 'Roquefort\nintenso', x: 75, y: 35, align: 'right', mobileX: 72, mobileY: 30, mobileAlign: 'right' },
            { id: 4, name: 'Provolone\nestacionado', x: 75, y: 70, align: 'right', mobileX: 72, mobileY: 80, mobileAlign: 'right' },
        ]
    },
    'Pollo al champignon': {
        id: 'pollo-champignon-001',
        name: 'Pollo al champignon',
        image: 'https://i.postimg.cc/rmGWykxP/champi.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Suprema de pollo\ncortada en trozos', x: 15, y: 35, align: 'left', mobileX: 28, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Cremosa salsa\nbechamel', x: 75, y: 40, align: 'right', mobileX: 73, mobileY: 30, mobileAlign: 'right' },
            { id: 3, name: 'Champignon fresco\nsalteado', x: 75, y: 70, align: 'right', mobileX: 73, mobileY: 75, mobileAlign: 'right' },
        ]
    },
    'Choclo': {
        id: 'choclo-001',
        name: 'Choclo',
        image: 'https://i.postimg.cc/t40x6JkM/choclo.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Deliciosa mezcla\nde choclo entero', x: 15, y: 30, align: 'left', mobileX: 28, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Choclo\ncremoso', x: 20, y: 60, align: 'left', mobileX: 25, mobileY: 68, mobileAlign: 'left' },
            { id: 3, name: 'Especias', x: 75, y: 40, align: 'right', mobileX: 71, mobileY: 32, mobileAlign: 'right' },
            { id: 4, name: 'Abundante queso\nmuzzarella', x: 75, y: 70, align: 'right', mobileX: 72, mobileY: 78, mobileAlign: 'right' },
        ]
    },
    'Verdura': {
        id: 'verdura-001',
        name: 'Verdura',
        image: 'https://i.postimg.cc/zGcQZVmp/verdura.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Salteado de espinaca,\ncebolla, morrón,\npuerro y verdeo', x: 15, y: 25, align: 'left', mobileX: 28, mobileY: 15, mobileAlign: 'left' },
            { id: 2, name: 'Cremosa salsa\nbechamel', x: 20, y: 55, align: 'left', mobileX: 28, mobileY: 70, mobileAlign: 'left' },
            { id: 3, name: 'Rebosada de abundante\nmuzzarella', x: 75, y: 40, align: 'right', mobileX: 73, mobileY: 30, mobileAlign: 'right' },
            { id: 4, name: 'Queso sardo\nestacionado', x: 75, y: 70, align: 'right', mobileX: 73, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Calabaza': {
        id: 'calabaza-001',
        name: 'Calabaza',
        image: 'https://i.postimg.cc/brr5kQtn/Calabaza.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Calabaza horneada\nespeciada', x: 15, y: 40, align: 'left', mobileX: 28, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Abundante muzzarella\nen tapa integral', x: 75, y: 50, align: 'right', mobileX: 72, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Semillas', x: 75, y: 75, align: 'right', mobileX: 80, mobileY: 75, mobileAlign: 'right' },
        ]
    },
    'Panceta y ciruela': {
        id: 'panceta-ciruela-001',
        name: 'Panceta y ciruela',
        image: 'https://i.postimg.cc/D08fz9NT/panceta-y-ciruela.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Panceta ahumada\nfeteada', x: 15, y: 35, align: 'left', mobileX: 28, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Abundante queso\nmuzzarella', x: 75, y: 45, align: 'right', mobileX: 72, mobileY: 26, mobileAlign: 'right' },
            { id: 3, name: 'Ciruelas\nen pasas', x: 75, y: 70, align: 'right', mobileX: 80, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    // PIZZAS
    'Muzzarella_PIZZA': {
        id: 'pizza-muzza-001',
        name: 'Muzzarella',
        image: 'https://i.postimg.cc/50Lkjt7H/Muzza-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Salsa de tomate\ncasera artesanal', x: 20, y: 30, align: 'left', mobileX: 30, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Abundante\nmuzzarella', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 30, mobileAlign: 'right' },
            { id: 3, name: 'Aceitunas\nverdes', x: 50, y: 77, align: 'center', mobileX: 50, mobileY: 70, mobileAlign: 'center' },
        ]
    },
    'Doble muzzarella_PIZZA': {
        id: 'pizza-doble-muzza-001',
        name: 'Doble muzzarella',
        image: 'https://i.postimg.cc/50Lkjt7H/Muzza-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Doble carga de\nmuzzarella', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 30, mobileAlign: 'right' },
            { id: 2, name: 'Salsa de tomate\nartesanal', x: 20, y: 30, align: 'left', mobileX: 30, mobileY: 25, mobileAlign: 'left' },
        ]
    },
    'Muzzarella con jamón_PIZZA': {
        id: 'pizza-muzza-jamon-001',
        name: 'Muzzarella con jamón',
        image: 'https://i.postimg.cc/7hPMDPpr/Muzza-con-Jamon-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido\nde primera', x: 25, y: 40, align: 'left', mobileX: 30, mobileY: 35, mobileAlign: 'left' },
            { id: 2, name: 'Base de\nmuzzarella', x: 75, y: 30, align: 'right', mobileX: 70, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Morrón\nasado', x: 70, y: 65, align: 'right', mobileX: 65, mobileY: 65, mobileAlign: 'right' },
        ]
    },
    'Jamón con morrones_PIZZA': {
        id: 'pizza-jamon-morrones-001',
        name: 'Jamón con morrones',
        image: 'https://i.postimg.cc/Y9rmLn81/Jamon-con-morrones-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Morrones asados\ndulces', x: 20, y: 30, align: 'left', mobileX: 30, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Jamón cocido\nfeteado', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
            { id: 3, name: 'Muzzarella', x: 50, y: 75, align: 'center', mobileX: 50, mobileY: 75, mobileAlign: 'center' },
        ]
    },
    'Napolitana_PIZZA': {
        id: 'pizza-napo-001',
        name: 'Napolitana',
        image: 'https://i.postimg.cc/gcv2bqDp/Napo-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Rodajas de\ntomate fresco', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Salsa casera\nde provenzal', x: 75, y: 25, align: 'right', mobileX: 70, mobileY: 20, mobileAlign: 'right' },
            { id: 3, name: 'Queso\nmuzzarella', x: 75, y: 60, align: 'right', mobileX: 70, mobileY: 65, mobileAlign: 'right' },
        ]
    },
    'Napolitana con jamón_PIZZA': {
        id: 'pizza-napo-jamon-001',
        name: 'Napolitana con jamón',
        image: 'https://i.postimg.cc/pL9NRPHj/Napo-con-Jamon-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido', x: 20, y: 50, align: 'left', mobileX: 25, mobileY: 50, mobileAlign: 'left' },
            { id: 2, name: 'Tomate fresco\nen rodajas', x: 75, y: 30, align: 'right', mobileX: 70, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Topping de\nprovenzal', x: 60, y: 70, align: 'right', mobileX: 60, mobileY: 75, mobileAlign: 'right' },
        ]
    },
    'Provolone_PIZZA': {
        id: 'pizza-provo-001',
        name: 'Provolone',
        image: 'https://i.postimg.cc/zfSx1QVW/Provolone-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Queso provolone\ngratinado', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Ají molido y\norégano', x: 75, y: 30, align: 'right', mobileX: 70, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Aceitunas', x: 75, y: 65, align: 'right', mobileX: 70, mobileY: 70, mobileAlign: 'right' },
        ]
    },
    'Provolone con jamón_PIZZA': {
        id: 'pizza-provo-jamon-001',
        name: 'Provolone con jamón',
        image: 'https://i.postimg.cc/RZvRLRPZ/Provolone-con-Jamon-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Provolone\ngratinado', x: 25, y: 30, align: 'left', mobileX: 30, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Jamón cocido', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
            { id: 3, name: 'Toque de\norégano', x: 50, y: 70, align: 'center', mobileX: 50, mobileY: 75, mobileAlign: 'center' },
        ]
    },
    'Panceta_PIZZA': {
        id: 'pizza-panceta-001',
        name: 'Panceta',
        image: 'https://i.postimg.cc/Kc9v8stP/Panceta-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Panceta ahumada\ncrujiente', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Muzzarella', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
        ]
    },
    'Roquefort_PIZZA': {
        id: 'pizza-roque-001',
        name: 'Roquefort',
        image: 'https://i.postimg.cc/g0CLNcYH/Roquefort-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Queso roquefort\nintenso', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Base de\nmuzzarella', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
        ]
    },
    'Roquefort con jamón_PIZZA': {
        id: 'pizza-roque-jamon-001',
        name: 'Roquefort con jamón',
        image: 'https://i.postimg.cc/HWqHnJ62/Roquefort-con-Jamon-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Roquefort', x: 25, y: 30, align: 'left', mobileX: 30, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Jamón cocido', x: 75, y: 35, align: 'right', mobileX: 70, mobileY: 30, mobileAlign: 'right' },
            { id: 3, name: 'Muzzarella', x: 50, y: 70, align: 'center', mobileX: 50, mobileY: 75, mobileAlign: 'center' },
        ]
    },
    'Cuatro quesos_PIZZA': {
        id: 'pizza-4quesos-001',
        name: 'Cuatro quesos',
        image: 'https://i.postimg.cc/9MqmgyxD/Cuatro-Quesos-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Muzzarella', x: 20, y: 30, align: 'left', mobileX: 25, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Roquefort', x: 75, y: 30, align: 'right', mobileX: 75, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Provolone', x: 20, y: 65, align: 'left', mobileX: 25, mobileY: 65, mobileAlign: 'left' },
            { id: 4, name: 'Parmesano', x: 75, y: 65, align: 'right', mobileX: 75, mobileY: 65, mobileAlign: 'right' },
        ]
    },
    'Provenzal_PIZZA': {
        id: 'pizza-provenzal-001',
        name: 'Provenzal',
        image: 'https://i.postimg.cc/V6FG8VZp/Provenzal-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Ajo deshidratado\ny perejil', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Muzzarella', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
        ]
    },
    'Fugazzeta_PIZZA': {
        id: 'pizza-fugazzeta-001',
        name: 'Fugazzeta',
        image: 'https://i.postimg.cc/HLdbgkGW/Fugazzeta-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Cebolla blanca\nen juliana', x: 25, y: 30, align: 'left', mobileX: 30, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Queso\nProvolone', x: 75, y: 35, align: 'right', mobileX: 70, mobileY: 30, mobileAlign: 'right' },
            { id: 3, name: 'Muzzarella', x: 50, y: 70, align: 'center', mobileX: 50, mobileY: 75, mobileAlign: 'center' },
        ]
    },
    'Fugazzeta con panceta_PIZZA': {
        id: 'pizza-fugazzeta-panceta-001',
        name: 'Fugazzeta con panceta',
        image: 'https://i.postimg.cc/135Ft5Rv/Fugazzeta-con-Panceta-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Cebolla', x: 20, y: 30, align: 'left', mobileX: 25, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Panceta\ncrujiente', x: 75, y: 40, align: 'right', mobileX: 75, mobileY: 35, mobileAlign: 'right' },
            { id: 3, name: 'Provolone', x: 50, y: 75, align: 'center', mobileX: 50, mobileY: 75, mobileAlign: 'center' },
        ]
    },
    'Fugazzeta con jamón_PIZZA': {
        id: 'pizza-fugazzeta-jamon-001',
        name: 'Fugazzeta con jamón',
        image: 'https://i.postimg.cc/WbqKyTcf/Fugazzeta-con-Jamon-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Cebolla', x: 20, y: 30, align: 'left', mobileX: 25, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Jamón cocido', x: 75, y: 40, align: 'right', mobileX: 75, mobileY: 35, mobileAlign: 'right' },
            { id: 3, name: 'Provolone', x: 50, y: 75, align: 'center', mobileX: 50, mobileY: 75, mobileAlign: 'center' },
        ]
    },
    'Caprese_PIZZA': {
        id: 'pizza-caprese-001',
        name: 'Caprese',
        image: 'https://i.postimg.cc/MGwpT9Yq/Caprese-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Tomate', x: 20, y: 30, align: 'left', mobileX: 25, mobileY: 25, mobileAlign: 'left' },
            { id: 2, name: 'Albahaca\nfresca', x: 75, y: 30, align: 'right', mobileX: 75, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Aceite de oliva', x: 50, y: 70, align: 'center', mobileX: 50, mobileY: 70, mobileAlign: 'center' },
        ]
    },
    'Jamón, tomate y huevo_PIZZA': {
        id: 'pizza-jamon-tomate-huevo-001',
        name: 'Jamón, tomate y huevo',
        image: 'https://i.postimg.cc/TYHkfSf5/Jamon-Tomate-y-Huevo-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido', x: 20, y: 25, align: 'left', mobileX: 25, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Tomate fresco', x: 75, y: 30, align: 'right', mobileX: 75, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Huevo cocido', x: 50, y: 75, align: 'center', mobileX: 50, mobileY: 75, mobileAlign: 'center' },
        ]
    },
    'Muzzarella con huevo_PIZZA': {
        id: 'pizza-muzza-huevo-001',
        name: 'Muzzarella con huevo',
        image: 'https://i.postimg.cc/dVygXvrV/Muzza-con-Huevo-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Huevo picado', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Muzzarella', x: 75, y: 35, align: 'right', mobileX: 70, mobileY: 30, mobileAlign: 'right' },
            { id: 3, name: 'Tomate', x: 50, y: 70, align: 'center', mobileX: 50, mobileY: 70, mobileAlign: 'center' },
        ]
    },
    'Jamón y huevo_PIZZA': {
        id: 'pizza-jamon-huevo-001',
        name: 'Jamón y huevo',
        image: 'https://i.postimg.cc/hGhsw1Hb/Jamon-y-huevo-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Huevo cocido', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
        ]
    },
    'Jamón, tomate, huevo y roquefort_PIZZA': {
        id: 'pizza-jthr-001',
        name: 'Jamón, tomate, huevo y roquefort',
        image: 'https://i.postimg.cc/3NMHWRgV/Jamon-tomate-huevo-y-roquefort-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón y huevo', x: 20, y: 25, align: 'left', mobileX: 25, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Roquefort', x: 75, y: 30, align: 'right', mobileX: 75, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Rodajas de tomate', x: 50, y: 75, align: 'center', mobileX: 50, mobileY: 75, mobileAlign: 'center' },
        ]
    },
    'Provolone, jamón y morrón_PIZZA': {
        id: 'pizza-pjm-001',
        name: 'Provolone, jamón y morrón',
        image: 'https://i.postimg.cc/c4BryyW0/Provolone-Jamon-y-Morron-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Provolone', x: 20, y: 25, align: 'left', mobileX: 25, mobileY: 20, mobileAlign: 'left' },
            { id: 2, name: 'Morrones', x: 75, y: 30, align: 'right', mobileX: 75, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Jamón cocido', x: 50, y: 75, align: 'center', mobileX: 50, mobileY: 75, mobileAlign: 'center' },
        ]
    },
    'Panceta y verdeo_PIZZA': {
        id: 'pizza-panceta-verdeo-001',
        name: 'Panceta y verdeo',
        image: 'https://i.postimg.cc/R05SNg4X/Panceta-y-verdeo-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Panceta', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Verdeo fresco', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
        ]
    },
    // PIZZAS INDI
    'Jamón crudo, rúcula y stracciatella INDI_INDI': {
        id: 'indi-crudo-rucula-001',
        name: 'Jamón crudo, rúcula y stracciatella INDI',
        image: 'https://i.postimg.cc/T3Szw1qx/INDI-Rucula-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón crudo', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Rúcula fresca', x: 75, y: 30, align: 'right', mobileX: 70, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Stracciatella', x: 50, y: 70, align: 'center', mobileX: 50, mobileY: 70, mobileAlign: 'center' },
        ]
    },
    'Mortadela, pistacho y stracciatella INDI_INDI': {
        id: 'indi-mortadela-pistacho-001',
        name: 'Mortadela, pistacho y stracciatella INDI',
        image: 'https://i.postimg.cc/j5kP0VYM/Indi-Mortadela-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Mortadela', x: 20, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Pistachos', x: 75, y: 30, align: 'right', mobileX: 70, mobileY: 25, mobileAlign: 'right' },
            { id: 3, name: 'Stracciatella', x: 50, y: 70, align: 'center', mobileX: 50, mobileY: 70, mobileAlign: 'center' },
        ]
    },
    'Pepperoni INDI_INDI': {
        id: 'indi-pepperoni-001',
        name: 'Pepperoni INDI',
        image: 'https://i.postimg.cc/BZPG1dns/INDI-Pepperonni-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Pepperoni', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Mozzarella', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
        ]
    },
    'Jamón y morrón INDI_INDI': {
        id: 'indi-jamon-morron-001',
        name: 'Jamón y morrón INDI',
        image: 'https://i.postimg.cc/y6DS3YRd/INDI-Jamon-y-morrones-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Jamón cocido', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Morrones asados', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
        ]
    },
    'Napolitana INDI_INDI': {
        id: 'indi-napo-001',
        name: 'Napolitana INDI',
        image: 'https://i.postimg.cc/HkvgMHXY/INDI-Napo-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Rodajas de tomate', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Salsa provenzal', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
        ]
    },
    'Muzza INDI_INDI': {
        id: 'indi-muzza-001',
        name: 'Muzza INDI',
        image: 'https://i.postimg.cc/sgkTqNRP/INDI-Muzza-Photoroom.png',
        modelUrl: '/models/cheese-burger-3D.glb', // Placeholder
        cameraOrbit: '0deg 75deg 3m',
        ingredients: [
            { id: 1, name: 'Mozzarella', x: 25, y: 35, align: 'left', mobileX: 30, mobileY: 30, mobileAlign: 'left' },
            { id: 2, name: 'Salsa artesanal', x: 75, y: 40, align: 'right', mobileX: 70, mobileY: 35, mobileAlign: 'right' },
        ]
    }
};
