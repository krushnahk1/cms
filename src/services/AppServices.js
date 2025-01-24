import axios from "axios";
import UserStorageService from "./UserStorageService";

// Base URL for the API
const BASE_REST_API_URL = "http://192.168.31.221:8084/api/";

class AppServices {
  // Generic method to set up headers for requests
  getHeaders() {
    return {
      Authorization: `Bearer ${UserStorageService.getToken()}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * Fetch all appointments
   * @returns {Promise} Axios response
   */
  getAllAppointments() {
    return axios
      .get(`${BASE_REST_API_URL}appointments`, { headers: this.getHeaders() })
      .then((response) => response.data)
      .catch((err) => {
        console.error("Error fetching all appointments:", err);
        throw err;
      });
  }

  /**
   * Create a new appointment
   * @param {Object} appointment - Appointment data
   * @returns {Promise} Axios response
   */
  createAppointment(appointment) {
    return axios
      .post(`${BASE_REST_API_URL}appointments`, appointment, {
        headers: this.getHeaders(),
      })
      .then((response) => response.data)
      .catch((err) => {
        console.error("Error creating appointment:", err);
        throw err;
      });
  }

  /**
   * Delete an appointment by ID
   * @param {string} appointmentId - ID of the appointment to delete
   * @returns {Promise} Axios response
   */
  deleteAppointment(appointmentId) {
    return axios
      .delete(`${BASE_REST_API_URL}appointments/${appointmentId}`, {
        headers: this.getHeaders(),
      })
      .then((response) => response.data)
      .catch((err) => {
        console.error("Error deleting appointment:", err);
        throw err;
      });
  }

  /**
   * Update an appointment by ID
   * @param {string} appointmentId - ID of the appointment to update
   * @param {Object} appointment - Updated appointment data
   * @returns {Promise} Axios response
   */
  updateAppointment(appointmentId, appointment) {
    return axios
      .put(`${BASE_REST_API_URL}appointments/${appointmentId}`, appointment, {
        headers: this.getHeaders(),
      })
      .then((response) => response.data)
      .catch((err) => {
        console.error("Error updating appointment:", err);
        throw err;
      });
  }

  /**
   * Fetch a specific appointment by ID
   * @param {string} appointmentId - ID of the appointment to fetch
   * @returns {Promise} Axios response
   */
  getAppointmentById(appointmentId) {
    return axios
      .get(`${BASE_REST_API_URL}appointments/${appointmentId}`, {
        headers: this.getHeaders(),
      })
      .then((response) => response.data)
      .catch((err) => {
        console.error("Error fetching appointment by ID:", err);
        throw err;
      });
  }

  /**
   * Fetch all doctors
   * @returns {Promise} Axios response
   */
  getAllDoctors() {
    return axios
      .get(`${BASE_REST_API_URL}doctors`, { headers: this.getHeaders() })
      .then((response) => response.data)
      .catch((err) => {
        console.error("Error fetching all doctors:", err);
        throw err;
      });
  }
}

// Exporting the AppServices instance for use in other parts of the application
export default new AppServices();
