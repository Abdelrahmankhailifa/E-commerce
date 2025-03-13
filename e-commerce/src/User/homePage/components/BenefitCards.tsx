import { IconType } from "react-icons";
import { FaTruck } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaRegMoneyBill1, FaRecycle } from "react-icons/fa6";

export interface Benefit {
  icon: IconType;
  title: string;
  subtitle: string;
}

export interface BenefitCardProps {
  Icon: IconType;
  title: string;
  subtitle: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ Icon, title, subtitle }) => (
  <div className="flex felx-row w-[20%] h-[50%] bg-[#303030] mt-14 rounded-sm ml-28 space-x-4 ">
    <a href="#">
      <Icon className="text-3xl text-[#8BC34A] mt-6 ml-5 cursor-pointer" />
    </a>
    <div className="flex flex-col mt-6 ">
      <a href="#">
        <span className="text-white font-serif text-xl cursor-pointer">
          {title}
        </span>
      </a>
      <span className="text-white">{subtitle}</span>
    </div>
  </div>
);

function BenefitCards() {
  const benefits: Benefit[] = [
    {
      icon: FaTruck,
      title: "Free Shipping",
      subtitle: "Above $5 Only",
    },
    {
      icon: RiContactsBook3Line,
      title: "Certified Organic",
      subtitle: "100% Guarantee",
    },
    {
      icon: FaRegMoneyBill1,
      title: "Huge Savings",
      subtitle: "At Lowest Price",
    },
    {
      icon: FaRecycle,
      title: "Easy Returns",
      subtitle: "No Questions Asked",
    },
  ];

  return (
    <div className="flex flex-row w-full bg-black h-56 bg-opacity-95 space-x-5">
      {benefits.map((benefit, index) => (
        <BenefitCard
          key={index}
          Icon={benefit.icon}
          title={benefit.title}
          subtitle={benefit.subtitle}
        />
      ))}
    </div>
  );
}

export default BenefitCards;
