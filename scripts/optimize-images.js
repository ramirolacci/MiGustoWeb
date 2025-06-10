const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');

// Asegurarse de que el directorio de imágenes optimizadas existe
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR);
}

// Configuración de optimización
const optimizationConfig = {
  quality: 80,
  width: 1920, // Ancho máximo
  height: 1080, // Alto máximo
  fit: 'inside', // Mantener proporción
  format: 'webp' // Usar formato WebP
};

// Función para optimizar una imagen
async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const outputPath = path.join(OPTIMIZED_DIR, `${path.parse(fileName).name}.webp`);

  try {
    await sharp(filePath)
      .resize(optimizationConfig)
      .webp({ quality: optimizationConfig.quality })
      .toFile(outputPath);
    
    console.log(`✅ Optimizada: ${fileName}`);
  } catch (error) {
    console.error(`❌ Error optimizando ${fileName}:`, error);
  }
}

// Función para procesar todas las imágenes
async function processImages() {
  const files = fs.readdirSync(PUBLIC_DIR);
  
  for (const file of files) {
    const filePath = path.join(PUBLIC_DIR, file);
    const ext = path.extname(file).toLowerCase();
    
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      await optimizeImage(filePath);
    }
  }
}

// Ejecutar el proceso
processImages().then(() => {
  console.log('✨ Proceso de optimización completado');
}); 