import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  showLoginModal: boolean;
}

const initialState: UIState = {
  showLoginModal: false,
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
  },
});

export const { openLoginModal, closeLoginModal } = uiSlice.actions;
export default uiSlice.reducer;
