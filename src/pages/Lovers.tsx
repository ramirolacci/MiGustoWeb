import React, { useState } from 'react';
import { Users, Gift } from 'lucide-react';
import { Percent, Crown } from 'lucide-react';
import NavBar from '../components/NavBar';
import '../pages/Contacto.css';
import Empanada1 from '../lovers/assets/Empanadas/Mexican-Veggie-demo.png';
import Empanada2 from '../lovers/assets/Empanadas/Mexican-Pibil-Pork-demo.png';
import Empanada3 from '../lovers/assets/Empanadas/Matambre a la pizza.png';
import Empanada4 from '../lovers/assets/Empanadas/burger.png';

const empanadas = [Empanada1, Empanada2, Empanada3, Empanada4];

function EmpanadaRain() {
  const particleCount = 24;
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const left = Math.random() * 100;
    const size = 54 + Math.random() * 64;
    const delay = -Math.random() * 12;
    const duration = 10 + Math.random() * 10;
    const img = empanadas[Math.floor(Math.random() * empanadas.length)];
    const clockwise = Math.random() > 0.5;
    const rotEnd = clockwise ? 360 : -360;
    return (
      <img
        key={i}
        src={img}
        alt="empanada"
        style={{
          position: 'absolute',
          left: `${left}%`,
          width: size,
          height: size,
          animation: `empanada-fall  ${duration}s linear infinite` ,
          animationDelay: `${delay}s`,
          objectFit: 'contain',
          aspectRatio: '1/1',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.9,
        }}
      />
    );
  });
  return (
    <>
      <style>{`
        @keyframes empanada-fall {
          0% {
            opacity: 0;
            transform: translateY(-80px) rotate(0deg);
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(110vh) rotate(var(--rotEnd, 360deg));
          }
        }
      `}</style>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 2 }}>
        {particles}
      </div>
    </>
  );
}

const saboresEmpanadas = [
  "Mexican pibil pork","Mexican veggie","Big burguer","Matambre a la pizza","Cheese burguer","Vacio y provoleta","American chicken","Jamón y queso","Jamón, huevo y queso","Carne picante","Carne con aceituna","Carne a cuchillo","Carne Suave","Queso y cebolla","Roquefort con jamón","Jamón, tomate y albahaca","Pollo","Cuatro quesos","Pollo al champignon","Choclo","Verdura","Calabaza","Panceta y ciruela","Carne"
];

