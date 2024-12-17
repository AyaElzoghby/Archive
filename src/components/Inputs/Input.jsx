import { useEffect, useRef, useState } from "react";

export const Input = ({
	title,
	value = "",
	onChange,
	placholder,
	type = "text",
}) => {
	const [inputvalue, setValue] = useState("");
	const inputRef = useRef(null);
	useEffect(() => {
		setValue(value);
	}, [value]);

	const handleChange = () => {
		const val = inputRef.current.value;
		setValue(val);
		if (onChange) onChange(val);
	};

	return (
		<div className="flex justify-between items-center ">
			<label
				htmlFor=""
				className="text-lg font-semibold text-[#2B2B2B]">
				{title}
			</label>
			<input
				ref={inputRef}
				type={type}
				value={inputvalue ? inputvalue : value}
				onChange={handleChange}
				placeholder={placholder}
				className="min-w-[300px]  max-h-[48px] p-2  border border-gray-400 rounded-[7px] focus:outline-none focus:border-[#227099]"
			/>
		</div>
	);
};
