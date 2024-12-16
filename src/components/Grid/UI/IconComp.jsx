/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { SideMenuContext } from "../../../store/SideMenuContext";

function IconComp({ isOpened, src, handleClick, config, toolName }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipInfo, setTooltipInfo] = useState({ top: 0 });
  const tooltipRef = useRef(null); // Ref for tooltip DOM element
  const hideTimeout = useRef(null);

  const { pageNameHandler } = useContext(SideMenuContext);

  // Function to calculate the tooltip position
  const calculateTooltipPosition = (targetElement) => {
    const rect = targetElement.getBoundingClientRect();
    const tooltipHeight = tooltipRef.current?.offsetHeight || 0; // Tooltip height

    const viewportHeight = window.innerHeight;

    let top;

    // Check for overflow and adjust position
    if (rect.bottom + tooltipHeight > viewportHeight) {
      top = viewportHeight - tooltipHeight - 20; // Position above the target
    } else {
      top = rect.top; // Position below the target
    }

    setTooltipInfo({ top });
  };

  // Event handlers
  const handleMouseEnter = (event) => {
    clearTimeout(hideTimeout.current); // Cancel any pending hide
    setIsHovered(true);
    calculateTooltipPosition(event.target); // Calculate tooltip position
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  // Recalculate tooltip position when config changes or window resizes
  useEffect(() => {
    const handleResize = () => {
      if (isHovered && tooltipRef.current) {
        calculateTooltipPosition(tooltipRef.current.parentElement); // Update position
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHovered]);

  const tooltip = (
    <div
      ref={tooltipRef}
      className="absolute bg-white z-50 right-16 font-tajawal p-4 shadow-md border rounded-md"
      style={{
        top: tooltipInfo.top,
        visibility: isHovered ? "visible" : "hidden",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
      }}
      onMouseEnter={() => clearTimeout(hideTimeout.current)}
      onMouseLeave={handleMouseLeave}
    >
      <p className="font-semibold text-lg">{config?.[toolName]}</p>
      <div className="flex flex-col items-start gap-1 text-md font-normal">
        {config?.children.map((child, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              navigate(child.NavigateUrl);
              pageNameHandler(child[toolName]);
            }}
            className="hover:text-mainBlue shadow-sm hover:scale-95 duration-500 ease-in-out"
          >
            {child?.[toolName]}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Icon */}
      <div
        className={`relative flex justify-center items-center duration-300 ${
          !isOpened ? "block" : "hidden"
        }`}
      >
        <img
          src={src}
          alt="icon"
          className="cursor-pointer hover:scale-[1.2] duration-300 ease-out"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Tooltip rendered through portal */}
      {createPortal(tooltip, document.getElementById("toolTip"))}
    </>
  );
}

export default IconComp;
