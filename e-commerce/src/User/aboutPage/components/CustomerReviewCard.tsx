import React from "react";
import Star from "../../homePage/components/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface TestimonialCardProps {
  images: string[]; // Handles multiple images
}

const CustomerReveiwCard: React.FC<TestimonialCardProps> = ({ images }) => {
  return (
    <div className="flex-col max-w-md bg-gray-100 bg-opacity-40 rounded-lg">
      {/* Swiper Section */}
      <div className="flex justify-center -mt-24">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop // Enables continuous swiping
          className="w-[370px] h-96"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Testimonial ${index + 1}`}
                className="w-full h-full rounded-lg object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Section */}
      <div className="p-8 text-center">
        {/* Stars */}
        <div className="flex justify-center mb-4">
          <Star />
        </div>

        {/* Review Text */}
        <p className="text-gray-600 text-sm mb-4">
          Click edit button to change this text. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper
          mattis, pulvinar dapibus leo.
        </p>

        {/* User Info */}
        <div className="flex items-center justify-center space-x-3">
          <img
            src="/assets/client02-free-img.png"
            alt="Reviewer"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold text-gray-800">Mila Kunit</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerReveiwCard;
