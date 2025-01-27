import React from "react";
import { useLocation, Link } from "react-router-dom";

const EnabledDoctors = () => {
  const location = useLocation();
  const { enabledDoctors } = location.state || { enabledDoctors: [] };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-4">Enabled Doctors</h1>
        <p className="lead">List of doctors currently enabled.</p>
      </div>

      {enabledDoctors.length > 0 ? (
        <div className="row">
          {enabledDoctors.map((doctor) => (
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
                    <strong>Availability:</strong> {doctor.days.join(", ")}
                  </p>
                  <p>
                    <strong>Working Hours:</strong> {doctor.inTime} - {doctor.outTime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No enabled doctors available.</p>
      )}

      <div className="text-center mt-4">
        <Link to="/DoctorDashboard/view-doctor" className="btn btn-secondary">
          Back to Doctor Info
        </Link>
      </div>
    </div>
  );
};

export default EnabledDoctors;
