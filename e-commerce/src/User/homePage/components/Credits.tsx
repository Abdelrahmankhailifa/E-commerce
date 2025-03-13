import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

function Credits() {
  return (
    <div className="bg-black text-white py-10 w-full mt-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between px-6">
        {/* Left Section */}
        <div className="mb-8 lg:mb-0 mt-6 ml-28 ">
          <img
            src="/assets/organic-store-white-logo.png"
            alt="Organic Store Logo"
            className="mb-4 w-44 h-fit"
          />
          <p className="text-gray-400 w-96 italic font-semibold">
            Maecenas mi justo, interdum at consectetur vel, tristique et arcu.
            Ut quis eros blandit, ultrices diam in, elementum ex. Suspendisse
            quis faucibus urna. Suspendisse pellentesque.
          </p>
        </div>

        {/* Middle Sections */}
        <div className="flex flex-col lg:flex-row ">
          {/* Quick Links */}
          <div className=" mb-8 lg:mb-0  w-40 mt-6 mr-64">
            <h4 className="text-2xl font-semibold mb-10 font-serif">
              Quick Links
            </h4>
            <ul>
              <li>
                <a
                  href="/home/about/"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  Checkout
                </a>
              </li>
              <li>
                <a
                  href="/home/contact/"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  Shop
                </a>
              </li>
            </ul>
            <div className="mt-9 ">
              <h4 className="text-2xl font-semibold mb-4 font-serif">
                Site Links
              </h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors  duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors  duration-300"
                  >
                    Shipping Details
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors  duration-300"
                  >
                    Offers Coupons
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors  duration-300"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Download Section */}
          <div className="mb-8 lg:mb-0 mt-7  mr-32">
            <h4 className="text-2xl font-semibold mb-3 font-serif ">
              Download Our Mobile App
            </h4>
            <p className="text-gray-400 mb-5 w-64">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              aliquam gravida sollicitudin. Praesent porta enim mi, non
              tincidunt libero interdum sit amet.
            </p>
            <h5 className="text-2xl font-semibold mb-3 font-serif ">
              Quick Links
            </h5>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  Know More About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  Visit Store
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  Let’s Connect
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors  duration-300"
                >
                  Locate Stores
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 pt-5 mb-32">
              <img
                src="/assets/play-store.png"
                alt="Google Play"
                className="w-32 h-fit"
              />
              <img
                src="/assets/app-store.png"
                alt="App Store"
                className="w-32 h-fit"
              />
            </div>
          </div>

          {/* Site Links */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-gray-700  h-10">
        <span className="absolute left-1/4 -translate-x-1/2 top-3/4  text-center text-gray-300 font-semibold">
          Copyright © 2024 | Organic Store
        </span>
        <div className="flex flex-row absolute  space-x-7 right-[15%]  top-3/4  text-center  text-gray-400">
          <FaTiktok className="hover:text-greenGray cursor-pointer" />
          <FaFacebook className="hover:text-greenGray cursor-pointer" />
          <FaInstagram className="hover:text-greenGray cursor-pointer" />
          <FaTwitter className="hover:text-greenGray cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Credits;
