import React, { useEffect, useState } from "react";
import AppServices from "../../services/AppServices";
import { Link, useNavigate } from "react-router-dom";
import './appoinmentsCSS/Appointment.css';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchAppointments = () => {
    AppServices.getAllAppointments()
      .then((response) => {
        setAppointments(response);
      })
      .catch((error) => {
        console.error("There was an error fetching the appointments!", error);
      });
  };

  const deleteAppointment = (appointmentId) => {
    AppServices.deleteAppointment(appointmentId)
      .then(() => {
        fetchAppointments();
      })
      .catch((error) => {
        console.log("Error deleting appointment:", error);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Appointments List</h1>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">DateTime</th>
                  <th scope="col">Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <th scope="row">{appointment.id}</th>
                    <td>{appointment.title}</td>
                    <td>{appointment.dateTime}</td>
                    <td>{appointment.description}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteAppointment(appointment.id)}
                        >
                          Delete
                        </button>
                        <Link
                          className="btn btn-primary"
                          to={`/edit-appointment/${appointment.id}`}
                        >
                          Update
                        </Link>
                        <Link
                          className="btn btn-secondary"
                          to={`/view-appointment/${appointment.id}`}
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
