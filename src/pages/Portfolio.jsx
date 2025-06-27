import { motion } from "framer-motion";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio/Portfolio";
import Qualification from "../components/Qualification/Qualification";
import Services from "../components/Services";
import Skills from "../components/Skills/Skills";
import Testimonial from "../components/Testimonial";
import Web3Background from "../components/Web3Background";

const PortfolioPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Web3Background />
      <motion.main 
        className="relative z-10 space-y-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <About />
        <Skills />
        <Qualification />
        <Services />
        <Portfolio />
        <Testimonial />
        <Contact />
        <Footer />
      </motion.main>
    </div>
  );
};

export default PortfolioPage;