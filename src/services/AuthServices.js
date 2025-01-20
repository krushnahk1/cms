import axios from "axios";

const BASE_REST_API_URL = "http://192.168.47.220:8084/api/";
class AuthServices {

    login(appointment) {
        return axios.post(BASE_REST_API_URL + "appointments", appointment);
    }

//   getAllAppointment() {
//     return axios.get(BASE_REST_API_URL + "appointments");
//   }
//   createAppointment(appointment) {
//     return axios.post(BASE_REST_API_URL + "appointments", appointment);
//   }


//   deleteAppointments(appointmentId) {
//     return axios.delete(BASE_REST_API_URL + "appointments/" + appointmentId);
//   }

//   updateappointments(appointmentId, appointment) {
//     return axios.put(
//       BASE_REST_API_URL + "appointments/" + appointmentId, appointment );
//   }

//   getAppointmentById(appointmentId) {
//     return axios.get(BASE_REST_API_URL + "appointments/" + appointmentId);
//   }
}

// export default new AppointmentServices();

const authServices = new AppServices();
export default authServices;
