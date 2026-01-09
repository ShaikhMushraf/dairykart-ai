import { createSlice } from "@reduxjs/toolkit";

/**
 * User interface
 * Represents logged-in user data coming from backend
 */
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Auth state interface
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

/**
 * Initial state
 * 🔑 Loads data from localStorage so login persists after refresh
 */
const initialState: AuthState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,

  isAuthenticated:
    typeof window !== "undefined"
      ? !!localStorage.getItem("token")
      : false,
};

/**
 * Auth Slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    /**
     * Called after successful login
     * Saves user & token in Redux + localStorage
     */
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Persist data
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    /**
     * Logout user
     * Clears Redux state & localStorage
     */
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

/**
 * Export actions
 */
export const { loginSuccess, logout } = authSlice.actions;

/**
 * Export reducer
 */
export default authSlice.reducer;
