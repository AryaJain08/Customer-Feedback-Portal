import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getFeedbacks = (role) =>
  API.get(role === "admin" ? "/feedback" : "/feedback/my");

export const submitFeedback = (data) => API.post("/feedback", data);

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
