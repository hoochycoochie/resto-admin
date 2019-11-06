import React from "react";

const FieldError = ({ message }) => {
  return <span style={{ color: "red", textAlign: "center" }}>{message}</span>;
};

export default FieldError;
