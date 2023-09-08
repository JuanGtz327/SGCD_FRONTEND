import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const signupRequest = (user) => {
  return axios.post(`${API_URL}/signup`, user);
};

export const loginRequest = (user) => {
  return axios.post(`${API_URL}/login`, user);
};
