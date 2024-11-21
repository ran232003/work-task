import { createSlice } from "@reduxjs/toolkit";
const ToastSlice = createSlice({
  name: "toast",
  initialState: { toast: null },
  reducers: {
    setToast(state, action) {
      state.toast = action.payload;
    },
  },
});

export default ToastSlice;

export const toastAction = ToastSlice.actions;
