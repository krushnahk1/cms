import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './room.css';  // Import the custom CSS for media queries

const ClinicRoomManagement = () => {
  // Initial state for beds (40 beds with default statuses)
  const [beds, setBeds] = useState(
    Array.from({ length: 40 }, (_, index) => ({
      id: index + 1,
      status: "Available",
      patient: "",
      address: "",
      problem: "",
      occupiedTime: null,
      dischargeTime: null,
    }))
  );
  const [filterOccupied, setFilterOccupied] = useState(false); // State for checkbox
  const [isSorted, setIsSorted] = useState(false); // State for sorting beds
  const [modalData, setModalData] = useState({
    show: false,
    bedId: null,
    patientName: "",
    patientAddress: "",
    patientProblem: "",
  });

  // Function to update bed status, patient name, address, problem, occupied and discharge time
  const updateBed = (id, status, patient, address, problem) => {
    setBeds((prevBeds) =>
      prevBeds.map((bed) =>
        bed.id === id
          ? {
              ...bed,
              status,
              patient,
              address,
              problem,
              occupiedTime: status === "Occupied" ? new Date().toLocaleString() : bed.occupiedTime,
              dischargeTime: status === "Available" ? new Date().toLocaleString() : bed.dischargeTime,
            }
          : bed
      )
    );
    closeModal();
  };

  // Toggle the checkbox to filter by Occupied status
  const toggleOccupiedFilter = () => {
    setFilterOccupied(!filterOccupied);
  };

  // Sort beds by their status (Available first, then Occupied)
  const sortBeds = () => {
    setIsSorted(!isSorted);
  };

  const filteredBeds = filterOccupied
    ? beds.filter((bed) => bed.status === "Occupied")
    : beds;

  const sortedBeds = isSorted
    ? [...filteredBeds].sort((a, b) => (a.status === "Available" ? -1 : 1))
    : filteredBeds;

  const openModal = (bedId) => {
    setModalData({ show: true, bedId, patientName: "", patientAddress: "", patientProblem: "" });
  };

  const closeModal = () => {
    setModalData({ show: false, bedId: null, patientName: "", patientAddress: "", patientProblem: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { bedId, patientName, patientAddress, patientProblem } = modalData;
    if (patientName && patientAddress && patientProblem) {
      updateBed(bedId, "Occupied", patientName, patientAddress, patientProblem);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="filterOccupied"
              checked={filterOccupied}
              onChange={toggleOccupiedFilter}
            />
            <label className="form-check-label" htmlFor="filterOccupied">
              Show Only Occupied Beds
            </label>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={sortBeds}
          >
            {isSorted ? "Sort by Status (Unsorted)" : "Sort by Status"}
          </button>
        </div>
      </div>

      {/* Bed Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {sortedBeds.map((bed) => (
          <div key={bed.id} className="col d-flex justify-content-center">
            <div
              className={`card p-3 shadow-sm clinic-card ${bed.status === 'Available' ? 'bg-light' : 'bg-danger text-white'}`}
            >
              <h5 className="card-title clinic-title">Bed {bed.id}</h5>
              <p className="card-text">Status: {bed.status}</p>
              {bed.status === "Occupied" && (
                <>
                  <p className="card-text">Patient: {bed.patient}</p>
                  <p className="card-text">Address: {bed.address}</p>
                  <p className="card-text">Problem: {bed.problem}</p>
                  <p className="card-text">Occupied Time: {bed.occupiedTime}</p>
                </>
              )}
              {bed.status === "Available" && bed.dischargeTime && (
                <p className="card-text">Discharge Time: {bed.dischargeTime}</p>
              )}
              <div className="d-flex justify-content-between">
                {bed.status === "Available" ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openModal(bed.id)}
                  >
                    Assign Patient
                  </button>
                ) : (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateBed(bed.id, "Available", "", "", "")}
                  >
                    Discharge Patient
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Assigning Patient */}
      {modalData.show && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Patient to Bed {modalData.bedId}</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="patientName" className="form-label">Patient Name</label>
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
                    <label htmlFor="patientAddress" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientAddress"
                      name="patientAddress"
                      value={modalData.patientAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="patientProblem" className="form-label">Problem</label>
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
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicRoomManagement;
