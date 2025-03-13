import { IconType } from "react-icons";
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import React, { useRef, useState } from "react";
import Credits from "../../homePage/components/Credits";

export interface Contact {
  icon: IconType;
  title: string;
  subtitle: string;
}

export interface ContactsCardProps {
  Icon: IconType;
  title: string;
  subtitle: string;

  // Add this for the sale price
}

const ContactsCardLayout: React.FC<ContactsCardProps> = ({
  Icon,
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col justify-center items-center border-[1px] w-80 rounded-md">
      <div className="flex flex-col items-center pb-16 ">
        <Icon className="text-3xl text-greenGray mt-6  cursor-pointer mb-4" />
        <span className="text-gray-800">{title}</span>
        <span className="text-gray-800 ">{subtitle}</span>
      </div>
    </div>
  );
};

const AccordionItem: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);

    // Scroll to the content when opening
    if (!isOpen && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={contentRef} className="border-b border-gray-200">
      <div
        onClick={toggleAccordion}
        className="flex justify-between items-center cursor-pointer py-4"
      >
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 text-sm py-2">{content}</p>
      </div>
    </div>
  );
};

function Contact() {
  const contacts: Contact[] = [
    {
      icon: FaPhone,
      title: "+123 456 7890",
      subtitle: "+123 456 7890",
    },
    {
      icon: MdOutlineEmail,
      title: "info@example.com",
      subtitle: "support@example.com",
    },
    {
      icon: FaLocationDot,
      title: "1569 Ave, New York,",
      subtitle: "NY 10028, USA",
    },
  ];
  const items = [
    {
      title: "Pulvinar nostrud class cum facilis?",
      content:
        "I am item content. Click to show or hide this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Pon excepturi numquam, facilis?",
      content:
        "More item content goes here. Add details or descriptions as needed. Lorem ipsum dolor sit amet.",
    },
    {
      title: "Consequat nesciunt fusce facilisi?",
      content:
        "This is another section of content. Add your own details to customize this example.",
    },
    {
      title: "Ullamcorper mattis pulvinar leo?",
      content:
        "Another item content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Add more details here.",
    },
    {
      title: "Aliquam excepturi numquam facilis?",
      content:
        "This is the fifth accordion content. Add more details or descriptions here as needed.",
    },
    {
      title: "Facilisi nesciunt fusce consequat?",
      content:
        "The final section of the accordion content. Feel free to replace with your own text.",
    },
  ];

  return (
    <div className="  flex flex-col">
      <div className=" flex items-center justify-center bg-[#E5E3D4] h-72 bg-opacity-40 ">
        <span className="flex justify-center text-6xl font-serif font-medium mb-10 ">
          Get In Touch
        </span>
      </div>
      <div className="flex justify-center items-center ">
        <div className="flex flex-col w-3/4 bg-white justify-center shadow-lg rounded-md  h-72 -mt-6 mb-44">
          <div className="flex justify-center ">
            <img
              src="/assets/basil-leaf.png"
              alt="Basil leaf"
              className=" w-36 h-fit"
            />
          </div>
          <div className="flex flex-row space-x-6 justify-center items-center py-11 ">
            {" "}
            {contacts.map((contact, index) => (
              <ContactsCardLayout
                key={index}
                Icon={contact.icon}
                title={contact.title}
                subtitle={contact.subtitle}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col  items-center">
        <div className="absolute bottom-0 right-0 w-[450px] opacity-30">
          <img
            src="/assets/leaves-free-img-1.png"
            alt="logo leaf"
            className="min-w-full min-h-full object-cover"
          />
        </div>
        <span className="flex  text-4xl font-serif font-medium">
          Frequently Asked Question!
        </span>
        <div className="flex justify-center p-5">
          <img
            src="/assets/logo-leaf-new.png"
            alt="Description of image"
            className="max-w-xl max-h-fit"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-28 max-w-4xl mx-auto mt-10 py-9 gap-y-8 mb-20">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>
      <div className="flex ">
        <Credits />
      </div>
    </div>
  );
}

export default Contact;
