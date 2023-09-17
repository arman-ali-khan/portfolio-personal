import { useEffect, useState } from "react";
import { BsDiscord, BsMoonStars, BsSun } from "react-icons/bs";
import { CgFacebook, CgTwitter } from "react-icons/cg";
import Bottombar from "../Bottombar/Bottombar";
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
  // facebook
  const facebook = "https://facebook.com/";
  // twitter
  const twitter = "https://twitter.com/";
  // discord
  const discord = "https://discord.com/";
  return (
    <footer className="bg-base-200 overflow-hidden">
      <div data-aos="flip-down" className="footer container mx-auto overflow-hidden footer-center p-10  text-base-content rounded"
      >
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
              href={facebook}
              className="bg-blue-700 rounded-full p-1 text-white"
              target="_blank"
              rel="noreferrer"
            >
              {/* Facebook icon */}
              <CgFacebook size={22} />
            </a>
            <a
              href={twitter}
              className="bg-blue-400 rounded-full p-1 text-white"
              target="_blank"
              rel="noreferrer"
            >
              {/* Twitter icon */}
              <CgTwitter size={22} />
            </a>
            <a
              href={discord}
              className="bg-blue-600 rounded-full p-1 text-white"
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
      <div className="fixed sm:right-12 right-1 bottom-20">
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
