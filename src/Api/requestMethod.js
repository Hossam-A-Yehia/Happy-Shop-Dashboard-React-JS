import axios from "axios";

const BASE_URL = "https://e-commerce-back-end-psi.vercel.app/api/";
const TOKEN = localStorage.getItem("admin") && JSON.parse(localStorage.getItem("admin")).accessToken



export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
