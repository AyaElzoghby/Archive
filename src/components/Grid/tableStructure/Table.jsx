/* eslint-disable react/prop-types */
function Table({ children }) {
  return (
    <div  className="min-h-[380.4px] w-full  overflow-x-auto scrollbar-none pb-4 mb-4">
      {children}
    </div>
  );
}

export default Table;
