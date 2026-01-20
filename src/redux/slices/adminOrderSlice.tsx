import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiFetch from "@/services/api";

/**
 * Order type
 */
export interface AdminOrder {
  _id: string;
  totalAmount: number;
  status: string;
  user: {
    email: string;
  };
}

interface AdminOrderState {
  orders: AdminOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminOrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchAllOrders = createAsyncThunk<
  AdminOrder[],
  void,
  { rejectValue: string }
>("adminOrders/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await apiFetch("/api/admin/orders");
  } catch {
    return rejectWithValue("Failed to fetch orders");
  }
});

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export default adminOrderSlice.reducer;
