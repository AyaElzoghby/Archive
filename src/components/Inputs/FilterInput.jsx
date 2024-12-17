/* eslint-disable react/prop-types */
import Filter from "/assets/Filter.svg";

function FilterInput({ placeholder }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder ? placeholder : "Key Search"}
        className=" p-2 font-tajawal font-semibold text-base border border-inputBorder text-inputTextColor focus:border-inputFocuse rounded outline-none placeholder:font-light"
      />
      <div className={`absolute right-2 top-3`}>
        <img src={Filter} alt="" />
      </div>
    </div>
  );
}

export default FilterInput;
