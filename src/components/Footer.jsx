import { useEffect, useState } from "react";
import { BsDiscord, BsMoonStars, BsSun } from "react-icons/bs";
import { CgFacebook, CgTwitter } from "react-icons/cg";
import Bottombar from "./Bottombar";
import useGetData from "../lib/useGetData";

const Footer = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    // Set the theme from local storage when the component mounts
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // toggle dark and light
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // set theme in localstorage
    localStorage.setItem("theme", newTheme);
  };

  // social urls
  const { data } = useGetData("/data/personal.json");
  
  return (
    <footer className="bg-base-200 overflow-hidden">
      <div data-aos="flip-down" className="de-footer-wrap">
        {/* Footer links */}
        <nav className="grid grid-flow-col gap-4">
          <a href="#about" className="link link-hover">
            About me
          </a>
          <a href="#services" className="link link-hover">
            Services
          </a>
          <a href="#portfolio" className="link link-hover">
            Portfolio
          </a>
          <a href="#contact" className="link link-hover">
            Contact
          </a>
        </nav>
        <nav>
          {/* Footer Social Links */}
          <div className="grid grid-flow-col gap-4">
            <a
              href={data?.social?.facebook || "#"}
              className="de-facebook"
              target="_blank"
              rel="noreferrer"
            >
              {/* Facebook icon */}
              <CgFacebook size={22} />
            </a>
            <a
              href={data?.social?.twitter || "#"}
              className="de-twitter"
              target="_blank"
              rel="noreferrer"
            >
              {/* Twitter icon */}
              <CgTwitter size={22} />
            </a>
            <a
              href={data?.social?.discord || "#"}
              className="de-discord"
              target="_blank"
              rel="noreferrer"
            >
              {/* Discord icon */}
              <BsDiscord size={22} />
            </a>
          </div>
        </nav>
        <span className="my-4"></span>
      </div>
      {/* Dark Light Toggle */}

      <div className="fixed z-[550] sm:right-12 right-1 bottom-28">
        <label
          onChange={() => toggleTheme()}
          className="swap p-2 rounded-full swap-rotate"
        >
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* sun icon */}
          <BsSun className="swap-off fill-current sm:w-8 w-5 sm:h-8 h-5" />

          {/* moon icon */}
          <BsMoonStars className="swap-on fill-current sm:w-8 w-5 sm:h-8 h-5" />
        </label>
      </div>
      <Bottombar />
    </footer>
  );
};

export default Footer;