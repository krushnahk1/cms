import React, { useState, useEffect } from "react";
import '../CSS/Doctorinfo.css';
import AppServices from '../services/AppServices'; // Assuming AppServices is the API service you shared

const DoctorsInfo = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors' data from the database
    const fetchDoctors = async () => {
      try {
        const data = await AppServices.getAllDoctors();
        setDoctors(data); // Set fetched doctors to state
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Failed to fetch doctors' information.");
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors that are enabled
  const enabledDoctors = doctors.filter((doctor) => doctor.isEnabled);

  // Toggle enable/disable status of a doctor
  const toggleDoctorStatus = (id) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === id ? { ...doctor, isEnabled: !doctor.isEnabled } : doctor
    );
    setDoctors(updatedDoctors);
  };

  return (
    <div className="d-flex flex-column justify-content-center px-3 px-lg-5 pt-5">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="display-4">Our Doctors</h1>
        <p className="mt-2">
          Manage the doctors' availability and explore detailed information about them.
        </p>
      </div>

      {/* Enabled Doctors Cards Section */}
      <div className="imagescard mt-4">
        <div className="row">
          {enabledDoctors.length > 0 ? (
            enabledDoctors.map((doctor) => (
              <div className="col-lg-4 col-md-6 mb-4" key={doctor.id}>
                <div className="card h-100">
                  <img
                    src={doctor.img || 'default-doctor-img.jpg'} // Use a default image if none is provided
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
            ))
          ) : (
            <p className="text-center">No doctors enabled.</p>
          )}
        </div>
      </div>

      {/* Doctors Table Section */}
      <div className="doctors-table mt-5">
        <h3 className="mb-3">Doctors Information</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Working Days</th>
              <th>Working Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <tr key={doctor.id}>
                  <td>{index + 1}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialties}</td>
                  <td>{doctor.days.join(", ")}</td>
                  <td>
                    {doctor.inTime} - {doctor.outTime}
                  </td>
                  <td>
                    <button
                      className={`btn ${doctor.isEnabled ? "btn-success" : "btn-danger"} btn-sm`}
                      onClick={() => toggleDoctorStatus(doctor.id)}
                    >
                      {doctor.isEnabled ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No doctors available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsInfo;
