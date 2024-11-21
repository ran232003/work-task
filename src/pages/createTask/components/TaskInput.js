import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

function TaskInput(props) {
  const { label, placeholder, value, field, setData, allData, type } = props;
  const handleChange = (e) => {
    let val = type === "text" ? e.target.value : e.target.files[0];
    console.log(val, "val", type);
    setData({ ...allData, [field]: val });
  };
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={handleChange}
        value={field === "text" ? value : null}
        type={type}
        placeholder={placeholder}
      />
    </Form.Group>
  );
}

export default TaskInput;
