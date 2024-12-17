import DateInput from "./DateInput";
export const DateArchive = ({ title, value, onChange, placeHolder }) => {
	return (
		<div className="flex  justify-between w-full">
			<label
				htmlFor=""
				className="text-lg font-semibold text-[#2B2B2B]">
				{title}
			</label>
			<div>
				<DateInput
					onChange={onChange}
					placeholder={placeHolder}
					value={value}></DateInput>
			</div>
		</div>
	);
};
