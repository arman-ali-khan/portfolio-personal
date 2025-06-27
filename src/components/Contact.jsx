import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BiEnvelope } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Parallax } from "react-scroll-parallax";
import useGetData from "../../lib/useGetData";

const Contact = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // email send loading
  const [loading, setLoading] = useState(false);

  // handle send mail
  const handleSendEmail = (data) => {
    // loading start
    setLoading(true);
    // message data
    const messageData = {
      service_id: import.meta.env.VITE_EMAIL_SERVICE_ID,
      template_id: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      user_id: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
      template_params: {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      },
    };
    // emailjs api for send email
    axios
      .post(`https://api.emailjs.com/api/v1.0/email/send`, messageData)
      .then((res) => {
        res.data === "OK" && toast.success("Email Send");
        setLoading(false);
        reset();
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  // get about data
  const {data} = useGetData('/data/about.json')
  return (
    <section className="de-container">
      {/* Title */}
      <div className="text-center mt-6 mb-12" id="contact">
        <Parallax scale={[1.2, 1, "easeInQuad"]}>
          <h2 className="text-3xl font-bold">Contact Me</h2>
        </Parallax>
        <p>Get in touch</p>
      </div>
      {/* Body */}
      <div data-aos="slide-up" className="container px-6 md:px-12">
        <div className="de-contact-wrap">
          <div className="flex items-center flex-wrap">
            <div className="de-contact">
              <form onSubmit={handleSubmit(handleSendEmail)}>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  {/* input name */}
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="de-input"
                    id="exampleInput90"
                    placeholder="Name"
                  />
                  {/* show name error */}
                  {errors.name && (
                    <span className="de-error">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  {/* input email */}
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="de-input"
                    id="exampleInput90"
                    placeholder="Email"
                  />
                  {/* show email error */}
                  {errors.email && (
                    <span className="de-error">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  {/* input message */}
                  <textarea
                    {...register("message", { required: true })}
                    className="textarea rounded textarea-bordered w-full"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Message"
                  ></textarea>
                  {/* show message error */}
                  {errors.message && (
                    <span className="de-error">
                      This field is required
                    </span>
                  )}
                </div>

                <div>
                  {/* Send Button */}
                  <button className="btn w-full bg duration-300 text-white rounded py-1 ">
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full shrink-0 my-8 grow-0 basis-auto lg:w-6/12">
              <div className="flex flex-wrap space-y-4">
                <div className="de-address">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md  p-4">
                        {/* Phone call icon */}
                        <FiPhoneCall size={32} />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="font-bold">Call Me</p>
                      {/* Phone number */}
                      <p className="text-neutral-500">{data?.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="de-address">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md  p-4">
                        {/* Envelope icon */}
                        <BiEnvelope size={32} />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="font-bold">Email</p>
                      {/* Email address */}
                      <p className="text-neutral-500">{data?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="de-address">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md  p-4">
                        {/* Location icon */}
                        <HiOutlineLocationMarker size={32} />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="font-bold">Address</p>
                      <p className="text-neutral-500">
                        {/* Address */}
                        {data?.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
