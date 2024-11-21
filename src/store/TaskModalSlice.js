import { createSlice } from "@reduxjs/toolkit";
const TaskModalSlice = createSlice({
  name: "taskModal",
  initialState: { taskModal: false },
  reducers: {
    setTaskModal(state, action) {
      // console.log(action.payload, "test");
      state.taskModal = action.payload;
    },
    setPostSearch(state, action) {
      //console.log(action.payload);
      state.postSearch = action.payload;
    },
  },
});

export default TaskModalSlice;

export const taskModalAction = TaskModalSlice.actions;
