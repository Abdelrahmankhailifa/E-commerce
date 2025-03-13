import React from "react";

export interface Products {
  title: string;
  image: string;
  money: string;
}

export interface BestSellersProduct {
  title: string;
  image: string;
  money: string;
  isLast?: boolean;
  discountedPrice?: string; // Add this for the sale price
}

const BestSellersProducts: React.FC<BestSellersProduct> = ({
  title,
  money,
  image,
  isLast,
  discountedPrice,
}) => (
  <div className="flex flex-col justify-start items-start relative w-full">
    <div className="self-start">
      <img
        src={image}
        alt="Description of image"
        className="max-w-[210px] max-h-fit cursor-pointer"
      />
      {isLast && (
        <div className=" self-start absolute top-4 left-0 w-16 h-16 bg-greenGray rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">SALE</span>
        </div>
      )}

      <div className="flex pt-7">
        <span className="text-base text-[#8BC34A] hover:text-[#6A9745] transition-colors duration-300 cursor-pointer ">
          {title}
        </span>
      </div>

      <div className="flex items-start gap-2 ">
        {isLast ? (
          <>
            <span className="text-gray-400 line-through">{money}</span>
            <span className="text-gray-900 ">{discountedPrice}</span>
          </>
        ) : (
          <span className="text-gray-900 ">{money}</span>
        )}
      </div>
    </div>
  </div>
);

function ColSales() {
  const products: (Products & { discountedPrice?: string })[] = [
    {
      image: "/assets/coffee-asorted.jpg",
      title: "Assorted Coffee",
      money: "£35.00",
    },
    {
      image: "/assets/sanitizer.jpg",
      title: "Hand Sanitizer",
      money: "£15.00",
    },

    {
      image: "/assets/edible-oil.jpg",
      title: "Natural Extracted Edible Oil",
      money: "£34.00",
      discountedPrice: "£25.00",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-6 mt-6 self-start items-start justify-start">
        {products.map((product, index) => (
          <BestSellersProducts
            key={index}
            title={product.title}
            money={product.money}
            image={product.image}
            isLast={index === products.length - 1}
            discountedPrice={product.discountedPrice}
          />
        ))}
      </div>
    </div>
  );
}
export default ColSales;
