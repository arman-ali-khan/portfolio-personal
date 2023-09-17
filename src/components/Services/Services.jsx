import { BiCodeCurly, BiSearchAlt } from "react-icons/bi";
import { BsCode } from "react-icons/bs";
import { GiPencilBrush } from "react-icons/gi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
const Services = () => {
  const servicesData = [
    {
      id: 0,
      name: "SEO Services",
      icon: <BiSearchAlt size={44} />,
      description:
        " This is a wider card with supporting text below as a natural content.",
    },
    {
      id: 1,
      name: "Frontend Developer",
      icon: <BiCodeCurly size={44} />,
      description:
        " This is a wider card with supporting text below as a natural content.",
    },
    {
      id: 2,
      name: "UI/UX Designer",
      icon: <HiOutlineColorSwatch size={44} />,
      description:
        " This is a wider card with supporting text below as a natural content.",
    },
    {
      id: 3,
      name: "Branding Designer",
      icon: <GiPencilBrush size={44} />,
      description:
        " This is a wider card with supporting text below as a natural content.",
    },
    {
      id: 4,
      name: "Digital Marketing",
      icon: <TbMoneybag size={44} />,
      description:
        " This is a wider card with supporting text below as a natural content.",
    },
    {
      id: 5,
      name: "Bakcend Developer",
      icon: <BsCode size={44} />,
      description:
        " This is a wider card with supporting text below as a natural content.",
    },
  ];
  return (
    <div className="container mx-auto overflow-hidden">
      {/* Title */}
      <div className="text-center my-6" id="services">
        <h2 className="text-3xl font-bold">Services</h2>
        <p>What i offer</p>
      </div>
      {/* Body */}
      <div>
        {/* component */}
        <div id="services" className="section relative  md:pb-0">
          <div className="container xl:max-w-6xl mx-auto px-4">
            {/* End heading */}
            {/* row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
              {servicesData.map((service) => {
                return (
                  <div
                    key={service.id}
                    data-aos="slide-up"
                    className="flex-shrink px- max-w-full w-full  wow "
                    data-wow-duration="1s"
                  >
                    {/* service block */}
                    <div className="py-8 px-3 border rounded-md border-gray-300 transform transition duration-300 ease-in-out hover:-translate-y-2">
                      <div className="inline-block mb-4">
                        {/* icon */}
                        {service.icon}
                      </div>
                      {/* service name */}
                      <h3 className="text-lg leading-normal mb-2 font-semibold ">
                        {service.name}
                      </h3>
                      {/* service description */}
                      <p className="text-gray-500">{service.description}</p>
                    </div>
                    {/* end service block */}
                  </div>
                );
              })}
            </div>
            {/* end row */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
