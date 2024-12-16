/* eslint-disable react/prop-types */

// import ListIcon from "/icons/List.svg";

function PageHeader({ title, handleShowTree }) {
	return (
		<header className=" flex items-center justify-between p-4 hidden bg-mainBlue mb-2">
			<h1 className=" text-white font-bold">{title}</h1>
			{handleShowTree && (
				<div
					className="cursor-pointer"
					onClick={handleShowTree}>
					{/* <img src={ListIcon} alt="ListIconImg" /> */}
				</div>
			)}
		</header>
	);
}

export default PageHeader;
