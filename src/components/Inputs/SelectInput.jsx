/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ArrowDownIcon, trueIcon } from "../../assets/index";

function SelectInput({
	name,
	labelName,
	options = [],
	// defaultOption = "",
	value = "",
	onChange,
	isAtModal,
	...props
}) {
	const [isFocused, setIsFocused] = useState(false);
	const [selectedValue, setSelectedValue] = useState(value || "");
	const [activeOptionIndex, setActiveOptionIndex] = useState(-1); // Track the active option
	const selectRef = useRef(null);
	const dropDownRef = useRef();

	useEffect(() => {
		// Ensure the component is controlled and in sync with `value`
		if (value !== undefined) {
			setSelectedValue(value);
		}
	}, [value]);

	const handleSelectChange = (selectedOption) => {
		setSelectedValue(selectedOption[name]);
		if (onChange) onChange(selectedOption);
		setIsFocused(false);
		setActiveOptionIndex(-1); // Reset active index after selection
	};

	const handleInputFocus = () => setIsFocused(true);

	const handleInputBlur = (event) => {
		if (
			dropDownRef.current &&
			dropDownRef.current.contains(event.relatedTarget)
		) {
			return;
		}
		setIsFocused(false);
		setActiveOptionIndex(-1); // Reset active index when blurred
	};

	const handleKeyDown = (event) => {
		if (isFocused) {
			if (event.key === "ArrowDown") {
				event.preventDefault();
				setActiveOptionIndex((prevIndex) => {
					const newIndex = prevIndex + 1 >= options.length ? 0 : prevIndex + 1;
					return newIndex;
				});
			} else if (event.key === "ArrowUp") {
				event.preventDefault();
				setActiveOptionIndex((prevIndex) => {
					const newIndex =
						prevIndex - 1 < 0 ? options.length - 1 : prevIndex - 1;
					return newIndex;
				});
			} else if (event.key === "Enter") {
				event.preventDefault();
				if (activeOptionIndex >= 0 && activeOptionIndex < options.length) {
					handleSelectChange(options[activeOptionIndex]);
				}
			}
		}
	};

	useEffect(() => {
		if (isFocused && dropDownRef.current) {
			// Scroll to the active option in the dropdown
			const activeOption = dropDownRef.current.querySelector(".active-option");
			if (activeOption) {
				activeOption.scrollIntoView({ block: "nearest" });
			}
		}
	}, [activeOptionIndex]);

	// useEffect(() => {
	//   console.log(selectedValue);
	// }, [selectedValue]);

	return (
		<div
			className={`flex flex-col gap-2 ${
				isAtModal && "flex-1 min-w-[200px]"
			} max-w-[99%]`}>
			{labelName && <label className="">{`${labelName} :`}</label>}
			<div className="relative ">
				<input
					{...props}
					placeholder={`اختر ${labelName}`}
					ref={selectRef}
					className="w-full m-2 box-border p-2 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded-md outline-none placeholder:font-light"
					value={selectedValue}
					onClick={isFocused ? handleInputBlur : handleInputFocus}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown} // Listen for arrow and enter keys
					readOnly
				/>
				<div
					className={`absolute left-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
						isFocused ? "rotate-180" : "rotate-0"
					} pointer-events-none`}>
					<img
						src={ArrowDownIcon}
						alt="Icon"
						className="w-[30px] h-[30px]"
					/>
				</div>

				{isFocused && (
					<div
						ref={dropDownRef}
						className="absolute  w-full m-1 bg-white border border-[#DCDCDC] rounded-md shadow-lg max-h-40 overflow-y-auto z-[9999]"
						style={{ zIndex: 9999 }}>
						{options.length > 0 ? (
							options.map((option, index) => {
								const isActive = index === activeOptionIndex;
								return (
									<div
										tabIndex={-1}
										key={index}
										className={`p-2 cursor-pointer hover:bg-gray-200 ${
											isActive ? "bg-blue-100 active-option" : ""
										} ${
											selectedValue === option[name]
												? "bg-[#F6F6F6] active-option"
												: ""
										} justify-between flex items-center`}
										onClick={() => handleSelectChange(option)}>
										<p className=""> {option[name]} </p>
										<img
											src={trueIcon}
											alt="Icon"
											className={`w-[20px] h-[20px] ${
												selectedValue === option[name] ? "" : "hidden"
											}`}
										/>
									</div>
								);
							})
						) : (
							<div className="p-2 text-gray-500">لا يوجد خيارات</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default SelectInput;
