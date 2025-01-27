import React, { useState, useEffect } from 'react';
import '../CSS/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Maulilogo from '../assets/Images/mauli_logo.webp';
import AppServices from "../services/AppServices"; // Import AppServices

const Header = ({ scollTODoctor, scrollToWhyChoose, scollTOPackage, scrollToServices }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMainMenuOpen, setisMainMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dateTime: '',
    description: '',
    mobileNumber: '',
    doctor: ''
  });

  const [doctorsList, setDoctorsList] = useState([]);
  const navigate = useNavigate(); // Use navigate

  const toggleDropdown = (status) => setIsDropdownOpen(status);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMainMenu = () => setisMainMenuOpen(!isMainMenuOpen);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Dummy doctors list, you can replace it with an API call
  useEffect(() => {
    setDoctorsList([
      { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist' },
      { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatologist' },
      { id: 3, name: 'Dr. Mark Lee', specialty: 'Orthopedic' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AppServices.createAppointment(formData).then(() => {
      navigate('/'); // Redirect on successful appointment creation
      closeModal(); // Close the modal
    });
  };

  return (
    <header className="header">
      <div className="header-main px-4">
        <div className="logo">
          <a href="#"><img src={Maulilogo} alt="Mauli Hospital" /></a>
        </div>

        <nav className="main-nav">
          <ul className="">
            <Link to="/"><div className="p-3 hospital-title">Mauli Hospital</div></Link>
            <div className="headerspace d-flex">
              <li onClick={scrollToWhyChoose}><a href="#">Home</a></li>
              <li onClick={scrollToWhyChoose}><a href="#">About</a></li>
              <li onClick={scrollToWhyChoose}><a href="#">Contact Us</a></li>
              <li><a href="#" onClick={scollTOPackage}>Health Packages</a></li>
              <li><a href="#">Doctors</a></li>
            </div>
          </ul>
        </nav>

        <button className="appointment btn btn-success p-1 m-2" onClick={openModal}>
          Appointments
        </button>

        {/* Modal for Appointment Form */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-title">Add Appointment</h2>
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="title">Name</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter patient name"
                    required
                  />
                </div>

                {/* Date and Time */}
                <div className="form-group">
                  <label htmlFor="dateTime">Date and Time</label>
                  <input
                    type="datetime-local"
                    id="dateTime"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter reason for the appointment"
                    required
                  ></textarea>
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                {/* Doctor Dropdown */}
                <div className="form-group">
                  <label htmlFor="doctor">Select Doctor</label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Doctor --</option>
                    {doctorsList.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} ({doctor.specialty})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
