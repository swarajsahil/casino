// import { useSelector } from 'react-redux';
// import { selectLoggedInUser } from '../authSlice';
// import { selectUserInfo } from '../../user/userSlice';
import { Navigate } from 'react-router-dom';

function ProtectedAdmin({ children }) {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/admin/login" replace={true} />;
  }

  return children;
}

export default ProtectedAdmin;
