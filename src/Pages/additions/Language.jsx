import { useState, useContext, useEffect, useRef } from "react";
import globalIcon from "/icons/GlobeSimple.svg";
import { DropDown } from "../../components";
import { SideMenuContext } from "../../store/SideMenuContext";

const Language = () => {
  const [LangrMenu, setLangrMenu] = useState(false);
  const dropdownRef = useRef(null);

  const { languageValue, Languages, handleChangeLanguage } =
    useContext(SideMenuContext);

  // Event listener to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangrMenu(false); // Close the dropdown menu
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside); // Cleanup the listener
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button for Popup */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from propagating to window
          setLangrMenu(!LangrMenu);
        }}
        className={`flex justify-center items-center`}
      >
        <img
          src={globalIcon}
          alt=""
          className="cursor-pointer hover:scale-[1.2] duration-300 ease-out"
        />
      </button>
      <div
        className={` absolute ${
          languageValue === 1 ? "left-0" : "right-0"
        } w-56 top-8 ${LangrMenu ? "flex" : "hidden"}`}
      >
        <DropDown
          value={languageValue}
          onChange={(val) => {
            handleChangeLanguage(val);
          }}
          placeHolder={"اللغه"}
          options={Languages}
        />
      </div>
    </div>
  );
};

export default Language;
