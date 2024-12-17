/* eslint-disable react/prop-types */
import searchIcon from "/icons/Search-Magnifier.svg";

const SearchInput = ({ onSearch }) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        className="w-full box-border p-2 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className={`absolute right-1 mx-2 top-2`}>
        <img src={searchIcon} alt="" />
      </div>
    </div>
  );
};

export default SearchInput;
