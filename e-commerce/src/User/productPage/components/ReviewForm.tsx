import React from "react";
import Rating from "./Rating";

const ReviewForm: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-[#F8F6F3] border border-gray-300 p-6 rounded-lg mt-10">
      <h3 className="text-lg font-semibold text-[#333333] mb-4">
        Be the first to review “Assorted Coffee”
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Your email address will not be published. Required fields are marked{" "}
        <span className="text-red-500">*</span>
      </p>
      <form className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#333333]">
            Your rating <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-1 mt-1">
            <Rating />
          </div>
        </div>
        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium text-[#333333]"
          >
            Your review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="review"
            rows={4}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-[#6A9739] focus:border-[#6A9739] text-sm"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#333333]"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-[#6A9739] focus:border-[#6A9739] text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#333333]"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-[#6A9739] focus:border-[#6A9739] text-sm"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="save-info"
            type="checkbox"
            className="w-4 h-4 text-[#6A9739] border-gray-300 rounded focus:ring-[#6A9739]"
          />
          <label
            htmlFor="save-info"
            className="ml-2 text-sm text-gray-600 cursor-pointer"
          >
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
        <button
          type="submit"
          className="py-2 px-6 bg-[#6A9739] text-white font-semibold text-lg rounded-lg hover:bg-green-700 transition"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
