import { Parallax } from "react-scroll-parallax";
import useGetData from "../lib/useGetData";

const Services = () => {
  // get services data
  const {
    data: servicesData,
    error,
    loading,
  } = useGetData("/data/services.json");
  
  // error handling
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-400 p-8">
      <p>Error loading services data: {error.message}</p>
    </div>
  );

  if (!servicesData || !Array.isArray(servicesData)) return (
    <div className="text-center text-gray-400 p-8">
      <p>No services data available</p>
    </div>
  );

  return (
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
        <div id="services" className="section relative md:pb-0">
          <div className="container xl:max-w-6xl mx-auto px-4">
            {/* End heading */}
            {/* row */}
            <div className="de-service-wrap">
              {servicesData.map((service) => {
                return (
                  <div
                    key={service.id}
                    data-aos="slide-up"
                    className="flex-shrink px- max-w-full w-full wow "
                    data-wow-duration="1s"
                  >
                    {/* service block */}
                    <div className="de-service">
                      <div className="inline-block mb-4">
                        {/* icon */}
                        <img className="w-10" src={service?.icon} alt={service?.name} />
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