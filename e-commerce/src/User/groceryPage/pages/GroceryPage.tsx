import React from "react";
import SearchCol from "../../shoPage/components/SearchCol"; // Adjust the path as necessary
import Credits from "../../homePage/components/Credits"; // Adjust the path as necessary
import DefaultDropdown from "../../shoPage/components/DefaultDropdown"; // Adjust the path as necessary
import PaginationGrocery from "../components/PaginationGrocery";
import FilterGrocery from "../components/FilterGrocery";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../../services/api";
import { useSearchParams } from "react-router-dom";

const GroceryPage: React.FC = () => {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder =
    (searchParams.get("sort") as "default" | "highToLow" | "lowToHigh") ||
    "default";
  const totalProducts = products.length;
  const productsPerPage = 9;
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page), sort: sortOrder });
  };
  const handleSortChange = (order: "default" | "highToLow" | "lowToHigh") => {
    setSearchParams({ page: String(1), sort: order });
  };
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx =
    totalProducts - startIdx > productsPerPage
      ? startIdx + productsPerPage
      : totalProducts;

  return (
    <div className="flex flex-col bg-[#F8F6F3] w-full">
      <div className="flex flex-row w-full">
        <div className="flex flex-col">
          <div className="flex">
            <SearchCol />
          </div>
        </div>
        <div className="flex flex-col h-fit justify-start items-start w-full mt-12 pl-16">
          <div className="flex space-x-1">
            <a href="/" className="text-[#77779B] cursor-pointer ">
              Home
            </a>
            <span className="text-[#77779B] ">/</span>
            <span className="text-[#77779B] ">Groceries</span>
          </div>
          <div className="flex mt-5 mb-16">
            <span className="text-[#8EC44F] text-5xl font-serif font-semibold">
              Groceries
            </span>
          </div>
          <div className="flex w-[84%] mb-10 text-[#333333]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            dignissim, velit et luctus interdum, est quam scelerisque tellus,
            eget luctus mi diam vitae erat. Praesent porttitor lacus vitae
            dictum posuere. Suspendisse elementum metus ac dolor tincidunt, eu
            imperdiet nisi dictum.
          </div>
          <div className="flex space-x-[47%] w-full ">
            <span className="text-[#333333] self-center">
              Showing {startIdx + 1} - {endIdx} of {totalProducts} results
            </span>
            <DefaultDropdown onSort={handleSortChange} />{" "}
          </div>
          <div className="flex w-[84%]">
            {/* Pass products to ShopItems */}
            <FilterGrocery
              sortOrder={sortOrder}
              productsPerPage={productsPerPage}
              currentPage={currentPage}
            />
          </div>
          <div className="flex">
            <PaginationGrocery
              totalProducts={totalProducts}
              productsPerPage={productsPerPage}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full">
        <Credits />
      </div>
    </div>
  );
};

export default GroceryPage;
