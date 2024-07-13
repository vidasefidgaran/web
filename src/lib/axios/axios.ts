import axios from "axios";
const API_URL = process.env.App_URL;

export const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
