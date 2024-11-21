import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiHelper } from "../../global/apiHelper";
import { useDispatch, useSelector } from "react-redux";
import { GET_TASKS } from "../../URLS";
import { tasksAction } from "../../store/TasksSlice";
import { actionMapping } from "../../global/data";
import TaskSidebar from "./components/TaskSidebar";
import TaskDetails from "../TaskDetails/TaskDetails";

function TaskDashboard(props) {
  const tasks = useSelector((state) => {
    return state.tasks;
  });
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(
    tasks.length > 0 ? tasks[0] : null
  );

  const { taskStatus } = useParams(); // Get 'status' from the URL (login/signup)
  const getTasks = async () => {
    handleApiCall(
      "GET",
      GET_TASKS + taskStatus,
      {},
      (data) => {
        const action = actionMapping[taskStatus];
        dispatch(action(data.data));
      },
      () => {}
    );
  };
  console.log(selectedTask, "selectedTask");
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="dashboard-container">
      {" "}
      <TaskSidebar
        tasks={tasks[taskStatus]}
        onTaskSelect={setSelectedTask}
        selectedTask={selectedTask}
      />
      <TaskDetails task={selectedTask} />
    </div>
  );
}

export default TaskDashboard;
