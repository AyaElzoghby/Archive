import { useState, useContext, useEffect, useRef } from "react";
import globalIcon from "/icons/GlobeSimple.svg";
import { DropDown } from "../../components";
import { SideMenuContext } from "../../../src/store/SideMenuContext";

const Language = () => {
  const [langMenu, setLangMenu] = useState(false); // Fixed typo in variable name
  const dropdownRef = useRef(null);

  const { languageValue, setLanguageValue } = useContext(SideMenuContext);

  // Language options
  const Languages = [
    { value: 1, label: "العربيه", img: "/icons/Egypt.svg" },
    { value: 2, label: "English", img: "/icons/UnitedStates.svg" },
  ];

  const handleChangeLanguage = (value) => {
    localStorage.setItem("LangValue", JSON.stringify(value));
    setLanguageValue(value);
  };

  // Event listener to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangMenu(false); // Close the dropdown menu
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside); // Cleanup the listener
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[150px]">
      {/* Trigger Button for Popup */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from propagating to window
          setLangMenu(!langMenu);
        }}
        className="flex justify-center items-center"
      >
        <img
          src={globalIcon}
          alt="Language Selector"
          className="cursor-pointer hover:scale-[1.2] duration-300 ease-out"
        />
      </button>
      <div
        className={`absolute right-4 top-[50%] ${
          langMenu ? "flex" : "hidden"
        }`}
      >
        <DropDown
          value={languageValue}
          onChange={(val) => {
            handleChangeLanguage(val);
          }}
          placeHolder={"إختر اللغه"}
          options={Languages}
        />
      </div>
    </div>
  );
};

export default Language;
