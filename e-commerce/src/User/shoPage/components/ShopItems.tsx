import ProductCard from "./ProductCard";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../../services/api";

interface ShopItemsProps {
  sortOrder: "highToLow" | "lowToHigh" | "default";
  productsPerPage: number;
  currentPage: number;
}

const ShopItems: React.FC<ShopItemsProps> = ({
  sortOrder,
  productsPerPage,
  currentPage,
}) => {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    let sorted = [...products];

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

export default ShopItems;
