import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/auth';

const Profile: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const user = await getProfile();
        setFullName(user?.name || '');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Placeholder: guardar más adelante en backend
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 800);
  };

  if (loading) return <div className="container py-5" style={{ color: '#fff' }}>Cargando…</div>;

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <form
        onSubmit={handleSubmit}
        className="card p-4"
        style={{ maxWidth: 640, width: '100%', borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h2 className="mb-3" style={{ color: '#fff' }}>Datos personales</h2>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Nombre y apellido</label>
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
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn" disabled={saving} style={{ backgroundColor: '#ffbf1f', borderColor: '#ffbf1f', color: '#1b1b1b', fontWeight: 600 }}>
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
          {saved && <span className="align-self-center" style={{ color: '#9be29b' }}>Guardado</span>}
        </div>
      </form>
    </div>
  );
};

export default Profile;


