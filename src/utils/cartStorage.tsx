import type { CartItem } from "@/redux/slices/cartSlice";

/**
 * Returns storage key based on auth state
 */
export const getCartKey = (userId?: string) =>
  userId ? `cart_${userId}` : "guest_cart";

/**
 * Load cart from localStorage
 */
export const loadCart = (userId?: string): CartItem[] => {
  if (typeof window === "undefined") return [];
  const key = getCartKey(userId);
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};

/**
 * Save cart to localStorage
 */
export const saveCart = (items: CartItem[], userId?: string) => {
  if (typeof window === "undefined") return;
  const key = getCartKey(userId);
  localStorage.setItem(key, JSON.stringify(items));
};
