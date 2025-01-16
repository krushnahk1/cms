import React, { useEffect, useState } from "react";
import AppServices from "../../services/AppServices";
import { Link } from "react-router-dom";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    AppServices.getAllAppointment()
      .then((response) => {
        setAppointments(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the appointments!", error);
      });
  };

  const deleteAppointment = (appointmentId) => {
    AppServices.deleteAppointments(appointmentId)
      .then((response) => {
        fetchAppointments();
      })
      .catch((error) => {
        console.log(error);
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
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteAppointment(appointment.id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Delete
                      </button>
                      <Link
                        className="btn btn-info"
                        to={`/edit-appointment/${appointment.id}`}
                      >
                        Update
                      </Link>
                      <Link
                        className="btn btn-info"
                        to={`/view-appointment/${appointment.id}`}
                      >
                        View
                      </Link>
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
