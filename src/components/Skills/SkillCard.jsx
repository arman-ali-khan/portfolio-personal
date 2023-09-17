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
            {tech?.icon}
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
            <div key={i} className=" flex items-center gap-1">
              {/* stack icon */}
              <span>{stack.icon}</span>
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
