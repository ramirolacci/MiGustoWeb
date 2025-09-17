import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const CartFab: React.FC = () => {
  const { totalQty, setOpen } = useCart();
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const handler = () => {
      setAnim(true);
      setTimeout(() => setAnim(false), 500);
    };
    window.addEventListener('mg_cart_added', handler as EventListener);
    return () => window.removeEventListener('mg_cart_added', handler as EventListener);
  }, []);
  return (
    <button
      id="cart-fab"
      onClick={() => setOpen(true)}
      aria-label="Abrir carrito"
      style={{
        position: 'fixed', right: 16, bottom: 80, zIndex: 9999,
        width: 56, height: 56, borderRadius: 28,
        background: '#ffbf1f', color: '#111', border: 'none',
        boxShadow: '0 10px 24px rgba(0,0,0,.35)', cursor: 'pointer',
        transform: anim ? 'scale(1.12) rotate(-6deg)' : 'scale(1)',
        transition: 'transform .25s ease'
      }}
    >
      <span className="fa fa-shopping-cart" />
      {totalQty > 0 && (
        <span style={{
          position: 'absolute', top: -6, right: -6, minWidth: 22, height: 22,
          borderRadius: 11, background: '#e53935', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 6px', fontWeight: 800, fontSize: 12
        }}>{totalQty}</span>
      )}
    </button>
  );
};

export default CartFab;


