import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "@/types/category";
import { apiRequest } from "@/services/api";

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetch", async (_, { rejectWithValue }) => {
  try {
    return await apiRequest<Category[]>("/api/categories");
  } catch {
    return rejectWithValue("Failed to fetch categories");
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: () => {},
});

export default categorySlice.reducer;
