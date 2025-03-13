import { Link, useLocation } from "react-router-dom";

interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

function PaginationGrocery({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const location = useLocation();
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const constructPageUrl = (pageNumber: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", String(pageNumber));
    return `/home/product-category/groceries/?${searchParams.toString()}`;
  };

  return (
    <div className="flex justify-start items-center gap-2 mt-20 mb-20">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link to={constructPageUrl(currentPage - 1)}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-transparent text-[#8BC34A] border border-[#8BC34A] hover:bg-[#8BC34A] hover:text-white transition-colors duration-300"
          >
            ←
          </button>
        </Link>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <Link key={number} to={constructPageUrl(number)}>
          <button
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 border border-[#8BC34A] transition-colors duration-300 ${
              currentPage === number
                ? "bg-[#8BC34A] text-white"
                : "bg-transparent text-[#8BC34A] hover:bg-[#8BC34A] hover:text-white"
            }`}
          >
            {number}
          </button>
        </Link>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link to={constructPageUrl(currentPage + 1)}>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-transparent text-[#8BC34A] border border-[#8BC34A] hover:bg-[#8BC34A] hover:text-white transition-colors duration-300"
          >
            →
          </button>
        </Link>
      )}
    </div>
  );
}

export default PaginationGrocery;
