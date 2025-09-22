import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

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
    <div className="checkout-container">
      <div className="container">
        <h2 className="checkout-title">Checkout</h2>
        {items.length === 0 ? (
          <p className="checkout-empty">Tu carrito está vacío.</p>
        ) : (
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              {items.map(it => (
                <div key={it.id} className="card checkout-item-card">
                  <div className="card-body checkout-item-body">
                    <img 
                      src={it.image} 
                      alt={it.title} 
                      className="checkout-item-image"
                    />
                    <div className="checkout-item-info">
                      <div className="checkout-item-title">{it.title}</div>
                      <div className="checkout-item-price">
                        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(it.price)}
                      </div>
                    </div>
                    <div className="checkout-quantity-controls">
                      <button 
                        className="btn checkout-quantity-btn" 
                        onClick={() => updateQuantity(it.id, it.quantity - 1)}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="checkout-quantity-number">{it.quantity}</span>
                      <button 
                        className="btn checkout-quantity-btn" 
                        onClick={() => updateQuantity(it.id, it.quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <div className="checkout-total-price">
                      {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(it.price * it.quantity)}
                    </div>
                    <button 
                      className="btn checkout-remove-btn" 
                      onClick={() => removeItem(it.id)}
                      aria-label="Quitar producto"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-12 col-lg-4">
              <div className="card checkout-summary-card">
                <div className="card-body checkout-summary-body">
                  <h5 className="checkout-summary-title">Resumen del Pedido</h5>
                  <div className="checkout-summary-row">
                    <span className="checkout-summary-label">Subtotal</span>
                    <span className="checkout-summary-value">
                      {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(subtotal)}
                    </span>
                  </div>
                  <button 
                    className="btn checkout-confirm-btn" 
                    onClick={handleConfirm}
                  >
                    Confirmar Compra
                  </button>
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


