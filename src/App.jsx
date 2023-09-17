import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Hero from "./components/Hero/Hero"
import Portfolio from "./components/Portfolio/Portfolio"
import Qualification from "./components/Qualification/Qualification"
import Services from "./components/Services/Services"
import Footer from "./components/Shared/Footer/Footer"
import Skills from "./components/Skills/Skills"
import Testimonial from "./components/Testimonial/Testimonial"


function App() {

  return (
    <div className="space-y-20">
     <Hero />
     <About />
     <Skills />
     <Qualification />
     <Services />
     <Portfolio />
     <Testimonial />
     <Contact />
     <Footer />
    </div>
  )
}

export default App
