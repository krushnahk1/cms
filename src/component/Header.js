import React, { useState } from 'react';
import '../CSS/Header.css';
import { Link, NavLink } from 'react-router-dom';
import Maulilogo from '../assets/Images/mauli_logo.webp';
import { useNavigate } from 'react-router-dom';


const Header = ({ scollTODoctor, scrollToWhyChoose, scollTOPackage, scrollToServices }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = (status) => {
    setIsDropdownOpen(status);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu button clicked, isMenuOpen:', isMenuOpen);
  };
  const [scrollLeft, setScrollLeft] = useState(0);

 const [isMainMenuOpen, setisMainMenuOpen]=useState(false);
 const toggleMainMenu = () => {
  setIsMenuOpen(false);
  setisMainMenuOpen(!isMainMenuOpen);
  console.log('Menu button clicked, isMainMenuOpen:', isMainMenuOpen);
};

const navigate = useNavigate();


  return (
    
    <header className="header">
      {/* <div className="header-top">
        <div className="header-top-right">
          <div className="emergency-contact">
            <div className="topheaderspace"></div>
            <span>For Emergency Ambulance/Appointment</span>
            <a href="tel:+918888822222">+91 88888 22222</a>
            <a href="tel:+918888822222">+91 99999 55555</a>
            <a href="tel:+918888822222">+91 91999 22222</a>
          </div> 
           <button className="appointment">Appointment</button>
          <NavLink className="nav-link active btn-danger" style={{ color: 'red' }} to={'/add-appointment'}>Appointment</NavLink>
          <NavLink className="nav-link active btn-danger" style={{ color: 'red' }} to={'/list-appointment'}>Appointment List</NavLink>

        </div>
      </div>  */}

      <div className="header-main px-4">
        <div className="logo">
          <a src="#"><img src={Maulilogo} alt="Mauli Hospital" /></a>
        </div>

        <nav className="main-nav">
          <ul className=''>
           <Link to="/"><div className='p-3 hospital-title'>Mauli Hospital</div></Link> 
            <div className="headerspace d-flex">
            <li onClick={scrollToWhyChoose}><a href="#">Home</a></li>
            <li onClick={scrollToWhyChoose}><a href="#">About</a></li>
            <li onClick={scrollToWhyChoose}><a href="#">Contact Us</a></li>

             
              <li onClick={scrollToServices}
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
              <li><a href="#">Doctors</a></li>
              {/* <li><a href="#">       
              </a></li> */}
              {/* <li><button className="appointment">Appointment</button>
              </li> */}
            </div>
          </ul>
        </nav>
        <button className='appointment btn btn-success p-1 m-2' >Appoiments</button>
        <button className="menu btn btn-primary p-1" onClick={toggleMenu}>
  ☰ Login
  {isMenuOpen && (
  <div className="menu-dropdown dropdown-menu show">
    <ul className="list-unstyled">
   < li><Link to="/DoctorLoginForm" className="dropdown-item" >Doctor</Link></li>
    
        <li><Link to="/NurseLoginForm" className="dropdown-item">Nurse</Link></li>
        
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
        <li><a href="#">Rooms</a></li>
        <li><a href="#">Doctors</a></li>
        <li className="LoginMenuDrop">
          <button className="Loginmenu btn btn-primary" onClick={toggleMenu}>
            ☰ Login
          </button>
          {isMenuOpen && (
            <div className="menu-dropdown dropdown-menu show" onClick={toggleMainMenu}>
              <ul className="list-unstyled">
                <li><Link to="/DoctorLoginForm" className="dropdown-item">Doctor</Link></li>
                <li><Link to="/NurseLoginForm" className="dropdown-item">Nurse</Link></li>
               
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
