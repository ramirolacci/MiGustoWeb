import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, updateMe } from '../services/user';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const datosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await getMe();
        setFullName(user?.name || '');
        setPhone(user?.phone || '');
        setBirthdate(user?.birthdate || '');
        setDocumentId(user?.documentId || '');
      } catch {}
    })();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const updated = await updateMe({ name: fullName, phone, birthdate, documentId });
      // Refrescar campos con lo que devuelva el backend
      setFullName(updated?.name || fullName);
      setPhone(updated?.phone || phone);
      setBirthdate(updated?.birthdate || birthdate);
      setDocumentId(updated?.documentId || documentId);
      setSaved(true);
      setSuccessMsg('Cambios guardados correctamente');
      setTimeout(() => setSaved(false), 1600);
    } catch (err: any) {
      const apiMsg = err?.response?.data?.message || 'No se pudo guardar los cambios';
      setErrorMsg(apiMsg);
      console.error('updateMe error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4" style={{ color: '#111' }}>
      <style>{`
        .account-max { max-width: 1200px; margin: 0 auto; }
        .card-elevated { background: #ffffff; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 10px 26px rgba(0,0,0,0.12); border-radius: 16px; }
        .list-clean .list-group-item { padding: 14px 16px; display: flex; align-items: center; }
        .list-clean .list-group-item + .list-group-item { border-top: 1px solid rgba(0,0,0,0.06); }
        .heading-dark { color: #0f0f0f; }
        .muted { color: #666; }
        /* Offset para evitar solaparse con el navbar fijo */
        .account-offset { margin-top: 128px; }
        @media (min-width: 992px) {
          .account-offset { margin-top: 64px; }
        }
      `}</style>
      <div className="row g-4 account-max align-items-start">
        <div className="col-12 col-lg-4 account-offset">
          {/* Tarjeta amarilla */}
          <div className="card-elevated p-0">
            <div style={{ background: '#ffbf1f', padding: 16, position: 'relative', minHeight: 132 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: '#2b2100', opacity: 0.9 }}>Hola</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#2b2100' }}>Facu</div>
              <div style={{ fontSize: 12, color: '#5b4a00', opacity: 0.75 }}>MgID: MG-6RJXFY</div>
              {/* QR (temporal, service público) */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=${encodeURIComponent('MG-6RJXFY')}`}
                alt="MgID QR"
                style={{ position: 'absolute', right: 16, top: 16, width: 96, height: 96, background: '#fff', borderRadius: 12 }}
              />
            </div>
            <div className="list-group list-group-flush list-clean">
              <button className="list-group-item list-group-item-action" onClick={() => datosRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="me-3">📄</span>
                <span>Datos personales</span>
              </button>
              <button className="list-group-item list-group-item-action" onClick={() => navigate('/mi-cuenta#direcciones')}>
                <span className="me-3">📍</span>
                <span>Direcciones guardadas</span>
              </button>
              <button className="list-group-item list-group-item-action" onClick={() => navigate('/mi-cuenta#historial')}>
                <span className="me-3">🧾</span>
                <span>Historial de pedidos</span>
              </button>
              <button className="list-group-item list-group-item-action" onClick={() => navigate('/mi-cuenta#seguridad')}>
                <span className="me-3">🔒</span>
                <span>Inicio de sesión y seguridad</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8" ref={datosRef}>
          <h2 className="heading-dark" style={{ fontWeight: 800, marginBottom: 12 }}>Datos personales</h2>
          <form className="card-elevated p-3" onSubmit={handleSave}>
            {errorMsg && <div className="alert alert-danger py-2 mb-3">{errorMsg}</div>}
            {successMsg && <div className="alert alert-success py-2 mb-3">{successMsg}</div>}
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Nombre y Apellido</label>
                <input className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Tu nombre completo" />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Teléfono</label>
                <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ej: +54 11 1234 5678" />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Fecha de nacimiento</label>
                <input type="date" className="form-control" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
              </div>
              <div className="col-12">
                <label className="form-label">Documento de identidad</label>
                <input className="form-control" value={documentId} onChange={(e) => setDocumentId(e.target.value)} placeholder="DNI / Pasaporte" />
              </div>
            </div>
            <div className="d-flex gap-2 mt-3">
              <button type="submit" className="btn" disabled={saving} style={{ backgroundColor: '#ffbf1f', borderColor: '#ffbf1f', color: '#1b1b1b', fontWeight: 600 }}>
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </button>
              {saved && <span className="align-self-center" style={{ color: '#2e7d32' }}>Guardado</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;


