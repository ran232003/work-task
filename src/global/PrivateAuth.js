import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";

const PrivateDashboard = () => {
  const user = useSelector((state) => {
    return state.user.user;
  });
  console.log(user);
  if (!user) {
    return <Navigate to="*" />;
  } else {
    return user ? <Outlet /> : <Navigate to="*" />;
  }
};

export default PrivateDashboard;
