import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../TaskDashboard.css";
import { Form } from "react-bootstrap";

function TaskSidebar(props) {
  const { tasks, onTaskSelect } = props;

  // State to manage selected task
  const [selectedTaskId, setSelectedTaskId] = useState(
    tasks.length > 0 ? tasks[0]._id : null
  );

  // Handle task selection
  const handleTaskClick = (task) => {
    onTaskSelect(task);
    setSelectedTaskId(task._id);
  };

  return (
    <Sidebar className="sidebar my-sidebar">
      {/* Order select dropdown */}
      <div className="order-select">
        <Form.Group controlId="orderSelect">
          <Form.Select
            className="order-select-input"
            // Add any sorting logic here if needed
          >
            <option value="update">Order by Update</option>
            <option value="oldest">Order by Oldest</option>
          </Form.Select>
        </Form.Group>
      </div>

      {/* Task list */}
      <Menu>
        {tasks.map((task) => (
          <MenuItem
            key={task._id}
            className={`task-item ${
              selectedTaskId === task._id ? "selected-task" : ""
            }`}
            onClick={() => handleTaskClick(task)}
          >
            {/* Task Icon */}
            <span className="task-icon">🗂️</span>
            {/* Task Details */}
            <div className="task-details">
              <div className="task-number">{task.sequence}</div>
              <div className="task-summary">{task.summary}</div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
}

export default TaskSidebar;
