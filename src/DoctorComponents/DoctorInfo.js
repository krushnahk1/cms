import React, { useState, useEffect } from "react";
import "../DoctorCSS/DoctorInfo.css";
import AppServices from "../services/AppServices";
import axios from "axios";
import UserStorageService from "../services/UserStorageService";
import { useNavigate } from "react-router-dom";

const DoctorsInfo = () => {
  const [doctors, setDoctors] = useState([]);
  const [viewMode, setViewMode] = useState("card"); // "card" or "list"

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
  }, []);

  const enabledDoctors = doctors.filter((doctor) => doctor.status=="ENABLED");

  const toggleDoctorStatus = async (id) => {
    const updatedDoctor = doctors.find((doctor) => doctor.id === id);

  if (updatedDoctor) {
    updatedDoctor.status = updatedDoctor.status === "ENABLED" ? "DISABLED" : "ENABLED";
  }
    
    console.log(updatedDoctor);
    try {
      const response = await axios.post(`http://localhost:8084/api/doctors`, updatedDoctor, {
        headers: {
          Authorization: `Bearer ${UserStorageService.getToken()}`,
          "Content-Type": "application/json",
        }
      });
      setDoctors(doctors.map((doctor)=>doctor.id === id ? updatedDoctor : doctor));
    } catch (err) {
      console.error("Error fetching all appointments:", err);
      throw err;
    }
    // const updatedDoctors = doctors.map((doctor) =>
    //   doctor.id === id ? { ...doctor, isEnabled: !doctor.isEnabled } : doctor
    // );
    // setDoctors(updatedDoctors);
  };

  const deleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await AppServices.deleteDoctor(id); // Replace with your API call to delete
        fetchDoctors(); // Re-fetch doctors to reflect the changes
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("Failed to delete doctor.");
      }
    }
  };

  // Filter doctors based on the viewMode

  return (
    <div className="d-flex flex-column justify-content-center px-3 px-lg-5 pt-5">
      {/* <div className="text-center">
        <h1 className="display-4">Our Doctors</h1>
        <p className="mt-2">
          Manage the doctors' availability and explore detailed information about them.
        </p>
      </div>

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
    </div> */}

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
                        doctor.status == "DISABLED" ? "btn-success" : "btn-danger"
                      } btn-sm`}
                      onClick={() => toggleDoctorStatus(doctor.id)}
                    >
                      {doctor.status == "ENABLED" ? "Disable" : "Enable"}
                    </button>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        // onClick={() => openEditModal(doctor)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteDoctor(doctor.id)}
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

      {/* Check if doctors array is empty */}
      {/* {doctors.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted">No doctors available.</p>
        </div>
      ) : viewMode === "card" ? (
        <DoctorsCardView
          doctors={enabledDoctors} // Only enabled doctors
          toggleDoctorStatus={toggleDoctorStatus}
        />
      ) : (
        <DoctorsListView
          doctors={doctors} // All doctors (for list view)
          toggleDoctorStatus={toggleDoctorStatus}
          deleteDoctor={deleteDoctor}
        />
      )} */}
    </div>
  );
};

export default DoctorsInfo;
