const PortfolioCard = ({ portfolio, showCard }) => {
  const { category, image, title, githuUrl, liveLink } = portfolio;
  return (
    <div
      className={`w-full  ${
        showCard === "all" || showCard === category?.toLowerCase()
          ? "block h-full relative duration-300"
          : "!w-0 opacity-0 !h-0 absolute -left-96"
      }`}
    >
      <div data-aos="zoom-in" className="relative">
        <div className="rounded-lg h-64 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="portfolio"
          />
        </div>
        <div className="de-category">
          <span className="de-port-cat">{category}</span>
          <h3 className="de-port-title">{title}</h3>
          <a
            href={githuUrl}
            className="de-portfolio-link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href={liveLink}
            className="de-portfolio-link"
            target="_blank"
            rel="noreferrer"
          >
            Live
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
