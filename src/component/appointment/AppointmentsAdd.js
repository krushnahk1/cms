import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../appointment/appoinmentsCSS/AppoinmentAdd.css'; // Custom styles

const AppointmentsAdd = () => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [mobileNumber, setMobileNumber] = useState(""); // State for mobile number
  const [doctor, setDoctor] = useState(""); // State for selected doctor
  const [doctorsList, setDoctorsList] = useState([]); // State for storing the list of doctors
  const navigate = useNavigate(); // Use useNavigate

  // Dummy doctor data
  const dummyDoctors = [
    { id: 1, name: "Dr. John Doe", specialties: "Cardiology" },
    { id: 2, name: "Dr. Jane Smith", specialties: "Dermatology" },
    { id: 3, name: "Dr. Mark Lee", specialties: "Neurology" },
    { id: 4, name: "Dr. Emily Davis", specialties: "Pediatrics" },
    { id: 5, name: "Dr. Robert Brown", specialties: "Orthopedics" },
  ];

  // Fetch the list of doctors (using dummy data in this case)
  useEffect(() => {
    setDoctorsList(dummyDoctors);
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  const saveAppointment = (e) => {
    e.preventDefault();
    const appointment = { title, dateTime, description, mobileNumber, doctor };

    // Call the AppServices.createAppointment() function to save the appointment
    // Simulate the AppServices.createAppointment() API call
    console.log("Appointment saved:", appointment);
    navigate("/DoctorDashboard");
  };

  return (
    <div>
      <h1 className="text-center mt-5">Add Appointments</h1>
      <div className="appointments-add-container">
          <div className="card-container">
            <div className="form-card-body">
              <form className="appointments-add-form" style={{gap:"20px"}}>
                <div className="form-group mb-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Date and Time Input */}
                <div className="mb-3">
                  <label htmlFor="dateTime" className="form-label">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="dateTime"
                    name="dateTime"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                  />
                </div>

                {/* Description Input */}
                <div className="form-group mb-3">
                  <label className="form-label">Description:</label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Mobile Number Input */}
                <div className="form-group mb-3">
                  <label className="form-label">Mobile Number:</label>
                  <input
                    type="text"
                    placeholder="Enter mobile number"
                    name="mobileNumber"
                    className="form-control"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>

                {/* Doctor Selection Dropdown */}
                <div className="form-group mb-3">
                  <label className="form-label">Select Doctor:</label>
                  <select
                    className="form-control"
                    name="doctor"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    required
                  >
                    <option value="">Select a doctor</option>
                    {doctorsList.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} ({doc.specialties})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-success"
                    onClick={(e) => saveAppointment(e)}
                  >
                    Submit
                  </button>
                  <Link to="/DoctorDashboard" className="btn btn-danger">
                    Cancel
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => saveAppointment(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AppointmentsAdd;
