import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppServices from "../../services/AppServices";
import '../appointment/appoinmentsCSS/AppoinmentAdd.css'; // Create a separate CSS file for custom styles

const AppointmentsAdd = () => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Use useNavigate

  const saveAppointment = (e) => {
    e.preventDefault();
    const appointment = { title, dateTime, description };

    AppServices.createAppointment(appointment).then((response) => {
      // console.log(response.data);
      navigate("/list-appointment");
    });
  };

  return (
    <>
      <h1 className="text-center mt-5">Add Appointments</h1>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-body">
              <form>
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

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-success"
                    onClick={(e) => saveAppointment(e)}
                  >
                    Submit
                  </button>
                  <Link to="/" className="btn btn-danger">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentsAdd;
