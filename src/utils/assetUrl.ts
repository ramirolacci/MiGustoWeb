/**
 * Prefija rutas de public/ con import.meta.env.BASE_URL (ej. /tools/remastered/).
 * Usar para imágenes, videos, modelos 3D e íconos locales.
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}
