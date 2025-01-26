import React, { useState, useEffect } from "react";
import "../DoctorCSS/DoctorInfo.css";
import AppServices from "../services/AppServices";
import DoctorsCardView from "./DoctorCardView";
import DoctorsListView from "./DoctorsListView";

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

  // Toggle doctor's status and update in the database
  const toggleDoctorStatus = async (id) => {
    try {
      // Update the status in the database
      await AppServices.updateDoctorStatus(id);
      // Re-fetch doctors to sync with the database
      fetchDoctors();
    } catch (error) {
      console.error("Error toggling doctor status:", error);
      alert("Failed to update doctor's status.");
    }
  };

  // Delete doctor and remove from the database
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
  const enabledDoctors = doctors.filter(doctor => doctor.isEnabled);  // Only show enabled doctors in Card View

  return (
    <div className="d-flex flex-column justify-content-center px-3 px-lg-5 pt-5">
      <div className="text-center">
        <h1 className="display-4">Our Doctors</h1>
        <p className="mt-2">
          Manage the doctors' availability and explore detailed information about them.
        </p>
        <div className="btn-group mt-3">
          <button
            className={`btn ${viewMode === "card" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setViewMode("card")}
          >
            Card View
          </button>
          <button
            className={`btn ${viewMode === "list" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
        </div>
      </div>

      {/* Check if doctors array is empty */}
      {doctors.length === 0 ? (
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
      )}
    </div>
  );
};

export default DoctorsInfo;
