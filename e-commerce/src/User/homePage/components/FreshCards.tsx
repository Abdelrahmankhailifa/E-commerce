import { FaArrowRight } from "react-icons/fa";
import React from "react";

export interface Farms {
  title: string;
  image: string;
  subtitle_1: string;
  subtitle_2: string;
}

export interface FarmCards {
  title: string;
  image: string;
  subtitle_1: string;
  subtitle_2: string;
  isLast?: boolean;
}

const FarmCard: React.FC<FarmCards> = ({
  title,
  subtitle_1,
  subtitle_2,
  image,
  isLast,
}) => (
  <div className="flex flex-col h-80 w-96 bg-white shadow-md rounded-lg border-[0.5px] border-gray-100 items-start p-11">
    <span className="flex font-serif text-2xl font-semibold ">{title}</span>
    <span className="flex mt-1 text-gray-700">{subtitle_1}</span>
    <span className="flex text-gray-700 mb-1">{subtitle_2}</span>
    <div className="flex flex-row w-full text-base mt-5">
      <button
        className="flex   justify-center rounded-md bg-greenGrayDarker bg-opacity-90 py-2 px-6 border border-transparent text-center  text-white transition-colors duration-300 shadow-md hover:shadow-lg focus:bg-greenGray  hover:bg-greenGray  text-base"
        type="button"
      >
        <FaArrowRight className="mt-1 mr-1 text-base " />
        SHOP NOW
      </button>
    </div>
    <div className="flex">
      {isLast ? (
        <img
          src={image}
          alt="Description of image"
          className=" w-36 h-fit object-cover ml-40 -mt-10"
        />
      ) : (
        <img
          src={image}
          alt="Description of image"
          className=" w-52 h-fit object-cover ml-32 -mt-20"
        />
      )}
    </div>
  </div>
);

function FreshCard() {
  const farms: Farms[] = [
    {
      title: "Farm Fresh Fruits",
      subtitle_1: "Ut sollicitudin quam vel purus tempus,",
      subtitle_2: "vel eleifend felis varius.",
      image: "/assets/apple.png",
    },
    {
      title: "Fresh Vegetables",
      subtitle_1: "Aliquam porta justo nibh, id laoreet",
      subtitle_2: "sapien sodales vitae justo.",
      image: "/assets/broccol.png",
    },

    {
      title: "Organic Legume",
      subtitle_1: "Phasellus sed urna mattis, viverra",
      subtitle_2: "libero sed, aliquam est.",
      image: "/assets/beans.png",
    },
  ];

  return (
    <div className="flex flex-row space-x-7">
      {farms.map((farm, index) => (
        <FarmCard
          key={index}
          title={farm.title}
          subtitle_1={farm.subtitle_1}
          subtitle_2={farm.subtitle_2}
          image={farm.image}
          isLast={index === farms.length - 1}
        />
      ))}
    </div>
  );
}

export default FreshCard;
