const About = () => {
  // about image url
  const image = "stock-1.png";
  // description
  const description = 'Web developer, with extensive knowledge and years of experience, working in web technologies and UI / UX design, delivering quality work.'

  // experience
  const experience = 2; // 2 + years
  // projects
  const project = 8; // 8 + Projects
  // worked companies
  const companies = 3; // 3 companies
  
  return (
    <section className="sm:my-12 container mx-auto overflow-hidden">
      {/* Ttile */}
      <div className="text-center my-6 py-5" id="about">
        <h2 className="text-3xl font-bold">About Me</h2>
        <p>My introduction</p>
      </div>
      {/* Introduction */}
      <div className="flex justify-center w-full">
        <div className="sm:flex sm:justify-between gap-12 sm:gap-0 lg:gap-12 items-center">
          <div
            data-aos="slide-right"
            className="w-full text-center"
          >
            <p>
             {description}
            </p>
          </div>
          <div className="w-full flex justify-center">
            <div
             data-aos="fade-up"
              className="w-full mask mask-hexagon-2  bg-blue-400"
            >
              {/* About Image */}
              <img className="w-full h-full" src={image} alt="" />
            </div>
          </div>
          <div data-aos="slide-left" className="w-full justify-center flex ">
            <div className="flex sm:flex-col lg:flex-row my-3 sm:my-0 justify-between sm:text-center mx-auto space-x-3 items-center">
                {/* Experience */}
              <div className="text-center">
                <h2 className="text-2xl font-bold">{experience}+</h2>
                <p className="font-bold">Years</p>
                <p className="text-sm">Experience</p>
              </div>
              {/* Projects */}
              <div className="text-center">
                <h2 className="text-2xl font-bold">{project}+</h2>
                <p className="font-bold">Completed</p>
                <p className="text-sm">Projects</p>
              </div>
              {/* Worked */}
              <div className="text-center">
                <h2 className="text-2xl font-bold">{companies}</h2>
                <p className="font-bold">Companies</p>
                <p className="text-sm">Worked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
