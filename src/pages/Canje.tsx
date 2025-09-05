import React, { useEffect, useState } from 'react';
import { getMyLoyalty, getRedeemableProducts, redeemProduct } from '../services/loyalty';
import type { LoyaltyProduct } from '../services/loyalty';
import '../components/Productos.css';
import './Canje.css';

const Canje: React.FC = () => {
  const STARTING_POINTS = 1003560;
  const [points, setPoints] = useState<number>(STARTING_POINTS);
  const [products, setProducts] = useState<LoyaltyProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [loyalty, redeemables] = await Promise.all([
          getMyLoyalty(),
          getRedeemableProducts(),
        ]);
        setPoints(typeof loyalty.totalPoints === 'number' ? loyalty.totalPoints : STARTING_POINTS);
        setProducts(redeemables);
      } catch (err) {
        setError('No pudimos cargar el programa de canje.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const canRedeem = (cost: number) => points >= cost;

  const handleRedeem = async (product: LoyaltyProduct) => {
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
        const newPoints = typeof res.newPoints === 'number' ? res.newPoints : (points - product.pointsCost);
        setPoints(Math.max(newPoints, 0));
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
        }
      `}</style>
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 canje-header">
        <div>
          <h2 className="productos-titulo canje-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Canje de puntos</h2>
          <p className="mb-0" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Acumulá puntos con tus compras y canjealos por productos de Mi Gusto.
          </p>
        </div>
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
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>Tus puntos</div>
              <div style={{ color: '#ffbf1f', fontSize: 22, fontWeight: 800 }}>{new Intl.NumberFormat('es-AR').format(points)}</div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}
      {successMsg && (
        <div className="alert alert-success">{successMsg}</div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center py-5" aria-busy="true">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4 canje-grid">
          {products.map((p) => {
            const enough = canRedeem(p.pointsCost);
            return (
              <div key={p.id} className="col-12 col-md-6">
                <div className="canje-card h-100">
                  <div className="canje-card-media">
                    <img src={p.imageUrl} alt={p.name} />
                    <span className="canje-points-badge">{p.pointsCost} pts</span>
                  </div>
                  <div className="canje-card-body d-flex flex-column">
                    <h5 className="canje-card-title">{p.name}</h5>
                    <p className="canje-card-text">{p.shortDescription}</p>
                    <div className="canje-actions">
                      <button
                        className={`btn ${enough ? 'btn-warning' : 'btn-secondary'} btn-canje`}
                        disabled={!enough || redeemingId === p.id}
                        onClick={() => handleRedeem(p)}
                        aria-disabled={!enough}
                      >
                        {redeemingId === p.id ? 'Canjeando…' : (enough ? 'Canjear' : 'Puntos insuficientes')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
};

export default Canje;


