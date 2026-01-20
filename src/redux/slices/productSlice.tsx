import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "@/services/api";
import type { Product, CreateProductPayload } from "@/types/product";


/**
 * Product slice state
 */
export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * FETCH PRODUCTS (PUBLIC)
 */
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await apiRequest("/api/products");
    return res.products as Product[];
  } catch {
    return rejectWithValue("Failed to fetch products");
  }
});

/**
 * ADD PRODUCT (ADMIN)
 */
export const addProduct = createAsyncThunk<
  Product,
  CreateProductPayload,
  { rejectValue: string }
>("products/add", async (data, { rejectWithValue }) => {
  try {
    return await apiRequest("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch {
    return rejectWithValue("Failed to add product");
  }
});
/**
 * DELETE PRODUCT (ADMIN)
 */
export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("products/delete", async (id, { rejectWithValue }) => {
  try {
    await apiRequest(`/api/admin/products/${id}`, {
      method: "DELETE",
    });
    return id;
  } catch {
    return rejectWithValue("Failed to delete product");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (p) => p._id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
