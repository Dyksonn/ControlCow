import axios from "axios";

const urlEmulator = 'http://10.0.2.2:3000/';
const urlDevice = 'http://192.168.xx.xx:3000/';

const api = axios.create({
  baseURL: urlEmulator,
});

export default api;