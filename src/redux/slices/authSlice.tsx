import { createSlice } from "@reduxjs/toolkit";

/**
 * User interface
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
 * Load auth state from localStorage
 */
const loadAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  return {
    user: user ? JSON.parse(user) : null,
    token: token,
    isAuthenticated: !!token,
  };
};

const initialState: AuthState = loadAuthState();

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
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    /**
     * Logout (manual or auto)
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

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
