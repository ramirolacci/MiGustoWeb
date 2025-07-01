import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Viewer3D from '../components/Viewer3D.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Agregar la clase lovers-page al body para estilos específicos
if (typeof document !== 'undefined') {
  document.body.classList.add('lovers-page');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/lovers">
      <Routes>
        <Route path="3d" element={<Viewer3D />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
