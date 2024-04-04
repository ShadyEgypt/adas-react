import React from "react";
import { Controller } from "react-hook-form";
import "./CustomInput.css"; // Import the CSS file

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <div className={`customInputContainer ${error ? "error" : ""}`}>
            <input
              className="customInput"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              type={secureTextEntry ? "password" : "text"}
            />
          </div>
          {error && (
            <span className="errorText">{error.message || "Error"}</span>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;
