import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex justify-end gap-2">
      <button
        className="flex items-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-transparent hover:bg-black/10 rounded-md px-4 py-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
        Prev
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`${
            currentPage === num ? "bg-black/10" : "hover:bg-black/5"
          } px-4 py-2 rounded-md cursor-pointer `}
        >
          {num}
        </button>
      ))}
      <button
        className="flex items-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-transparent hover:bg-black/10 rounded-md px-4 py-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
