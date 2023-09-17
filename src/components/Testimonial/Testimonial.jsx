// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./style.module.css";

// import required modules
import { TfiQuoteLeft, TfiQuoteRight } from "react-icons/tfi";
import { Navigation } from "swiper/modules";

export default function Testimonial() {
  // testimonial data
  const testimonialData = [
    {
      id: 1,
      name: "Brian Baker",
      address: "New York, USA",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatum voluptatem illo, harum culpa eligendi debitis laboriosam omnis beatae ipsa magni perferendis ratione nam sunt sapiente, corporis error similique tempora.",
      image: "/testimonial/testimonial1.png",
    },
    {
      id: 2,
      name: "Ann Chovey",
      address: "New York, USA",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatum voluptatem illo, harum culpa eligendi debitis laboriosam omnis beatae ipsa magni perferendis ratione nam sunt sapiente, corporis error similique tempora.",
      image: "/testimonial/testimonial2.png",
    },
    {
      id: 3,
      name: "Mona Lott",
      address: "New York, USA",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatum voluptatem illo, harum culpa eligendi debitis laboriosam omnis beatae ipsa magni perferendis ratione nam sunt sapiente, corporis error similique tempora.",
      image: "/testimonial/testimonial3.png",
    },
    {
      id: 4,
      name: "Ivana Tinkle",
      address: "New York, USA",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatum voluptatem illo, harum culpa eligendi debitis laboriosam omnis beatae ipsa magni perferendis ratione nam sunt sapiente, corporis error similique tempora.",
      image: "/testimonial/testimonial4.png",
    },
    {
      id: 5,
      name: "Anita Bath",
      address: "New York, USA",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatum voluptatem illo, harum culpa eligendi debitis laboriosam omnis beatae ipsa magni perferendis ratione nam sunt sapiente, corporis error similique tempora.",
      image: "/testimonial/testimonial5.png",
    },
    {
      id: 6,
      name: "Justin Time",
      address: "New York, USA",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatum voluptatem illo, harum culpa eligendi debitis laboriosam omnis beatae ipsa magni perferendis ratione nam sunt sapiente, corporis error similique tempora.",
      image: "/testimonial/testimonial6.png",
    },
  ];
  return (
    <section className="container mx-auto overflow-hidden">
      {/* Title */}
      <div className="text-center my-6" id="testimonial">
        <h2 className="text-3xl font-bold">Testimonial</h2>
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
              <div className="container flex h-full items-center justify-center mx-auto lg:px-10">
                <div className="flex flex-col h-full mx-4 my-6">
                  <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12">
                    <p className="relative px-6 py-1 text-lg italic text-center">
                      {/* User Message */}
                      <TfiQuoteLeft className="text-2xl md:text-4xl" />
                      {testimonial?.message}
                      <TfiQuoteRight className="absolute right-0 text-2xl md:text-4xl" />
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-8 rounded-b-lg ">
                    {/* User Image */}
                    <img
                      src={testimonial?.image}
                      alt={testimonial.name}
                      className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500"
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
