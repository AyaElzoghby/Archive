import DropDown from "./DropDown";
export const CustomDropDown = ({
	title,
	options,
	value,
	onChange,
	placholder,
}) => {
	return (
		<div className="flex justify-between">
			<label
				htmlFor=""
				className="text-lg font-semibold text-[#2B2B2B]">
				{title}
			</label>
			<div className="min-w-[300px]">
				<DropDown
					value={value}
					placeHolder={placholder}
					onChange={onChange}
					options={options}></DropDown>
			</div>
		</div>
	);
};
