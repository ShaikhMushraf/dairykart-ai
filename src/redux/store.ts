import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import uiReducer from "./slices/uiSlice";
import orderReducer from "./slices/orderSlice";

/**
 * Root reducer
 * Combines all slices
 */
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  products: productReducer,
  ui: uiReducer,
  orders: orderReducer,
});

/**
 * Persist configuration
 * ---------------------
 * ✔ Persist cart, auth, orders
 * ❌ Do NOT persist UI (modals, loaders)
 */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth", "orders"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Redux Store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

/**
 * Persistor (used in ReduxProvider)
 */
export const persistor = persistStore(store);

/**
 * Types
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
