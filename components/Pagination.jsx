"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="mt-8 flex items-center justify-center gap-2">

            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronLeft size={18} />
            </button>

            {Array.from(
                { length: totalPages },
                (_, index) => index + 1
            ).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`h-10 w-10 rounded-lg text-sm font-medium ${currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronRight size={18} />
            </button>

        </div>
    );
};

export default Pagination;