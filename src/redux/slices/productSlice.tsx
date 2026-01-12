import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "@/services/api";
import type { Product } from "@/types/product";

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
 * FETCH PRODUCTS
 */
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await apiRequest<{
      products: Product[];
    }>("/api/products");

    return res.products;
  }
);

/**
 * ADD PRODUCT (ADMIN)
 */
export const addProduct = createAsyncThunk(
  "products/add",
  async (data: Partial<Product>) => {
    return apiRequest<Product>("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
);

/**
 * DELETE PRODUCT (ADMIN)
 */
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string) => {
    await apiRequest(`/api/admin/products/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

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
