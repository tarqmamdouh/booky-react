import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ isAuthenticated, children }) => isAuthenticated ? children : <Navigate to="/login" />;

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.any
}

export default PrivateRoute;