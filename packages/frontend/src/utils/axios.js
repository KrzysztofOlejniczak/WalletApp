import axios from 'axios';
import { store } from '../redux/store';
import { refreshAccessToken } from '../redux/auth/operations';

const BASEURL = process.env.REACT_APP_BACKEND_URL;

export const axiosAPI = axios.create({ baseURL: BASEURL });

export const setAuthHeader = (token) => {
  axiosAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axiosAPI.defaults.headers.common.Authorization = '';
};

axiosAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await store.dispatch(refreshAccessToken());
        const token = res.payload.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);
