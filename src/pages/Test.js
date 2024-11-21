import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//  const inputsArray = [
//     {
//       label: "Project",
//       type: "select",
//       options: projectOptions,
//       field: "project",
//     }]
function Test(props) {
  const [desc, setDesc] = useState("");
  const handleTest = (val) => {
    console.log(val);
    setDesc(val);
  };
  return (
    <div>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <ReactQuill
          style={{ height: "100px" }}
          className="quill-editor"
          value={desc}
          onChange={(val) => {
            handleTest(val);
          }}
        />
      </Form.Group>
    </div>
  );
}

Test.propTypes = {};

export default Test;
