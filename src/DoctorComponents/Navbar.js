import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ changeSideNavStatus }) {
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark px-2">
                <div className="container-fluid">
                    <div className="side-nav-button p-2 me-3 text-light d-lg-none">
                        <FontAwesomeIcon icon={faBars} onClick={() => { changeSideNavStatus(); console.log('hi'); }} />
                    </div>

                    <div className="nav-name-routes">
                        <Link to="#" className="navbar-brand px-4">
                            DOCTOR ADMIN DASHBOARD
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
