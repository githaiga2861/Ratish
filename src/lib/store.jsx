import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const PRICE_PER_LITER = 200; // KES
export const WHATSAPP_NUMBER = "254700000000"; // replace with the real number, digits only
export const CURRENCY = "KES";

export const PRODUCTS = [
  { id: "ml500", label: "500 ml", liters: 0.5, price: 100 },
  { id: "l1", label: "1 Litre", liters: 1, price: 200 },
  { id: "l5", label: "5 Litres", liters: 5, price: 999 },
  { id: "l20", label: "20 Litre Reserve", liters: 20, price: 3999 },
];

export function formatKES(n) {
  return `${CURRENCY} ${Math.round(n).toLocaleString("en-KE")}`;
}

export function priceForLiters(liters) {
  return Math.round(liters * PRICE_PER_LITER);
}

const CartContext = createContext(null);
const CART_KEY = "ratish.cart.v1";

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage(CART_KEY, []));

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* private mode — cart lives in memory only */
    }
  }, [items]);

  const api = useMemo(() => {
    const total = items.reduce((sum, it) => sum + it.price, 0);
    const litersTotal = items.reduce((sum, it) => sum + it.liters, 0);
    return {
      items,
      total,
      litersTotal,
      count: items.length,
      add(item) {
        setItems((prev) => [
          ...prev,
          { ...item, key: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
        ]);
      },
      remove(key) {
        setItems((prev) => prev.filter((it) => it.key !== key));
      },
      clear() {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

/* Reviews persistence */
const REVIEWS_KEY = "ratish.reviews.v1";

export const SEED_REVIEWS = [
  {
    id: "r1",
    name: "W. Njoroge",
    rating: 5,
    quote: "Tastes exactly like my grandfather's batch in Murang'a. Light, clean, honest.",
  },
  {
    id: "r2",
    name: "A. Wanjiru",
    rating: 5,
    quote: "Ordered the 5L for a ruracio. Delivered cold, and the pour ritual online is a delight.",
  },
  {
    id: "r3",
    name: "K. Mwangi",
    rating: 4,
    quote: "Delicate and pale, not the heavy syrup other sellers push. This is the real thing.",
  },
];

export function loadReviews() {
  return readStorage(REVIEWS_KEY, SEED_REVIEWS);
}

export function saveReviews(reviews) {
  try {
    window.localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  } catch {
    /* ignore */
  }
}
