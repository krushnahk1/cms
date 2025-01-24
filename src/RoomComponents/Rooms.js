import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './room.css';  // Import the custom CSS for media queries

const ClinicRoomManagement = () => {
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
  const [confirmDischarge, setConfirmDischarge] = useState({
    show: false,
    bedId: null,
  });

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

  const toggleOccupiedFilter = () => {
    setFilterOccupied(!filterOccupied);
  };

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

  const handleDischarge = (bedId) => {
    setConfirmDischarge({ show: true, bedId });
  };

  const confirmDischargeYes = () => {
    updateBed(confirmDischarge.bedId, "Available", "", "", "");
    setConfirmDischarge({ show: false, bedId: null });
  };

  const confirmDischargeNo = () => {
    setConfirmDischarge({ show: false, bedId: null });
  };

  return (
    <div className="py-5 px-2">
      {/* Checkbox at the top */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="filterOccupied"
            checked={filterOccupied}
            onChange={toggleOccupiedFilter}
          />
          <label className="form-check-label">
            Show Only Occupied Beds
          </label>
        </div>
      </div>

      <div className="container">
        {/* Bed Cards */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {sortedBeds.map((bed) => (
            <div key={bed.id} className="col d-flex justify-content-center">
              <div
                className={`card clinic-card ${bed.status === 'Available' ? 'bg-light' : 'bg-danger text-white'}`}
              >
                <div className="card-body">
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
                </div>
                <div className="card-footer">
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
                      onClick={() => handleDischarge(bed.id)}
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

        {/* Confirmation Modal for Discharge */}
        {confirmDischarge.show && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Discharge</h5>
                  <button type="button" className="btn-close" onClick={confirmDischargeNo} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to discharge the patient from Bed {confirmDischarge.bedId}?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={confirmDischargeNo}>No</button>
                  <button type="button" className="btn btn-danger" onClick={confirmDischargeYes}>Yes</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicRoomManagement;
