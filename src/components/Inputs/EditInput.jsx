/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

function EditInput({
	value,
	type = "text",
	onChange,
	isRequired = false,
	...props
}) {
	const [inputValue, setInputValue] = useState(value || "");
	const inputRef = useRef();

	useEffect(() => {
		setInputValue(value || (type === "number" ? 0 : ""));
	}, [value, type]);

	function handleChange(e) {
		const newValue = e.target.value;
		setInputValue(newValue);
		if (onChange) onChange(newValue);
	}

	return (
		<input
			ref={inputRef}
			value={inputValue}
			required={isRequired}
			type={type}
			onChange={handleChange}
			{...props}
			className="w-full z-50 p-2 border border-[#7f888d] hover:border-[#1C5B7D] text-[#1C5B7D] font-bold font-tajawal placeholder:text-[#2B2B2B] rounded outline-none focus:border-[#1C5B7D] focus:border-2"
		/>
	);
}

export default EditInput;
