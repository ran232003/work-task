import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { taskModalAction } from "../../store/TaskModalSlice";
import {
  assigneeOptions,
  inputsArray,
  issueTypeOptions,
  priorityOptions,
  projectOptions,
  reporterOptions,
} from "../../global/data";
import DefaultSelect from "../../global/DefaultSelect";
import "./CreateTask.css";
import TaskInput from "./components/TaskInput";
import GeneraicInput from "./components/GeneraicInput";
import { useApiHelper } from "../../global/apiHelper";
import { CREATE_TASK_URL } from "../../URLS";
function CreateTask(props) {
  const dispatch = useDispatch();
  const { handleApiCall } = useApiHelper();
  const show = useSelector((state) => {
    return state.taskModal.taskModal;
  });
  const currentTask = useSelector((state) => state.tasks.currentTask); // Fetch the current task

  const [inputs, setInputs] = useState({
    attachments: currentTask?.attachments || null,
    priority: currentTask?.priority || "1",
    summary: currentTask?.summary || "",
    assignee: currentTask?.assignee || "User 1",
    reporter: currentTask?.reporter || "User 1",
    project: currentTask?.project || "Project A",
    businessImpacts: currentTask?.businessImpacts || "",
    description: currentTask?.description || "",
    deliveryDate: currentTask?.deliveryDate || null,
    issue: currentTask?.issue || "",
  });
  //   const [show, setShow] = useState(false);
  console.log(inputs);
  useEffect(() => {
    if (currentTask) {
      setInputs({
        attachments: currentTask.attachments || null,
        priority: currentTask.priority || "1",
        summary: currentTask.summary || "",
        assignee: currentTask.assignee || "User 1",
        reporter: currentTask.reporter || "User 1",
        project: currentTask.project || "Project A",
        businessImpacts: currentTask.businessImpacts || "",
        description: currentTask.description || "",
        deliveryDate: currentTask.deliveryDate || null,
        issue: currentTask.issue || "",
      });
    }
  }, [currentTask]);
  const handleSubmitTask = () => {
    console.log(inputs);
    handleApiCall(
      "FORMDATA",
      CREATE_TASK_URL,
      inputs,
      (data) => {
        // dispatch(taskAction.setUser(data.user));
      },
      () => {}
    );
    dispatch(taskModalAction.setTaskModal(false));
  };
  const updateInput = (field, value) => {
    console.log(field, "field", value, "value");
    if (field === "description" && value === "<p><br></p>") {
      console.log("in if");
      return;
    }

    setInputs((prev) => ({
      ...inputs,
      [field]: value,
    }));
  };
  const handleData = () => {};
  const handleClose = () => dispatch(taskModalAction.setTaskModal(false));
  const handleShow = () => dispatch(taskModalAction.setTaskModal(false));

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {inputsArray.map((input) => {
            return (
              <GeneraicInput
                key={input.field}
                field={input.field}
                obj={input}
                updateInput={updateInput}
                value={inputs[input.field]} // Pass the specific field value
              />
            );
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmitTask}>
          Create Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTask;
