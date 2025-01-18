import React, { useRef } from "react";
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

const Doctors = () => {
  const data = [
    {
      img: doc1,
      name: "Dr. Serena Mitchell",
      specialties: "Orthopedic Surgeon",
      viewDetails:"",
      
    },
    {
      img: doc2,
      name: "Dr. Julian Bennett",
      specialties: "Cardiologist",
    },
    {
      img: doc3,
      name: "Dr. Camila Rodriguez",
      specialties: "Pediatrician",
    },
    {
      img: doc4,
      name: "Dr. Victor Nguyen",
      specialties: "Neurologist",
      
    },
    {
      img: doc5,
      name: "Dr. Ethan Carter",
      specialties: "Dermatologist",
    },
    {
      img: doc6,
      name: "Dr. Olivia Martinez",
      specialties: "Ophthalmologist",
    },
  ];

  const slider = useRef(null);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true, // Ensures infinite looping
    speed: 500,
    arrows: false, // Disable arrows for uninterrupted scrolling
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed:4000, // Increased interval to 5 seconds (5000 ms)
    pauseOnHover: false, // Prevent pausing on hover
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint:768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 180,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center px-3 px-lg-5 pt-">
      <div className="d-flex flex-column align-items-center flex-lg-row justify-content-between mb-4">
        <div className="text-center text-lg-start">
          <h1 className="display-4">Our Doctors</h1>
          <p className="mt-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
            quidem.
          </p>
        </div>
        <div className="d-flex gap-3 mt-3 mt-lg-0">
          <button
            className="btn btn-light shadow-sm"
            onClick={() => slider.current.slickPrev()}
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            className="btn btn-light shadow-sm"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="imagescard">
        <Slider ref={slider} {...settings}>
          {data.map((e, index) => (
            <div
              className="cardimg"
              key={index}
            >
              <img
                src={e.img}
                className="card-img-top rounded-top"
                alt="Doctor"
              />
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <p className="card-text">{e.specialties}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Doctors;
