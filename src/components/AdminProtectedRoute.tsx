import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
    const loginTime = localStorage.getItem('admin_login_time');
    
    if (!isAuthenticated || !loginTime) {
      navigate('/admin');
      return;
    }

    // Verificar si la sesión expiró (24 horas)
    const sessionTime = parseInt(loginTime, 10);
    const now = Date.now();
    const hoursSinceLogin = (now - sessionTime) / (1000 * 60 * 60);
    
    if (hoursSinceLogin > 24) {
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_login_time');
      navigate('/admin');
    }
  }, [navigate]);

  const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
  const loginTime = localStorage.getItem('admin_login_time');
  
  if (!isAuthenticated || !loginTime) {
    return null;
  }

  const sessionTime = parseInt(loginTime, 10);
  const now = Date.now();
  const hoursSinceLogin = (now - sessionTime) / (1000 * 60 * 60);
  
  if (hoursSinceLogin > 24) {
    return null;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
