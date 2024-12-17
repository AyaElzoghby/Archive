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
        className="flex items-center border rounded-lg px-4 py-2 bg-white hover:bg-gray-100 transition duration-300 ease-out"
      >
        <img
          src={globalIcon}
          alt="Language Icon"
          className="w-6 h-6 mr-2" // Adjusted size for the flag icon
        />
        <span className="font-medium">{languageValue === 1 ? "English" : "العربية"}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${LangrMenu ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute ${languageValue === 1 ? "left-0" : "right-0"} w-56 top-10 ${
          LangrMenu ? "block" : "hidden"
        }`}
      >
        <DropDown
          value={languageValue}
          onChange={(val) => {
            handleChangeLanguage(val);
          }}
          placeHolder={"Select Language"}
          options={Languages}
        />
      </div>
    </div>
  );
};

export default Language;
