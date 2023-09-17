const PortfolioCard = ({ portfolio, showCard }) => {
  const { category, image, title, githuUrl, liveLink } = portfolio;
  return (
    <div
      className={`w-full  ${
        showCard === "all" || showCard === category?.toLowerCase()
          ? "block"
          : "hidden"
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
        <div className="relative z-1 px-3 -mt-20 text-center bg-base-100 dark:border rounded-lg shadow-lg mx-2 py-3">
          <span className="block text-sm font-semibold text-blue-500">
            {category}
          </span>
          <h3 className="text-sm md:text-base lg:text-xl font-bold text-dark">
            {title}
          </h3>
          <a
            href={githuUrl}
            className="inline-block py-2 md:py-3 text-sm font-semibold transition border rounded-md px-7 text-body-color hover:border-blue5text-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href={liveLink}
            className="inline-block py-2 md:py-3 text-sm font-semibold transition border rounded-md px-7 text-body-color hover:border-blue5text-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white"
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
