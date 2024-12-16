import globalIcon from "/icons/GlobeSimple.svg";
// import Notification from "../../Pages/additions/Notification"
import { useContext } from "react";
import { SideMenuContext } from "../../store/SideMenuContext";
import Notification from "../../Pages/additions/Notification";
import TasksList from "../../Pages/additions/TasksList";
import Language from "../../Pages/additions/Language";

function SecondaryHeader() {
  const { pageName, systemValue } = useContext(SideMenuContext);

  return (
    <div className="bg-white flex justify-between items-center py-3 pl-5 pr-3 border-b border-b-[#D9D9D9] sticky top-0 z-10">
      <div className="font-tajawal font-bold">
        <p>{`${systemValue.label} / ${pageName}`}</p>
      </div>

      <div className=" flex gap-3">
        {/* <div className={`flex justify-center items-center`}>
          <img
            src={globalIcon}
            alt=""
            className="cursor-pointer hover:scale-[1.2] duration-300 ease-out"
          />
        </div> */}
        <Language />
        <TasksList />
        <Notification />
      </div>
    </div>
  );
}

export default SecondaryHeader;
