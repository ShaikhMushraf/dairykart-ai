import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

/**
 * Auth State
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

/**
 * Auth Slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Login success
     */
    loginSuccess(state, action) {
  state.user = {
    ...action.payload.user,
    firstName:
      action.payload.user.firstName ||
      action.payload.user.name || // ✅ seller support
      "",
  };
  state.token = action.payload.token;
  state.isAuthenticated = true;

  // persist token
  localStorage.setItem("token", action.payload.token);
},
    /**
     * Logout
     */
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
