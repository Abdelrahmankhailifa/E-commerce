import React from "react";
import StarRating from "../../homePage/components/Star";
import { Product } from "../../services/api"; // Import your central Product type

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format prices with currency symbol and two decimal places
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  // Check if discount exists and is greater than 0
  const hasValidDiscount =
    product.discount !== undefined && product.discount > 0;

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative w-full h-60">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {hasValidDiscount && (
          <div className="absolute top-2 right-2 bg-[#8BC34A] rounded-full p-2">
            <span className="text-white text-sm font-bold">Sale</span>
          </div>
        )}
      </div>
      <span className="text-gray-500 text-sm mt-2">{product.category}</span>
      <span className="font-serif text-lg font-semibold text-center py-2">
        {product.name}
      </span>
      <div>
        <StarRating />
      </div>
      <div className="flex items-center gap-2 mt-1">
        {hasValidDiscount ? (
          <>
            <span className="text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
            <span className="text-[#333333] font-bold">
              {formatPrice(product.discount ?? 0)}
            </span>
          </>
        ) : (
          <span className="text-[#333333] font-bold">
            {formatPrice(product.price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
