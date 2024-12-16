/* eslint-disable react/prop-types */

import Spinner from "./spinner";
function TableButton({ theme, children, style = "", loading, ...props }) {
	let themeClass =
		"  gap-1 py-1 px-2 rounded duration-300 hover:text-white text-sm flex-1 font-tajawal";
	const cancelClass = " bg-[#F9EAEB] text-[#F15555] hover:bg-red-500";
	const editClass = " bg-[#E4EDF2] text-[#227099]  hover:bg-[#227099]";
	const addClass = " bg-[#E8F0EE] text-[#428C71] hover:bg-green-500";
	const reportClass =
		" bg-red-500 text-white hover:bg-red-300 hover:text-red-700";
	const disabledClass =
		"bg-gray-500 text-[#428C71] cursor-not-allowed p-2 rounded text-sm text-white flex-1 font-tajawal";
	switch (theme) {
		case "cancel":
			themeClass += cancelClass;
			break;

		case "edit":
			themeClass += editClass;
			break;

		case "report":
			themeClass += reportClass;
			break;
		case "disabled":
			themeClass = disabledClass;
			break;
		default:
			themeClass += addClass;
			break;
	}

	return (
		<button
			className={themeClass + " " + style}
			{...props}>
			{loading ? (
				<Spinner
					parentStyle={"min-h-5"}
					childStyle={"h-4 w-4"}></Spinner>
			) : (
				<> {children}</>
			)}
		</button>
	);
}

export default TableButton;
