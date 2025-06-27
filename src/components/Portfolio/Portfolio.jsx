import { useState } from "react";
import { Parallax } from "react-scroll-parallax";
import useGetData from "../../lib/useGetData";
import PortfolioCard from "./PortfolioCard";

const Portfolio = () => {
  const [showCard, setShowCard] = useState("all");

  const handleProject = (category) => {
    setShowCard(category);
  };

  // fetch portfolio data
  const { data, loading, error } = useGetData('/data/portfolio.json');
  
  // error handling
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-400 p-8">
      <p>Error loading portfolio data: {error.message}</p>
    </div>
  );

  if (!data) return (
    <div className="text-center text-gray-400 p-8">
      <p>No portfolio data available</p>
    </div>
  );

  // portfolio data
  const portfolioData = data?.data || [];
  // category data
  const categoryData = data?.categories || [];

  return (
    <Parallax speed={-10}>
      <section className="de-container">
        {/* Title */}
        <div className="text-center my-6" id="portfolio">
          <Parallax scale={[1.2, 1, 'easeInQuad']}>
            <h2 className="text-3xl font-bold">Portfolio</h2>
          </Parallax>
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
                          className={`de-category-wrap ${
                            showCard === category.value
                              ? "activeClasses bg text-white"
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
            <div className="de-portfolio">
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
    </Parallax>
  );
};

export default Portfolio;