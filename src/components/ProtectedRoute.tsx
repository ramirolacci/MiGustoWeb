import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/auth';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;


