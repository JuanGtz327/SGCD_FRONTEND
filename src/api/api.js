import axios from "./axios.js";

//API para el login y registro de usuarios

export const signupRequest = (user) => {
  return axios.post(`/signup`, user);
};

export const loginRequest = (user) => {
  return axios.post(`/login`, user);
};

export const logoutRequest = () => {
  return axios.post(`/logout`);
};

export const veryfyTokenRequest = (token) => {
  return axios.post("/verify-token", token);
};

//Llamadas geneales a la API

export const getProfileRequest = (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getProfile`, { headers });
};

export const editPasswordRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/editPassword`, data, { headers });
};

export const editProfileRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.put(`/admin/editProfile`, data, { headers });
};

//API para el CRUD de los doctores

export const getDoctorConfig = (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getDoctorConfigs/${id}`, { headers });
};

export const createDoctorRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/addDoctor`, data, { headers });
};

export const getDoctorsRequest = (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getDoctors`, { headers });
};

export const getDoctorRequest = (idDoctor,token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getDoctor/${idDoctor}`, { headers });
};

export const getPatientDoctorsRequest = (idPaciente,token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getPatientDoctors/${idPaciente}`, { headers });
};

export const editDoctorRequest = (id, data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.put(`/admin/editDoctor/${id}`, data, { headers });
};

export const   editDoctorConfigsRequest = (id, data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.put(`/admin/editDoctorConfigs/${id}`, data, { headers });
};

export const deleteDoctorRequest = (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.delete(`/admin/deleteDoctor/${id}`, { headers });
};

//PARA Pacientes

export const createPatientRequest = (data, token, idDoctor) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/addPatient/${idDoctor}`, data, { headers });
};

export const getPatientsRequest = (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getPatients`, { headers });
};

export const getPatiensByDoctorRequest = (idDoctor,token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getPatientsByDoctor/${idDoctor}`, { headers });
};

export const getPatientRequest = (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getPatient/${id}`, { headers });
};

export const getPatientsClinicRequest = (token, clinicID) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getPatientsClinic/${clinicID}`, { headers });
};

export const deletePatientRequest = (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.delete(`/admin/deletePatient/${id}`, { headers });
};

export const editPatientRequest = (id, data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.put(`/admin/editPatient/${id}`, data, { headers });
};

export const addDocPacRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/addDocPac`, data, { headers });
};

//PARA Citas

export const createAdminAppointmentRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/addCitaAdmin`, data, { headers });
};

export const createAppointmentRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/addCita`, data, { headers });
};

export const createPatientAppointmentRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/addPatientCita`, data, { headers });
};

export const getValidAppointmentsRequest = (fecha, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getValidCitas/${fecha}`, { headers });
};

export const getAdminAppointmentsRequest = (filtro = 'all', token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getCitasAdmin/${filtro}`, { headers });
};

export const getAppointmentsRequest = (filtro,token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getCitas/${filtro}`, { headers });
};

export const getPatientAppointmentsRequest = (filtro = 'all',token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getCitasPaciente/${filtro}`, { headers });
};

export const editAppointmentRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.put(`/admin/editCita`, data, { headers });
};

export const cancelAppointmentRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/cancelCita`, data, { headers });
};

export const cancelConfirmAppointmentRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/cancelConfirmCita`, data, { headers });
};

//PARA Especialidades

export const getEspecialidadesRequest = (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getEspecialidades`, { headers });
};

// Para expediente clinico

export const editHistoriaMedicaRequest = (id, data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.put(`/admin/editHistoriaMedica/${id}`, data, { headers });
};

export const editExamenFisicoRequest = (id, data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.put(`/admin/editExamenFisico/${id}`, data, { headers });
};

export const addHistoriaClinicaActual = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.post(`/admin/addHistoriaClinicaActual`, data, { headers });
};

//Para la clinica

export const getClinicaRequest = (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/admin/getClinica`, { headers });
};

export const editClinicaRequest = (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.put(`/admin/editClinica`, data, { headers });
};

