import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./userSlice";
import ToastSlice from "./toastSlice";
import CommentSlice from "./commentSlice";
import LoadingSlice from "./loadingData";
import TaskModalSlice from "./TaskModalSlice";
import TaskSlice from "./TasksSlice";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    toast: ToastSlice.reducer,
    comment: CommentSlice.reducer,
    taskModal: TaskModalSlice.reducer,
    loading: LoadingSlice.reducer,
    tasks: TaskSlice.reducer,
  },
});
export default store;
