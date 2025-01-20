import React from "react";
import { RiMicroscopeLine } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import '../CSS/Services.css'; // Custom CSS

const Services = () => {
  return (
    <div className="services-section py-5">
      
        {/* "Our Services" Heading */}
        <div className="text">
          <h1 className="display">Our Services</h1>
          
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, quidem.
            <button className="servicebutton">See Services</button>
          </p>
          
        </div>
      <div className="container">
        {/* Services Cards */}
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <RiMicroscopeLine size={50} className="text-primary mb-3" />
                <h5 className="card-title">Lab Test</h5>
                <p className="card-text">
                  Comprehensive lab testing services for diagnostics.
                </p>
                <a href="#" className="btn btn-link">Learn more</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <MdHealthAndSafety size={50} className="text-primary mb-3" />
                <h5 className="card-title">Health Check</h5>
                <p className="card-text">
                  Regular health check-ups to ensure your well-being.
                </p>
                <a href="#" className="btn btn-link">Learn more</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <FaHeartbeat size={50} className="text-primary mb-3" />
                <h5 className="card-title">Heart Health</h5>
                <p className="card-text">
                  Specialized care for maintaining a healthy heart.
                </p>
                <a href="#" className="btn btn-link">Learn more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
