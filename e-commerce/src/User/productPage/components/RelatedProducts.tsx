import React from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../../homePage/components/Star";

export interface TrendingProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;

  // Add this for the sale price
}

const RelatedProducts: React.FC<TrendingProduct> = ({
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

export default RelatedProducts;
