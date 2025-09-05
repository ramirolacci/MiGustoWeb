import React, { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <form
        onSubmit={handleSubmit}
        className="card p-4"
        style={{
          maxWidth: 420,
          width: '100%',
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div className="text-center mb-3">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              margin: '0 auto 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#fff">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
            </svg>
          </div>
          <h2 className="mb-1" style={{ color: '#fff' }}>Iniciar sesión</h2>
          <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Accedé a tu cuenta Mi Gusto</p>
        </div>

        <label className="form-label">Email</label>
        <div className="input-group mb-3">
          <span className="input-group-text" style={{ background: '#f3f3f3' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><polyline points="22,6 12,13 2,6" /></svg>
          </span>
          <input
            type="email"
            className={`form-control ${touched.email && !email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="tu@email.com"
            required
          />
          {touched.email && !email && <div className="invalid-feedback">Ingresá tu email</div>}
        </div>

        <label className="form-label">Contraseña</label>
        <div className="input-group mb-3">
          <span className="input-group-text" style={{ background: '#f3f3f3' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
          <input
            type="password"
            className={`form-control ${touched.password && !password ? 'is-invalid' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            placeholder="Tu contraseña"
            required
          />
          {touched.password && !password && <div className="invalid-feedback">Ingresá tu contraseña</div>}
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <button
          className="btn w-100"
          type="submit"
          disabled={loading}
          style={{ backgroundColor: '#ffbf1f', borderColor: '#ffbf1f', color: '#1b1b1b', fontWeight: 600 }}
        >
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
        <div className="text-center mt-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
          ¿No tenés cuenta? <a href="/register">Crear cuenta</a>
        </div>
      </form>
    </div>
  );
};

export default Login;


