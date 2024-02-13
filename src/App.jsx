import { useEffect, useState } from "react";
import Preloader from "./Preloader";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio/Portfolio";
import Qualification from "./components/Qualification/Qualification";
import Services from "./components/Services";
import Skills from "./components/Skills/Skills";
import Testimonial from "./components/Testimonial";

function App() {
  // enable or disable preloader (true or false) 
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Adjust the delay time as needed
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {!loading ? (
        <main className="space-y-20 overflow-hidden">
          {/* Hero section */}
          <Hero />
          {/* About Section */}
          <About />
          {/* Skills Section */}
          <Skills />
          {/* Qualification Section */}
          <Qualification />
          {/* Services Section */}
          <Services />
          {/* Portfolio Section */}
          <Portfolio />
          {/* Testimonial Section */}
          <Testimonial />
          {/* Contact Form Section */}
          <Contact />
          {/* Footer Section */}
          <Footer />
        </main>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default App;
