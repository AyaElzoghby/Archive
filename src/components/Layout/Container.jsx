export const Container = ({ children, Buttons, parentStyle }) => {
	return (
		<>
			<div
				className={`grid  grid-cols-2 gap-4 p-4 justify-evenly  shadow-md rounded-xl ${parentStyle}`}>
				{children}
				<div className=" mt-4 flex col-span-2 p-8 gap-8 justify-center items-center">
					{Buttons}
				</div>
			</div>
		</>
	);
};
