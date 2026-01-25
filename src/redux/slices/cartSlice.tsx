import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Cart item
 */
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

/**
 * Helper to calculate total
 */
const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Replace cart entirely (used on login/logout)
     */
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.totalAmount = calculateTotal(action.payload);
    },

    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.items.find(
        (i) => i._id === action.payload._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalAmount = calculateTotal(state.items);
    },

    increaseQty(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalAmount = calculateTotal(state.items);
      }
    },

    decreaseQty(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount = calculateTotal(state.items);
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (i) => i._id !== action.payload
      );
      state.totalAmount = calculateTotal(state.items);
    },

    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
