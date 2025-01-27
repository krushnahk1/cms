import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppServices from "../services/AppServices";

import "../CSS/DoctorsInfo.css";

const DoctorsCardView = () => {

  const [doctors, setDoctors] = useState([]);
  const [viewMode, setViewMode] = useState("card"); // "card" or "list"

  // Fetch doctors from the database
  const fetchDoctors = async () => {
    try {
      const data = await AppServices.getAllDoctors(); // Fetch from the backend
      setDoctors(data.filter((doctor)=>doctor.status=="ENABLED"));
    } catch (error) {
      console.error("Error fetching doctors:", error);
      alert("Failed to fetch doctors' information.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="imagescard mt-4">
      <div className="doctor-list-container">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div className="doctor-list-item" key={doctor.id}>
              <div className="doctor-list-item-card">
                <img
                  src={doctor.img || "default-doctor-img.jpg"}
                  className="card-img-top"
                  alt={doctor.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text">{doctor.specialties}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No doctors ENABLED.</p>
        )}
      </div>
    </div>
  );
};

// // Default props
// DoctorsCardView.defaultProps = {
//   doctors: [],
//   toggleDoctorStatus: () => {},
// };

// // Prop validation
// DoctorsCardView.propTypes = {
//   doctors: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       specialties: PropTypes.string,
//       days: PropTypes.arrayOf(PropTypes.string),
//       inTime: PropTypes.string,
//       outTime: PropTypes.string,
//       isENABLED: PropTypes.bool,
//       img: PropTypes.string,
//     })
//   ),
//   toggleDoctorStatus: PropTypes.func,
// };

export default DoctorsCardView;
