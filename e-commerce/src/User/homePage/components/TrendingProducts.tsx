import StarRating from "./Star";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/api";

export interface TrendingProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;

  // Add this for the sale price
}

const TrendingsProduct: React.FC<TrendingProduct> = ({
  id,
  name,
  price,
  imageUrl,
  category,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-center relative "
      onClick={() => {
        console.log("ID: ", id);
        navigate(`/product/${id}`);
      }}
    >
      <img
        src={imageUrl}
        alt="Description of image"
        className="max-w-xs max-h-80 cursor-pointer"
      />

      <span className="text-gray-500 p-4">{category}</span>
      <span className="font-serif text-xl font-semibold cursor-pointer">
        {name}
      </span>
      <span className="p-2">
        <StarRating />
      </span>
      <div className="flex items-center gap-2">
        <span className="text-gray-900 font-bold">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

function TrendingProducts() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const FiveToEightProducts = products.slice(5, 9);
  return (
    <div className="flex flex-col">
      <span className="flex font-serif text-4xl font-semibold p-5 justify-center">
        Trending Products
      </span>
      <div className="flex justify-center p-5">
        <img
          src="/assets/logo-leaf-new.png"
          alt="Description of image"
          className="max-w-xl max-h-fit"
        />
      </div>
      <div className="flex flex-row space-x-6 mt-6">
        {FiveToEightProducts.map((product: TrendingProduct) => (
          <TrendingsProduct
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}
export default TrendingProducts;
