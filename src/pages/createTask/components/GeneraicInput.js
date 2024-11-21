import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import _ from "lodash"; // Import lodash for debounce
import { useDispatch } from "react-redux";
import { useApiHelper } from "../../../global/apiHelper";
import { GET_USERS } from "../../../URLS";

function GeneraicInput(props) {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const { options, field, value, placeholder, type, label } = props.obj;
  const updateInput = props.updateInput;
  const [local, setLocal] = useState(props.value);
  const [filteredOptions, setFilteredOptions] = useState([]);
  console.log("props.obj,", props.value, local);
  const handleChange = (event) => {
    // Handling date picker and regular inputs differently
    const newValue =
      type === "date" || type === "textBox" ? event : event.target.value;
    console.log(field);
    setLocal(newValue);
    updateInput(props.field, newValue); // Pass the field and updated value to updateInput
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    setLocal(files);
    updateInput(field, files); // Pass the array of files to updateInput
  };
  // Debounced function to fetch options from the backend
  const fetchOptions = useCallback(
    _.debounce(async (inputValue) => {
      try {
        handleApiCall(
          "GET",
          GET_USERS + inputValue,
          {},
          (data) => {
            setFilteredOptions(data.data);
          },
          () => {}
        );
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (field === "reporter" && local) {
      // Only fetch options for the "assignee" field
      fetchOptions(local);
    } else if (field === "assignee") {
      setFilteredOptions([]); // Clear options for "assignee" if input is empty
    }
  }, [local, fetchOptions, field]);
  switch (type) {
    case "text":
      return (
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={local || ""} // Ensure no undefined values
            type="text"
            placeholder={placeholder}
          />
        </Form.Group>
      );

    case "select":
      return (
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            as="select"
            value={local || ""}
            onChange={handleChange}
            className="custom-select-arrow"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );

    case "textBox":
      return (
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <ReactQuill
            className="quill-editor"
            value={local || ""}
            onChange={handleChange}
          />
        </Form.Group>
      );

    case "date":
      return (
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <div className="datepicker-container">
            <DatePicker
              selected={local || null}
              onChange={handleChange}
              placeholderText="Select date"
            />
          </div>
        </Form.Group>
      );
    case "file":
      const handleRemoveAttachment = (index) => {
        setLocal((prev) => {
          const updatedAttachments = [...prev];
          updatedAttachments.splice(index, 1); // Remove the attachment at the given index
          return updatedAttachments;
        });
        updateInput(
          field,
          local.filter((_, i) => i !== index)
        ); // Update parent with filtered attachments
      };

      return (
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <Form.Control multiple type="file" onChange={handleFileChange} />
          {/* Display existing attachments */}
          {Array.isArray(local) && local.length > 0 && (
            <div className="existing-attachments">
              <h6>Attachments:</h6>
              <ul className="attachments-list">
                {local.map((file, index) => {
                  const isExistingFile = typeof file === "string";
                  const fileName = isExistingFile
                    ? file.split("/").pop() // Extract file name from URL
                    : file.name; // Use the file's name for new uploads

                  return (
                    <li key={index} className="attachment-item">
                      <a
                        href={isExistingFile ? file : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {fileName}
                      </a>
                      <span
                        className="remove-attachment"
                        onClick={() => handleRemoveAttachment(index)}
                      >
                        ✖
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Form.Group>
      );
    case "searchSelect":
      return (
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type="text"
            value={local || ""}
            onChange={(e) => setLocal(e.target.value)}
            placeholder={placeholder || "Start typing..."}
            list="options-list" // Connects the input to the datalist
          />
          <datalist id="options-list">
            {filteredOptions.map((option, index) => (
              <option key={index} value={option.label} />
            ))}
          </datalist>
        </Form.Group>
      );

    default:
      return null;
  }
}

export default GeneraicInput;
