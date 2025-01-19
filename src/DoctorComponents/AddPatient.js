import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported

function AddPatient() {
  // State to manage marital status and number of children visibility
  const [isMarried, setIsMarried] = useState(false);
  const [numChildren, setNumChildren] = useState('');

  const handleMaritalStatusChange = (event) => {
    setIsMarried(event.target.value === 'married');
    setNumChildren(''); // Reset number of children if marital status changes
  };

  return (
    
    <div className="container pt-4">
      
      <form className="add-patient-form">
      <h1 className="text-center">Add Patient</h1>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Name:</label>
            <input type="text" className="form-control" placeholder="Enter patient name" required />
          </div>
          <div className="col-md-6">
            <label>Age:</label>
            <input type="number" className="form-control" placeholder="Enter patient age" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Contact:</label>
            <input type="tel" className="form-control" placeholder="Enter contact number" required />
          </div>
          <div className="col-md-6">
            <label>Gender:</label>
            <select className="form-control" required>
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
            <input type="text" className="form-control" placeholder="Enter father name" />
          </div>
          <div className="col-md-6">
            <label>Mother Name:</label>
            <input type="text" className="form-control" placeholder="Enter mother name" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Marital Status:</label>
            <select className="form-control" onChange={handleMaritalStatusChange}>
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
              <input type="text" className="form-control" placeholder="Enter wife's name" />
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
