import React from "react";

const FormInput = ({ type = "text", name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;
