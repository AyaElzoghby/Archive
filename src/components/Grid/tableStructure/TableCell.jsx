/* eslint-disable react/prop-types */

function TableCell({ isHead, width, colIndex, onResize, children }) {
  const handleMouseDown = (event) => {
    const startX = event.clientX;
    const startWidth = width;

    document.body.style.userSelect = "none";

    const onMouseMove = (e) => {
      let newWidth;

      // Correct width adjustment based on direction
      if (document.dir === "rtl") {
        // For RTL, subtracting mouse movement from startWidth
        newWidth = startWidth + (startX - e.clientX);
      } else {
        // For LTR, adding mouse movement to startWidth
        newWidth = startWidth + (e.clientX - startX);
      }

      onResize(colIndex, Math.max(newWidth, 50)); // Ensure a minimum width
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      // Ensure this matches your actual direction
      className={`relative flex items-center justify-center border border-gray-300 py-1 px-2 ${
        isHead ? ` bg-mainGray overflow-hidden` : " text-sm "
      } text-[#2b2b2bd9]  font-semibold font-tajawal `}
      style={{ width: `${width}px`, minWidth: "50px" }} // still allow resizing
    >
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
      {onResize && (
        <div
          className="absolute left-0 top-0 h-full w-1 cursor-ew-resize hover:bg-blue-500"
          onMouseDown={handleMouseDown}
        />
      )}
    </div>
  );
}

export default TableCell;
