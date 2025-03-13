import Credits from "../../homePage/components/Credits";
import CustomerReveiwCard from "../components/CustomerReviewCard";
import Panel from "../components/Panel";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// List of items
const categories = [
  "Fresh fruits",
  "Dry fruits",
  "Fresh vegetables",
  "Dried vegetables",
  "Beauty products",
  "Milk products",
  "Organic honey",
  "Organic tea",
];

// Split the list for two-column layout
const splitCategories = (items: string[]) => {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
};

const [column1, column2] = splitCategories(categories);

function About() {
  return (
    <div className="flex flex-col ">
      <div className="flex h-60 bg-[#E5E3D4] bg-opacity-40 items-center justify-center">
        <span className="flex justify-center text-6xl font-serif">
          About Us
        </span>
      </div>
      <div className="flex justify-center -mt-4">
        <img
          src="/assets/basil-leaf.png"
          alt="Basil leaf"
          className="w-36 h-fit"
        />
      </div>
      <div className="flex flex-row mb-36">
        <section className="flex flex-col md:flex-row items-center justify-between p-5 bg-white mt-20 mr-10 ml-32 ">
          {/* Text Section */}
          <div className="md:w-[45%]">
            <h1 className="text-4xl font-semibold mb-4 font-serif">
              We Are Your Favourite Store.
            </h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              Tuas quisquam quo gravida proident harum, aptent ligula anim
              consequuntur, ultrices mauris, nunc voluptates lobortis, varius,
              potenti placeat! Fuga omnis. Cubilia congue. Recusandae. Vero
              penatibus quasi! Nostra tenetur dignissimos ultrices natus
              distinctio ultrices consequuntur numqu.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Officiis fuga harum porro et? Similique rhoncus atque! Netus
              blanditiis provident nunc posuere. Rem sequi, commodo, lorem
              tellus elit, hic sem tenetur anim amet quas, malesuada proident
              platea corrupti expedita.
            </p>
          </div>
          {/* Image Section */}
          <div className="md:w-[40%] mt-8 md:mt-0 flex justify-center mr-36">
            <img
              src="/assets/banner-01.jpg"
              alt="Hands holding grapes"
              className="shadow-lg"
            />
          </div>
        </section>
      </div>

      <div className="flex mb-14">
        <Panel />
      </div>
      <div className="flex-row ">
        <div className="flex mt-32 mx-72 space-x-16">
          <CustomerReveiwCard
            images={[
              "/assets/image-01.jpg",
              "/assets/image-02.jpg",
              "/assets/farming03.jpg",
              "/assets/farming04.jpg",
            ]} // Replace with actual URL
          />
          <div className="flex flex-col">
            <div className="flex flex-row space-x-4 mt-10">
              <img
                src="/assets/organic-badge-freeimg.png"
                alt="Certified Badge"
                className="w-24 h-fit rounded-full object-cover"
              />
              <div className="flex flex-col space-y-3">
                <span className="text-xl font-semibold text-gray-800 font-serif">
                  Certified Products
                </span>
                <span className="text-xs text-gray-600">
                  Click edit button to change this text. Lorem ipsum dolor sit
                  amet{" "}
                </span>
              </div>
            </div>
            <span className="flex font-serif text-2xl font-semibold mt-9 px">
              We Deal With Various Quality Organic Products!
            </span>
            <div className="flex py-6 w-max">
              <img
                src="/assets/logo-leaf-new.png"
                alt="Organic Logo"
                className="max-w-lg max-h-fit"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              {/* First column */}
              <ul className="space-y-2">
                {column1.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FaRegCheckCircle className="text-greenGray" />
                    <span className="text-gray-800 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Second column */}
              <ul className="space-y-2">
                {column2.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FaRegCheckCircle className="text-greenGray" />
                    <span className="text-gray-800 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex mt-10">
              <button
                className="flex text-base justify-center rounded-md bg-greenGrayDarker bg-opacity-90 py-2 px-6 border border-transparent text-center text-white transition-colors duration-300 shadow-md hover:shadow-lg focus:bg-greenGray hover:bg-greenGray"
                type="button"
              >
                <FaCartShopping className="mt-1 mr-2 text-base" />
                START SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-32">
        <Credits />
      </div>
    </div>
  );
}

export default About;
