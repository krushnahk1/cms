import React, { useRef } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Header from './component/Header';
import Hero from './component/Hero';
import HealthPackage from './component/HealthPackage';
// import Location from './component/Location'
import Footer from './component/Footer'
import WhyChoose from './component/WhyChoose';
import PatientExperience from './component/PatientExperience'
import DoctorLoginForm from './component/DoctorLoginForm'
import Login from './component/DoctorLoginForm';
import Doctordashboard from '../src/DoctorComponents/Receptionist_view';
import NurseLoginForm from '../src/component/NurseLoginForm'
import NurseDashboard from '../src/component/Nursedashboard'
// import DoctorsInfo from './component/DoctorsInfo'
// import DashboardOverview from '../src/DoctorComponents/DashboardOverview';
import AddPatient from '../src/DoctorComponents/AddPatient';
import CreateAppointment from '../src/DoctorComponents/CreateAppointment';
import AddEnquiries from '../src/DoctorComponents/AddEnquiries';
import AllPatient from '../src/DoctorComponents/AllPatients';



function App() {
  const LocationRef = useRef(null);
  const PackageRef = useRef(null);

  const scollTODoctor=()=>{
    if (LocationRef.current){
      LocationRef.current.scrollIntoView({behavior:'smooth'});
    }  
  }
  const scollTOPackage=()=>{
    if (PackageRef.current){
      PackageRef.current.scrollIntoView({behavior:'smooth'});
    }  
  }

  return (
    <div className="App">
      <>
      <Router>
      <Header scollTODoctor={scollTODoctor}/>
        <Routes>
          <Route path="/" element={
            <>
            
            <div>
              <Hero />
             
              </div>
              
              <div ref={PackageRef}>
              <HealthPackage  />
              </div>
              <PatientExperience />
              <WhyChoose/>
              <Footer/>

              
            </>
          
        } />
          <Route path="/DoctorLoginForm" element={<DoctorLoginForm />} /> 
          <Route path="/DoctorDashboard/*" element={<Doctordashboard/>} /> 
          <Route path="/NurseLoginForm" element={<NurseLoginForm />} />
          <Route path="/NurseDashboard" element={<NurseDashboard/>} />
          <Route path="/AllPatient" element={<AllPatient/>} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/create-appointment" element={<CreateAppointment />} />
          <Route path="/add-enquiries" element={<AddEnquiries />} />     
        </Routes>
      </Router>
      
    <Router>
      <Routes>
        <Route path="/Adminlogin" element={<Login />} />
          
        <Route path="/doctor" element={<Navigate to="/doctorlogin" />} /> {/* Redirect unknown routes */}
        
      </Routes>
    </Router>
    </>
    </div>
   
  );
}

export default App;
