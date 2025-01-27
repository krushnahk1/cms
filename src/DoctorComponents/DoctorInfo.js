import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorCSS/DoctorInfo.css";
import AppServices from "../services/AppServices";
import axios from "axios";
import UserStorageService from "../services/UserStorageService";

const DoctorsInfo = () => {
  const [doctors, setDoctors] = useState([]);
  const [userRole, setUserRole] = useState(""); // State to store the user's role
  const navigate = useNavigate();

  // Fetch doctors from the database
  const fetchDoctors = async () => {
    try {
      const data = await AppServices.getAllDoctors(); // Fetch from the backend
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      alert("Failed to fetch doctors' information.");
    }
  };

  useEffect(() => {
    fetchDoctors();
    const role = UserStorageService.getUserRole(); // Get user role
    setUserRole(role); // Store the role
  }, []);

  const toggleDoctorStatus = async (id) => {
    const updatedDoctor = doctors.find((doctor) => doctor.id === id);

    if (updatedDoctor) {
      updatedDoctor.status =
        updatedDoctor.status === "ENABLED" ? "DISABLED" : "ENABLED";
    }

    try {
      const response = await axios.post(
        `http://localhost:8084/api/doctors`,
        updatedDoctor,
        {
          headers: {
            Authorization: `Bearer ${UserStorageService.getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDoctors(doctors.map((doctor) => (doctor.id === id ? updatedDoctor : doctor)));
    } catch (err) {
      console.error("Error updating doctor status:", err);
      alert("You do not have permission to change this doctor's status.");
    }
  };

  const viewEnabledDoctors = () => {
    const enabledDoctors = doctors.filter((doctor) => doctor.status === "ENABLED");
    navigate("/", { state: { enabledDoctors } });
  };

  return (
    <div className="d-flex flex-column justify-content-center px-3 px-lg-5 pt-5">
      <div className="text-center">
        <h1 className="display-4">Our Doctors</h1>
        <p className="mt-2">
          Manage the doctors' availability and explore detailed information about them.
        </p>
      </div>

      <div className="doctors-table mt-5">
        <h3 className="mb-3">Doctors Information</h3>
        <div className="doctor-info-table-div">
          <table className="table table-bordered table-hover doctor-info-table">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Working Days</th>
                <th>Working Hours</th>
                <th>Status</th>
                <th>Actions</th>
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
                        className={`btn ${
                          doctor.status === "ENABLED"
                            ? "btn-success"
                            : "btn-danger"
                        } btn-sm`}
                        onClick={() => toggleDoctorStatus(doctor.id)}
                        disabled={userRole !== "ADMIN"} // Disable button if the user is not an admin
                      >
                        {doctor.status === "ENABLED" ? "Disable" : "Enable"}
                      </button>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          disabled={userRole !== "ADMIN"} // Disable edit button if not an admin
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          disabled={userRole !== "ADMIN"} // Disable delete button if not an admin
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No doctors available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="btn btn-primary" onClick={viewEnabledDoctors}>
          View Enabled Doctors
        </button>
      </div>
    </div>
  );
};

export default DoctorsInfo;
