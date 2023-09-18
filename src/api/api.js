import axios from "./axios.js";

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
  return axios.post("/verify-token",token);
};

//PARA Pacientes

export const createPatientRequest = (data,token) => {
  const headers = {"Authorization": `Bearer ${token}`};
  return axios.post(`/admin/addPatient`, data,{headers});
}

export const getPatientsRequest = (token) => {
  const headers = {"Authorization": `Bearer ${token}`};
  return axios.get(`/admin/getPatients`,{headers});
}

export const deletePatientRequest = (id,token) => {
  const headers = {"Authorization": `Bearer ${token}`};
  return axios.delete(`/admin/deletePatient/${id}`,{headers});
}

export const editPatientRequest = (id,data,token) => {
  const headers = {"Authorization": `Bearer ${token}`};
  return axios.put(`/admin/editPatient/${id}`,data,{headers});
}

//PARA Citas

export const createAppointmentRequest = (data,token) => {
  const headers = {"Authorization": `Bearer ${token}`};
  return axios.post(`/admin/addCita`, data,{headers});
}

export const getAppointmentsRequest = (token) => {
  const headers = {"Authorization": `Bearer ${token}`};
  return axios.get(`/admin/getCitas`,{headers});
}