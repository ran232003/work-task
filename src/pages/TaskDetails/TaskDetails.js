import React from "react";
import { Form, Button } from "react-bootstrap";
import { FaFilePdf, FaFileAlt } from "react-icons/fa"; // File icons
import "react-quill/dist/quill.snow.css"; // ReactQuill styling
import "./TaskDetails.css";
import { useDispatch } from "react-redux";
import { taskModalAction } from "../../store/TaskModalSlice";
import { tasksAction } from "../../store/TasksSlice";

function TaskDetails({ task }) {
  const dispatch = useDispatch();
  if (!task) {
    return (
      <p className="no-task-selected">Select a task to view its details</p>
    );
  }

  const handleEdit = () => {
    dispatch(tasksAction.setCurrentTask(task)); // Set the current task in Redux
    dispatch(taskModalAction.setTaskModal(true)); // Open the modal
  };
  return (
    <div className="task-details-container">
      <h2 className="task-number">{task.sequence}</h2>
      <h3 className="task-summary-title">{task.summary}</h3>

      <div className="task-actions">
        <Button
          onClick={handleEdit}
          variant="light"
          className="task-action-button"
        >
          <i className="fa fa-edit"></i> Edit
        </Button>
        <Button variant="light" className="task-action-button">
          <i className="fa fa-comment"></i> Add Comment
        </Button>
        <Form.Select className="task-select" aria-label="Assign To">
          <option value="unassigned">Unassigned</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
        </Form.Select>
        <Form.Select className="task-select" aria-label="Task Status">
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </Form.Select>
      </div>

      <div className="task-description">
        <h4>Description:</h4>
        <div
          className="description-content"
          dangerouslySetInnerHTML={{ __html: task.description }}
        />
      </div>

      <div className="task-attachments">
        <h4>Attachments:</h4>
        {task.attachments && task.attachments.length > 0 ? (
          <div className="attachments-list">
            {task.attachments.map((fileUrl, index) => {
              const fileName = fileUrl.split("/").pop(); // Extract file name from URL
              const fileExtension = fileName.split(".").pop(); // Extract file extension

              return (
                <div key={index} className="attachment-item">
                  {/* Use an appropriate icon for the file */}
                  {fileExtension === "pdf" ? (
                    <FaFilePdf className="file-icon" />
                  ) : (
                    <FaFileAlt className="file-icon" />
                  )}
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={fileName} // Enable download
                  >
                    {fileName}
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No attachments available.</p>
        )}
      </div>
    </div>
  );
}

export default TaskDetails;
