import React, { useState } from "react";

interface DefaultDropdownProps {
  onSort: (order: "default" | "highToLow" | "lowToHigh") => void;
}

const DefaultDropdown: React.FC<DefaultDropdownProps> = ({ onSort }) => {
  const [sortBy, setSortBy] = useState<"default" | "highToLow" | "lowToHigh">(
    "default"
  );

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "default" | "highToLow" | "lowToHigh";
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={handleSort}
        className="ml-4 p-2 pr-8 text-gray-600 bg-transparent border border-gray-300 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="default" className="text-gray-600">
          Default sorting
        </option>
        <option value="lowToHigh" className="text-gray-600">
          Sort by price: low to high
        </option>
        <option value="highToLow" className="text-gray-600">
          Sort by price: high to low
        </option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default DefaultDropdown;
