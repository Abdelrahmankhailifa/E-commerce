import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CounterBox from "../components/CounterBox";
import ReviewForm from "../components/ReviewForm";
import RelatedProducts from "../components/RelatedProducts";
import Credits from "../../homePage/components/Credits";
import { useCart } from "../components/CartContext";
import { fetchProducts, Product } from "../../services/api";
import { useQuery } from "@tanstack/react-query";

export function ProductPage() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { id } = useParams();
  const product = products.find(
    (product) => product.id.toString() === (id ?? "0")
  );

  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1); // Default quantity to 1 instead of 0

  const currentIndex = products.findIndex(
    (product) => product.id.toString() === (id ?? "0")
  );

  const relatedProducts = products
    .slice(currentIndex + 1, currentIndex + 4) // Get next 3 products
    .concat(products.slice(0, Math.max(0, currentIndex + 4 - products.length)));

  // Handle Add to Cart function
  const handleAddToCart = async () => {
    if (!product) {
      console.error("No product found.");
      return;
    }

    if (quantity <= 0) {
      console.warn("Cannot add zero or negative quantity to cart.");
      return;
    }

    console.log("Adding to cart:", { productId: product.id, quantity });

    try {
      await addToCart(product.id, quantity);
      console.log("Item added successfully!");
    } catch (error: any) {
      console.error(
        "Error adding item to cart:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#F8F6F3]">
      <div className="flex flex-row w-[75%] mt-16">
        <div className="flex self-start mr-16">
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="w-[600px] h-[600px] object-cover"
          />
        </div>

        <div className="flex flex-col w-[45%] h-96">
          <div className="flex flex-row self-start w-full">
            <div className="flex w-full text-3xl font-serif font-semibold">
              {product?.name}
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-row">
              <span className="text-[#333333] text-3xl font-bold mt-7">
                £{product?.price.toFixed(2)}
              </span>
              <span className="text-[#333333] text-lg mt-8 ml-1">
                + Free Shipping
              </span>
            </div>
          </div>
          <div className="flex text-[#333333] text-lg mt-2">
            Neque porro quisquam est, qui dolore ipsum quia dolor sit amet,
            consectetur adipisci velit, sed quia non incidunt lores ta porro
            ame. numquam eius modi tempora incidunt lores ta porro ame.
          </div>
          <div className="flex mt-5">
            <div className="flex flex-row w-full space-x-5 border-b-2 border-gray-300">
              <div className="flex mb-9">
                <CounterBox quantity={quantity} setQuantity={setQuantity} />
              </div>
              <div className="flex w-full mb-9">
                <button
                  className="flex font-semibold justify-center rounded-md bg-[#6A9739] py-3 px-28 border border-transparent text-center text-lg text-white transition-colors duration-300 shadow-md hover:shadow-lg hover:bg-greenGray"
                  type="button"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-row w-full">
              <span className="flex text-[#333333]">Categories:</span>
              <span className="flex text-[#8EC44F] px-1">Groceries,</span>
              <span className="flex text-[#8EC44F]">Juice</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[75%] mt-20">
        <div className="flex flex-row space-x-4 border-t border-gray-300 pb-2">
          <button
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "description"
                ? "text-[#333333] border-t-2 border-[#6A9739]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "reviews"
                ? "text-[#333333] border-t-2 border-[#6A9739]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (0)
          </button>
        </div>
        {/* Content below the tabs */}
        <div className="flex flex-col mt-6 text-[#333333] text-base">
          {activeTab === "description" ? (
            <p>
              Neque porro quisquam est, qui dolore ipsum quia dolor sit amet,
              consectetur adipisci velit, sed quia non incidunt lores ta porro
              ame. numquam eius modi tempora incidunt lores ta porro ame.
            </p>
          ) : (
            <ReviewForm />
          )}
        </div>
        <div className="flex flex-col w-[75%] mt-20">
          <div className="flex text-4xl font-serif font-semibold">
            Related products
          </div>
          <div className="flex flex-row space-x-6 mt-6 mb-24">
            {relatedProducts.map((product, index) => (
              <RelatedProducts
                key={index}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                category={product.category}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <Credits />
      </div>
    </div>
  );
}

export default ProductPage;
