import { createSlice } from "@reduxjs/toolkit";
const CommentSlice = createSlice({
  name: "comment",
  initialState: { dashBoardComments: [], postComments: [] },
  reducers: {
    setDashBoardComments(state, action) {
      state.dashBoardComments = action.payload;
    },
    setPostComments(state, action) {
      state.postComments = action.payload;
    },
  },
});

export default CommentSlice;

export const commentAction = CommentSlice.actions;
