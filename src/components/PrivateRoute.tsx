import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
  const { currentUser, userRole, userDepartment, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // For admin-only routes, allow both admin and HOD access
  if (adminOnly) {
    if (userRole === 'admin' || userRole === 'hod') {
      return <>{children}</>;
    }
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;