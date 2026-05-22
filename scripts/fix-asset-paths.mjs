/**
 * Aplica assetUrl() a rutas locales (/assets, /images, /icons, /models, /videos).
 * Ejecutar una vez: node scripts/fix-asset-paths.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '..', 'src');
const ROOT = path.join(__dirname, '..');

const ASSET_PATH_RE =
  /(['"])(\/(?:assets|images|icons|models|videos)\/[^'"]*)\1/g;
const FRANQUICIA_RE = /(['"])(\/franquicia\.png)\1/g;
const JSX_ATTR_RE =
  /\s(src|poster)=(["'])(\/(?:assets|images|icons|models|videos)\/[^"']*)\2/g;

function relImport(fromFile) {
  const fromDir = path.dirname(fromFile);
  let rel = path.relative(fromDir, path.join(SRC, 'utils', 'assetUrl')).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel.replace(/\.ts$/, '');
}

function ensureImport(content, fromFile) {
  if (!content.includes('assetUrl(')) return content;
  if (/from ['"].*assetUrl['"]/.test(content)) return content;
  const importPath = relImport(fromFile);
  const line = `import { assetUrl } from '${importPath}';\n`;
  const m = content.match(/^import .+;\n/m);
  if (m) {
    const idx = content.indexOf(m[0]) + m[0].length;
    return content.slice(0, idx) + line + content.slice(idx);
  }
  return line + content;
}

function fixTsContent(content, filePath) {
  let next = content.replace(JSX_ATTR_RE, ' $1={assetUrl($2$3$2)}');
  next = next.replace(ASSET_PATH_RE, 'assetUrl($1$2$1)');
  next = next.replace(FRANQUICIA_RE, 'assetUrl($1$2$1)');
  return ensureImport(next, filePath);
}

function fixCssContent(content) {
  return content
    .replace(/url\(['"]?\/images\//g, "url('../../public/images/")
    .replace(/url\(['"]?\/assets\//g, "url('../../public/assets/");
}

function walk(dir, ext, fn) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, ext, fn);
    else if (full.endsWith(ext)) fn(full);
  }
}

let changed = 0;
walk(SRC, '.ts', (file) => {
  if (file.endsWith('assetUrl.ts')) return;
  const raw = fs.readFileSync(file, 'utf8');
  const out = fixTsContent(raw, file);
  if (out !== raw) {
    fs.writeFileSync(file, out);
    changed++;
    console.log('TS:', path.relative(ROOT, file));
  }
});
walk(SRC, '.tsx', (file) => {
  const raw = fs.readFileSync(file, 'utf8');
  const out = fixTsContent(raw, file);
  if (out !== raw) {
    fs.writeFileSync(file, out);
    changed++;
    console.log('TSX:', path.relative(ROOT, file));
  }
});
walk(SRC, '.css', (file) => {
  const raw = fs.readFileSync(file, 'utf8');
  const out = fixCssContent(raw);
  if (out !== raw) {
    fs.writeFileSync(file, out);
    changed++;
    console.log('CSS:', path.relative(ROOT, file));
  }
});

console.log(`\nListo: ${changed} archivos actualizados.`);
