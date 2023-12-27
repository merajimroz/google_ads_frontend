import axios from "axios";

const URL =  import.meta.env.VITE_API_URL

axios.interceptors.request.use (
    config => {
        // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        config.headers['Access-Control-Allow-Origin'] = URL
        config.headers['Content-Type'] = '*/*'
        // config.headers['Refresh-Token'] = `${localStorage.getItem('token')}`
        return config 
    },
    error => {
        return Promise.reject(error)
    }
)
axios.defaults.mode = 'no-cors'