import React, { useState } from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import SideNavContent from './SideNavContent';
import DashboardOverview from './DashboardOverview';
import AddPatient from './AddPatient';
// import CreateAppointment from '../DoctorComponents/CreateAppointment';
import AddEnquiry from './AddEnquiries';
import AllPatients from './AllPatients';
import Room from '../RoomComponents/Rooms';
import AppointmentsAdd from '../component/appointment/AppointmentsAdd';
import AppointmentViewById from '../component/appointment/AppointmentViewById';
import Appointment from '../component/appointment/Appointment';
import AppointmentUpdate from '../component/appointment/AppointmentUpdate';
import UserStorageService from '../services/UserStorageService';
import "../DoctorCSS/DoctorView.css";

function DoctorView() {
    const [sideNavStatus, setSideNavStatus] = useState(true);


    const subpatient = [
        { number: '1', name: 'Add patient', icon: 'fas fa-user-plus', url: '/DoctorDashboard/add-patient', isSubitem:false, },
        { number: '2', name: 'view patient', icon: 'fas fa-user', url: '/DoctorDashboard/AllPatient' },
    ]
    const subappointment = [
        { number: '4', name: 'Create Appointment', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/create-appointment' },
        { number: '5', name: 'All-Appointment', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/list-appointment' },
    ]

    const [menuItems, setMenuItems] = useState([

        { number: '1', name: 'dashboard', icon: 'fas fa-home', url: '/DoctorDashboard', isSubitem: false },
        { number: '2', name: 'patient', icon: 'fas fa-user-plus', url: '/DoctorDashboard/add-patient', isSubitem: true, subitem: subpatient, isExpanded: false },
        { number: '4', name: 'Appointment', icon: 'fas fa-calendar-check', url: '/DoctorDashboard/create-appointment', isSubitem: true, subitem: subappointment, isExpanded: false },
        { number: '6', name: 'view Enquiries', icon: 'fas fa-question-circle', url: '/DoctorDashboard/AddEnquiry', isSubitem: false },
        { number: '7', name: 'room', icon: 'fa-solid fa-hospital', url: '/DoctorDashboard/room', isSubitem: false },
    
    ]);
    
    const toggleSubmenu = (number) => {
        setMenuItems((prevItems) =>
            prevItems.map((item) =>
                item.number === number ? { ...item, isExpanded: !item.isExpanded } : item
            )
        );
    };
    
    const changeSideNavStatus = () => {
        setSideNavStatus(!sideNavStatus);
        console.log(sideNavStatus);
    };
    // if(UserStorageService.getToken()==null || UserStorageService.getUser()==null) {
    //     return(
    //         <>
    //             <div className='unilligible' style={{alignItems:'center', marginTop:'300px'}}>
    //                 <h1>Page 404 error</h1>
    //             </div>
    //         </>
    //     );
    // }
    // console.log(UserStorageService.getToken());
    return (
        <>
            <Navbar changeSideNavStatus={changeSideNavStatus} />
            <div className="main-view">
                    <div className={`side-navbar`}>
                        <SideNavContent list={menuItems} sideNavStatus={sideNavStatus} toggleSubmenu={toggleSubmenu} />
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

export default DoctorView;
