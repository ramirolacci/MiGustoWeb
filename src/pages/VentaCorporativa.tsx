import React, { useState } from 'react';
import '../pages/Contacto.css';
import emailjs from '@emailjs/browser';

const VentaCorporativa: React.FC = () => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        empresa: '',
        email: '',
        telefono: '',
        detallePedido: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({
        nombreCompleto: '',
        empresa: '',
        email: '',
        telefono: '',
        detallePedido: '',
    });

    const validate = () => {
        const newErrors: any = {};
        if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = 'El nombre completo es obligatorio.';
        if (!formData.empresa.trim()) newErrors.empresa = 'El nombre de la empresa es obligatorio.';
        if (!formData.email.trim()) newErrors.email = 'El email es obligatorio.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'El formato del email no es válido.';
        if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio.';
        else if (!/^[\d\s\-\+\(\)]+$/.test(formData.telefono)) newErrors.telefono = 'El formato del teléfono no es válido.';
        if (!formData.detallePedido.trim()) newErrors.detallePedido = 'El detalle del pedido es obligatorio.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);

        const serviceID = 'service_vroveb8'; 
        const templateID = 'template_rx2wmet'; 
        const publicKey = '2muZYDfZaoXaOzlBc'; 

        const templateParams = {
            name: formData.nombreCompleto,
            email: formData.email,
            message: `
                Empresa: ${formData.empresa}
                Teléfono: ${formData.telefono}
                Detalle del Pedido: ${formData.detallePedido}
            `,
        };

        try {
            await emailjs.send(serviceID, templateID, templateParams, publicKey);
            alert('¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.');
            setFormData({
                nombreCompleto: '',
                empresa: '',
                email: '',
                telefono: '',
                detallePedido: ''
            });
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="sucursales-section">
            <div className="background-overlay"></div>
            <div className="sucursales-container">
                <div className="contacto-container">
                    <div className="contacto-content">
                        <div className="contacto-form-container">
                            <h2>Venta Corporativa</h2>
                            <p style={{ textAlign: 'center' }}>Completa el siguiente formulario para solicitar una venta corporativa.</p>
                            <form onSubmit={handleSubmit} className="contacto-form">
                                <div className="form-row">
                                    <div className="form-group half-width">
                                        <label htmlFor="nombreCompleto">Nombre Completo: <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            id="nombreCompleto"
                                            name="nombreCompleto"
                                            value={formData.nombreCompleto}
                                            onChange={handleChange}
                                            placeholder="Ingrese su nombre completo"
                                        />
                                        {errors.nombreCompleto && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.nombreCompleto}</div>}
                                    </div>
                                    <div className="form-group half-width">
                                        <label htmlFor="empresa">Empresa: <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            id="empresa"
                                            name="empresa"
                                            value={formData.empresa}
                                            onChange={handleChange}
                                            placeholder="Nombre de su empresa"
                                        />
                                        {errors.empresa && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.empresa}</div>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group half-width">
                                        <label htmlFor="email">Correo Electrónico: <span className="required">*</span></label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="ejemplo@empresa.com"
                                        />
                                        {errors.email && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.email}</div>}
                                    </div>

                                    <div className="form-group half-width">
                                        <label htmlFor="telefono">Teléfono: <span className="required">*</span></label>
                                        <input
                                            type="tel"
                                            id="telefono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            placeholder="+54 9 11 1234-5678"
                                        />
                                        {errors.telefono && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.telefono}</div>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="detallePedido">Detalle del Pedido:</label>
                                    <textarea
                                        id="detallePedido"
                                        name="detallePedido"
                                        value={formData.detallePedido}
                                        onChange={handleChange}
                                        placeholder="Describa su pedido, cantidad aproximada y cualquier requisito especial"
                                        rows={5}
                                    />
                                    {errors.detallePedido && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.detallePedido}</div>}
                                </div>

                                <button type="submit" className="btn-ver-mas" disabled={isSubmitting}>
                                    Enviar Solicitud
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VentaCorporativa; 