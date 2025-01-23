import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import appServices from "../services/AppServices"; // Import the service to fetch doctors
import DoctorModal from "../DoctorComponents/DoctorModel";
import "../CSS/Doctorinfo.css"; 

const DoctorsInfo = () => {
  const [doctors, setDoctors] = useState([]); // State to hold the list of doctors
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const slider = useRef(null);

  // Fetch doctors from the API when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await appServices.getAllDoctors(); // Fetch doctors from the API
        setDoctors(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array to run once when component mounts

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1023, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="d-flex flex-column justify-content-center px-3 px-lg-5 pt-2">
      <div className="d-flex flex-column align-items-center flex-lg-row justify-content-between mb-4">
        <div className="text-center text-lg-start">
          <h1 className="display-4">Our Doctors</h1>
          <p className="mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, quidem.</p>
        </div>
        <div className="d-flex gap-3 mt-3 mt-lg-0">
          <button className="btn btn-light shadow-sm" onClick={() => slider.current.slickPrev()}>
            <FaArrowLeft size={20} />
          </button>
          <button className="btn btn-light shadow-sm" onClick={() => slider.current.slickNext()}>
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="imagescard">
        <Slider ref={slider} {...settings}>
          {doctors.map((doctor, index) => (
            <div className="cardimg" key={index}>
              <img src={doctor.img} className="card-img-top rounded-top" alt="Doctor" />
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text">{doctor.specialties}</p>
                <button className="btn btn-primary" onClick={() => setSelectedDoctor(doctor)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </div>
  );
};

export default DoctorsInfo;
