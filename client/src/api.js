import axios from "axios";

const API = axios.create({
  baseURL:"https://social-media-app-d8et.onrender.com"
});

export default API;