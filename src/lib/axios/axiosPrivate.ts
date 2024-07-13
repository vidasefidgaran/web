import axios from "axios";
const API_URL = process.env.App_URL;
export const AxiosPrivate = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default AxiosPrivate;