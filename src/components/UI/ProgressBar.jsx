export const ProgressBar = ({ step }) => {
	return (
		<div className="flex my-8 gap-2">
			<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
			<div
				className={`w-[100%] h-[10px] mx-auto mb-6 ${
					step > 1 ? "bg-[#227099]" : "bg-[#F4F4F4]"
				}`}></div>
			<div
				className={`w-[100%] h-[10px] mx-auto mb-6 ${
					step > 2 ? "bg-[#227099]" : "bg-[#F4F4F4]"
				}`}></div>
		</div>
	);
};
