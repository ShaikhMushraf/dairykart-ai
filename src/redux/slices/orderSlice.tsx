import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiFetch from "@/services/api";
import type { Order } from "@/types/order";

/**
 * Redux order state
 */
interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

/**
 * Fetch orders for logged-in user
 */
export const fetchUserOrders = createAsyncThunk<
  Order[],                 // ✅ return type
  void,                    // ✅ argument type
  { rejectValue: string }
>("orders/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const res = await apiFetch("/api/orders");
    return res as Order[];
  } catch {
    return rejectWithValue("Failed to fetch orders");
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export default orderSlice.reducer;
