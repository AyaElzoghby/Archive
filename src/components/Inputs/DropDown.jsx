/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ArrowDownIcon, trueIcon } from "../../assets/index";
import { useContext } from "react";
import { SideMenuContext } from "../../store/SideMenuContext";
function DropDown({
  labelName,
  placeHolder,
  options = [],
  value = "",
  onChange,
  isAtModal,
  intialOptionsToShow = 5,
  haveSearch,
  notEditable = false,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(intialOptionsToShow);
  const [selectedValue, setSelectedValue] = useState(
    options.find((option) => option && option?.value === value)?.label || value
  );

  const { languageValue } = useContext(SideMenuContext);

  const selectRef = useRef(null);
  const dropDownRef = useRef();

  const filteredOptions =
    options?.length >= 1
      ? options.filter(
          (option) =>
            option &&
            option.label?.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];

  const visibleOptions = filteredOptions.slice(0, visibleCount);

  useEffect(() => {
    setSelectedValue(
      options.find((option) => option?.value === value)?.label || value?.label
    );
  }, [options]);

  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption?.label);
    if (onChange) onChange(selectedOption?.value);
    setIsFocused(false);
    setActiveOptionIndex(-1);
  };

  const handleInputFocus = () => setIsFocused(true);

  const handleInputBlur = (event) => {
    if (
      dropDownRef.current &&
      dropDownRef.current.contains(event?.relatedTarget)
    ) {
      return;
    }
    setIsFocused(false);
    setActiveOptionIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (isFocused) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveOptionIndex((prevIndex) =>
          prevIndex + 1 >= filteredOptions?.length ? 0 : prevIndex + 1
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveOptionIndex((prevIndex) =>
          prevIndex - 1 < 0 ? filteredOptions?.length - 1 : prevIndex - 1
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (
          activeOptionIndex >= 0 &&
          activeOptionIndex < filteredOptions?.length
        ) {
          handleSelectChange(filteredOptions[activeOptionIndex]);
        }
      }
    }
  };

  const scrollToActiveOption = () => {
    if (!dropDownRef.current) return;

    const activeOption = dropDownRef.current.querySelector(".active-option");
    if (activeOption) {
      const dropdownTop = dropDownRef.current.scrollTop;
      const dropdownBottom = dropdownTop + dropDownRef.current.clientHeight;
      const optionTop = activeOption.offsetTop;
      const optionBottom = optionTop + activeOption.clientHeight;

      if (optionTop < dropdownTop) {
        dropDownRef.current.scrollTop = optionTop;
      } else if (optionBottom > dropdownBottom) {
        dropDownRef.current.scrollTop =
          optionBottom - dropDownRef.current.clientHeight;
      }
    }
  };

  const handleScroll = () => {
    if (
      dropDownRef.current &&
      dropDownRef.current.scrollTop + dropDownRef.current.clientHeight >=
        dropDownRef.current.scrollHeight - 10
    ) {
      setVisibleCount((prev) => Math.min(prev + 5, filteredOptions.length));
    }
  };

  useEffect(() => {
    if (isFocused) {
      scrollToActiveOption();
    }
  }, [activeOptionIndex, isFocused]);

  useEffect(() => {
    const currentDropDown = dropDownRef.current;
    if (isFocused) {
      currentDropDown?.addEventListener("scroll", handleScroll);
      return () => currentDropDown?.removeEventListener("scroll", handleScroll);
    }
  }, [isFocused]);

  return (
    <div
      className={`flex flex-col gap-2 ${isAtModal && "flex-1 min-w-[200px]"}`}
    >
      {labelName && <label>{`${labelName} :`}</label>}
      <div className="relative">
        <input
          {...props}
          placeholder={`اختر ${placeHolder || labelName}`}
          ref={selectRef}
          className={`${
            notEditable ? "bg-mainBlue text-white" : "text-inputTextColor"
          } w-full box-border p-2  font-tajawal center font-semibold text-base border border-inputBorder hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light`}
          value={isFocused ? inputValue : selectedValue}
          onClick={
            notEditable ? null : isFocused ? handleInputBlur : handleInputFocus
          }
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
          readOnly={!haveSearch || (notEditable ? true : false)}
        />
        <div
          className={`absolute ${
            languageValue === 1 ? "left-1" : "right-1"
          }  top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
            isFocused && !notEditable ? "rotate-180" : "rotate-0"
          } pointer-events-none`}
        >
          <img src={ArrowDownIcon} alt="Icon" className="w-[30px] h-[30px]" />
        </div>

        {isFocused && !notEditable && (
          <div
            ref={dropDownRef}
            className={`absolute w-full m-1 bg-white border border-[#DCDCDC] rounded-md shadow-lg max-h-40 overflow-y-auto scroll-smooth z-50`}
            style={{ zIndex: 9999 }}
          >
            {visibleOptions.length > 0 ? (
              visibleOptions.map((option, index) => {
                const isActive = index === activeOptionIndex;
                return (
                  <div
                    tabIndex={-1}
                    key={index}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${
                      isActive ? "bg-blue-100 active-option" : ""
                    } ${
                      selectedValue === option?.label ? "bg-[#F6F6F6]" : ""
                    } flex justify-between items-center`}
                    onClick={() => handleSelectChange(option)}
                  >
                    {option.img ? (
                      <img
                        src={option.img}
                        alt="Icon"
                        className="w-[20px] h-[20px]"
                      />
                    ) : null}

                    <p>{option?.label ? option?.label : ""}</p>
                    <img
                      src={trueIcon}
                      alt="Icon"
                      className={`w-[20px] h-[20px] ${
                        selectedValue === option?.label ? "" : "hidden"
                      }`}
                    />
                  </div>
                );
              })
            ) : (
              <div className="p-2 text-gray-500">لا يوجد خيارات</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDown;
