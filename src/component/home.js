import React, { useEffect } from "react";
import '../CSS/home.css'; // Import the external CSS
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    // Initialize AOS with options
    AOS.init({
      duration: 1000,  // animation duration in milliseconds
      once: true,      // whether animation should happen only once while scrolling
      easing: "ease-in-out", // animation easing
    });

    // Optional: Refresh AOS on resize to fix issues with dynamic content
    window.addEventListener('resize', AOS.refresh);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', AOS.refresh);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading" data-aos="fade-down">
          Empowering Health Choices for a Vibrant Life Your Trusted..
        </h1>
        <p className="Paragraph" data-aos="fade-up">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam magnam
          omnis natus accusantium quos. Reprehenderit incidunt expedita
          molestiae impedit at sequi dolorem iste sit culpa, optio voluptates
          fugiat vero consequatur?
        </p>
      </div>
    </div>
  );
};

export default Home;
