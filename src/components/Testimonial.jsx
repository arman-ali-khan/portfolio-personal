// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { TfiQuoteLeft, TfiQuoteRight } from "react-icons/tfi";
import { Parallax } from "react-scroll-parallax";
import { Navigation } from "swiper/modules";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Testimonial() {
  // testimonial data
  const { data: testimonialData } = useSWR("/data/testimonial.json", fetcher);

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
