/* eslint-disable react/prop-types */
function Tab({ isActive, last, onClick, name }) {
	return (
		<div
			className={`text-center flex-1 text-sm text-nowrap cursor-pointer max-w-[200px] ${
				isActive && "bg-[#1F618D] text-white"
			} ${!last && "border-l"}`}>
			<li
				onClick={onClick}
				className="p-2">
				{name}
			</li>
		</div>
	);
}

export default Tab;
