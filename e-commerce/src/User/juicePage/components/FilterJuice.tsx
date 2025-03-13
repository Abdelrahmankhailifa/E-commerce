import ProductCard from "../../shoPage/components/ProductCard";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../../services/api";

export const useFilteredProducts = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // ✅ Filter products based on category
  const filteredProducts = products.filter(
    (product) => product.category === "Juice"
  );

  return { filteredProducts, isLoading, error };
};

interface FilteredJuiceProps {
  sortOrder: "highToLow" | "lowToHigh" | "default";
  productsPerPage: number;
  currentPage: number;
}

const FilterJuice: React.FC<FilteredJuiceProps> = ({
  sortOrder,
  productsPerPage,
  currentPage,
}) => {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const filteredProducts = products.filter(
    (product) => product.category === "Juice"
  );
  useEffect(() => {
    let sorted = [...filteredProducts];

    if (sortOrder === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    }

    // **Apply Pagination AFTER sorting**
    const startIdx = (currentPage - 1) * productsPerPage;
    const endIdx = startIdx + productsPerPage;
    setSortedProducts(sorted.slice(startIdx, endIdx));
  }, [sortOrder, products, currentPage, productsPerPage]);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-20 mt-10">
      {sortedProducts.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FilterJuice;
