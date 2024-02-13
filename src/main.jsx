import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ParallaxProvider } from "react-scroll-parallax";
import App from "./App.jsx";
import "./index.css";
// ..
AOS.init();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ParallaxProvider>
    <Toaster position="top-center" reverseOrder={false} />
    <App /> 
  </ParallaxProvider>
  </React.StrictMode>
);
