import React from 'react';
import { useCart } from '../context/CartContext';

const currency = (n: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const CartDrawer: React.FC = () => {
  const { items, subtotal, setQty, removeItem, clear, open, setOpen } = useCart();
  return (
    <div style={{
      position: 'fixed', inset: 0, pointerEvents: open ? 'auto' : 'none', zIndex: 9998,
    }} aria-hidden={!open}>
      {/* backdrop */}
      <div onClick={() => setOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)', opacity: open ? 1 : 0, transition: 'opacity .2s' }} />
      {/* panel */}
      <aside style={{
        position: 'absolute', top: 0, right: 0, width: '92vw', maxWidth: 420, height: '100vh',
        background: '#111', color: '#fff', borderLeft: '1px solid #222',
        transform: `translateX(${open ? 0 : 100}%)`, transition: 'transform .25s',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid #222' }}>
          <strong>Tu carrito</strong>
          <button onClick={() => setOpen(false)} style={{ background: 'none', color: '#fff', border: 'none', fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.length === 0 ? (
            <div style={{ opacity: .85 }}>Aún no agregaste productos.</div>
          ) : items.map(it => (
            <div key={it.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {it.image && <img src={it.image} alt={it.title} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{it.title}</div>
                <div style={{ opacity: .9 }}>{currency(it.price)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => setQty && setQty(it.id, Math.max(1, (it.qty ?? it.quantity) - 1))} aria-label="-" style={{ width: 28, height: 28 }}>-</button>
                <input value={(it.qty ?? it.quantity)} onChange={e => setQty && setQty(it.id, Number(e.target.value) || 1)} style={{ width: 42, textAlign: 'center' }} />
                <button onClick={() => setQty && setQty(it.id, Math.min(99, (it.qty ?? it.quantity) + 1))} aria-label="+" style={{ width: 28, height: 28 }}>+</button>
              </div>
              <button onClick={() => removeItem(it.id)} aria-label="Quitar" style={{ background: 'none', color: '#e53935', border: 'none', fontSize: 16 }}>Quitar</button>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #222', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span>Subtotal</span>
            <strong>{currency(subtotal)}</strong>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => clear && clear()} style={{ flex: 1, height: 44, borderRadius: 22 }}>Vaciar</button>
            <a href="/checkout" style={{ flex: 2, height: 44, borderRadius: 22, background: '#ffbf1f', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 800 }}>Finalizar compra</a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;


