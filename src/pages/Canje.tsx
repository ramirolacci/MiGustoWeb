import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyLoyalty, getRedeemableProducts, redeemProduct } from '../services/loyalty';
import type { LoyaltyProduct } from '../services/loyalty';
import '../components/Productos.css';
import './Canje.css';
import { getToken } from '../services/auth';
import { useLoyalty } from '../context/LoyaltyContext';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const Canje: React.FC = () => {
  const navigate = useNavigate();
  const token = getToken();
  const { points, setPoints, canRedeem, deductPoints } = useLoyalty();
  const [products, setProducts] = useState<LoyaltyProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Variants para animaciones de entrada de tarjetas
  const gridVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduceMotion ? 0 : 0.18, delayChildren: reduceMotion ? 0 : 0.18 }
    }
  }), [reduceMotion]);

  const cardVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 40,
      scale: reduceMotion ? 1 : 0.94,
      rotateX: reduceMotion ? 0 : 12,
      transformPerspective: 900,
      clipPath: reduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
      filter: reduceMotion ? 'none' : 'blur(6px)'
    },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transformPerspective: 900,
      clipPath: 'inset(0% 0% 0% 0%)',
      filter: 'none',
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 16,
        mass: 0.7,
        delay: reduceMotion ? 0 : i * 0.12
      }
    })
  }), [reduceMotion]);

  const childVariants = useMemo(() => ({
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: reduceMotion ? 0 : 0.12 + i * 0.06, duration: 0.4 }
    })
  }), [reduceMotion]);

  useEffect(() => {
    (async () => {
      try {
        // Cargar productos siempre (disponible para invitados)
        const redeemables = await getRedeemableProducts();
        setProducts(redeemables);
        
        // Solo cargar puntos si hay token
        if (token) {
          const loyalty = await getMyLoyalty();
          setPoints(typeof loyalty.totalPoints === 'number' ? loyalty.totalPoints : 0);
        } else {
          setPoints(0);
        }
      } catch (err) {
        setError('No pudimos cargar el programa de canje.');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const handleRedeem = async (product: LoyaltyProduct) => {
    if (!token) {
      setError('Debés iniciar sesión para canjear productos.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    setError(null);
    setSuccessMsg(null);
    if (!canRedeem(product.pointsCost)) {
      setError('No tenés suficientes puntos para este canje.');
      return;
    }
    try {
      setRedeemingId(product.id);
      const res = await redeemProduct(product.id);
      if (res.ok) {
        // Descuento inmediato y sincronizado con NavBar mediante contexto
        deductPoints(product.pointsCost);
        setSuccessMsg(`¡Canjeaste "${product.name}" correctamente!`);
      } else {
        setError('No se pudo completar el canje.');
      }
    } catch {
      setError('Ocurrió un error realizando el canje.');
    } finally {
      setRedeemingId(null);
    }
  };


  return (
    <div className="canje-section">
      <div className="background-overlay"></div>
      <div className="particles-overlay" aria-hidden="true"></div>
      <div className="container canje-container py-5" style={{ minHeight: '70vh', marginTop: 64 }}>
      <style>{`
        .canje-title { display: inline-block; }
        .canje-header { position: relative; }
        .canje-points-abs { position: absolute; right: 0; top: 0; }
        @media (min-width: 992px) {
          .canje-points-abs { right: -16px; }
        }
        @media (min-width: 1400px) {
          .canje-points-abs { right: -24px; }
        }
        @media (max-width: 991.98px) {
          .canje-points-abs { position: static; margin-left: auto; margin-top: 12px; }
          .canje-container { margin-top: 32px !important; }
        }
      `}</style>
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 canje-header">
        <div>
          <h2 className="productos-titulo canje-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Canje de puntos</h2>
          <p className="mb-0 canje-subtitle">
            Acumulá puntos con tus compras y canjealos por productos de Mi Gusto.
          </p>
          {!token && (
            <div className="alert alert-info mt-3 mb-0" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
              <i className="fas fa-info-circle me-2"></i>
              Estás viendo los premios como invitado. <a href="/login" style={{ color: '#ffbf1f', textDecoration: 'underline' }}>Iniciá sesión</a> para canjear tus puntos.
            </div>
          )}
        </div>
        {token && (
          <div className="canje-points-abs">
            <div className="card canje-points-card" style={{ minWidth: 260, borderRadius: 14, overflow: 'hidden' }}>
            <div className="p-3 d-flex align-items-center" style={{ background: 'linear-gradient(90deg, #2b2b2b, #1a1a1a)' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="me-2"
                style={{ filter: 'drop-shadow(0 0 6px rgba(212,162,0,0.5))' }}
              >
                <path d="M3 13c0-5 3.5-8 9-8s9 3 9 8c0 0-3.8 3-9 3S3 13 3 13z" fill="#f2c078" stroke="#a77f00" strokeWidth="1.6" />
                <path d="M5 12.2c1 .6 2.2 1 3.5 1.2M8.8 13.7c1.1.2 2.3.3 3.2.3M13.7 14c1.4-.1 2.7-.4 3.8-.9M18.1 12.7c.6-.3 1.1-.6 1.6-1" stroke="#a77f00" strokeWidth="1" fill="none" strokeLinecap="round"/>
                <path d="M8 8.5c1-.6 2.1-.9 3.2-1" stroke="#ffe9bf" strokeWidth="1" fill="none" strokeLinecap="round"/>
              </svg>
              <div>
                <div className="canje-points-label">MiGusto Points</div>
                <AnimatedCounter value={points} className="canje-points-value" />
              </div>
            </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            className="alert alert-danger"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            role="alert"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {successMsg && (
          <motion.div
            className="alert alert-success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            role="status"
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="d-flex justify-content-center py-5" aria-busy="true">
          <motion.div
            className="spinner-border text-warning"
            role="status"
            aria-label="Cargando"
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
          >
            <span className="visually-hidden">Cargando...</span>
          </motion.div>
        </div>
      ) : (
        <motion.div className="row g-4 canje-grid" variants={gridVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          {products.map((p, index) => {
            const enough = canRedeem(p.pointsCost);
            const isLoading = redeemingId === p.id;
            return (
              <div key={p.id} className="col-12 col-md-6">
                <motion.div
                  className="canje-card h-100"
                  variants={cardVariants}
                  custom={index}
                  whileHover={reduceMotion ? {} : { scale: 1.06 }}
                  whileTap={reduceMotion ? {} : { scale: 0.985 }}
                  onHoverStart={() => setHoveredId(p.id)}
                  onHoverEnd={() => setHoveredId((id) => (id === p.id ? null : id))}
                >
                  <div className="canje-card-media">
                    <img src={p.imageUrl} alt={p.name} />
                    <AnimatePresence>
                      {(() => {
                        if (reduceMotion || hoveredId !== p.id) return null;
                        const name = (p.name || '').toLowerCase();
                        const isCap = p.id === 'cap-001' || name.includes('gorra');
                        const isCar = p.id === 'car-006' || name.includes('auto');
                        const isShirt = p.id === 'tshirt-003' || name.includes('remera');
                        const isCup = p.id === 'cup-002' || name.includes('vaso');
                        const isThermoMate = p.id === 'coupon-004' || name.includes('termo') || name.includes('mate');
                        const isBoard = p.id === 'board-005' || name.includes('tabla');
                        const src = isCap
                          ? '/images/canjes/Gorra.mp4'
                          : isCar
                          ? '/images/canjes/Auto.mp4'
                          : isShirt
                          ? '/images/canjes/Remera.mp4'
                          : isCup
                          ? '/images/canjes/vaso.mp4'
                          : isThermoMate
                          ? '/images/canjes/termoymate.mp4'
                          : isBoard
                          ? '/images/canjes/tabla.mp4'
                          : null;
                        return src ? (
                          <motion.video
                            key={`video-${p.id}`}
                            className="hover-video"
                            src={src}
                            poster={p.imageUrl}
                            muted
                            loop
                            autoPlay
                            playsInline
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            aria-hidden="true"
                          />
                        ) : null;
                      })()}
                    </AnimatePresence>
                    <motion.span
                      className="canje-points-badge"
                      animate={reduceMotion ? {} : { scale: [1, 1.14, 1], opacity: [0.9, 1, 0.9] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      aria-label={`${p.pointsCost} puntos necesarios`}
                    >
                      {p.pointsCost} pts
                    </motion.span>
                    <motion.div
                      className="glow-sheen"
                      initial={{ x: '-150%', opacity: 0 }}
                      whileHover={reduceMotion ? {} : { x: ['-150%', '150%'], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="canje-card-body d-flex flex-column">
                    <motion.h5 className="canje-card-title" variants={childVariants} custom={0}>{p.name}</motion.h5>
                    <motion.p className="canje-card-text" variants={childVariants} custom={1}>{p.shortDescription}</motion.p>
                    <motion.div className="canje-actions" variants={childVariants} custom={2}>
                      {!token ? (
                        <motion.button
                          className="btn btn-warning btn-canje"
                          onClick={() => navigate('/login')}
                          whileHover={reduceMotion ? {} : { scale: 1.06, y: -2 }}
                          whileTap={reduceMotion ? {} : { scale: 0.97, y: 0 }}
                          transition={{ type: 'spring', stiffness: 360, damping: 16 }}
                        >
                          Iniciar sesión para canjear
                        </motion.button>
                      ) : (
                        <motion.button
                          className={`btn ${enough ? 'btn-warning' : 'btn-secondary'} btn-canje`}
                          disabled={!enough || isLoading}
                          onClick={() => handleRedeem(p)}
                          aria-disabled={!enough}
                          whileHover={reduceMotion || !enough || isLoading ? {} : { scale: 1.06, y: -2 }}
                          whileTap={reduceMotion || !enough || isLoading ? {} : { scale: 0.97, y: 0 }}
                          transition={{ type: 'spring', stiffness: 360, damping: 16 }}
                        >
                          {isLoading ? (
                            <span className="loading-dots" aria-hidden="true">
                              <span className="dot" />
                              <span className="dot" />
                              <span className="dot" />
                            </span>
                          ) : (
                            (enough ? 'Canjear' : 'Puntos insuficientes')
                          )}
                        </motion.button>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      )}
      </div>
    </div>
  );
};

export default Canje;


// Contador animado de puntos con transición numérica suave
const AnimatedCounter: React.FC<{ value: number, className?: string }> = ({ value, className }) => {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 120, damping: 20, mass: 0.6 });
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    motionValue.set(isFinite(value) ? value : 0);
  }, [value]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      setDisplay(Math.round(v));
    });
    return () => unsubscribe();
  }, [spring]);

  return (
    <motion.div
      className={className}
      aria-live="polite"
      animate={reduceMotion ? {} : { opacity: [0.96, 1, 0.96], scale: [1, 1.01, 1] }}
      transition={{ duration: 2.4, repeat: Infinity }}
    >
      {new Intl.NumberFormat('es-AR').format(display)}
    </motion.div>
  );
};


