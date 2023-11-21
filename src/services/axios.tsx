import axios from "axios";
// http://192.168.0.109:9000/api
export const localInstance = axios.create({
  baseURL: "http://192.168.100.24:9001/api",
});

export const cloudInstance = axios.create({
  baseURL: "https://detfsmm.com/api",
});
