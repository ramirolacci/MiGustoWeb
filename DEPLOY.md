# Despliegue en https://migusto.com.ar/tools/remastered/

## Build

```bash
pnpm run build
```

Subir **todo el contenido de `dist/`** a la carpeta del servidor:

`.../tools/remastered/`

Debe quedar así en el servidor:

```
tools/remastered/
  index.html
  .htaccess          ← obligatorio en Apache
  assets/
  images/
  models/
  videos/
  icons/
  root/
```

## Apache (cPanel / hosting compartido)

1. El archivo `public/.htaccess` se copia a `dist/.htaccess` en cada build.
2. Subilo junto con el resto de `dist/`.
3. En el hosting, `AllowOverride` debe permitir `FileInfo` (normalmente ya está en cPanel).

Si `/productos2` sigue en 404, en cPanel activá **mod_rewrite** y revisá que no haya otro `.htaccess` en `/tools/` que bloquee el de `remastered/`.

## Probar

- https://migusto.com.ar/tools/remastered/
- https://migusto.com.ar/tools/remastered/productos2  ← debe cargar la app, no 404 Apache

## Error "Cannot use import statement outside a module"

Suele pasar cuando el servidor devuelve **HTML de error 404** en lugar del archivo `.js` de `assets/`. Revisá que la carpeta `assets/` esté subida completa y que `.htaccess` esté presente.
