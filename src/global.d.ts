// src/global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    // Allow <model-viewer ... /> in TSX. Use a more specific type if you want to type attributes.
    'model-viewer': any;
  }
}
