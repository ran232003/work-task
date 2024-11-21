import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { useDispatch, useSelector } from "react-redux";
import "./global.css";
import { toastAction } from "../store/toastSlice";
function ToastMessage(props) {
  const dispatch = useDispatch();
  const toast = useSelector((state) => {
    return state.toast.toast;
  });
  const close = () => {
    dispatch(toastAction.setToast(null));
    //setShow(false);
    //nullErrorMessage();
  };
  useEffect(() => {
    //setShow(true);
  }, []);
  if (toast) {
    return (
      <Row className="custom-toast">
        <Col xs={12}>
          <Toast
            bg={toast.type === "error" ? "danger" : "success"}
            onClose={close}
            show={true}
            delay={3000}
            autohide
          >
            <Toast.Body className="toast-body-text">
              {toast.errorMessage}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }
}

export default ToastMessage;
