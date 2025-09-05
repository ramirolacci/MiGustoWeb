import React, { useState } from 'react';
import { register as doRegister } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState<{ fullName?: boolean; email?: boolean; password?: boolean; confirmPassword?: boolean; terms?: boolean }>({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (!acceptTerms) {
      setError('Debes aceptar los Términos y la Política de Privacidad');
      return;
    }
    setLoading(true);
    try {
      await doRegister(email, password, fullName);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'No se pudo registrar');
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
          maxWidth: 520,
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
          <h2 className="mb-1" style={{ color: '#fff' }}>Crear cuenta</h2>
          <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Unite a Mi Gusto</p>
        </div>
        <label className="form-label">Nombre y apellido</label>
        <div className="input-group mb-1">
          <span className="input-group-text" style={{ background: '#f3f3f3' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </span>
          <input
            className={`form-control ${touched.fullName && !fullName ? 'is-invalid' : ''}`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Tu nombre completo"
            onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
            required
          />
        </div>
        {touched.fullName && !fullName && <div className="invalid-feedback d-block mb-2">Ingresá tu nombre completo</div>}

        <label className="form-label">Email</label>
        <div className="input-group mb-1">
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
        </div>
        {touched.email && !email && <div className="invalid-feedback d-block mb-2">Ingresá tu email</div>}

        <label className="form-label">Contraseña</label>
        <div className="input-group mb-1">
          <span className="input-group-text" style={{ background: '#f3f3f3' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
          <input
            type="password"
            className={`form-control ${touched.password && password.length < 6 ? 'is-invalid' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            placeholder="Mínimo 6 caracteres"
            required
            minLength={6}
          />
        </div>
        {touched.password && password.length < 6 && <div className="invalid-feedback d-block mb-2">Mínimo 6 caracteres</div>}

        <label className="form-label">Repetir contraseña</label>
        <div className="input-group mb-1">
          <span className="input-group-text" style={{ background: '#f3f3f3' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
          <input
            type="password"
            className={`form-control ${touched.confirmPassword && confirmPassword !== password ? 'is-invalid' : ''}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
            placeholder="Repetí tu contraseña"
            required
            minLength={6}
          />
        </div>
        {touched.confirmPassword && confirmPassword !== password && <div className="invalid-feedback d-block mb-2">Las contraseñas no coinciden</div>}

        <div className="form-check mb-3">
          <input
            id="acceptTerms"
            className={`form-check-input ${touched.terms && !acceptTerms ? 'is-invalid' : ''}`}
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            onBlur={() => setTouched((t) => ({ ...t, terms: true }))}
            required
          />
          <label
            className="form-check-label"
            htmlFor="acceptTerms"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            Al registrarte, estás aceptando los{' '}
            <a
              href="/legales"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.95)', textDecoration: 'underline' }}
            >
              Términos y Condiciones de Uso
            </a>{' '}
            y la{' '}
            <a
              href="/legales"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.95)', textDecoration: 'underline' }}
            >
              Política de Privacidad
            </a>{' '}
            de Mi Gusto.
          </label>
          {touched.terms && !acceptTerms && <div className="invalid-feedback d-block">Debes aceptar los términos para continuar</div>}
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        <button
          type="submit"
          className="btn w-100"
          disabled={loading}
          style={{ backgroundColor: '#ffbf1f', borderColor: '#ffbf1f', color: '#1b1b1b', fontWeight: 600 }}
        >
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>
    </div>
  );
};

export default Register;


