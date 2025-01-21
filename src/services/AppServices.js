import axios from "axios";
import UserStorageService from "./UserStorageService";

const BASE_REST_API_URL = "http://localhost:8084/api/";
class AppServices {
  getAllAppointment() {
    return axios.get(BASE_REST_API_URL + "appointments", {
      headers: {
        Authorization: `Bearer ${UserStorageService.getToken()}`,
        "Content-Type": "application/json"
      }
    });
  }
  createAppointment(appointment) {
    const config = {
      headers: {
        Authorization: `Bearer ${UserStorageService.getToken()}`,
        "Content-Type": "application/json"
      }
    };
    console.log("Request config:", config);  
    return axios.post(BASE_REST_API_URL + "appointments", config).catch(err=>{console.log("error")});
    
  }

  // http://localhost:8084/api/appointments/1

  deleteAppointments(appointmentId) {
    const config = {
      headers: {
        Authorization: `Bearer ${UserStorageService.getToken()}`,
        "Content-Type": "application/json"
      }
    };
    console.log("Request config:", config);  
    return axios.delete(BASE_REST_API_URL + "appointments/" + appointmentId, config).catch(err=>{console.log("error")});
  }

  updateappointments(appointmentId, appointment) {
    const config = {
      headers: {
        Authorization: `Bearer ${UserStorageService.getToken()}`,
        "Content-Type": "application/json"
      }
    };
    console.log("Request config:", config);  
    return axios.put(
      BASE_REST_API_URL + "appointments/" + appointmentId, appointment, config).catch(err=>{console.log("error")});
  }

  getAppointmentById(appointmentId) {
    const config = {
      headers: {
        Authorization: `Bearer ${UserStorageService.getToken()}`,
        "Content-Type": "application/json"
      }
    };
    console.log("Request config:", config);  
    return axios.get(BASE_REST_API_URL + "appointments/" + appointmentId, config).catch(err=>{console.log("error")});
  }

  createAuthorizationHeader() {
    const token = UserStorageService.getToken(); 
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    };
  }
}

// export default new AppointmentServices();

const instance = new AppServices();
export default instance;
