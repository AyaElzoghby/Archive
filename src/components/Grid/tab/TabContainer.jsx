/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, Children } from "react";
import { rightArrow, leftArrow } from "../assets";
import Tab from "./Tab";
import { cloneElement } from "react";

function TabContainer({
  children,
  tabConfig,
  globalParams,
  activatedTab,
  setCurrentTab,
}) {
  const containerRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleScroll = (scrollOffset, dir) => {
    if (containerRef.current) {
      // Calculate the new scroll position
      const newScrollPosition =
        dir === "left"
          ? containerRef.current.scrollLeft - scrollOffset
          : containerRef.current.scrollLeft + scrollOffset;

      // Smoothly scroll to the new position
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };
  useEffect(() => {
    if (activatedTab) {
      setActiveTab(activatedTab.tab);
    }
  }, [activatedTab]);

  useEffect(() => {
    if (setCurrentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);
  const childrenArray = Children.toArray(children);
  const checkOverflow = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      setHasOverflow(scrollWidth > clientWidth); // Set hasOverflow based on scrollWidth vs clientWidth
    }
  };

  useEffect(() => {
    checkOverflow(); // Check overflow when the component mounts or when children change

    const handleResize = () => {
      checkOverflow(); // Check for overflow on window resize
    };

    window.addEventListener("resize", handleResize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener on unmount
    };
  }, [children]); // Dependency array includes children to trigger on change

  return (
    <div className="">
      <ul className="bg-mainGray my-2 flex items-center justify-start w-full border rounded-sm px-4 ">
        <div className="flex w-full">
          {/* Scroll left button */}
          {hasOverflow && (
            <button
              onClick={() => handleScroll(120, "right")}
              className="w-[2.5%] flex items-center justify-center cursor-pointer "
            >
              <img src={rightArrow} className="w-4 h-4" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-none w-[95%] flex justify-start"
          >
            {tabConfig.map((tab, index) => (
              <Tab
                key={index}
                name={tab.name}
                isActive={activeTab === index}
                onClick={() => {
                  !tab?.disabled && setActiveTab(index);
                }}
              />
            ))}
          </div>

          {hasOverflow && (
            <button
              onClick={() => handleScroll(120, "left")}
              className="w-[2.5%] flex items-center justify-center cursor-pointer "
            >
              <img src={leftArrow} className="w-4 h-4" />
            </button>
          )}
        </div>
      </ul>
      {globalParams
        ? cloneElement(childrenArray[activeTab], { globalParams })
        : childrenArray[activeTab]}
    </div>
  );
}

export default TabContainer;
