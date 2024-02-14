import { IconContext } from "react-icons";
import parse from "html-react-parser";

import {
  DiPhotoshop,
  DiIllustrator,
  DiLaravel,
  DiCss3Full,
} from "react-icons/di";
import { FiGithub, FiFigma } from "react-icons/fi";
import { AiOutlineHtml5 } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";
import { CgBrowser } from "react-icons/cg";
import { LiaToolsSolid } from "react-icons/lia";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { SiCanva, SiExpress } from "react-icons/si";
import {
  TbBrandBootstrap,
  TbBrandNextjs,
  TbBrandRedux,
  TbBrandVscode,
} from "react-icons/tb";
import {
  BiLogoTailwindCss,
  BiLogoReact,
  BiLogoNodejs,
  BiCodeCurly,
} from "react-icons/bi";
import React from "react";

const SkillCard = ({ tech, collapsOn, setCollapsOn }) => {
  // get stacks from tech
  const stacks = tech?.stacks;
  return (
    <div
      onClick={() => setCollapsOn(false)}
      tabIndex={tech.id}
      className={`collapse ${
        collapsOn && tech.id === 1 ? "collapse-open" : ""
      } collapse-arrow border border-base-300 bg-base-200`}
    >
      <div className="collapse-title text-xl font-medium">
        <div className="flex items-center gap-3">
          <span>
            {/* tech icon */}
            
            <img className="w-10" src={tech?.icon} />
          </span>
          <div>
            {/* Tech Title */}
            <h2 className="font-bold">{tech?.title}</h2>
            {/* tech experience */}
            <p className="text-sm">More than {tech?.experience} years</p>
          </div>
        </div>
      </div>
      <div className="collapse-content flex gap-4 flex-wrap">
        {/* stack skills */}
        {stacks.map((stack, i) => {
          return (
            <div key={i} className="flex items-center gap-1">
              {/* stack icon */}
              <img src={stack?.icon} />
              {/* <span><SiCanva /></span> */}
              {/* stack title */}
              <p>{stack.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillCard;
