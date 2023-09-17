const Education = ({ education }) => {
  return (
    <div
      data-aos="fade-up"
      className={`${
        education.id === 2 || education.id === 4 || education.id === 6
          ? "sm:left-12 text-right border-r border-b relative rounded-br-3xl border-gray-400"
          : "border-l border-b border-gray-400 rounded-bl-3xl"
      } `}
      key={education.id}
    >
      <div className={`flex w-full px-4`}>
        <div className="flex flex-col p-4 w-full my-3">
            {/* education title */}
          <h2 className="text-lg sm:text-xl font-semibold -mt-1">
            {education.title}
          </h2>
          {/* education year */}
          <p className="text-xs sm:text-sm">{education.year}</p>
          {/* education institute */}
          <strong className="text-sm">{education.institute}</strong>
        </div>
      </div>
    </div>
  );
};

export default Education;
