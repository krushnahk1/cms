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
// import NurseDashboard from '../src/component/Nursedashboard'
// import DoctorsInfo from './component/DoctorsInfo'
// import DashboardOverview from '../src/DoctorComponents/DashboardOverview';
import AddPatient from '../src/DoctorComponents/AddPatient';
import CreateAppointment from '../src/DoctorComponents/CreateAppointment';
import AddEnquiries from '../src/DoctorComponents/AddEnquiries';
import AllPatient from '../src/DoctorComponents/AllPatients';
import Nursedashboard from "../src/receptionist/components/Receptionist_view";
import PatientView from './patient/components/Patient_view';
import About from './component/abouts';

function App() {
  const LocationRef = useRef(null);
  const PackageRef = useRef(null);
  const whyChooseRef = useRef(null);

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
  const scrollToWhyChoose=()=>{
    if (whyChooseRef.current){
      whyChooseRef.current.scrollIntoView({behavior:'smooth'});
    }  
  }

  return (
    
    <div className="App">
      <>
      
      <Router>
        
        <Routes>
          <Route path="/" element={
            <>
             <Header scollTODoctor={scollTODoctor} scrollToWhyChoose={scrollToWhyChoose} scollTOPackage={scollTOPackage}/>
            <div>
              <Hero />
            
              </div>
              <About/>
              <div ref={PackageRef}>
              <HealthPackage  />
              </div>
              <PatientExperience />
              <div ref={whyChooseRef}>
                <WhyChoose />
              </div> 
              <Footer/>

              
            </>
          
        } />
          <Route path="/DoctorLoginForm" element={<DoctorLoginForm />} /> 
          <Route path="/DoctorDashboard/*" element={<Doctordashboard/>} /> 
          <Route path="/NurseLoginForm" element={<NurseLoginForm />} />
          <Route path="/Nursedashboard" element={<Nursedashboard/>} />
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
