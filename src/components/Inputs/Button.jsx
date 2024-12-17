import { Spinner } from "../UI";
export const Button = ({ children, onClick, theme, loading }) => {
	const mainTheme =
		" font-bold text-2xl min-w-[345px]    px-12  min-h-10 rounded-md  transition";
	const blue = "bg-[#227099] text-white hover:bg-[#1a5a73]";
	const gray = "bg-[#D9D9D9] text-[#5C5E64] hover:bg-[#B0B0B0]";
	return (
		<button
			onClick={onClick}
			className={` ${mainTheme} ${theme == "blue" ? blue : gray}  `}>
			{loading ? <Spinner screenHegit={false}></Spinner> : <>{children}</>}
		</button>
	);
};
