import { Navigate, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'cookies-js';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//

import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Bookings from './pages/Bookings';
import PrivateRoute from './sections/auth/PrivateRoute';
import { aliveSession } from './api/auth';

// ----------------------------------------------------------------------

export default function Router() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuth = () => {
    // Checking for already signed in, TODO: Make this better
    if(Cookies.get('access-token')) return true;
    return false;
  }
  
  return useRoutes([
    {
      path: '/dashboard',
      element:  <PrivateRoute isAuthenticated={checkAuth()}><DashboardLayout /></PrivateRoute>,
      children: [
        { path: 'mybookings', element: <PrivateRoute isAuthenticated={checkAuth()}><MyBookings /></PrivateRoute>},
        { path: 'bookings', element: <PrivateRoute isAuthenticated={checkAuth()}><Bookings /></PrivateRoute> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/mybookings" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
