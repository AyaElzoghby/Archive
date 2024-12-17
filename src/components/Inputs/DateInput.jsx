/* eslint-disable react/prop-types */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

const DateInput = ({ value, labelName, placeholder, onChange }) => {
	// Set the initial state to `value` or null (to ensure no default to today's date)
	const [selectedDate, setSelectedDate] = useState(value || null);

	// Sync the component's state with the `value` prop in case it changes dynamically
	useEffect(() => {
		setSelectedDate(value || null);
	}, [value]);

	const handleChange = (date) => {
		setSelectedDate(date); // Set local state
		if (onChange) onChange(date); // Call the parent onChange
	};

	return (
		<div className="flex flex-col gap-2 flex-1 min-w-[200px] relative">
			{labelName && <label className="">{`${labelName} :`}</label>}
			<DatePicker
				selected={selectedDate}
				onChange={(date) => handleChange(date)}
				placeholderText={placeholder}
				className="border border-gray-300 rounded p-2"
			/>
		</div>
	);
};

export default DateInput;
