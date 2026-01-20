import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

/**
 * Auth State Interface
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

/**
 * Initial Auth State
 */
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

/**
 * Payload type for login success
 */
interface LoginPayload {
  user: User;
  token: string;
}

/**
 * Auth Slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Called after successful login / register
     */
    loginSuccess(state, action: PayloadAction<LoginPayload>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Persist token (for refresh survival)
      localStorage.setItem("token", action.payload.token);
    },

    /**
     * Logout user
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
