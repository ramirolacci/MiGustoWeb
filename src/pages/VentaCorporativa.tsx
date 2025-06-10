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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                                            required
                                            placeholder="Ingrese su nombre completo"
                                        />
                                    </div>
                                    <div className="form-group half-width">
                                        <label htmlFor="empresa">Empresa: <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            id="empresa"
                                            name="empresa"
                                            value={formData.empresa}
                                            onChange={handleChange}
                                            required
                                            placeholder="Nombre de su empresa"
                                        />
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
                                            required
                                            placeholder="ejemplo@empresa.com"
                                        />
                                    </div>

                                    <div className="form-group half-width">
                                        <label htmlFor="telefono">Teléfono: <span className="required">*</span></label>
                                        <input
                                            type="tel"
                                            id="telefono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            required
                                            placeholder="+54 9 11 1234-5678"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="detallePedido">Detalle del Pedido:</label>
                                    <textarea
                                        id="detallePedido"
                                        name="detallePedido"
                                        value={formData.detallePedido}
                                        onChange={handleChange}
                                        required
                                        placeholder="Describa su pedido, cantidad aproximada y cualquier requisito especial"
                                        rows={5}
                                    />
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