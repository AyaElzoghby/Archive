/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

const MainInput = ({
  labelName,
  value,
  onChange,
  icon,
  placeholder,
  type = "text",
  inputName,
  from,
  to,
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
      // Check if the input is a valid number
      if (!/^\d*\.?\d*$/.test(newValue)) {
        setError("Please enter a valid number");
        return false;
      }

      const numValue = parseFloat(newValue);

      // Validate range if `from` and `to` props are provided
      if (from !== undefined && numValue < from) {
        setError(`يجب أن تكون القيمه أكبر من أو تساوى${from}`);
        return false;
      }
      if (to !== undefined && numValue > to) {
        setError(`يجب ان تون القيمه أقل من أو تساوى ${to}`);
        return false;
      }
    }

    setError(""); // Clear the error if validation passes
    return true;
  };

  const handleChange = () => {
    const newValue = inputRef.current.value;

    if (type === "number") {
      if (validateInput(newValue)) {
        setInputValue(newValue);
        if (onChange) onChange(newValue, inputName);
      }
    } else {
      setInputValue(newValue);
      if (onChange) onChange(newValue, inputName);
    }
  };

  return (
    <div className="flex flex-col gap-2 flex-1 min-w-[200px] relative">
      {labelName && <label className="">{`${labelName} :`}</label>}
      {icon && <img src={icon} alt="icon" className="absolute top-1 right-1" />}
      <input
        name={inputName}
        ref={inputRef}
        type={type === "number" ? "text" : type} // Use type="text" for numbers to allow validation
        value={inputValue || value}
        placeholder={placeholder || ""}
        onChange={handleChange}
        {...props}
        className={` p-2 border ${
          error ? "border-red-500" : "border-inputBorder"
        } hover:border-blue-600 text-[#1C5B7D] font-bold font-tajawal rounded outline-none focus:border-[#1C5B7D] focus:border-2 placeholder:text-gray-400 placeholder:text-sm`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default MainInput;
