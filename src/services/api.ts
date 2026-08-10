import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-estudos-joao.shop'
})

api.interceptors.request.use((config) => {
    //buscar o token no localstorage
    const token = localStorage.getItem('token')
    config.headers['x-api-key'] = 'api_key_9f2d80878541e8f4b2390e510783ee6e84635a1433834383'
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default api; 