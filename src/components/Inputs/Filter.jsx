/* eslint-disable react/prop-types */
const Filter = ({ filters = [], isFilterOpen }) => {
  return (
    <>
      <div className="w-full ">
        {isFilterOpen && (
          <div
            className={`p-3 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ${
              isFilterOpen ? "" : "hidden"
            }`}
          >
            {filters.map((filter, index) => (
              <div key={index} className="flex flex-col">
                {filter}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
