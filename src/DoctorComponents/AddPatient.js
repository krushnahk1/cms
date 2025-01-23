import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import "../DoctorCSS/AddPatient.css"
import axios from 'axios'; // Import axios

function AddPatient() {
  const [isMarried, setIsMarried] = useState(false);
  const [numChildren, setNumChildren] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [wifeName, setWifeName] = useState('');

  // Handle marital status change and reset number of children
  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
    setIsMarried(event.target.value === 'married');
    setNumChildren(''); // Reset number of children if marital status changes
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct patient object
    const patientData = {
      name,
      age,
      contact,
      gender,
      fatherName,
      motherName,
      maritalStatus,
      wifeName: maritalStatus === 'married' ? wifeName : null,
      numberOfChildren: maritalStatus === 'married' ? numChildren : null
    };

    // Send data to the backend
    try {
      const response = await axios.post('http://localhost:8084/api/patients', patientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Patient added:', response.data);
      // You can add redirection or show a success message after successful addition
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="add-patient-container pt-4">
      <form className="add-patient-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Add Patient</h1>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Name:</label>
            <input type="text" className="form-control" placeholder="Enter patient name" required
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label>Age:</label>
            <input type="number" className="form-control" placeholder="Enter patient age" required
              value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Contact:</label>
            <input type="tel" className="form-control" placeholder="Enter contact number" required
              value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label>Gender:</label>
            <select className="form-control" required
              value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Father Name:</label>
            <input type="text" className="form-control" placeholder="Enter father name" 
              value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label>Mother Name:</label>
            <input type="text" className="form-control" placeholder="Enter mother name" 
              value={motherName} onChange={(e) => setMotherName(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Marital Status:</label>
            <select className="form-control" onChange={handleMaritalStatusChange} required
              value={maritalStatus}>
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
        </div>

        {isMarried && (
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Wife's Name:</label>
              <input type="text" className="form-control" placeholder="Enter wife's name" 
                value={wifeName} onChange={(e) => setWifeName(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Number of Children:</label>
              <input
                type="number"
                className="form-control"
                value={numChildren}
                onChange={(e) => setNumChildren(e.target.value)}
                placeholder="Enter number of children"
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">Add Patient</button>
      </form>
    </div>
  );
}

export default AddPatient;
