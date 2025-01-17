import React, { useState } from 'react';
import '../CSS/Header.css';
import { Link } from 'react-router-dom';
import Maulilogo from '../assets/Images/mauli_logo.webp';
import { useNavigate } from 'react-router-dom';


const Header = ({ scollTODoctor, scrollToWhyChoose, scollTOPackage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = (status) => {
    setIsDropdownOpen(status);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu button clicked, isMenuOpen:', isMenuOpen);
  };

 const [isMainMenuOpen, setisMainMenuOpen]=useState(false);
 const toggleMainMenu = () => {
  setIsMenuOpen(false);
  setisMainMenuOpen(!isMainMenuOpen);
  console.log('Menu button clicked, isMainMenuOpen:', isMainMenuOpen);
};

const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-right">
          <div className="emergency-contact">
            <div className="topheaderspace"></div>
            <span>For Emergency Ambulance/Appointment</span>
            <a href="tel:+918888822222">+91 88888 22222</a>
            <a href="tel:+918888822222">+91 99999 55555</a>
            <a href="tel:+918888822222">+91 91999 22222</a>
          </div>
          <button className="appointment">Appointment</button>
        </div>
      </div>

      <div className="header-main">
        <div className="logo">
          <a src="#"><img src={Maulilogo} alt="Mauli Hospital" /></a>
        </div>

        <nav className="main-nav">
          <ul>
           <Link to="/"><div>Mauli Hospital</div></Link> 
            <div className="headerspace"></div>
            
              <li onClick={scrollToWhyChoose}><a href="#">Hospital</a></li>
              <li
                className="nav-item dropdown"
                onMouseEnter={() => toggleDropdown(true)}
                onMouseLeave={() => toggleDropdown(false)}
              >
                <Link to="#" className="dropdown-toggle">Specialities</Link>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-column">
                      <ul>
                        <li><a href="#">Anaesthesiology</a></li>
                        <li><a href="#">Critical Care</a></li>
                        <li><a href="#">ENT</a></li>
                        <li><a href="#">Hand Reconstruction Surgery</a></li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li><a href="#" onClick={scollTOPackage}>Health Packages</a></li>
              <li><a href="#">International Patients</a></li>
              <li><a href="#">Find A Doctor</a></li>
            
          </ul>
        </nav>

        <div className="header-buttons">
          <Link to="/Lab/BookHomeVisit"></Link>
        </div>
        <button className="menu btn btn-primary" onClick={toggleMenu}>
  ☰ Login
  {isMenuOpen && (
  <div className="menu-dropdown dropdown-menu show">
    <ul className="list-unstyled">
   < li><Link to="/DoctorLoginForm" className="dropdown-item" >Doctor</Link></li>
    
        <li><Link to="/NurseLoginForm" className="dropdown-item">Nurse</Link></li>
        <li><Link to="#" className="dropdown-item">Patient</Link></li>
    </ul>
  </div>
)}
</button>

<div className='mmi-container'>
<div className="mobile-menu-icon" onClick={toggleMainMenu}>
  <span></span>
  <span></span>
  <span></span>
</div>
{isMainMenuOpen && (
  <div className="mobile-menu">
    <nav className="mobile-nav">
      <ul>
        <li onClick={scollTODoctor}><a href="#">Hospital</a></li>
        <li
          className="nav-item dropdown"
          onClick={() => toggleDropdown(!isDropdownOpen)}
        >
          <a href="#" className="dropdown-toggle">Specialities</a>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-column">
                <ul>
                  <li><a href="#">Anaesthesiology</a></li>
                  <li><a href="#">Critical Care</a></li>
                  <li><a href="#">ENT</a></li>
                  <li><a href="#">Hand Reconstruction Surgery</a></li>
                </ul>
              </div>
            </div>
          )}
        </li>
        <li><a href="#">Health Packages</a></li>
        <li><a href="#international-patients">International Patients</a></li>
        <li><a href="#">Find A Doctor</a></li>
        <li className="LoginMenuDrop">
          <button className="Loginmenu btn btn-primary" onClick={toggleMenu}>
            ☰ Login
          </button>
          {isMenuOpen && (
            <div className="menu-dropdown dropdown-menu show" onClick={toggleMainMenu}>
              <ul className="list-unstyled">
                <li><Link to="/DoctorLoginForm" className="dropdown-item">Doctor</Link></li>
                <li><Link to="/NurseLoginForm" className="dropdown-item">Nurse</Link></li>
                <li><Link to="#" className="dropdown-item">Patient</Link></li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  </div>
)}
</div>
      </div>
    </header>
  );
};

export default Header;
