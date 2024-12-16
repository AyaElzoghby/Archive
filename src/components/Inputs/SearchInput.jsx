import React from "react";
import searchIcon from "/icons/Search-Magnifier.svg";
import Filter from "../../../public/assets/Filter.svg";

const SearchInput = ({ onSearch }) => {
  return (
    <div className="grid-cols-3 grid gap-2">
      <div className="relative col-span-2">
        <input
          type="text"
          className="w-full box-border p-2  pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
        <div   className={`absolute right-1 mx-2 top-2`}>
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="relative col-span-1">
        <input
          type="text"
          placeholder="Key Search"
          className=" w-full box-border p-2 pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
        />
        <div   className={`absolute right-1 mx-2 top-3`}>
        <img src={Filter} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
