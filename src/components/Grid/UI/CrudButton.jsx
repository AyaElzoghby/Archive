/* eslint-disable react/prop-types */
import { useState } from "react";
import Spinner from "../../UI/spinner";

import { post } from "../../../utilities";

function CrudButton({ body, title, onsuccess }) {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		try {
			setIsLoading(true);
			const response = await post("table/", {}, body);
			setIsLoading(false);
			onsuccess(response);
		} catch (error) {
			console.error(error, "faild to send data");
		}
	};

	return (
		<div>
			<button
				onClick={handleClick}
				className=" bg-[#E8F0EE] text-[#428C71] hover:bg-green-500 hover:text-white px-6 py-2 rounded-lg  focus:outline-none duration-300">
				{isLoading && (
					<div className=" relative">
						<Spinner
							parentStyle={` min-h-6  `}
							childStyle={" w-4 h-4"}
						/>
					</div>
				)}
				{!isLoading && title}
			</button>
		</div>
	);
}

export default CrudButton;
