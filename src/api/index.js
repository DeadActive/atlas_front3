import axios from 'axios'
import router from '../router'
import Vue from 'vue'

const client = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

client.interceptors.response.use(null, (error) => {
    if (
        error.response?.config & (error.response?.status === 401) ||
        error.response?.status === 403
    ) {
        router.push('/login')
        return error.response
    }

    return Promise.reject(error)
})

client.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(
            'vue-token'
        )}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default client
