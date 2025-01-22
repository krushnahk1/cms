import React, { useState } from 'react';
import Navbar from './Navbar';
import { Route, Routes, Link } from 'react-router-dom';
import "../DoctorCSS/Receptionist_view.css";
import SideNavContent from '../DoctorComponents/SideNavContent';
import DashboardOverview from '../DoctorComponents/DashboardOverview';
import AddPatient from '../DoctorComponents/AddPatient';
import AddEnquiry from '../DoctorComponents/AddEnquiries';
import AllPatients from '../DoctorComponents/AllPatients';
import Room from '../RoomComponents/Rooms';
import AppointmentsAdd from '../component/appointment/AppointmentsAdd';
import AppointmentViewById from '../component/appointment/AppointmentViewById';
import Appointment from '../component/appointment/Appointment';
import AppointmentUpdate from '../component/appointment/AppointmentUpdate';
import UserStorageService from '../services/UserStorageService';

function ReceptionistView() {
    const [sideNavStatus, setSideNavStatus] = useState(true);
    const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);

    const list1 = [
        { number: '1', name: 'dashboard', icon: 'fas fa-home', url: '/DoctorDashboard' },
        { number: '2', name: 'patient', icon: 'fas fa-user-plus', url: '', dropdown: true },
    ];

    const changeSideNavStatus = () => {
        setSideNavStatus(!sideNavStatus);
    };

    const togglePatientDropdown = () => {
        setIsPatientDropdownOpen(!isPatientDropdownOpen);
    };

    if (UserStorageService.getToken() == null || UserStorageService.getUser() == null) {
        return (
            <>
                <div className='unilligible' style={{ alignItems: 'center', marginTop: '300px' }}>
                    <h1>Page 404 error</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar changeSideNavStatus={changeSideNavStatus} />
            <div className="main-view">
                <div className={`side-navbar ${sideNavStatus ? 'd-block' : 'd-none d-md-block'}`}>
                    {/* Sidebar Image */}
                    <div className="sidebar-img">
                        <img src="/path/to/your/image.jpg" alt="Sidebar Top" className="img-fluid" />
                    </div>
                    <SideNavContent list={list1} sideNavStatus={sideNavStatus} />
                    {/* Patient Dropdown */}
                    {isPatientDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li><Link to="/patient/1">Patient 1</Link></li>
                            <li><Link to="/patient/2">Patient 2</Link></li>
                            <li><Link to="/patient/3">Patient 3</Link></li>
                        </ul>
                    )}
                </div>
                <div className="main-content">
                    <div className="main-content-routes">
                        <Routes>
                            <Route path="/" element={<DashboardOverview />} />
                            <Route path="/DashboardOverview" element={<DashboardOverview />} />
                            <Route path="/AllPatient" element={<AllPatients />} />
                            <Route path="/add-patient" element={<AddPatient />} />
                            <Route path="/create-appointment" element={<AppointmentsAdd />} />
                            <Route path="/list-appointment" element={<Appointment />} />
                            <Route path="/view-appointment/:id" element={<AppointmentViewById />} />
                            <Route path="/edit-appointment/:id" element={<AppointmentUpdate />} />
                            <Route path="/AddEnquiry" element={<AddEnquiry />} />
                            <Route path="/Room" element={<Room />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReceptionistView;
