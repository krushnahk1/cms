import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import '../CSS/Doctorinfo.css';
import doc1 from '../assets/img/doc1.jpg';
import doc2 from '../assets/img/doc2.jpg';
import doc3 from '../assets/img/doc3.jpg';
import doc4 from '../assets/img/doc4.jpg';
import doc5 from '../assets/img/doc5.jpg';
import doc6 from '../assets/img/doc6.jpg';
<<<<<<< HEAD
import DoctorModal from './DoctorModel';
import DoctorForm from './AddDocorForm'; // Import the form
=======
import DoctorModal from '../DoctorComponents/DoctorModel';
import DoctorForm from '../DoctorComponents/AddDoctorForm'; // Import the form
>>>>>>> 57efe3b50514932588f2767839da6b06bdc79408

const DoctorsInfo = () => {
  const [doctors, setDoctors] = useState([
    {
      img: doc1,
      name: "Dr. Serena Mitchell",
      specialties: "Orthopedic Surgeon",
      inTime: "9:00 AM",
      outTime: "5:00 PM",
      days: ["Monday", "Wednesday", "Friday"]
    },
    {
      img: doc2,
      name: "Dr. Julian Bennett",
      specialties: "Cardiologist",
      inTime: "10:00 AM",
      outTime: "4:00 PM",
      days: ["Tuesday", "Thursday"]
    },
    // Other initial doctors
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const slider = useRef(null);

  const addOrUpdateDoctor = (newDoctor) => {
    setDoctors((prevDoctors) => {
      const index = prevDoctors.findIndex(doc => doc.name === newDoctor.name);
      if (index > -1) {
        const updatedDoctors = [...prevDoctors];
        updatedDoctors[index] = newDoctor;
        return updatedDoctors;
      }
      return [...prevDoctors, newDoctor];
    });
  };

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
    <div className="d-flex flex-column justify-content-center px-3 px-lg-5 pt-">
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
          {doctors.map((e, index) => (
            <div className="cardimg" key={index}>
              <img src={e.img} className="card-img-top rounded-top" alt="Doctor" />
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <p className="card-text">{e.specialties}</p>
                <button className="btn btn-primary" onClick={() => setSelectedDoctor(e)}>View Details</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      <div className="mt-5">
        <h2>Add or Update Doctor</h2>
        <DoctorForm addOrUpdateDoctor={addOrUpdateDoctor} />
      </div>
    </div>
  );
};

export default DoctorsInfo;