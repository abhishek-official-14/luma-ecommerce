"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";

type CartLine = { product: Product; quantity: number; size?: string; color?: string };
type Toast = { id: number; message: string } | null;

type StoreContextValue = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  recentlyViewed: string[];
  cartCount: number;
  cartTotal: number;
  toast: Toast;
  addToCart: (product: Product, quantity?: number, options?: { size?: string; color?: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
  notify: (message: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    window.queueMicrotask(() => {
      try {
        setCart(JSON.parse(localStorage.getItem("luma-cart") || "[]") as CartLine[]);
        setWishlist(JSON.parse(localStorage.getItem("luma-wishlist") || "[]") as string[]);
        setCompare(JSON.parse(localStorage.getItem("luma-compare") || "[]") as string[]);
        setRecentlyViewed(JSON.parse(localStorage.getItem("luma-recent") || "[]") as string[]);
      } catch {
        localStorage.removeItem("luma-cart");
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("luma-cart", JSON.stringify(cart));
    localStorage.setItem("luma-wishlist", JSON.stringify(wishlist));
    localStorage.setItem("luma-compare", JSON.stringify(compare));
    localStorage.setItem("luma-recent", JSON.stringify(recentlyViewed));
  }, [cart, wishlist, compare, recentlyViewed, hydrated]);

  const notify = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => setToast((current) => (current?.id === id ? null : current)), 2600);
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1, options?: { size?: string; color?: string }) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id && line.size === options?.size);
      if (existing) {
        return current.map((line) =>
          line === existing ? { ...line, quantity: Math.min(line.quantity + quantity, product.stock) } : line,
        );
      }
      return [...current, { product, quantity, ...options }];
    });
    notify(`${product.name} added to your bag`);
  }, [notify]);

  const value = useMemo<StoreContextValue>(() => ({
    cart,
    wishlist,
    compare,
    recentlyViewed,
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    cartTotal: cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    toast,
    addToCart,
    removeFromCart: (id) => setCart((current) => current.filter((line) => line.product.id !== id)),
    updateQuantity: (id, quantity) => setCart((current) => current.map((line) => line.product.id === id ? { ...line, quantity: Math.max(1, Math.min(quantity, line.product.stock)) } : line)),
    toggleWishlist: (id) => {
      setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
      notify(wishlist.includes(id) ? "Removed from wishlist" : "Saved to wishlist");
    },
    toggleCompare: (id) => {
      setCompare((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current.slice(-3), id]);
      notify(compare.includes(id) ? "Removed from compare" : "Added to compare");
    },
    addRecentlyViewed: (id) => setRecentlyViewed((current) => [id, ...current.filter((item) => item !== id)].slice(0, 8)),
    notify,
  }), [cart, wishlist, compare, recentlyViewed, toast, addToCart, notify]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      {toast && (
        <div className="toast" role="status">
          <span className="toast-check">✓</span>{toast.message}
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
