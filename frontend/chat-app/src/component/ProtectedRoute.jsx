import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // or however you're handling auth
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
