import type { Product } from "./product";

/**
 * Cart item type
 * Extends product with quantity
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Cart state type
 */
export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
