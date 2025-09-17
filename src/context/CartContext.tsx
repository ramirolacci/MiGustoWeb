import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface CartItem {
  id: string; // clave única compuesta por título + categoría
  title: string;
  image: string;
  price: number; // en centavos o entero ARS
  quantity: number;
  // Alias usado por algunos componentes legacy
  qty?: number;
  category?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { id?: string }, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  // Extensiones para compatibilidad con componentes existentes (requeridas)
  setQty: (id: string, quantity: number) => void;
  clear: () => void;
  totalQty: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'mg_cart_v1';

function buildId(title: string, category?: string) {
  return `${title}::${category ?? ''}`;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(Boolean).map((i: any) => ({
        ...i,
        // Normalizar alias qty
        qty: typeof i.qty === 'number' ? i.qty : (typeof i.quantity === 'number' ? i.quantity : 1)
      }));
    } catch {
      return [];
    }
  });

  // Estado de UI del drawer del carrito (mobile/desktop)
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignorar errores de persistencia
    }
  }, [items]);

  const addItem: CartContextValue['addItem'] = (partial, quantity = 1) => {
    const id = partial.id ?? buildId(partial.title, partial.category);
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        const nextQty = existing.quantity + Math.max(1, quantity);
        return prev.map(i => (i.id === id ? { ...i, quantity: nextQty, qty: nextQty } : i));
      }
      const newItem: CartItem = {
        id,
        title: partial.title,
        image: partial.image,
        price: Math.max(0, Math.round(partial.price)),
        quantity: Math.max(1, quantity),
        qty: Math.max(1, quantity),
        category: partial.category,
      };
      return [...prev, newItem];
    });
  };

  const removeItem: CartContextValue['removeItem'] = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity: CartContextValue['updateQuantity'] = (id, quantity) => {
    const next = Math.max(1, Math.round(quantity));
    setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity: next, qty: next } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((acc, i) => acc + i.quantity * i.price, 0), [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    // Compatibilidad con componentes existentes
    setQty: (id: string, q: number) => updateQuantity(id, q),
    clear: () => clearCart(),
    totalQty: totalItems,
    open,
    setOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
