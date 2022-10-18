import axios from 'axios';
import Cookies from 'cookies-js';
import { API_HOST } from '../config';
import { authRequest } from './requests';

export const aliveSession = () => authRequest('get', `${API_HOST}/sessions/alive`);

export const login = (data) => axios.post(`${API_HOST}/auth/sign_in`, data);

export const register = (data) => axios.post(`${API_HOST}/auth`, data);

export const setUser = (data) => {
  Cookies.set('user_id', data.id);
  Cookies.set('email', data.email);
  Cookies.set('name', data.name);
};