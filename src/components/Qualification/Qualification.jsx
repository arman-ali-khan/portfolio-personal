import { useState } from "react";
import { Parallax } from "react-scroll-parallax";
import Education from "./Education";
import Experience from "./Experience";
import useGetData from "../../../lib/useGetData";

const Qualification = () => {
  // toggle education and experience
  const [toggle, setToggle] = useState("education");
  // get data
  const {data} = useGetData('/data/qualification.json')
  // education data
  const educationData =data?.educations
  // experience data
  const experienceData = data?.experiences
  return (
    <section className="de-container">
      <div className="sm:w-96 mx-auto">
        {/* Title */}
        <div className="text-center mt-6 mb-12" id="qualification">
        <Parallax scale={[1.2, 1, 'easeInQuad']}>
          <h2 className="text-3xl font-bold">Qualification</h2>
          </Parallax>
          <p>My persolan journey</p>
        </div>
        {/* Toggle button */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            {/* Education Button */}
            <button
              onClick={() => setToggle("education")}
              className={`${
                toggle === "education"
                  ? "de-active"
                  : "font-thin"
              }`}
            >
              Education
            </button>
            |{/* Experience Button*/}
            <button
              onClick={() => setToggle("experience")}
              className={`${
                toggle === "experience"
                  ? "de-active"
                  : "font-thin"
              }`}
            >
              Experience
            </button>
          </div>
        </div>
        {/* Section */}
        {toggle === "education" ? (
          <div className="my-6">
            {/* Education */}
            <div className="relative w-full">
              {/* Education Card */}
              {educationData?.map((education) => (
                <Education key={education.id} education={education} />
              ))}
            </div>
          </div>
        ) : (
          <div className="my-6">
            {/* Experience */}
            <div className="relative w-full">
              {/* Experience Card */}
              {experienceData?.map((experience) => (
                <Experience experience={experience} key={experience.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Qualification;
