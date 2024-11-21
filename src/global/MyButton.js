import React from "react";
import { Button } from "react-bootstrap";

const MyButton = (props) => {
  const { variant, cssClass, clickFunction, text, disabled } = props;
  const handleClick = () => {
    clickFunction();
  };
  return (
    <Button
      onClick={handleClick}
      className={cssClass}
      variant={variant}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default MyButton;
