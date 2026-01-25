import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  showLoginModal: boolean;
  showSellerModal: boolean; // ✅ NEW
}

const initialState: UIState = {
  showLoginModal: false,
  showSellerModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLoginModal(state) {
      state.showLoginModal = true;
    },
    closeLoginModal(state) {
      state.showLoginModal = false;
    },

    // ✅ Seller modal
    openSellerModal(state) {
      state.showSellerModal = true;
    },
    closeSellerModal(state) {
      state.showSellerModal = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openSellerModal,
  closeSellerModal,
} = uiSlice.actions;

export default uiSlice.reducer;
