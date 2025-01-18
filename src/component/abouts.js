import React from "react";
import img from "../assets/img/about.jpg";
import "../CSS/about.css"; // Custom CSS file for additional styles

const About = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <h1 className="about-title">About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
          labore rerum tempore tenetur commodi natus quos itaque voluptatum
          repudiandae nostrum accusantium vero voluptate aspernatur totam,
          laboriosam aut, et quae consequatur?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora quia
          suscipit illum, numquam incidunt nostrum dolor officia doloremque
          cupiditate, placeat explicabo sed iure atque neque quidem ipsam!
          Dolor, minus reiciendis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, illum.
          Accusantium ab expedita veniam nobis aut, in rerum repellendus!
          Exercitationem libero recusandae corrupti accusantium reiciendis in
          placeat illo maxime ea.
        </p>
      </div>
      <div className="about-image">
        <img src={img} alt="About us" />
      </div>
    </div>
  );
};

export default About;
