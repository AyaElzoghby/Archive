/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { dot, True } from "../assets";

function Checkbox({
  keyName,
  labelName,
  title,
  value = false,
  onChange,
  direction = "ltr",
  isEditable = false,
  checkboxSize = "medium",
  checkboxColor = "#4285F4",
  uncheckedIcon = "",
  checkboxShape = "square",
}) {
  const [isChecked, setIsChecked] = useState(value);

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const handleCheckboxChange = () => {
    if (!isEditable) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked, keyName);
  };

  const getCheckboxSize = () => {
    switch (checkboxSize) {
      case "small":
        return "w-4 h-4 text-xs p-0.2";
      case "medium":
        return "w-5 h-5 text-sm p-0.2";
      case "large":
        return "w-6 h-6 text-base p-0.2";
      default:
        return "w-5 h-5 text-sm p-0.2";
    }
  };

  const getCheckboxShape = () => {
    switch (checkboxShape) {
      case "circle":
        return "rounded-full";
      case "square":
      default:
        return "rounded-md";
    }
  };

  const checkedIconShape = () => {
    return checkboxShape === "circle" ? (
      <img src={dot} alt="Checked Icon" className="w-full h-full" />
    ) : (
      <img src={True} alt="Checked Icon" className="w-full h-full" />
    );
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        direction === "rtl" ? "flex-row-reverse" : ""
      }`}
      title={title}
    >
      <div
        className={`relative flex items-center hover:outline outline-borderNotActiveHoverColor outline-2 justify-center cursor-pointer ${getCheckboxSize()} ${getCheckboxShape()}`}
        onClick={handleCheckboxChange}
      >
        {isChecked ? (
          <div
            className={`absolute border-2 hover:outline outline-borderActiveHoverColor outline-2 text-white flex items-center justify-center ${getCheckboxShape()} ${getCheckboxSize()} `}
            style={{
              borderColor: checkboxColor,
              backgroundColor: checkboxColor,
            }}
          >
            {checkedIconShape()}
          </div>
        ) : (
          <div
            className={`absolute border-2 border-borderColor text-center ${getCheckboxShape()} ${getCheckboxSize()} `}
            style={{ color: checkboxColor }}
          >
            {uncheckedIcon}
          </div>
        )}
      </div>
      <label
        htmlFor={keyName}
        className="cursor-pointer text-gray-600"
        style={{ pointerEvents: isEditable ? "auto" : "none" }}
      >
        {labelName}
      </label>
    </div>
  );
}

export default Checkbox;
