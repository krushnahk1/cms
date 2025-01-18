import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8084/api/";
class AppServices {
  getAllAppointment() {
    return axios.get(BASE_REST_API_URL + "appointments");
  }
  createAppointment(appointment) {
    return axios.post(BASE_REST_API_URL + "appointments", appointment);
  }

  // http://localhost:8084/api/appointments/1

  deleteAppointments(appointmentId) {
    return axios.delete(BASE_REST_API_URL + "appointments/" + appointmentId);
  }

  updateappointments(appointmentId, appointment) {
    return axios.put(
      BASE_REST_API_URL + "appointments/" + appointmentId, appointment );
  }

  getAppointmentById(appointmentId) {
    return axios.get(BASE_REST_API_URL + "appointments/" + appointmentId);
  }
}

// export default new AppointmentServices();

const instance = new AppServices();
export default instance;
