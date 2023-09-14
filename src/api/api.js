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
