import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://finexa-backend-7d2r.onrender.com/admin",
  withCredentials: true,
});

export default adminApi;
