import React, { useState } from 'react';
import './VentaCorporativa.css';

const VentaCorporativa: React.FC = () => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        empresa: '',
        email: '',
        telefono: '',
        detallePedido: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario
        console.log('Formulario enviado:', formData);
    };

    return (
        <div className="venta-corporativa-container">
            <div className="venta-corporativa-content">
                <h1>Venta Corporativa</h1>
                <p className="subtitulo">¿Necesitas un servicio especial para tu empresa?</p>
                
                <form onSubmit={handleSubmit} className="formulario-corporativo">
                    <div className="form-group">
                        <label htmlFor="nombreCompleto">Nombre Completo</label>
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

                    <div className="form-group">
                        <label htmlFor="empresa">Empresa</label>
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

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
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

                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
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

                    <div className="form-group">
                        <label htmlFor="detallePedido">Detalle del Pedido</label>
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

                    <button type="submit" className="btn-enviar">
                        Enviar Solicitud
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VentaCorporativa; 