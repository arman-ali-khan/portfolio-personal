import { useState } from "react";
import PortfolioCard from "./PortfolioCard";

const Portfolio = () => {
  const [showCard, setShowCard] = useState("all");

  const handleProject = (category) => {
    setShowCard(category);
  };

  // fake portfolio data
  const portfolioData = [
    {
      image: "/portfolio/agency1.png",
      category: "Agency",
      title: "Creative Agency",
      githuUrl: "#",
      liveLink: "#",
    },
    {
      image: "/portfolio/ecommerce1.png",
      category: "Ecommerce",
      title: "Creative Ecommerce",
      githuUrl: "#",
      liveLink: "#",
    },
    {
      image: "/portfolio/portfolio1.png",
      category: "Portfolio",
      title: "Creative Portfolio",
      githuUrl: "#",
      liveLink: "#",
    },
    {
      image: "/portfolio/ecommerce2.png",
      category: "Ecommerce",
      title: "Creative Ecommerce",
      githuUrl: "#",
      liveLink: "#",
    },
    {
      image: "/portfolio/agency2.png",
      category: "Agency",
      title: "Creative Agency",
      githuUrl: "#",
      liveLink: "#",
    },
    {
      image: "/portfolio/portfolio2.png",
      category: "Portfolio",
      title: "Creative Portfolio",
      githuUrl: "#",
      liveLink: "#",
    },
  ];

  // category data
  const categoryData = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "ecommerce",
      label: "Ecommerce",
    },
    {
      value: "agency",
      label: "Agency",
    },
    {
      value: "portfolio",
      label: "Portfolio",
    },
  ];
  return (
    <section className="container mx-auto overflow-hidden">
      {/* Title */}
      <div className="text-center my-6" id="portfolio">
        <h2 className="text-3xl font-bold">Portfolio</h2>
        <p>What i offer</p>
      </div>
      {/* Body */}
      <div className="pt-20 pb-12 lg:pt-[20px] lg:pb-[10px]">
        <div className="container">
          <div className="w-full flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <ul className="flex flex-wrap justify-center mb-12 space-x-1">
                {categoryData?.map((category, i) => {
                  return (
                    <li key={i} className="mb-1">
                      {/* Category Button */}
                      <button
                        onClick={() => handleProject(category.value)}
                        className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                          showCard === category.value
                            ? "activeClasses bg-blue-400 text-white"
                            : "inactiveClasses"
                        }`}
                      >
                        {/* Label */}
                        {category.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 px-3 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-5">
            {/* Portfolio Card */}
            {portfolioData.map((portfolio, i) => (
              <PortfolioCard
                showCard={showCard}
                key={i}
                portfolio={portfolio}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
