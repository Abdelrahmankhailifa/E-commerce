import React, { useState, useEffect } from "react";

function Panel() {
  const [step, setStep] = useState(0); // Shared step counter
  const maxSteps = 200; // Total steps for synchronization

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < maxSteps) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 10); // 10ms interval

    return () => clearInterval(interval);
  }, []);

  // Calculate synchronized counts
  const count1 = 4800 + step; // Counter 1 increments by 1 per step
  const count2 = step * 4; // Counter 2 increments by 4 per step
  const count3 = (step * 40) / maxSteps; // Counter 3 increments proportionally

  return (
    <div className="bg-black text-white py-12 flex justify-center items-center w-full">
      <div className="flex flex-row items-center text-center space-x-28">
        <div className="text-xl font-semibold mr-10 font-serif w-72">
          Numbers Speak For Themselves!
        </div>

        <div>
          <h2 className="text-5xl font-semibold">{count1.toLocaleString()}+</h2>
          <p className="mt-2 text-xl">Curated Products</p>
        </div>
        <div>
          <h2 className="text-5xl font-semibold">{Math.round(count2)}+</h2>
          <p className="mt-2 text-xl">Satisfied Customers</p>
        </div>
        <div>
          <h2 className="text-5xl font-semibold">{Math.round(count3)}+</h2>
          <p className="mt-2 text-xl">Product Categories</p>
        </div>
      </div>
    </div>
  );
}

export default Panel;
