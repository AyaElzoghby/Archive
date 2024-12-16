const Spinner = ({ parentStyle = "", childStyle = "" }) => {
	// Initial state set to true
	return (
		<div
			className={`flex justify-center items-center min-h-screen ${parentStyle}`}>
			<div
				className={`w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500  ${childStyle}`}></div>
		</div>
	);
};

export default Spinner;
