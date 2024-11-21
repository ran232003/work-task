import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "user",
  initialState: { user: null, dashBoardUsers: [] },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUsers(state, action) {
      state.dashBoardUsers = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export default UserSlice;

export const userAction = UserSlice.actions;
