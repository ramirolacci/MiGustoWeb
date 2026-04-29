import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Clave de administración - en producción debería estar en variables de entorno
  const ADMIN_PASSWORD = 'MiGusto123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      // Guardar sesión en localStorage
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_login_time', Date.now().toString());
      navigate('/admin/panel');
    } else {
      setError('Clave incorrecta. Intenta nuevamente.');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>Panel de Administración</h1>
          <p>Mi Gusto</p>
        </div>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="password">Clave de acceso:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la clave de administración"
              autoFocus
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="admin-login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
