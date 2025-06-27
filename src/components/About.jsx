import { Parallax } from "react-scroll-parallax";
import useGetData from "../../lib/useGetData";
import CountUp from 'react-countup';


const About = () => {
const {data,error,loading} = useGetData('/data/about.json')
 // error handling
 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error: {error.message}</div>;
  return (
    <section className="de-container">
      {/* Ttile */}
      <div className="text-center my-6 py-5" id="about">
      <Parallax scale={[1.2, 1, 'easeInQuad']}>
        <h2 className="text-3xl font-bold">About Me</h2>
        </Parallax>
        <p>My introduction</p>
      </div>
      {/* Introduction */}
      <div className="flex justify-center w-full">
        <div className="de-intro">
          <div
            data-aos="slide-right"
            className="w-full text-center"
          >
            <p>
             {data.description}
            </p>
          </div>
          <div className="w-full px-8 md:px-2 flex justify-center">
            <div
             data-aos="fade-up"
              className="w-full mask mask-hexagon-2 bg"
            >
              {/* About Image */}
             <Parallax speed={-5}>
             <img className="w-full h-full" src={data.image} alt="" />
             </Parallax>
            </div>
          </div>
          <div data-aos="slide-left" className="w-full justify-center flex ">
            <div className="de-experience">
                {/* Experience */}
              <div className="text-center">
                <h2 className="text-2xl font-bold"><CountUp duration={5.75} start={-5}
 end={data.experience} />+</h2>
                <p className="font-bold">Years</p>
                <p className="text-sm">Experience</p>
              </div>
              {/* Projects */}
              <div className="text-center">
                <h2 className="text-2xl font-bold"><CountUp duration={5.75} start={-5}
 end={data.project} />+</h2>
                <p className="font-bold">Completed</p>
                <p className="text-sm">Projects</p>
              </div>
              {/* Worked */}
              <div className="text-center">
                <h2 className="text-2xl font-bold"><CountUp duration={5.75} start={-5}
 end={data.companies} /></h2>
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
