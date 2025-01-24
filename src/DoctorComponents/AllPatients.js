import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import '../DoctorCSS/AllPatients.css';

function AllPatients() {
  const [patients, setPatients] = useState([]); // State to hold patient data
  const [filteredPatients, setFilteredPatients] = useState([]); // State for filtered data
  const [loading, setLoading] = useState(true); // State to show loading while data is being fetched
  const [error, setError] = useState(null); // State to handle errors during fetch
  const [nameQuery, setNameQuery] = useState(''); // State for the name search query
  const [contactQuery, setContactQuery] = useState(''); // State for the contact search query

  // State to track the currently selected patient for editing
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    // Fetch patient data from the backend API when the component mounts
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8084/api/patients'); // Replace with your actual API endpoint
        setPatients(response.data); // Set the response data into the state
        setFilteredPatients(response.data); // Initialize filtered patients
        setLoading(false); // Stop loading
      } catch (err) {
        setError('Failed to fetch patients'); // Set error message
        setLoading(false); // Stop loading
      }
    };

    fetchPatients(); // Call the function to fetch data
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Filter patients based on name and contact queries
  useEffect(() => {
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
        patient.contact.toLowerCase().includes(contactQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [nameQuery, contactQuery, patients]);

  const handleDelete = async (patientId) => {
    try {
      // Make the delete request to backend API
      await axios.delete(`http://localhost:8084/api/patients/${patientId}`);
      // Remove the deleted patient from the state
      setPatients(patients.filter(patient => patient.id !== patientId));
      setFilteredPatients(filteredPatients.filter(patient => patient.id !== patientId));
    } catch (error) {
      console.error('Failed to delete patient:', error);
      alert('Failed to delete patient');
    }
  };

  const handleEdit = (patient) => {
    // Set the patient being edited
    setEditingPatient({ ...patient }); // Clone the patient to avoid direct mutation
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // Make the update request to backend API
      await axios.put(`http://localhost:8084/api/patients/${editingPatient.id}`, editingPatient);
      // Update the patient in the state
      setPatients(patients.map(patient => 
        patient.id === editingPatient.id ? editingPatient : patient
      ));
      setFilteredPatients(filteredPatients.map(patient => 
        patient.id === editingPatient.id ? editingPatient : patient
      ));
      setEditingPatient(null); // Clear the editing state
    } catch (error) {
      console.error('Failed to update patient:', error);
      alert('Failed to update patient');
    }
  };

  if (loading) {
    // return <div>Loading...</div>; // Show loading while fetching data
  }

  if (error) {
    // return <div>{error}</div>; // Show error message if there's any
  }

  return (
    <div className="all-patient-view">
      <div className="all-patients-container mt-4">
        <h1>All Patients</h1>

        {/* Search Boxes */}
        <div className="search-boxes mb-3 d-flex gap-2">
          <input
            type="text"
            placeholder="Search by Name"
            className="form-control"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Contact"
            className="form-control"
            value={contactQuery}
            onChange={(e) => setContactQuery(e.target.value)}
          />
        </div>

        <div className="patients-table p-2">
          <table border="2px" className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Married</th>
                <th>Children</th>
                <th>Family Info</th>
                <th>Actions</th> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {/* Map through the filteredPatients array and render data */}
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  {/* If editingPatient is the current patient, show the form */}
                  {editingPatient && editingPatient.id === patient.id ? (
                    <td colSpan="10">
                      <div className="edit-form">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={editingPatient.name}
                          onChange={handleChange}
                        />
                        <label>Age</label>
                        <input
                          type="number"
                          name="age"
                          value={editingPatient.age}
                          onChange={handleChange}
                        />
                        <label>Contact</label>
                        <input
                          type="text"
                          name="contact"
                          value={editingPatient.contact}
                          onChange={handleChange}
                        />
                        <label>Gender</label>
                        <input
                          type="text"
                          name="gender"
                          value={editingPatient.gender}
                          onChange={handleChange}
                        />
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editingPatient.email}
                          onChange={handleChange}
                        />
                        <label>Married</label>
                        <input
                          type="checkbox"
                          name="isMarried"
                          checked={editingPatient.isMarried}
                          onChange={(e) => 
                            setEditingPatient({ 
                              ...editingPatient, 
                              isMarried: e.target.checked 
                            })
                          }
                        />
                        <button className="btn btn-primary" onClick={handleUpdate}>
                          Update
                        </button>
                        <button className="btn btn-secondary" onClick={() => setEditingPatient(null)}>
                          Cancel
                        </button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.contact}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.email}</td>
                      <td>{patient.isMarried ? 'Yes' : 'No'}</td>
                      <td>{patient.children || 'N/A'}</td>
                      <td>
                        {patient.family && patient.family.wife ? (
                          <p>Wife: {patient.family.wife}</p>
                        ) : (
                          <p>No wife information available</p>
                        )}
                        {patient.family &&
                        patient.family.childrenNames &&
                        patient.family.childrenNames.length > 0 ? (
                          <p>Children: {patient.family.childrenNames.join(', ')}</p>
                        ) : (
                          <p>No children information available</p>
                        )}
                      </td>
                      <td>
                        {/* Edit Button */}
                        <button className="btn btn-warning" onClick={() => handleEdit(patient)}>
                          Edit
                        </button>
                        {/* Delete Button */}
                        <button className="btn btn-danger" onClick={() => handleDelete(patient.id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllPatients;
