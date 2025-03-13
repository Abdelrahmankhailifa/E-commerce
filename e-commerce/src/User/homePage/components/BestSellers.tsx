import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/api";
import StarRating from "./Star";

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount?: number;
  category: string;
}

const BestSellersProducts: React.FC<Product> = ({
  id,
  name,
  imageUrl,
  price,
  discount,
}) => {
  const hasValidDiscount = discount !== undefined && discount > 0;
  return (
    <div
      key={id}
      className="flex flex-col justify-center items-center relative"
    >
      <img
        src={imageUrl}
        alt={name}
        className="max-w-xs max-h-80 cursor-pointer"
      />
      {hasValidDiscount && (
        <div className="absolute top-4 right-4 w-16 h-16 bg-greenGray rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">SALE</span>
        </div>
      )}
      <span className="text-gray-500 p-4">Groceries</span>
      <span className="font-serif text-xl font-semibold cursor-pointer">
        {name}
      </span>
      <span className="p-2">
        <StarRating />
      </span>
      <div className="flex items-center gap-2">
        {discount && discount > 0 ? (
          <>
            <span className="text-gray-400 line-through">
              ${price.toFixed(2)}
            </span>
            <span className="text-gray-900 font-bold">
              ${discount.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-gray-900 font-bold">${price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};

function BestSellers() {
  const {
    data: products = [], // Default to empty array to avoid undefined
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading products</p>;

  const firstFourProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <span className="flex font-serif text-4xl font-semibold p-5 justify-center">
        Best Selling Products
      </span>
      <div className="flex justify-center p-5">
        <img
          src="/assets/logo-leaf-new.png"
          alt="Best Sellers Logo"
          className="max-w-xl max-h-fit"
        />
      </div>
      <div className="flex flex-row space-x-6 mt-6">
        {firstFourProducts.length > 0 ? (
          firstFourProducts.map((product: Product) => (
            <BestSellersProducts
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
              discount={product.discount}
              category={product.category}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
}

export default BestSellers;
