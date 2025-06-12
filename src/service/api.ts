import axios from 'axios';
import { AuthService } from './auth';

const api = axios.create({
    baseURL: 'https://api.spotify.com/v1'
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(config => {
    const token = AuthService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            AuthService.removeToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;