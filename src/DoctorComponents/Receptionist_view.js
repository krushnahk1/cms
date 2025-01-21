import React, { useState } from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import "../DoctorCSS/Receptionist_view.css";
import SideNavContent from '../DoctorComponents/SideNavContent';
import DashboardOverview from '../DoctorComponents/DashboardOverview';
import AddPatient from '../DoctorComponents/AddPatient';
// import CreateAppointment from '../DoctorComponents/CreateAppointment';
import AddEnquiry from '../DoctorComponents/AddEnquiries';
import AllPatients from '../DoctorComponents/AllPatients';
import Room from '../RoomComponents/Rooms';
import AppointmentsAdd from '../component/appointment/AppointmentsAdd';
import AppointmentViewById from '../component/appointment/AppointmentViewById';
import Appointment from '../component/appointment/Appointment';
import AppointmentUpdate from '../component/appointment/AppointmentUpdate';
import UserStorageService from '../services/UserStorageService';

function ReceptionistView() {
    const [sideNavStatus, setSideNavStatus] = useState(true );

    const list1 = [
        { number: '1', name: 'Log out', icon: 'fas fa-home', url: '/' },
        { number: '6', name: 'Add patient', icon: 'fas fa-user-plus', url: '/DoctorDashboard/add-patient' },
        { number: '2', name: 'view patient', icon: 'fas fa-user', url: '/DoctorDashboard/AllPatient' },
        { number: '3', name: 'Create Appointment', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/create-appointment' },
        { number: '3', name: 'All-Appointment', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/list-appointment' },
        { number: '5', name: 'view Enquiries', icon: 'fas fa-question-circle', url: '/DoctorDashboard/AddEnquiry' },
        { number: '6', name: 'room', icon: 'fa-solid fa-hospital', url: '/DoctorDashboard/room' },
    ];

    const changeSideNavStatus = () => {
        setSideNavStatus(!sideNavStatus);
        console.log(sideNavStatus);
    };
    if(UserStorageService.getToken()==null || UserStorageService.getUser()==null) {
        return(
            <>
                <div className='unilligible' style={{alignItems:'center', marginTop:'300px'}}>
                    <h1>Page 404 error</h1>
                </div>
            </>
        );
    }
    console.log(UserStorageService.getToken());
    return (
        <>
            <Navbar changeSideNavStatus={changeSideNavStatus} />
            <div className="main-view">
                    <div className={`side-navbar ${sideNavStatus ? 'd-block' : 'd-none d-md-block'}`}>
                        <SideNavContent list={list1} sideNavStatus={sideNavStatus} />
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
