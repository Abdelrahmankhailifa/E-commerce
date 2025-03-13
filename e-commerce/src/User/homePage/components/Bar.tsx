import React, { useState } from "react";
import { FaShoppingBasket, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartModal from "./ShoppingCartModal";
import { useCart } from "../../productPage/components/CartContext";
import LoginModal from "./LoginModal";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../../services/api"; // Import API service

function Bar() {
  const location = useLocation();
  const isActiveEverything = location.pathname === "/home/shop/";
  const isActiveAbout = location.pathname === "/home/about/";
  const isActiveContact = location.pathname === "/home/contact/";
  const isActiveGrocery =
    location.pathname === "/home/product-category/groceries/";
  const isActiveJuice = location.pathname === "/home/product-category/juice/";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoginOpen, setisModalLoginOpen] = useState(false);

  const { getCartTotal, getQuantity } = useCart();
  const { auth } = useAuth();

  // Fetch profile name using TanStack Query
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", auth.userId],
    queryFn: async () => {
      if (!auth.userId) return null;

      try {
        const data = await authApi.getProfile(auth.userId);
        console.log("Fetched Profile:", data); // Debugging log
        return data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
    },
    enabled: !!auth.userId, // Only fetch if user is logged in
  });

  return (
    <div
      className={`flex flex-row w-full h-28 ${
        isActiveContact || isActiveAbout
          ? "bg-[#E5E3D4] bg-opacity-40"
          : "bg-white"
      }`}
    >
      {/* Logo Section */}
      <div className="flex justify-center mt-5 w-52 h-[70px]">
        <Link to="/home/">
          <img
            src="/assets/organic-store-logo5.png"
            alt="logo organic"
            className="w-36 h-fit cursor-pointer"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-10 items-center text-base text-gray-700 font-sans">
        <Link
          to="/home/shop/"
          className={`rounded transition-colors duration-300 cursor-pointer ${
            isActiveEverything ? "text-greenGray" : "hover:text-greenGray"
          }`}
        >
          Everything
        </Link>
        <Link
          to="/home/product-category/groceries/"
          className={`rounded transition-colors duration-300 cursor-pointer ${
            isActiveGrocery ? "text-greenGray" : "hover:text-greenGray"
          }`}
        >
          Groceries
        </Link>

        <Link
          to="/home/product-category/juice/"
          className={`rounded transition-colors duration-300 cursor-pointer ${
            isActiveJuice ? "text-greenGray" : "hover:text-greenGray"
          }`}
        >
          Juice
        </Link>
      </div>

      {/* Right Section with Links and Icon */}
      <div className="flex ml-auto space-x-10 items-center text-base text-gray-700 font-sans mr-10">
        <Link
          to="/home/about/"
          className={`rounded transition-colors duration-300 cursor-pointer ${
            isActiveAbout ? "text-greenGray" : "hover:text-greenGray"
          }`}
        >
          About
        </Link>
        <Link
          to="/home/contact/"
          className={`rounded transition-colors duration-300 cursor-pointer ${
            isActiveContact ? "text-greenGray " : "hover:text-greenGray"
          }`}
        >
          Contact
        </Link>

        {/* Basket Icon with Notification Badge */}
        <div
          className="relative flex items-center cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="rounded text-greenGray mr-4">
            £{getCartTotal().toFixed(2)}
          </span>
          <FaShoppingBasket className="text-greenGray text-2xl cursor-pointer" />
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-greenGray text-white text-xs font-bold">
            {getQuantity()}
          </span>
        </div>

        {/* User Section */}
        <div className="relative flex items-center cursor-pointer">
          {auth.token ? (
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <p className="mr-2">Welcome, {profile?.firstName}!</p>
            )
          ) : (
            <p>Please log in</p>
          )}
          <FaUser
            className="text-black text-xl cursor-pointer"
            onClick={() => setisModalLoginOpen(true)}
          />
        </div>
      </div>

      {/* Modals */}
      <ShoppingCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <LoginModal
        isOpen={isModalLoginOpen}
        onClose={() => setisModalLoginOpen(false)}
      />
    </div>
  );
}

export default Bar;
