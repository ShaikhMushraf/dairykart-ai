import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "@/types/cart";
import type { Product } from "@/types/product";

/**
 * Load cart from localStorage
 */
const loadCartState = (): CartState => {
  if (typeof window === "undefined") {
    return {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    };
  }

  const storedCart = localStorage.getItem("cart");

  return storedCart
    ? JSON.parse(storedCart)
    : {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      };
};

/**
 * Save cart to localStorage
 */
const saveCartState = (state: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

/**
 * Initial cart state
 */
const initialState: CartState = loadCartState();

/**
 * Helper function
 * Recalculates cart totals
 */
const calculateTotals = (state: CartState) => {
  state.totalQuantity = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  state.totalPrice = state.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

/**
 * Cart Slice
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add product to cart
     */
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      calculateTotals(state);
      saveCartState(state);
    },

    /**
     * Remove product completely
     */
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );

      calculateTotals(state);
      saveCartState(state);
    },

    /**
     * Increase quantity
     */
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (item) => item._id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      calculateTotals(state);
      saveCartState(state);
    },

    /**
     * Decrease quantity
     */
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (item) => item._id === action.payload
      );

      if (item) {
        item.quantity -= 1;

        if (item.quantity === 0) {
          state.items = state.items.filter(
            (i) => i._id !== action.payload
          );
        }
      }

      calculateTotals(state);
      saveCartState(state);
    },

    /**
     * Clear cart
     */
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
