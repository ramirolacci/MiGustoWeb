/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_SHEETDB_URL: string;
  // Agrega aquí cualquier otra variable que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
