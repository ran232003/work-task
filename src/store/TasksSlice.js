import { createSlice } from "@reduxjs/toolkit";
const TaskSlice = createSlice({
  name: "taskModal",
  initialState: { allTasks: [], myTasks: [], currentTask: null },
  reducers: {
    setAllTasks(state, action) {
      // console.log(action.payload, "test");
      state.allTasks = action.payload;
    },
    setMyTasks(state, action) {
      //console.log(action.payload);
      state.myTasks = action.payload;
    },
    setCurrentTask(state, action) {
      // Add this action
      state.currentTask = action.payload;
    },
  },
});

export default TaskSlice;

export const tasksAction = TaskSlice.actions;
