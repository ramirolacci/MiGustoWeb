/*
  Genera íconos PWA (192 y 512) desde una imagen fuente.
  Fuente por defecto: public/assets/Logo Mi Gusto 2025.png (si existe) o public/icono.png
*/
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, 'public');
const iconsDir = path.join(publicDir, 'icons');

const candidates = [
  path.join(publicDir, 'assets', 'Logo Mi Gusto 2025.png'),
  path.join(publicDir, 'icono.png'),
  path.join(publicDir, 'logo.jpg')
];

const source = candidates.find((p) => fs.existsSync(p));
if (!source) {
  console.error('No se encontró imagen fuente. Coloca una en public/assets/Logo Mi Gusto 2025.png o public/icono.png');
  process.exit(1);
}

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const outputs = [
  { size: 192, file: path.join(iconsDir, 'icon-192.png') },
  { size: 512, file: path.join(iconsDir, 'icon-512.png') },
  // opcional: maskable (mismo contenido; idealmente aportar una imagen con safe area)
  { size: 192, file: path.join(iconsDir, 'icon-maskable-192.png') },
  { size: 512, file: path.join(iconsDir, 'icon-maskable-512.png') },
];

async function run() {
  console.log('Generando íconos desde:', source);
  for (const o of outputs) {
    await sharp(source)
      .resize(o.size, o.size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(o.file);
    console.log('Creado:', path.relative(projectRoot, o.file));
  }
  console.log('Listo.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


