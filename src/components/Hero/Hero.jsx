import { BsMouse3 } from "react-icons/bs";
import { FiDownload, FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  // Hero Image URL
  const image = "stock-2.png";

  // Animation Name
  const name = ["Saima Khan", "Developer", "Designer"];

  // Title
  const title = "Full-Stack Developer";

  // Short Description
  const description = `High level experience in web design and web development knowledge, producing quality work.`;

  // resume url (remove # and paste your resume preview or download url)
  const resumeUrl = "#";

  // social media urls
  // facebook 
  const facebook = 'https://www.facebook.com/#'
  // github 
  const github = 'https://github.com/#'
  // linkedin
  const linkedin = 'https://www.linkedin.com/in/#'

  return (
    <section className="container mx-auto overflow-hidden">
      <div
        data-aos="fade-right"
        className="w-full flex flex-col-reverse sm:flex-row h-[500px] sm:h-[700px] items-center"
        id="hero"
      >
        <div className="w-14 sm:24 hidden sm:flex pl-3">
          <div className="sm:absolute top-32 left-0 sm:top-64 sm:left-auto ">
            <ul className="flex flex-col gap-6">
              <li>
                <a
                  className="hover:text-blue-500 duration-300"
                  href={facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Facebook Icon */}
                  <FiFacebook size={24} />
                </a>
              </li>
              <li>
                <a
                  className="hover:text-blue-500 duration-300"
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Github Icon */}
                  <FiGithub size={24} />
                </a>
              </li>
              <li>
                <a
                  className="hover:text-blue-500 duration-300"
                  href={linkedin}
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
          <div className="w-full -my-2 justify-center sm:justify-normal py-5 sm:py-0 flex">
            {/* Name */}
            <h1 className="text-2xl md:text-4xl font-bold">
              Hi,  I&apos;m{" "}
              {/* Typewriter Animation Text */}
              <Typewriter
                words={name}
                loop
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </div>
          <div className="w-full flex justify-center sm:justify-normal py-2 text-xl">
            {/* Title */}
            <p>{title}</p>
          </div>
          <div className="w-full flex py-2 justify-center sm:justify-normal text-center sm:text-start text-sm">
            {/* Sort Description */}
            <p>{description}</p>
          </div>
          <div className="w-full flex justify-center sm:justify-start py-2 text-sm">
            {/* Resume Link */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-400 text-white hover:bg-blue-500 duration-300 hover:shadow-xl btn rounded-full px-4 py-3"
            >
              Download Resume
              {/* Download Icon */}
              <span>
                <FiDownload />
              </span>
            </a>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:h-full sm:h-64  flex justify-center items-center">
          {/* Hero image */}
          <div className="md:w-3/5  flex items-center gap-2">
            <div className="w-14 sm:24 sm:hidden">
              <div className="sm:absolute pl-3 top-32 left-0 sm:top-64 sm:left-auto ">
                <ul className="flex flex-col gap-6">
                  <li>
                    <a
                      className="hover:text-blue-500 duration-300"
                      href="#"
                      target="_blank"
                    >
                      <FiFacebook size={24} />
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-blue-500 duration-300"
                      href="#"
                      target="_blank"
                    >
                      <FiGithub size={24} />
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-blue-500 duration-300"
                      href="#"
                      target="_blank"
                    >
                      <FiLinkedin size={24} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              className="w-64 sm:w-72 md:w-auto mask mask-squircle bg-blue-400"
            >
              {/* hero image */}
              <img className="w-full h-full" src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Btn */}
      <div className="flex justify-center">
        <a
          href="#about"
          className="rounded-full flex justify-center items-center py-2 hover:pt-4 duration-300 flex-col px-1 animate-pulse"
        >
          {/* Scroll Icon */}
          <BsMouse3 size={32} />
          <p className="text-xs py-6">Scroll Down</p>
        </a>
      </div>
    </section>
  );
};

export default Hero;
