import { FaChevronRight } from "react-icons/fa";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { useState } from "react";
import ColSales from "./ColSales";

function SearchCol() {
  const [priceRange, setPriceRange] = useState([10, 40]); // Default range [min, max]

  // Function to handle slider value changes
  const handlePriceChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    setPriceRange(newValue as number[]);
  };
  return (
    <div className="flex flex-col  py-12 border-l-2  ">
      <div className="flex flex-col border-r-[1px] border-gray-400 px-24">
        <div className=" flex flex-row mb-10 gap-3">
          <input
            type="text"
            id="simple-search"
            className="w-full p-3  border   outline-none"
            placeholder="Search products..."
            required
          />

          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
          <button
            type="submit"
            className="p-3 py-4  text-white bg-[#518832] rounded-md hover:bg-[#6fa74e] hover:text-black"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="flex">
          <h2 className="text-2xl font-semibold text-black font-serif">
            Filter by price
          </h2>
        </div>
        <div className="flex w-full mb-16">
          <PriceRangeSlider
            value={priceRange} // Controlled value
            handleChange={handlePriceChange} // Update state on change
            min={10} // Minimum price
            max={40} // Maximum price
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-base text-[#8BC34A] hover:text-[#6A9745] transition-colors duration-300 cursor-pointer pb-5">
            Groceries <span className="text-black opacity-85">(10)</span>
          </h2>
          <h2 className="text-base text-[#8BC34A] hover:text-[#6A9745] transition-colors duration-300 cursor-pointer pb-7">
            Juice <span className="text-black opacity-85">(9)</span>
          </h2>
        </div>
        <div className="flex items-start justify-start self-start mb-56">
          <ColSales />
        </div>
      </div>
    </div>
  );
}

export default SearchCol;
