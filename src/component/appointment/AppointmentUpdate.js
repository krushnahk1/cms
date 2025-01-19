import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppServices from "../../services/AppServices";
import '../appointment/appoinmentsCSS/AppointmentUpdate.css' // Custom CSS for better control

const AppointmentUpdate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Use useNavigate

  const saveAppointment = (e) => {
    e.preventDefault();
    const appointment = { title, dateTime, description };

    AppServices.updateappointments(id, appointment).then((response) => {
      console.log(response.data);
      navigate("/list-appointment");
    });
  };

  useEffect(() => {
    AppServices.getAppointmentById(id)
      .then((response) => {
        setTitle(response.data.title);
        setDateTime(response.data.dateTime);
        setDescription(response.data.description);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <h1 className="text-center mt-5">Update Appointment</h1>

      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="card col-md-6 col-lg-4 col-12">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label className="form-label">Id:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={id}
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
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
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Description:</label>
                  <input
                    type="text"
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
                  <Link to="/list-appointment" className="btn btn-danger">
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

export default AppointmentUpdate;
