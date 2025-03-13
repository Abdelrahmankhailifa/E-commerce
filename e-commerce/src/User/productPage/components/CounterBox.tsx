import React, { useState } from "react";

interface CounterBoxProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const CounterBox: React.FC<CounterBoxProps> = ({ quantity, setQuantity }) => {
  // Initialize the counter state

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(Math.max(1, quantity - 1));

  return (
    <div className="flex items-center border border-gray-300  bg-white w-16 group">
      <input
        type="text"
        className="w-12 text-center border-none focus:outline-none text-[#666666] bg-white"
        value={quantity}
        readOnly
      />
      <div className="flex flex-col -ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={increment}
          className="text-xs p-1 hover:bg-gray-200 focus:outline-none"
        >
          ▲
        </button>
        <button
          onClick={decrement}
          className="text-xs p-1 hover:bg-gray-200 focus:outline-none"
        >
          ▼
        </button>
      </div>
    </div>
  );
};

export default CounterBox;
