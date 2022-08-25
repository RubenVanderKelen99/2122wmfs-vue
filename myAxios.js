import axios from "axios";

const myAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export default myAxios;
