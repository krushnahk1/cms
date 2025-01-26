import React from "react";
import PropTypes from "prop-types";

const DoctorsCardView = ({ doctors = [], toggleDoctorStatus }) => {
  // Filter enabled doctors
  const enabledDoctors = Array.isArray(doctors)
    ? doctors.filter((doctor) => doctor.isEnabled)
    : [];

  return (
    <div className="imagescard mt-4">
      <div className="row">
        {enabledDoctors.length > 0 ? (
          enabledDoctors.map((doctor) => (
            <div className="col-lg-4 col-md-6 mb-4" key={doctor.id}>
              <div className="card h-100">
                <img
                  src={doctor.img || "default-doctor-img.jpg"}
                  className="card-img-top"
                  alt={doctor.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text">{doctor.specialties}</p>
                  <p>
                    <strong>Availability:</strong>{" "}
                    {doctor.days ? doctor.days.join(", ") : "N/A"}
                  </p>
                  <p>
                    <strong>Working Hours:</strong>{" "}
                    {doctor.inTime && doctor.outTime
                      ? `${doctor.inTime} - ${doctor.outTime}`
                      : "N/A"}
                  </p>
                  <button
                    className={`btn ${
                      doctor.isEnabled ? "btn-success" : "btn-danger"
                    } btn-sm`}
                    onClick={() => toggleDoctorStatus(doctor.id)}
                  >
                    {doctor.isEnabled ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No doctors enabled.</p>
        )}
      </div>
    </div>
  );
};

// Default props
DoctorsCardView.defaultProps = {
  doctors: [],
  toggleDoctorStatus: () => {},
};

// Prop validation
DoctorsCardView.propTypes = {
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      specialties: PropTypes.string,
      days: PropTypes.arrayOf(PropTypes.string),
      inTime: PropTypes.string,
      outTime: PropTypes.string,
      isEnabled: PropTypes.bool,
      img: PropTypes.string,
    })
  ),
  toggleDoctorStatus: PropTypes.func,
};

export default DoctorsCardView;
