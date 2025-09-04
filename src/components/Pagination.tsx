import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex justify-end gap-2">
      <button className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-transparent hover:bg-black/10 rounded-md px-4 py-2" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`${currentPage === num ? "bg-black/10" : ""} px-4 py-2 rounded-md`}
        >
          {num}
        </button>
      ))}
      <button className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-transparent hover:bg-black/10 rounded-md px-4 py-2" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
