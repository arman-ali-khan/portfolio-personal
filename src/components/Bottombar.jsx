import { AiOutlineAlignLeft, AiOutlineUser } from "react-icons/ai";
import { IoMdPaperPlane } from "react-icons/io";
import { LuGalleryVertical } from "react-icons/lu";
import { TbSmartHome } from "react-icons/tb";

const Bottombar = () => {
  return (
    <section className="de-bottom-container">
      <div className="flex justify-center">
        <ul className="de-bottom-wrap">
          {/* About */}
          <li className="w-full p-1">
            <a className="de-bottom-link" href="#about">
              <span className="flex text-xl justify-center">
                {/* About Icon */}
                <AiOutlineUser size={32} className="p-1" />
              </span>
              <span className="text-[10px] sm:text-xs">About</span>
            </a>
          </li>
          {/* Skills */}
          <li className="w-full p-1">
            <a className="de-bottom-link" href="#skills">
              <span className="flex text-xl justify-center">
                {/* Skills Icon */}
                <AiOutlineAlignLeft size={32} className="p-1" />
              </span>
              <span className="text-[10px] sm:text-xs"> Skills</span>
            </a>
          </li>
          {/* Home */}
          <li className="w-full p-1">
            <a className="de-bottom-link" href="#">
              <span className="flex text-xl justify-center">
                {/* Home Icon */}
                <TbSmartHome size={32} className="p-1" />
              </span>
              <span className="text-[10px] sm:text-xs"> Home</span>
            </a>
          </li>
          {/* Portfolio */}
          <li className="w-full p-1">
            <a className="de-bottom-link" href="#portfolio">
              <span className="flex text-xl justify-center">
                {/* Portfolio Icon */}
                <LuGalleryVertical size={32} className="p-1" />
              </span>
              <span className="text-[10px] sm:text-xs">Portfolio</span>
            </a>
          </li>
          {/* Contact */}
          <li className="w-full p-1">
            <a className="de-bottom-link" href="#contact">
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
