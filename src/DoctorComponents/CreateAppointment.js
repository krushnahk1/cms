import React, { useState } from 'react';
import "../DoctorCSS/CreateAppointment.css";

function CreateAppointment() {
  const [isFirstAppointment, setIsFirstAppointment] = useState(false);

  const handleChange = (e) => {
    setIsFirstAppointment(e.target.value === "yes");
  };

  return (
    <div className="mt-4">
      <h1>Create Appointment</h1>
      <form className="appointment-form">
        <label>
          Patient Name:
          <input type="text" placeholder="Enter patient name" required />
        </label>
        <label>
          Appointment Date:
          <input type="date" required />
        </label>
        <label>
          Time:
          <input type="time" required />
        </label>
        <label>
          Description:
          <textarea placeholder="Enter appointment description" rows="4" />
        </label>
        <label>
          Is this your first appointment?
          <select onChange={handleChange} required>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        {isFirstAppointment && (
          <div className="first-appointment-info">
            <p>
              Since this is your first appointment, please bring all relevant
              medical history and documents.
            </p>
          </div>
        )}
        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
}

export default CreateAppointment;
