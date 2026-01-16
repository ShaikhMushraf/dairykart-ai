import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/types/order";

/**
 * Orders state
 */
interface OrderState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    /**
     * Save order locally after checkout
     * (Later this will call backend API)
     */
    placeOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },

    /**
     * Clear orders (optional / admin use)
     */
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { placeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
