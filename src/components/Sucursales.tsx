import React from 'react';

const Sucursales: React.FC = () => {
    return (
        <div className="container my-5">
            <h1 className="mb-4">Sucursales</h1>
            <p>Aquí puedes poner la información de tus sucursales, horarios, direcciones y mapas.</p>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <h5>Buenos Aires</h5>
                    <p>Av. Corrientes 1234</p>
                    <p>Horario: Lun a Vie 10:00 - 22:00</p>
                    {/* Podrías agregar un iframe de Google Maps aquí */}
                </div>
                <div className="col-md-6 mb-4">
                    <h5>Córdoba</h5>
                    <p>Av. Vélez Sarsfield 5678</p>
                    <p>Horario: Lun a Dom 11:00 - 23:00</p>
                </div>
            </div>
        </div>
    );
};

export default Sucursales;
