import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import "../DoctorCSS/AddPatient.css"; // Custom CSS
import axios from 'axios'; // For API requests

function AddPatientdiseage() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [disease, setDisease] = useState('');
  const [payment, setPayment] = useState('');
  const [dateTime, setDateTime] = useState('');

  // New state for managing alert messages
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  // State to manage form validity
  const [formValid, setFormValid] = useState(false);

  // Validation functions
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name); // Only alphabets
  const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile); // 10-digit number
  const validateDisease = (disease) => /^[a-zA-Z\s]+$/.test(disease); // Only alphabets
  const validatePayment = (payment) => /^[0-9]+$/.test(payment); // Only numbers
  const validateDateTime = (dateTime) => !isNaN(Date.parse(dateTime)); // Valid date-time

  // Function to show alert with an error message
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);

    // Hide alert after 2 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct patient object
    const patientData = {
      name,
      mobile,
      disease,
      payment: Number(payment),
      dateTime: new Date(dateTime).toISOString(), // Ensure correct date format
    };

    // Send data to the backend
    try {
      const response = await axios.post('http://localhost:8084/api/patientdisease', patientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Patient added:', response.data);
      // You can add redirection or show a success message here
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  // useEffect to check form validity on any change
  useEffect(() => {
    const isValid =
      validateName(name) &&
      validateMobile(mobile) &&
      validateDisease(disease) &&
      validatePayment(payment) &&
      validateDateTime(dateTime);

    setFormValid(isValid);
  }, [name, mobile, disease, payment, dateTime]);

  return (
    <div className="add-patient-container pt-4">
      <form className="add-patient-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Add Patient disease</h1>

        {/* Display Alert Message */}
        {alertVisible && (
          <div className="alert alert-danger text-center" role="alert">
            {alertMessage}
          </div>
        )}

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter patient name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                if (!validateName(name)) {
                  showAlert('Enter a valid name (only alphabets).');
                }
              }}
            />
          </div>
          <div className="col-md-6">
            <label>Mobile:</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter mobile number"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              onBlur={() => {
                if (!validateMobile(mobile)) {
                  showAlert('Enter a valid mobile number (10 digits).');
                }
              }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Disease:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter disease"
              required
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              onBlur={() => {
                if (!validateDisease(disease)) {
                  showAlert('Enter a valid disease (only alphabets).');
                }
              }}
            />
          </div>
          <div className="col-md-6">
            <label>Payment:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter payment amount"
              required
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              onBlur={() => {
                if (!validatePayment(payment)) {
                  showAlert('Enter a valid payment amount (only numbers).');
                }
              }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label>Date and Time:</label>
            <input
              type="datetime-local"
              className="form-control"
              required
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              onBlur={() => {
                if (!validateDateTime(dateTime)) {
                  showAlert('Enter a valid date and time.');
                }
              }}
            />
          </div>
        </div>

        {/* Submit button disabled if form is invalid */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!formValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPatientdiseage;
