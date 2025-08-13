import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-4 space-x-4">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm ${
          page === 1
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white hover:from-[#009acd] hover:to-[#6cb6ff]"
        }`}
      >
        <FiChevronLeft size={20} /> Previous
      </button>
      <span className="px-3 py-1 rounded-md hover:bg-blue-100 transition">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm ${
          page === totalPages
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white hover:from-[#009acd] hover:to-[#6cb6ff]"
        }`}
      >
        Next <FiChevronRight size={20} />
      </button>
    </div>
  );
}
