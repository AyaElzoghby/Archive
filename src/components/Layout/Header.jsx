import IsisLogo from "../../../public/icons/IsisLogo.svg";
import ProjectLogo from "../../../public/icons/ProjectLogo.svg";
import Language from "../../Pages/additions/Language"

// import { bar } from "../../assets/index";
export default function Header() {
	return (
		<header className="flex justify-between items-center px-8 py-4 bg-[#FAFAFA]  border-b border-[#00000010]">
			<img
				src={IsisLogo}
				alt="Logo 1"
				className="h-10"
			/>
			<img
				src={ProjectLogo}
				alt="Logo 2"
				className="h-10"
			/>
			<Language/>
		</header>
	);
}
