import React, { useEffect } from 'react';
import Revista from '../components/Revista';
import '../components/Productos.css';
import { useNavigate } from 'react-router-dom';
// NavBar se renderiza globalmente en App; no es necesario aquí
import { empanadas } from '../data/empanadasData';
import { pizzas } from '../data/pizzasData';
import { pizzasIndi } from '../data/pizzasIndiData';
import { fitzzas } from '../data/fitzzasData';
import { salsas } from '../data/salsasData';
import { postres } from '../data/postresData';

const Carta: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    import('scrollreveal').then((module) => {
      const sr = module.default ? module.default : module;
      sr().reveal('.productos-titulo', {
        distance: '20px',
        duration: 1400,
        origin: 'top',
        opacity: 0,
        reset: true
      });
      // Elimino el reveal sobre .revista-section para evitar doble animación
      // sr().reveal('.revista-section', {
      //   distance: '30px',
      //   duration: 1600,
      //   origin: 'bottom',
      //   opacity: 0,
      //   reset: true
      // });
    });
  }, []);
  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: '#000',
          paddingTop: '6px',
        }}
      >
        <div className="background-overlay"></div>
        <div className="carta-container">
          {/* Barra de categorías igual que en Productos */}
          <div className="categories-section">
            <div className="categories-container">
              <div className="categories-scroll">
                {[
                  { key: 'Premium', label: 'Premium', icon: '/images/burgerLoading.png' },
                  { key: 'Clasicas', label: 'Clásicas', icon: empanadas.find(e => !e.esPremium)?.imagen || '/icons/products/empanadas-clasicas.svg' },
                  { key: 'Pizzas', label: 'Pizzas', icon: pizzas.find(p => p.titulo === 'Caprese')?.imagen || '/icons/products/pizza.svg' },
                  { key: 'Pizzas INDI', label: 'Pizzas INDI', icon: pizzasIndi[0]?.imagen || '/icons/products/pizza.svg' },
                  { key: 'Fitzzas', label: 'Fitzzas', icon: fitzzas[0]?.imagen || '/icons/products/fitzza.svg' },
                  { key: 'Salsas', label: 'Aderezos', icon: salsas.find(s => s.titulo.toLowerCase() === 'bbq')?.imagen || '/icons/products/aderezos.svg' },
                  { key: 'Postres', label: 'Postres', icon: postres[0]?.imagen || '/icons/products/postres.svg' },
                  { key: 'Carta', label: 'Carta', icon: '/images/carta.svg' },
                  { key: 'Promociones', label: 'Promos y Packs', icon: '/images/promotions/promoIcon.png' },
                ].map((category) => {
                  const isActive = category.key === 'Carta';
                  return (
                    <button
                      key={category.key}
                      className={`category-chip ${isActive ? 'active' : ''} ${category.key === 'Promociones' ? 'promociones-chip' : ''} ${category.key === 'Carta' ? 'carta-chip' : ''} ${category.key === 'Premium' ? 'premium-chip' : ''} ${category.key === 'Clasicas' ? 'clasicas-chip' : ''} ${category.key === 'Pizzas' ? 'pizzas-chip' : ''} ${category.key === 'Pizzas INDI' ? 'pizzas-indi-chip' : ''} ${category.key === 'Fitzzas' ? 'fitzzas-chip' : ''} ${category.key === 'Salsas' ? 'aderezos-chip' : ''} ${category.key === 'Postres' ? 'postres-chip' : ''}`}
                      onClick={() => {
                        if (category.key === 'Carta') {
                          try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
                          navigate('/carta');
                        } else if (category.key === 'Premium') {
                          navigate('/productos?tab=Empanadas&type=Premium');
                        } else if (category.key === 'Clasicas') {
                          navigate('/productos?tab=Empanadas&type=Clasicas');
                        } else {
                          navigate(`/productos?tab=${encodeURIComponent(category.key)}`);
                        }
                      }}
                    >
                      <div className="category-icon">
                        <img src={category.icon} alt={category.label} />
                      </div>
                      <span className="category-label">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <h2 className="productos-titulo">Deslizá para explorar nuestra carta</h2> */}
          <Revista />
        </div>
      </div>
    </>
  );
};

export default Carta; 