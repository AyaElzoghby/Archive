/* eslint-disable react/prop-types */
function TableToolBar({
  toolBarWidth,
  toolBarContent,
  toolBarStyle,
  children,
}) {
  return (
    <div
      style={{
        width: `${toolBarWidth}px`,
        maxWidth: `${100}%`, // Corrected syntax for inline style
      }}
      className={
        "font-tajawal flex items-center flex-wrap gap-1 border-2 border-b-0 rounded-t-lg py-2 px-4 border-mainGray " +
        toolBarStyle
      }
    >
      {children}
      <div>{toolBarContent}</div>
    </div>
  );
}
export default TableToolBar;
