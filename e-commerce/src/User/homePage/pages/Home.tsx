import { FaCartShopping } from "react-icons/fa6";
import BestSellers from "../components/BestSellers";
import FreshCard from "../components/FreshCards";
import TrendingProducts from "../components/TrendingProducts";
import BenefitCards from "../components/BenefitCards";
import CustomerReveiws from "../components/CustomerReviews";
import Credits from "../components/Credits";

function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative flex flex-row bg-[#E5E3D4] bg-opacity-15 h-[730px]">
        <div className="absolute bottom-0 right-0 w-[450px] opacity-30">
          <img
            src="/assets/leaves-free-img-1.png"
            alt="logo leaf"
            className="min-w-full min-h-full object-cover"
          />
        </div>
        <div className="  flex justify-center items-center ml-32 ">
          <img
            src="/assets/organic-products-hero.png"
            alt="Organic products hero"
            className="max-w-xl max-h-fit "
          />
        </div>
        <div className="absolute left-1/2 flex flex-col mt-44 px-24 w-fit">
          <div className="flex">
            <img
              src="/assets/logo-leaf-new.png"
              alt="logo leaf"
              className=" max-w-xl max-h-fit"
            />
          </div>

          <span className="flex mt-9 mb-8 font-serif text-xl font-semibold">
            Best Quality Products
          </span>
          <h1 className="flex text-5xl font-serif font-bold text-black ">
            Join The Organic
          </h1>
          <h2 className="flex text-5xl font-serif font-bold text-black mt-4">
            Movement!
          </h2>
          <div className=" text-gray-700 py-4 ">
            <p className="font-normal ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="font-normal ">
              Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
              leo.
            </p>
            <div className="flex flex-row w-full  mt-10">
              <a
                href="#"
                className="flex justify-center rounded-md bg-[#6A9739] py-3 px-6 border border-transparent text-center text-lg text-white transition-colors duration-300 shadow-md hover:shadow-lg hover:bg-greenGray"
              >
                <FaCartShopping className="mt-1 mr-2 text-lg" />
                SHOP NOW
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <BenefitCards />
      </div>

      <div className="flex mt-40 justify-center items-center bg-white">
        <BestSellers />
      </div>

      <div className="flex flex-col bg-[#E5E3D4] bg-opacity-25 mt-44 h-[550px] relative">
        <div className="flex justify-center -mt-8 ">
          <img
            src="/assets/basil-leaf.png"
            alt="Basil leaf"
            className=" w-36 h-fit"
          />
        </div>
        <div className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center  ">
          <FreshCard />
        </div>
      </div>
      <div className="flex flex-row w-full bg-black h-44 bg-opacity-95 ">
        <span className="text-white py-16 px-24  font-serif text-4xl font-semibold">
          Get 25% Off On Your First Purchase!
        </span>
        <div className="flex flex-row   py-16 w-[500px] ">
          <button
            className="flex ml-auto justify-center rounded-md bg-greenGrayDarker bg-opacity-90 py-3 px-6 border border-transparent text-center text-lg text-white transition-colors duration-300 shadow-md hover:shadow-lg focus:bg-greenGray  hover:bg-greenGray "
            type="button"
          >
            <FaCartShopping className="mt-1 mr-2 text-lg " />
            SHOP NOW
          </button>
        </div>
      </div>
      <div className="flex mt-40 justify-center items-center bg-white mb-48">
        <TrendingProducts />
      </div>
      <div className="relative flex  w-full justify-center items-center">
        <div className=" absolute flex w-full justify-start ">
          <img
            src="/assets/logo-leaf2-free-img-1.png"
            alt="Logo leaf left"
            className=" absolute max-w-xl max-h-fit object-cover -mt-96 opacity-15"
          />
        </div>
        <CustomerReveiws />
      </div>
      <div className="flex ">
        <Credits />
      </div>
    </div>
  );
}

export default Home;
