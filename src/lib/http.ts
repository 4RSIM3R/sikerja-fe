const baseURL = 'https://api.dk-sumedang.com/api';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

export const http = (auth: boolean = false) => {
    const config: AxiosRequestConfig = {
        baseURL
    };

    if (auth) {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }
    }

    const axiosInstance = axios.create(config);

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('authToken');
                useNavigate()('/login');
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;

}