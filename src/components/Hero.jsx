import { BsMouse3 } from "react-icons/bs";
import { FiDownload, FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";
import { Parallax } from "react-scroll-parallax";
import { Typewriter } from "react-simple-typewriter";
import useGetData from "../../lib/useGetData";

const Hero = () => {
  // get personal data
  const { data, loading, error } = useGetData("/data/personal.json");
  // error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="container mx-auto overflow-hidden">
      <div data-aos="fade-right" className="hero-wrapper" id="hero">
        <div className="w-14 sm:24 hidden sm:flex pl-3">
          {/* Hero icons */}
          <div className="icons-wrap">
            <ul className="flex flex-col gap-6">
              <li>
                <a
                  className="link"
                  href={data.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Facebook Icon */}
                  <FiFacebook size={24} />
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href={data.social.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Github Icon */}
                  <FiGithub size={24} />
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Linkeding Icon */}
                  <FiLinkedin size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:w-1/2 w-full px-4">
          {/* Hero title */}
          <div className="de-name">
            {/* Name */}
            <h1 className="text-2xl md:text-4xl font-bold">
              Hi, I&apos;m {/* Typewriter Animation Text */}
              <Typewriter
                words={data.name}
                loop
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </div>
          <div className="de-title">
            {/* Title */}
            <p>{data.title}</p>
          </div>
          <div className="de-description">
            {/* Sort Description */}
            <p>{data.description}</p>
          </div>
          <div className="de-resume">
            {/* Resume Link */}
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="de-resume-link"
            >
              Download Resume
              {/* Download Icon */}
              <span>
                <FiDownload />
              </span>
            </a>
          </div>
        </div>
        <div className="de-hero">
          {/* Hero image */}
          <div className="md:w-3/5 flex items-center gap-2">
            <div className="w-14 sm:24 sm:hidden">
              <div className=" ">
                <ul className="flex flex-col gap-6">
                  <li>
                    {/* facebook link */}
                    <a
                      className="link"
                      href={data.social.facebook}
                      target="_blank"
                    >
                      {/* facebook icon */}
                      <FiFacebook size={24} />
                    </a>
                  </li>
                  <li>
                    {/* Github link */}
                    <a
                      className="link"
                      href={data.social.github}
                      target="_blank"
                    >
                      {/* Github lcon */}
                      <FiGithub size={24} />
                    </a>
                  </li>
                  <li>
                    {/* Linkedin link */}
                    <a
                      className="link"
                      href={data.social.linkedin}
                      target="_blank"
                    >
                      {/* Linkedin icon */}
                      <FiLinkedin size={24} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div data-aos="zoom-in" className="de-hero-image">
              {/* hero image */}
              <Parallax speed={-5}>
                <img className="w-full h-full" src={data.image} alt="" />
              </Parallax>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Btn */}
      <div className="flex justify-center">
        <a href="#about" className="de-scroll">
          {/* Scroll Icon */}
          <BsMouse3 size={32} />
          <p className="text-xs py-6">Scroll Down</p>
        </a>
      </div>
    </section>
  );
};

export default Hero;
