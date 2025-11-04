import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  
  if (!auth.currentUser) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
