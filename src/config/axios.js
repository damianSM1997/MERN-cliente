import axios from 'axios';
// este cliente tendra una url como base
const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default clienteAxios;

