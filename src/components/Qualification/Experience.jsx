
const Experience = ({experience}) => {
    return (
        <div data-aos="fade-up" className={`${(experience.id===2 || experience.id===4 || experience.id===6) ? 'de-expe-one':'de-expe-two'} `} key={experience.id}>
        <div className={`flex w-full px-4`}>
          <div className="flex flex-col p-4  w-full my-3">
            {/* experience title */}
            <h2 className="text-lg sm:text-xl font-semibold -mt-1">
              {experience.title}
            </h2>
            {/* experience year */}
            <p className="text-xs sm:text-sm">{experience.year}</p>
            {/* experience institute */}
            <strong className="text-sm">{experience.institute}</strong>
          </div>
        </div>
      </div>
    );
};

export default Experience;