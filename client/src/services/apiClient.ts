import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    },
    timeout: 10000
});

// Request interceptor: lampirkan JWT ke setiap request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    });

// Response interceptor: jika token expired/invalid (401), bersihkan storage
// Ini penting saat deploy — JWT punya expiry, user bisa kena 401 kapan saja
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            // Redirect ke halaman login (ganti path sesuai routing app)
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
);
