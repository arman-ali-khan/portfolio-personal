// skills animation
import { useState } from "react";
import { Parallax } from "react-scroll-parallax";
import useGetData from "../../../lib/useGetData";
import SkillCard from "./SkillCard";
// import animation json

const Skills = () => {
  // tech and experience
  const { data: techStack } = useGetData("/data/skills.json");
  // collaps on
  const [collapseOn, setCollapseOn] = useState(true);

  return (
    <section className="de-container">
      <div className="flex justify-center py-6 text-center">
        {/* Title */}
        <div id="skills">
          <Parallax scale={[1.2, 1, "easeInQuad"]}>
            <h2 className="text-3xl font-bold">Skills</h2>
          </Parallax>
          {/* sub title */}
          <p>My technical level</p>
        </div>
      </div>
      <div className="de-skill">
        <div className="sm:w-1/2 sm:flex justify-center items-center">
          <div className="space-y-6">
            {/* Tech Collapse */}
            {techStack?.map((tech) => (
              <SkillCard
                collapsOn={collapseOn}
                setCollapsOn={setCollapseOn}
                key={tech.id}
                tech={tech}
              />
            ))}
          </div>
        </div>
        <div className="sm:w-1/2">
          {/* parallax animated */}
          <div className="de-parallax-wrap" data-aos="fade-up">
            <Parallax rotate={[0, 360]} className="de-parallax">
              <img
                src="/logos/logo-code.png"
                className="w-24 rotate-180 rounded-full xl:w-44"
              />
              <div className="de-logo-wrap w-14 -left-7">
                <img src="/logos/logo-js.png" className="de-logo" />
              </div>
              <div className="de-logo-wrap w-14 -right-7">
                <img src="/logos/logo-mysql.png" className="de-logo" />
              </div>
              <div className="de-logo-wrap w-14 -top-7">
                <img src="/logos/logo-mongo.png" className="de-logo" />
              </div>
              <div className="de-logo-wrap w-14 -bottom-7">
                <img src="/logos/logo-react.png" className="de-logo" />
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
