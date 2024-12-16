/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

const MainInput = ({
  labelName,
  value,
  onChange,
  icon,
  placeHolder,
  type = "text",
  inputName,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    setInputValue(value || (type === "number" ? 0 : ""));
  }, [value, type]);

  const validateInput = (newValue) => {
    if (type === "number") {
      // Check if this is the second input and validate for less than 1
      if (!/^\d*\.?\d*$/.test(newValue)) {
        setError("Please enter a number");
        return false;
      }
    }
    setError(""); // Clear the error if validation passes
    return true;
  };
  function handleChange() {
    const newValue = inputRef.current.value;

    if (type == "number") {
      if (validateInput(newValue)) {
        setInputValue(newValue);
        if (onChange) onChange(newValue, inputName);
      }
    } else {
      setInputValue(newValue);
      if (onChange) onChange(newValue, inputName);
    }
  }

  return (
    <div className="flex flex-col gap-2 flex-1  min-w-[200px] relative">
      {labelName && <label className="">{`${labelName} :`}</label>}
      {icon && <img src={icon} alt="icon" className="absolute top-1 right-1" />}
      <input
        name={inputName}
        ref={inputRef}
        type={type == "number" ? "text" : type}
        value={inputValue || ""}
        min={0}
        placeholder={placeHolder}
        onChange={handleChange}
        {...props}
        className={`w-full p-2 border ${
          error ? "border-red-500" : "border-inputBorder"
        } hover:border-blue-600 text-[#1C5B7D] font-bold font-tajawal placeholder:text-[#2B2B2B] rounded outline-none focus:border-[#1C5B7D] focus:border-2`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default MainInput;
