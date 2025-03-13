import unsplash from "..//assets/sydney-rae-668606-unsplash.jpg";
import { FaArrowRight } from "react-icons/fa";

import StarRating from "./Star";
import React from "react";

export interface Customers {
  name: string;
  image: string;
}

export interface CustomerReveiw {
  name: string;
  isMid: boolean;
  image: string;

  // Add this for the sale price
}

const CustomerReveiwsCard: React.FC<CustomerReveiw> = ({
  name,
  image,
  isMid,
}) => (
  <div
    className={`flex flex-col justify-center items-center overflow-hidden relative shadow-xl rounded-lg border-[0.5px] border-gray-100 mb-32  ${
      isMid
        ? "relative h-[400px] w-[350px]  shadow-xl rounded-lg border-[0.5px]"
        : "h-80 w-80 self-end bg-white"
    }`}
  >
    {isMid && (
      <div className="absolute inset-0 overflow-hidden">
        {/* Image with same dimensions as the container */}
        <img
          src={image}
          alt="Description of image"
          className="h-full w-full object-cover opacity-70"
        />
      </div>
    )}

    {isMid ? (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-3 hover:bg-opacity-70 transition-colors duration-300  overflow-hidden">
        {/* Title */}
        <h1 className="text-white text-3xl font-bold font-serif mb-2">
          {name}
        </h1>
        <p className="text-white text-3xl  font-bold font-serif mb-4">
          15% Off On All Vegetables!
        </p>
        <p className="text-white text-base mb-6 p-4">
          I am text block. Click edit button to change this tex em ips.
        </p>
        {/* Button */}
        <button
          className="flex   justify-center rounded-md bg-greenGrayDarker bg-opacity-90 py-2 px-6 border border-transparent text-center  text-white transition-colors duration-300 shadow-md hover:shadow-lg focus:bg-greenGray  hover:bg-greenGray  text-base"
          type="button"
        >
          <FaArrowRight className="mt-1 mr-1 text-base " />
          SHOP NOW
        </button>
      </div>
    ) : (
      <div className="absolute flex flex-col text-center justify-center items-center">
        <span className="  p-2">
          <StarRating />
        </span>
        <p className="text-gray-600  p-6">
          Click edit button to change this text. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper
          mattis, pulvinar dapibus leo.
        </p>

        {/* User Info */}
        <div className="flex flex-row items-center space-x-4">
          <img src={image} alt="User" className="w-12 h-12 rounded-full " />
          <p className="font-medium text-gray-800">{name}</p>
        </div>
      </div>
    )}
  </div>
);

function CustomerReveiws() {
  const customers: (Customers & { discountedPrice?: string })[] = [
    {
      image: "/assets/client02-free-img.png",
      name: "Mila Kunis",
    },

    {
      image: "/assets/sydney-rae-668606-unsplash.jpg",
      name: " Deal Of The Day",
    },
    {
      image: "/assets/client01-free-img.png",
      name: "Mike Sendler",
    },
  ];
  const logos = [
    { image: "/assets/logo-1.png" },
    { image: "/assets/logo-2.png" },
    { image: "/assets/logo-3.png" },
    { image: "/assets/logo-4.png" },
    { image: "/assets/logo-5.png" },
  ];

  return (
    <div className="  flex flex-col justify-center items-center">
      <span className="flex font-serif text-4xl font-semibold p-5 justify-center">
        Customers Reviews
      </span>
      <div className="flex justify-center p-5 mb-16">
        <img
          src="/assets/logo-leaf-new.png"
          alt="Description of image"
          className="max-w-xl max-h-fit"
        />
      </div>
      <div className="flex flex-row space-x-6 mt-6">
        {customers.map((customer, index) => (
          <CustomerReveiwsCard
            key={index}
            name={customer.name}
            image={customer.image}
            isMid={index === customers.length - 2}
          />
        ))}
      </div>
      <div className="flex flex-row p-10 space-x-12">
        <span className="flex font-serif text-xl font-semibold ">
          Featured Brands:
        </span>
        <div className="flex justify-center items-center -mt-9">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.image}
              alt="Description of image"
              className="max-w-xl max-h-fit"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default CustomerReveiws;
