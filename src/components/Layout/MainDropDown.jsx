/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ArrowDownIcon, trueIcon } from "../../assets/index";
function MainDropDown({
  // name,
  labelName,
  placeholder,
  options = [],
  onChange,
  isAtModal,
  intialOptionsToShow = 5,
  value = "",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(intialOptionsToShow);

  const selectRef = useRef(null);
  const dropDownRef = useRef();

  // Filter options based on inputValue
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Slice filtered options for incremental loading
  const visibleOptions = filteredOptions.slice(0, visibleCount);

  const handleSelectChange = (selectedOption) => {
    setInputValue(selectedOption.label);
    if (onChange) onChange(selectedOption);
    setIsFocused(false);
    setActiveOptionIndex(-1); // Reset active index after selection
    setInputValue("");
  };

  const handleInputFocus = () => setIsFocused(true);

  const handleInputBlur = (event) => {
    if (
      dropDownRef.current &&
      dropDownRef.current.contains(event.relatedTarget)
    ) {
      return;
    }
    setIsFocused(false);
    setActiveOptionIndex(-1); // Reset active index when blurred
  };

  const handleKeyDown = (event) => {
    if (isFocused) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveOptionIndex((prevIndex) => {
          const newIndex =
            prevIndex + 1 >= visibleOptions.length ? 0 : prevIndex + 1;
          return newIndex;
        });

        dropDownRef.current.scrollBottom;
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveOptionIndex((prevIndex) => {
          const newIndex =
            prevIndex - 1 < 0 ? visibleOptions.length - 1 : prevIndex - 1;
          return newIndex;
        });
        dropDownRef.current.scrollTop;
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (activeOptionIndex >= 0 && activeOptionIndex < options.length) {
          handleSelectChange(visibleOptions[activeOptionIndex]);
        }
      }
    }
  };

  const scrollToActiveOption = () => {
    if (!dropDownRef.current) return;

    const activeOption = dropDownRef.current.querySelector(".active-option");
    // console.log(activeOption);
    if (activeOption) {
      const dropdownTop = dropDownRef.current.scrollTop;
      // console.log(dropdownTop);
      const dropdownBottom = dropdownTop + dropDownRef.current.clientHeight;
      // console.log(dropdownBottom);
      const optionTop = activeOption.offsetTop;
      // console.log(optionTop);
      const optionBottom = optionTop + activeOption.clientHeight;
      // console.log(optionBottom);
      // Adjust scroll if the option is above or below the visible area
      if (optionTop < dropdownTop) {
        // Scroll up if the active option is above the visible area
        dropDownRef.current.scrollTop = optionTop;
      } else if (optionBottom > dropdownBottom) {
        // Scroll down if the active option is below the visible area
        dropDownRef.current.scrollTop =
          optionBottom - dropDownRef.current.clientHeight;
        3;
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
    }

    return () => currentDropDown?.removeEventListener("scroll", handleScroll);
  }, [isFocused]);

  useEffect(() => {
    if ((!value || Object.keys(value).length === 0) && options.length > 0) {
      const firstOption = options[0];
      setInputValue(firstOption.label);
      if (onChange) onChange(firstOption);
    }
  }, []);

  return (
    <div
      className={`flex flex-col gap-2 ${
        isAtModal && "flex-1 min-w-[200px]"
      } max-w-[99%]`}
    >
      {labelName && <label className="">{`${labelName} :`}</label>}
      <div className="relative ">
        <input
          {...props}
          placeholder={`Choose ${placeholder}`}
          ref={selectRef}
          className="w-full h-[48px] box-border py-1 pl-2 pr-12 font-tajawal font-semibold text-sm border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded-lg outline-none placeholder:font-light"
          value={isFocused ? inputValue : value.label || options[0]?.label}
          onClick={isFocused ? handleInputBlur : handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown} // Listen for arrow and enter keys
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div
          className={`absolute right-1 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
            isFocused ? "rotate-180" : "rotate-0"
          } pointer-events-none`}
        >
          <img src={ArrowDownIcon} alt="Icon" className="w-[30px] h-[30px]" />
        </div>

        {isFocused && (
          <div
            ref={dropDownRef}
            className="absolute w-full m-1 text-sm font-semibold bg-white border border-[#DCDCDC] rounded-md shadow-lg max-h-40 overflow-y-auto scroll-smooth"
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
                      inputValue === option.label ? "bg-[#F6F6F6]" : ""
                    } flex justify-between items-center`}
                    onClick={() => handleSelectChange(option)}
                  >
                    <p className="">{option.label} </p>
                    <img
                      src={trueIcon}
                      alt="Icon"
                      className={`w-[20px] h-[20px] ${
                        inputValue === option.label ? "" : "hidden"
                      }`}
                    />
                  </div>
                );
              })
            ) : (
              <div className="p-2 text-gray-500">{"There's no options"}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainDropDown;
