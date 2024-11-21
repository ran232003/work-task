// DefaultSelect.js
import React from "react";
import { Form } from "react-bootstrap";
import "./global.css";

const DefaultSelect = ({ label, options, value, onChange }) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      as="select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="custom-select-arrow" /* Optional for more control */
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
);

export default DefaultSelect;
