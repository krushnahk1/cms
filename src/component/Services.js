import React, { useState } from "react";
import { RiMicroscopeLine } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import '../CSS/Services.css'; // Custom CSS
import ServiceForm from './AddServiceForm'; // Ensure this path is correct

const Services = () => {
  const [servicesData, setServicesData] = useState({
    title: "Our Services",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, quidem.",
    buttonLabel: "See Services",
    services: [
      {
        id: 1,
        icon: <RiMicroscopeLine size={50} className="text-primary mb-3" />,
        title: "Lab Test",
        description: "Comprehensive lab testing services for diagnostics.",
        link: "#",
        img: "",
      },
      {
        id: 2,
        icon: <MdHealthAndSafety size={50} className="text-primary mb-3" />,
        title: "Health Check",
        description: "Regular health check-ups to ensure your well-being.",
        link: "#",
        img: "",
      },
      {
        id: 3,
        icon: <FaHeartbeat size={50} className="text-primary mb-3" />,
        title: "Heart Health",
        description: "Specialized care for maintaining a healthy heart.",
        link: "#",
        img: "",
      },
    ],
  });

  const addOrUpdateService = (newServiceData) => {
    setServicesData((prevData) => ({
      ...prevData,
      services: [...prevData.services, newServiceData],
    }));
  };

  return (
    <div className="services-section py-5">
      <div className="text">
        <h1 className="display">{servicesData.title}</h1>
        <p>{servicesData.description}</p>
        <button className="servicebutton">{servicesData.buttonLabel}</button>
      </div>

      <div className="container service-container">
        <div className="row g-4">
          {servicesData.services.map((service) => (
            <div className="col-lg-4" key={service.id}>
              <div className="card text-center h-100 shadow-sm">
                <div className="card-body">
                  {service.img ? (
                    <img
                      src={service.img}
                      alt={service.title}
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    service.icon
                  )}
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                  <a href={service.link} className="btn btn-link">Learn more</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Form for Adding/Updating Data */}
      {/* <ServiceForm addOrUpdateService={addOrUpdateService} /> */}
    </div>
  );
};

export default Services;
