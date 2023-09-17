import { AiOutlineAlignLeft, AiOutlineUser } from "react-icons/ai";
import { IoMdPaperPlane } from "react-icons/io";
import { LuGalleryVertical } from "react-icons/lu";
import { TbSmartHome } from "react-icons/tb";

const Bottombar = () => {
  return (
    <section className="fixed sm:bottom-6 bottom-1 overflow-hidden w-full z-50">
      <div className="flex justify-center">
        <ul className="flex w-full sm:w-96 backdrop-blur-lg backdrop-hue-rotate-15 backdrop-brightness-90 backdrop-saturate-150  border-blue-500 border rounded-full">
          {/* About */}
          <li className="w-full p-1">
            <a
              className="w-full flex rounded-l-full hover:backdrop-blur-xl hover:backdrop-brightness-200 hover:backdrop-contrast-200 hover:backdrop-hue-rotate-180 duration-300 hover:shadow-xl flex-col text-xs text-center"
              href="#about"
            >
              <span className="flex text-xl justify-center">
                {/* About Icon */}
                <AiOutlineUser size={32} className="p-1" />
              </span>
              <span className="text-[10px] sm:text-xs">About</span>
            </a>
          </li>
          {/* Skills */}
          <li className="w-full p-1">
            <a
              className="hover-full flex hover:backdrop-blur-xl hover:backdrop-brightness-200 hover:backdrop-contrast-200 hover:backdrop-hue-rotate-180 duration-300 hover:shadow-xl flex-col text-xs text-center"
              href="#skills"
            >
              <span className="flex text-xl justify-center">
                {/* Skills Icon */}
                <AiOutlineAlignLeft size={32} className="p-1" />
              </span>
              <span className="text-[10px] sm:text-xs"> Skills</span>
            </a>
          </li>
          {/* Home */}
          <li className="w-full p-1">
            <a
              className="hover-full flex hover:backdrop-blur-xl hover:backdrop-brightness-200 hover:backdrop-contrast-200 hover:backdrop-hue-rotate-180 duration-300 hover:shadow-xl flex-col text-xs text-center"
              href="#"
            >
              <span className="flex text-xl justify-center">
                {/* Home Icon */}
                <TbSmartHome size={32} className="p-1" />
              </span>
              <span className="text-[10px] sm:text-xs"> Home</span>
            </a>
          </li>
          {/* Portfolio */}
          <li className="w-full p-1">
            <a
              className="hover-full flex hover:backdrop-blur-xl hover:backdrop-brightness-200 hover:backdrop-contrast-200 hover:backdrop-hue-rotate-180 duration-300 hover:shadow-xl flex-col text-xs text-center"
              href="#portfolio"
            >
              <span className="flex text-xl justify-center">
                {/* Portfolio Icon */}
                <LuGalleryVertical size={32} className="p-1" />
              </span>
              <span className="text-[10px] sm:text-xs">Portfolio</span>
            </a>
          </li>
          {/* Contact */}
          <li className="w-full p-1">
            <a
              className="hover-full flex hover:backdrop-blur-xl hover:backdrop-brightness-200 hover:backdrop-contrast-200 hover:backdrop-hue-rotate-180 duration-300 hover:shadow-xl rounded-r-full flex-col text-xs text-center"
              href="#contact"
            >
              <span className="flex text-xl justify-center">
                {/* Contact Icon */}
                <IoMdPaperPlane size={32} className="p-1" />
              </span>
              <span className="text-[10px] sm:text-xs">Contact</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Bottombar;
