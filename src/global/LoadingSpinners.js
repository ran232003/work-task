import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./LoadingSpinners.css";
import { useSelector } from "react-redux";
const Loading = () => {
  const loading = useSelector((state) => {
    return state.loading.loading;
  });
  return (
    <div>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
