import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppServices from "../../services/AppServices";
const AppointmentViewById = () => {
  const { id } = useParams();
  // console.log(id);

  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");

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
      <h1>Appoiments View</h1>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Id:</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    className="form-control"
                    value={id}
                    // onChange={(e) => setId(e.target.value)}
                    disabled
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    className="form-control"
                    value={title}
                    disabled
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
                    disabled
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Description:</label>
                  <input
                    type="text"
                    placeholder="Enter department"
                    name="dept"
                    className="form-control"
                    value={description}
                    disabled
                  />
                </div>

                <Link to="/list-appointment" className="btn btn-danger">
                  Back to List
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentViewById;
