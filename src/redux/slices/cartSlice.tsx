import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/**
 * CartItem
 * Product + quantity
 */
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}
/**
 * Cart State
 */
interface CartState {
  items: CartItem[];
  totalAmount: number;
}
/**
 * Initial State
 */
const initialState: CartState = {
  items: [],
  totalAmount: 0,
};
/**
 * Cart Slice
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      state.totalAmount += action.payload.price;
    },

    increaseQty(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
      }
    },

    decreaseQty(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount -= item.price;
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i._id === action.payload);
      if (!item) return;

      state.totalAmount -= item.price * item.quantity;
      state.items = state.items.filter((i) => i._id !== action.payload);
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
} = cartSlice.actions;

export default cartSlice.reducer;
