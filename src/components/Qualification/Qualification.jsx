import { useState } from "react";
import { Parallax } from "react-scroll-parallax";
import Education from "./Education";
import Experience from "./Experience";
import useGetData from "../../lib/useGetData";

const Qualification = () => {
  // toggle education and experience
  const [toggle, setToggle] = useState("education");
  // get data
  const { data, loading, error } = useGetData('/data/qualification.json');
  
  // error handling
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-400 p-8">
      <p>Error loading qualification data: {error.message}</p>
    </div>
  );

  if (!data) return (
    <div className="text-center text-gray-400 p-8">
      <p>No qualification data available</p>
    </div>
  );

  // education data
  const educationData = data?.educations || [];
  // experience data
  const experienceData = data?.experiences || [];

  return (
    <section className="de-container">
      <div className="sm:w-96 mx-auto">
        {/* Title */}
        <div className="text-center mt-6 mb-12" id="qualification">
          <Parallax scale={[1.2, 1, 'easeInQuad']}>
            <h2 className="text-3xl font-bold">Qualification</h2>
          </Parallax>
          <p>My personal journey</p>
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