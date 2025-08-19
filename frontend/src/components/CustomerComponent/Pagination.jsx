import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

 function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center gap-2 mt-5 flex-wrap">
      {/* First */}
      <button
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        Trang đầu
      </button>

      {/* Prev */}
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 flex items-center gap-1"
      >
        <FiChevronLeft size={18} />
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-1 rounded-lg font-medium transition-colors duration-200 ${
              page === pageNumber
                ? "bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 flex items-center gap-1"
      >
         <FiChevronRight size={18} />
      </button>

      {/* Last */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        Trang cuối
      </button>
    </div>
  );
}
export default Pagination;