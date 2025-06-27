// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { TfiQuoteLeft, TfiQuoteRight } from "react-icons/tfi";
import { Parallax } from "react-scroll-parallax";
import { Navigation } from "swiper/modules";
import useGetData from "../lib/useGetData";

export default function Testimonial() {
  // testimonial data
  const { data: testimonialData, loading, error } = useGetData("/data/testimonial.json");

  // error handling
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-400 p-8">
      <p>Error loading testimonial data: {error.message}</p>
    </div>
  );

  if (!testimonialData || !Array.isArray(testimonialData)) return (
    <div className="text-center text-gray-400 p-8">
      <p>No testimonial data available</p>
    </div>
  );

  return (
    <section className="de-container">
      {/* Title */}
      <div className="text-center my-6" id="testimonial">
        <Parallax scale={[1.2, 1, "easeInQuad"]}>
          <h2 className="text-3xl font-bold">Testimonial</h2>
        </Parallax>
        <p>My client saying</p>
      </div>
      {/* Body */}
      {/* Swiper js Slider */}
      <Swiper
        data-aos="slide-up"
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {testimonialData?.map((testimonial) => {
          return (
            <SwiperSlide key={testimonial.id}>
              <div className="container de-test-wrap">
                <div className="flex flex-col h-full mx-4 my-6">
                  <div className="de-test-message-wrap">
                    <p className="de-test-message">
                      {/* User Message */}
                      <TfiQuoteLeft className="de-icon-left" />
                      {testimonial?.message}
                      <TfiQuoteRight className="de-icon-right" />
                    </p>
                  </div>
                  <div className="de-test-image-wrap">
                    {/* User Image */}
                    <img
                      src={testimonial?.image}
                      alt={testimonial.name}
                      className="de-test-image bg"
                    />
                    {/* User name */}
                    <p className="text-xl font-semibold leadi">
                      {testimonial?.name}
                    </p>
                    {/* User Address */}
                    <p className="text-sm uppercase">{testimonial?.address}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}