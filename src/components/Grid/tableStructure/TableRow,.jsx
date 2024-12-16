/* eslint-disable react/prop-types */
function TableRow({
  isHead,
  style,
  handleClick,
  handleDblClick,
  children,
  ...props
}) {
  // console.log(style);
  // console.log("TableRow -> props", props);
  return (
    <div
      className={
        `${isHead ? "rounded-t-md" : ""} w-fit flex ${
          handleClick || handleDblClick ? "cursor-pointer" : ""
        }` + style
      }
      onClick={handleClick ? handleClick : null}
      onDoubleClick={handleDblClick ? handleDblClick : null}
      {...props}
    >
      {children}
    </div>
  );
}

export default TableRow;
