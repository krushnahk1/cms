import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../DoctorCSS/Navbar.css";

function Navbar({ changeSideNavStatus }) {

    const [isExpandedUser, setIsExpandedUser] = useState(false);

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark px-2" style={{height:"60px"}}>
                <div className="nav-container">
                    <div className="side-nav-button p-2 me-3 text-light d-lg-none">
                        <FontAwesomeIcon icon={faBars} onClick={() => { changeSideNavStatus(); console.log('hi'); }} />
                    </div>

                    <div className="nav-name-routes">
                        <Link to="#" className="navbar-brand px-2">
                            DOCTOR ADMIN DASHBOARD
                        </Link>
                    </div>
                    <div className='user-icon'>
                      <a href='/'><button>logout</button></a>
                      {isExpandedUser && (
                        <div>
                        </div>
                      )} 
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
