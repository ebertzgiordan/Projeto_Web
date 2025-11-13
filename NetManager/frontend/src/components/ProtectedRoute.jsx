import { Navigate, Outlet } from 'react-router-dom';
import { useUserData } from '../hooks/userData'; 
import { Spinner } from 'react-bootstrap'; 

const ProtectedRoute = () => {
  const { isLoading, isError } = useUserData();
  
  const token = localStorage.getItem('jwt_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#131314' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (isError) {
    localStorage.removeItem('jwt_token');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;