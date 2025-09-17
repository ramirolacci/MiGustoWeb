import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleConfirm = () => {
    // MVP: simular compra
    alert('¡Gracias por tu compra!');
    clearCart();
    navigate('/');
  };

  return (
    <div style={{ paddingTop: 104, paddingBottom: 40, minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div className="container">
        <h2 className="mb-4">Checkout</h2>
        {items.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              {items.map(it => (
                <div key={it.id} className="card mb-3" style={{ background: '#111', borderColor: '#222' }}>
                  <div className="card-body d-flex align-items-center" style={{ gap: 16 }}>
                    <img src={it.image} alt={it.title} width={72} height={72} style={{ objectFit: 'cover', borderRadius: 8 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>{it.title}</div>
                      <div style={{ opacity: .85 }}>
                        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(it.price)}
                      </div>
                    </div>
                    <div className="d-flex align-items-center" style={{ gap: 8 }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(it.id, it.quantity - 1)}>-</button>
                      <span>{it.quantity}</span>
                      <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(it.id, it.quantity + 1)}>+</button>
                    </div>
                    <div style={{ width: 120, textAlign: 'right', fontWeight: 700 }}>
                      {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(it.price * it.quantity)}
                    </div>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(it.id)}>Quitar</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-12 col-lg-4">
              <div className="card" style={{ background: '#111', borderColor: '#222' }}>
                <div className="card-body">
                  <h5 className="card-title">Resumen</h5>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span>Subtotal</span>
                    <strong>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(subtotal)}</strong>
                  </div>
                  <button className="btn btn-warning w-100 mt-3" onClick={handleConfirm}>Confirmar compra</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;


