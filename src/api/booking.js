import axios from 'axios';
import Cookies from 'cookies-js';
import { API_HOST } from '../config';
import { authRequest } from './requests';

export const list = (data) => authRequest('get', `${API_HOST}/bookings?date=${data.date}&interval=${data.interval}`);

export const myBookings = () => authRequest('get', `${API_HOST}/mybookings?user_id=${Cookies.get('user_id')}`);

export const createBooking = (data) => authRequest('post', `${API_HOST}/bookings`, data);

export const calculateInterval = (startDate, endDate) => {
  const msInMinute = 60 * 1000;

  return Math.round(
    Math.abs(endDate - startDate) / msInMinute
  );
}