const Lovers = () => {
  // Estado para los sabores seleccionados
  const [saboresSeleccionados, setSaboresSeleccionados] = useState<string[]>([]);
  const [esCliente, setEsCliente] = useState<string>('');
  const [errorEsCliente, setErrorEsCliente] = useState<string>('');
  const [recibirNovedades, setRecibirNovedades] = useState<boolean>(false);

  const handleAgregarSabor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sabor = e.target.value;
    if (sabor && !saboresSeleccionados.includes(sabor) && saboresSeleccionados.length < 3) {
      setSaboresSeleccionados([...saboresSeleccionados, sabor]);
    }
    // Reiniciar el select a vacío
    e.target.value = '';
  };

  const handleQuitarSabor = (sabor: string) => {
    setSaboresSeleccionados(saboresSeleccionados.filter(s => s !== sabor));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: `url('/src/assets/background-text.jpg') center center / cover no-repeat`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <NavBar />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 1300,
        margin: '0 auto',
        paddingTop: '5.5rem',
        zIndex: 10,
        position: 'relative',
        gap: '2.5rem',
      }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginLeft: 0 }}>
            <h2 className="productos-titulo" style={{ marginBottom: '2.5rem', marginTop: 0, maxWidth: 900, textAlign: 'left' }}>
              <span style={{ display: 'block' }}>Programa exclusivo de</span>
              <span style={{ display: 'block', textAlign: 'center' }}>beneficios!</span>
            </h2>
            <p style={{
              color: '#fff',
              fontSize: '1.18rem',
              margin: '0 0 2.2rem 0',
              maxWidth: 700,
              lineHeight: 1.6,
              fontWeight: 400,
              letterSpacing: 0.1,
              textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)',
              textAlign: 'center',
              alignSelf: 'center',
            }}>
              Únete a nuestro programa exclusivo y disfruta de beneficios únicos descuentos especiales y experiencias gastronómicas irrepetibles en todas nuestras sucursales.
            </p>
            {/* Cards de beneficios */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.1rem',
              marginTop: '1.5rem',
              marginBottom: '2.5rem',
              width: '100%',
              maxWidth: 440,
              justifyItems: 'center',
            }}>
              {/* Card 1: Descuentos */}
              <div style={{
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 18,
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                padding: '1.3rem 0.7rem 0.9rem 0.7rem',
                width: 200,
                minWidth: 200,
                maxWidth: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Percent color="#ffc107" size={28} style={{ marginBottom: 10 }} />
                <span style={{ color: '#ffc107', fontWeight: 700, fontSize: '1.01rem', letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>Descuentos</span>
                <span style={{ color: '#fff', fontWeight: 400, fontSize: '0.98rem', marginTop: 16, textAlign: 'center', display: 'block', lineHeight: 1.35, opacity: 0.92 }}>
                  Hasta 25% de descuento y promos especiales.
                </span>
              </div>
              {/* Card 2: Eventos */}
              <div style={{
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 18,
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                padding: '1.3rem 0.7rem 0.9rem 0.7rem',
                width: 200,
                minWidth: 200,
                maxWidth: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Users color="#ffc107" size={28} style={{ marginBottom: 10 }} />
                <span style={{ color: '#ffc107', fontWeight: 700, fontSize: '1.01rem', letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>Eventos</span>
                <span style={{ color: '#fff', fontWeight: 400, fontSize: '0.98rem', marginTop: 16, textAlign: 'center', display: 'block', lineHeight: 1.35, opacity: 0.92 }}>
                  Cenas, catas y eventos únicos.
                </span>
              </div>
              {/* Card 3: VIP */}
              <div style={{
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 18,
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                padding: '1.3rem 0.7rem 0.9rem 0.7rem',
                width: 200,
                minWidth: 200,
                maxWidth: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Crown color="#ffc107" size={28} style={{ marginBottom: 10 }} />
                <span style={{ color: '#ffc107', fontWeight: 700, fontSize: '1.01rem', letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>VIP</span>
                <span style={{ color: '#fff', fontWeight: 400, fontSize: '0.98rem', marginTop: 16, textAlign: 'center', display: 'block', lineHeight: 1.35, opacity: 0.92 }}>
                  Reservas y atención prioritaria.
                </span>
              </div>
              {/* Card 4: Sorteos y Premios */}
              <div style={{
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 18,
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                padding: '1.3rem 0.7rem 0.9rem 0.7rem',
                width: 200,
                minWidth: 200,
                maxWidth: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Gift color="#ffc107" size={28} style={{ marginBottom: 10 }} />
                <span style={{ color: '#ffc107', fontWeight: 700, fontSize: '1.01rem', letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>Sorteos y Premios</span>
                <span style={{ color: '#fff', fontWeight: 400, fontSize: '0.98rem', marginTop: 16, textAlign: 'center', display: 'block', lineHeight: 1.35, opacity: 0.92 }}>
                  Participa por premios y experiencias exclusivas.
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Formulario alineado a la derecha */}
        <div style={{ flex: '0 1 700px', minWidth: 420, maxWidth: 700 }}>
          <div className="contacto-form-container" style={{ margin: 0 }}>
            <h2 style={{ color: '#ffc107', textAlign: 'center', marginBottom: 8, fontWeight: 700, fontSize: '1.5rem' }}>Mi Gusto Lovers</h2>
            <p style={{ color: '#fff', textAlign: 'center', marginBottom: 18, fontSize: '1.05rem', opacity: 0.92 }}>
              Completa el siguiente formulario para ponerte en contacto con Mi Gusto Lovers.
            </p>
            <form className="contacto-form">
              <div className="form-row">
                <div className="form-group half-width" style={{ minWidth: 260, maxWidth: 400 }}>
                  <label htmlFor="nombreCompleto">Nombre completo:<span className="required">*</span></label>
                  <input type="text" id="nombreCompleto" name="nombreCompleto" required placeholder="Ingrese su nombre completo" style={{ width: '100%', minWidth: 220, maxWidth: 400 }} />
                </div>
                <div className="form-group half-width" style={{ minWidth: 260, maxWidth: 400 }}>
                  <label htmlFor="email">E-mail:<span className="required">*</span></label>
                  <input type="email" id="email" name="email" required placeholder="ejemplo@email.com" style={{ width: '100%', minWidth: 220, maxWidth: 400 }} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group half-width" style={{ minWidth: 260, maxWidth: 400 }}>
                  <label htmlFor="telefono">Teléfono:<span className="required">*</span></label>
                  <input type="tel" id="telefono" name="telefono" required placeholder="Ej: +54 9 11 1234-5678" style={{ width: '100%', minWidth: 220, maxWidth: 400 }} />
                  {/* Select de sabores favoritos (nuevo comportamiento) */}
                  <label htmlFor="saboresFavoritos" style={{ marginTop: 18 }}>Tus 3 sabores favoritos:<span className="required">*</span></label>
                  <select
                    id="saboresFavoritos"
                    name="saboresFavoritos"
                    required
                    className="contacto-form"
                    style={{ width: '100%', minWidth: 220, maxWidth: 400, marginBottom: 0 }}
                    onChange={handleAgregarSabor}
                    disabled={saboresSeleccionados.length >= 3}
                    defaultValue=""
                  >
                    <option value="" disabled>Selecciona 3 sabores</option>
                    {saboresEmpanadas.filter(sabor => !saboresSeleccionados.includes(sabor)).map(sabor => (
                      <option key={sabor} value={sabor}>{sabor}</option>
                    ))}
                  </select>
                  {/* Chips de sabores seleccionados */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8, marginBottom: 0 }}>
                    {saboresSeleccionados.map(sabor => (
                      <div key={sabor} style={{ background: '#ffc107', color: '#222', borderRadius: 16, padding: '4px 12px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '0.98rem' }}>
                        {sabor}
                        <button type="button" onClick={() => handleQuitarSabor(sabor)} style={{ marginLeft: 6, background: 'none', border: 'none', color: '#b71c1c', fontWeight: 900, fontSize: 18, cursor: 'pointer', lineHeight: 1 }} aria-label={`Quitar ${sabor}`}>×</button>
                      </div>
                    ))}
                  </div>
                 {/* Campo: ¿Ya eres cliente de Mi Gusto? */}
                 <div className="form-group" style={{ marginTop: 18, marginBottom: 0 }}>
                   <label style={{ fontWeight: 500, color: '#fff', marginBottom: 6, display: 'block' }}>¿Ya eres cliente de Mi Gusto? <span className="required">*</span></label>
                   <div style={{ display: 'flex', gap: 24, marginTop: 6 }}>
                     <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400, color: '#fff' }}>
                       <input
                         type="radio"
                         name="esCliente"
                         value="si"
                         checked={esCliente === 'si'}
                         onChange={() => { setEsCliente('si'); setErrorEsCliente(''); }}
                         style={{ accentColor: '#ffc107' }}
                       />
                       Sí
                     </label>
                     <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400, color: '#fff' }}>
                       <input
                         type="radio"
                         name="esCliente"
                         value="no"
                         checked={esCliente === 'no'}
                         onChange={() => { setEsCliente('no'); setErrorEsCliente(''); }}
                         style={{ accentColor: '#ffc107' }}
                       />
                       No
                     </label>
                   </div>
                   {errorEsCliente && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errorEsCliente}</div>}
                 </div>
                 {/* Checkbox de novedades */}
                 <div className="form-group" style={{ marginTop: 14, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                   <input
                     type="checkbox"
                     id="recibirNovedades"
                     name="recibirNovedades"
                     checked={recibirNovedades}
                     onChange={e => setRecibirNovedades(e.target.checked)}
                     style={{ accentColor: '#ffc107', width: 18, height: 18, margin: 0 }}
                   />
                   <label htmlFor="recibirNovedades" style={{ margin: 0, color: '#fff', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}>
                     Quiero recibir novedades y beneficios exclusivos.
                   </label>
                 </div>
                </div>
                <div className="form-group half-width" style={{ minWidth: 260, maxWidth: 400 }}>
                  <label htmlFor="cumple">Fecha de cumpleaños:<span className="required">*</span></label>
                  <input type="date" id="cumple" name="cumple" required placeholder="Selecciona tu cumpleaños" style={{ width: '100%', minWidth: 220, maxWidth: 400 }} />
                  {/* Select de sucursal habitual */}
                  <label htmlFor="sucursal" style={{ marginTop: 18 }}>Sucursal habitual:<span className="required">*</span></label>
                  <select id="sucursal" name="sucursal" required style={{ width: '100%', minWidth: 220, maxWidth: 400, marginBottom: 0 }}>
                    <option value="" disabled selected>Selecciona tu sucursal</option>
                    {[
                      "Ballester","Balvanera","Barrancas de Belgrano","Belgrano","Bella Vista","Campana","Del Viso","Devoto","Don Torcuato","Escobar","Floresta","Florida","Gral. Pacheco","Hurlingham","Ituzaingó","José C. Paz","Los Polvorines","Martínez","Maschwitz","Mataderos","Merlo","Moreno","Muñiz","Munro","Palermo","Paternal","Pilar Centro"
                    ].map(suc => (
                      <option key={suc} value={suc}>{suc}</option>
                    ))}
                  </select>
                  {/* Botón Enviar Mensaje debajo de Sucursal */}
                  <button type="submit" className="btn-ver-mas" style={{ marginTop: 28 }}>Unirme ahora</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <EmpanadaRain />
      {/* Aquí puedes agregar el contenido o formulario que desees */}
      {/* Validación al enviar el formulario */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.querySelector('.contacto-form')?.addEventListener('submit', function(e) {
            var esCliente = document.querySelector('input[name="esCliente"]:checked');
            var errorDiv = document.querySelector('.form-group div[style*="color: red"]');
            if (!esCliente) {
              e.preventDefault();
              if (errorDiv) errorDiv.textContent = 'Este campo es obligatorio';
              else {
                var newDiv = document.createElement('div');
                newDiv.style.color = 'red';
                newDiv.style.fontSize = '0.95rem';
                newDiv.style.marginTop = '4px';
                newDiv.textContent = 'Este campo es obligatorio';
                document.querySelector('.form-group').appendChild(newDiv);
              }
            }
          });
        `
      }} />
    </div>
  );
};

export default Lovers; 