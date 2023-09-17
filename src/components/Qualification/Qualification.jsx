import { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";

const Qualification = () => {
  // toggle education and experience
  const [toggle, setToggle] = useState("education");
  // education data
  const educationData = [
    {
      id: 1,
      title: "High School Degree",
      year: "2015 - 2017",
      institute: "Carmichael College, Rangpur",
    },
    {
      id: 2,
      title: "Bachelor's Degree",
      year: "2017 - 2023",
      institute: "DCC-Dhaka City College",
    },
    {
      id: 3,
      title: "Master Degree",
      year: "2023 - 2024",
      institute: "DU-Dhaka University",
    },
  ];
  // experience data
  const experienceData = [
    {
      id: 1,
      title: "UI/UX Designer",
      year: "2015 - 2017",
      institute: "Ollyo - Dhaka, Bangladesh",
    },
    {
      id: 2,
      title: "Frontend Developer",
      year: "2017 - 2023",
      institute: "Wipro Limited - India",
    },
    {
      id: 3,
      title: "Full-Stack Developer",
      year: "2023 - 2024",
      institute: "Grab - Singapore",
    },
  ];
  return (
    <section className="container mx-auto">
      <div className="sm:w-96 mx-auto">
        {/* Title */}
        <div className="text-center mt-6 mb-12" id="qualification">
          <h2 className="text-3xl font-bold">Qualification</h2>
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
                  ? "text-blue-500 font-bold border-b pb-2 text-xl duration-300"
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
                  ? "text-blue-500 font-bold border-b pb-2 text-xl duration-300"
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
