import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // 👈 your backend host
});

export default api;
