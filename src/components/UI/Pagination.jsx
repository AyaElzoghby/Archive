/* eslint-disable react/prop-types */

import prev from "/icons/Prev.svg";
import next from "/public/icons/next.svg";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const startPage = 1;
  const lastPage = totalPages;

  // Generate the page numbers array with ellipses
  const getPageNumbers = () => {
    let pages = [];

    if (totalPages > 3) {
      if (currentPage > 3 && currentPage < lastPage - 2) {
        pages = [
          startPage,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          lastPage,
        ];
      } else if (currentPage >= lastPage - 3) {
        pages = [startPage, "...", lastPage - 2, lastPage - 1, lastPage];
      } else if (currentPage <= 3) {
        pages = [startPage, 2, 3, 4, "...", lastPage];
      }
    } else if (totalPages === 3) {
      pages = [1, 2, 3];
    } else if (totalPages === 2) {
      pages = [1, 2];
    } else {
      pages = [1];
    }

    return pages;
  };

  const Pages = getPageNumbers();

  return (
    <div dir="ltr" className="w-full flex items-center mx-auto p-4 ">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className=" border border-[#F1F1F1] bg-white hover:bg-blue-500 duration-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <img src={prev} alt="" />
        </button>
        {Pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1 text-blue-500">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`} // Ensuring unique key by prefixing with `page-`
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 outline-none border border-[#F1F1F1] hover:border-blue-500 rounded-md hover:bg-blue-500 hover:text-white duration-500 ${
                page === currentPage
                  ? "bg-blue-500 text-white border-transparent"
                  : "bg-white  "
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-white border border-[#F1F1F1] hover:bg-blue-500 duration-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <img src={next} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
