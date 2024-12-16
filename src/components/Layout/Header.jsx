import IsisLogo from "../../../public/icons/IsisLogo.svg";
import ProjectLogo from "../../../public/icons/ProjectLogo.svg";
import Language from "../../Pages/additions/Language";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-[#FAFAFA] border-b border-[#00000010]">
      <div>
        <img src={IsisLogo} alt="Logo 1" className="h-10" />
      </div>
      <div>
        <img src={ProjectLogo} alt="Logo 2" className="h-10" />
      </div>
      <div>
        <Language />
      </div>
    </header>
  );
}
