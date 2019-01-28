import axios from "axios";
// axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
axios.defaults.baseURL = location.origin
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.basicToken}`;

export default axios;