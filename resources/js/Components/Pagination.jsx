import React from 'react';

const Pagination = ({
  currentPage,
  perPage,
  totalData,
  totalPages,
  onNextChange,
  onPrevChange,
  isLoading = false,
}) => {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalData);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            {isLoading ? (
              'Memuat data...'
            ) : (
              <>
                Showing
                <span className="font-medium"> {startItem} </span>
                to
                <span className="font-medium"> {endItem} </span>
                of
                <span className="font-medium"> {totalData} </span>
                results
              </>
            )}
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <button
              onClick={() => {
                console.log('Previous button clicked');
                onPrevChange();
              }}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={currentPage === 1}
            >
              {isLoading ? (
                'Memuat data...'
              ) : (
                <>
                  <span className="sr-only">Previous</span>
                  <svg
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Previous
                </>
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={() => {
                console.log('Next button clicked');
                onNextChange();
              }}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={currentPage === totalPages}
            >
              {isLoading ? (
                'Memuat data...'
              ) : (
                <>
                  Next
                  <span className="sr-only">Next</span>
                  <svg
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
