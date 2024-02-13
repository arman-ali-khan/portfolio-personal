import { BiCodeCurly, BiSearchAlt } from "react-icons/bi";
import { BsCode } from "react-icons/bs";
import { GiPencilBrush } from "react-icons/gi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import { Parallax } from "react-scroll-parallax";
import useGetData from "../../lib/useGetData";
import { IconContext } from "react-icons";
const Services = () => {
  // get services data
  const {
    data: servicesData,
    error,
    loading,
  } = useGetData("/data/services.json");
  // error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <IconContext.Provider value={{ size: "2em" }}>
      <div className="de-container">
        {/* Title */}
        <div className="text-center my-6" id="services">
          <Parallax scale={[1.2, 1, "easeInQuad"]}>
            <h2 className="text-3xl font-bold">Services</h2>
          </Parallax>
          <p>What i offer</p>
        </div>
        {/* Body */}
        <div>
          {/* component */}
          <div id="services" className="section relative  md:pb-0">
            <div className="container xl:max-w-6xl mx-auto px-4">
              {/* End heading */}
              {/* row */}
              <div className="de-service-wrap">
                {servicesData.map((service) => {
                  const IconComponent = eval(service?.icon);
                  return (
                    <div
                      key={service.id}
                      data-aos="slide-up"
                      className="flex-shrink px- max-w-full w-full  wow "
                      data-wow-duration="1s"
                    >
                      {/* service block */}
                      <div className="de-service">
                        <div className="inline-block mb-4">
                          {/* icon */}
                          <IconComponent />
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
    </IconContext.Provider>
  );
};

export default Services;
