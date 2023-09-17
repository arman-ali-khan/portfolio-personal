import Lottie from "lottie-react";
import { AiOutlineHtml5 } from "react-icons/ai";
import {
  BiCodeCurly,
  BiLogoNodejs,
  BiLogoReact,
  BiLogoTailwindCss,
} from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
import { CgBrowser } from "react-icons/cg";
import {
  DiCss3Full,
  DiIllustrator,
  DiLaravel,
  DiPhotoshop,
} from "react-icons/di";
import { FiFigma, FiGithub } from "react-icons/fi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { LiaToolsSolid } from "react-icons/lia";
import { SiCanva, SiExpress } from "react-icons/si";
import {
  TbBrandBootstrap,
  TbBrandNextjs,
  TbBrandRedux,
  TbBrandVscode,
} from "react-icons/tb";
// skills animation
import { useState } from "react";
import SkillCard from "./SkillCard";
// import animation json
import skill from "../../assets/lotties/coding.json";

const Skills = () => {
  // tech and experience
  const techStack = [
    {
      id: 1,
      // Tech Title
      title: "Designer",
      experience: 5,
      icon:<HiOutlineColorSwatch size={32} />,
      stacks: [
        {
          title: "Canva",
          icon: <SiCanva size={32} />,
        },
        {
          title: "Photoshop",
          icon: <DiPhotoshop size={32} />,
        },
        {
          title: "Illustrator",
          icon: <DiIllustrator size={32} />,
        },
        {
          title: "Figma",
          icon: <FiFigma size={32} />,
        },
      ],
    },
    {
      id: 2,
      // Tech Title
      title: "Frontend developer",
      experience: 4,
      icon:<BiCodeCurly size={32} />,
      stacks: [
        {
          title: "HTML",
          icon: <AiOutlineHtml5 size={32} />,
        },
        {
          title: "CSS",
          icon: <DiCss3Full size={32} />,
        },
        {
          title: "Bootstrap",
          icon: <TbBrandBootstrap size={32} />,
        },
        {
          title: "Tailwind",
          icon: <BiLogoTailwindCss size={32} />,
        },
        {
          title: "ReactJS",
          icon: <BiLogoReact size={32} />,
        },
        {
          title: "NextJS",
          icon: <TbBrandNextjs size={32} />,
        },
      ],
    },
    {
      id: 3,
      // Tech Title
      title: "Backend Developer",
      experience: 2,
      icon: <BsCodeSlash size={32} />,
      stacks: [
        {
          title: "NodeJs",
          icon: <BiLogoNodejs size={32} />,
        },
        {
          title: "Laravel",
          icon: <DiLaravel size={32} />,
        },
        {
          title: "NextJS",
          icon: <TbBrandNextjs size={32} />,
        },
        {
          title: "Express",
          icon: <SiExpress size={32} />,
        },
      ]
    },
    {
      id: 4,
      // Tech Title
      title: "Tools",
      experience: 3,
      icon:<LiaToolsSolid size={32} />,
      stacks:[
        {
          title: "VS Code",
          icon: <TbBrandVscode size={32} />,
        },
        {
          title: "Github",
          icon: <FiGithub size={32} />,
        },
        {
          title: "DevTool",
          icon: <CgBrowser size={32} />,
        },
        {
          title: "Redux",
          icon: <TbBrandRedux size={32} />,
        },
      ]
    },
  ];
// collaps on
const [collapsOn, setCollapsOn] = useState(true);
 
  return (
    <section className="container mx-auto overflow-hidden">
      <div className="flex justify-center py-6 text-center">
        {/* Title */}
        <div id="skills">
          <h2 className="text-3xl font-bold">Skills</h2>
          {/* sub title */}
          <p>My technical level</p>
        </div>
      </div>
      <div className="w-full flex flex-col-reverse sm:flex-row">
        <div className="sm:w-1/2 sm:flex justify-center items-center">
          <div className="space-y-6">
            {/* Tech Collapse */}
           {
            techStack?.map(tech=><SkillCard collapsOn={collapsOn} setCollapsOn={setCollapsOn} key={tech.id} tech={tech} />)
           }
          </div>
        </div>
        <div className="sm:w-1/2">
          {/* Lottie animated image */}
          <div className="w-9/12 my-4 sm:my-0 mx-auto" data-aos="fade-up">
            <Lottie animationData={skill} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
