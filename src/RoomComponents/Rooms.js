import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css";

const Room = ({ bed, openModal, handleDischarge }) => {
  return (
    <div className="room-card-col">
      <div
        className={`card clinic-card ${
          bed.status === "Available" ? "bg-light" : "bg-danger text-white"
        }`}
      >
        <div className="card-body">
          <h5 className="card-title clinic-title">Bed {bed.id}</h5>
          <p className="card-text">Status: {bed.status}</p>
          {bed.status === "Occupied" && (
            <>
              <p className="card-text">Patient: {bed.patient}</p>
              <p className="card-text">Problem: {bed.problem}</p>
              <p className="card-text">Mobile Number: {bed.mobileNumber}</p>
              <p className="card-text">Occupied Time: {bed.occupiedTime}</p>
            </>
          )}
        </div>
        <div className="card-footer">
          {bed.status === "Available" ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => openModal(bed)}
            >
              Assign Patient
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleDischarge(bed.id)}
            >
              Discharge Patient
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ClinicRoomManagement = () => {
  const [beds, setBeds] = useState(
    Array.from({ length: 40 }, (_, index) => ({
      id: index + 1,
      status: "Available",
      patient: "",
      problem: "",
      mobileNumber: "",
      occupiedTime: null,
      dischargeTime: null,
    }))
  );

  const [modalData, setModalData] = useState({
    show: false,
    id: null,
    patientName: "",
    patientProblem: "",
    mobileNumber: "",
    occupiedTime: "",
  });

  const openModal = (bed) => {
    setModalData({
      show: true,
      id: bed.id,
      patientName: "",
      patientProblem: "",
      mobileNumber: "",
      occupiedTime: new Date().toLocaleString(), // Automatically assign the current time
    });
  };

  const closeModal = () => {
    setModalData({
      show: false,
      id: null,
      patientName: "",
      patientProblem: "",
      mobileNumber: "",
      occupiedTime: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { id, patientName, patientProblem, mobileNumber, occupiedTime } = modalData;

    if (patientName && patientProblem && mobileNumber) {
      try {
        // API call to save patient data in the database
        const response = await axios.post("http://localhost:8084/api/beds/assign", {
          id,
          patientName,
          patientProblem,
          mobileNumber,
          occupiedTime, // Send the occupiedTime automatically
        });

        // Update the UI after successful API call
        setBeds((prevBeds) =>
          prevBeds.map((bed) =>
            bed.id === id
              ? {
                  ...bed,
                  status: "Occupied",
                  patient: patientName,
                  problem: patientProblem,
                  mobileNumber,
                  occupiedTime: response.data.occupiedTime || new Date().toLocaleString(),
                }
              : bed
          )
        );
        alert("Patient assigned successfully!");
        closeModal();
      } catch (error) {
        console.error("Error assigning patient:", error);
        alert("Failed to assign patient. Please try again.");
      }
    } else {
      alert("All fields are required!");
    }
  };

  const handleDischarge = async (id) => {
    try {
      // API call to update the bed status to available in the database
      await axios.post("http://localhost:8084/api/beds/discharge", { id });

      // Update UI after successful discharge
      setBeds((prevBeds) =>
        prevBeds.map((bed) =>
          bed.id === id
            ? {
                ...bed,
                status: "Available",
                patient: "",
                problem: "",
                mobileNumber: "",
                dischargeTime: new Date().toLocaleString(),
              }
            : bed
        )
      );
      alert("Patient discharged successfully!");
    } catch (error) {
      console.error("Error discharging patient:", error);
      alert("Failed to discharge patient. Please try again.");
    }
  };

  return (
    <div className="py-5">
      <div className="px-3">
        <div className="rooms-card-list g-3">
          {beds.map((bed) => (
            <Room
              key={bed.id}
              bed={bed}
              openModal={openModal}
              handleDischarge={handleDischarge}
            />
          ))}
        </div>

        {modalData.show && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title">Assign Patient to Bed {modalData.id}</p>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="patientName" className="form-label">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="patientName"
                        name="patientName"
                        value={modalData.patientName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="patientProblem" className="form-label">
                        Problem
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="patientProblem"
                        name="patientProblem"
                        value={modalData.patientProblem}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobileNumber" className="form-label">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={modalData.mobileNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="occupiedTime" className="form-label">
                        Occupied Time
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="occupiedTime"
                        name="occupiedTime"
                        value={modalData.occupiedTime}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Assign Patient
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicRoomManagement;
