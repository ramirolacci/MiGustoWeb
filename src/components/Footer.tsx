const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-4 mt-5">
            <div className="container">
                <div className="row text-center text-md-start">
                    <div className="col-12 col-md-4 mb-4">
                        <h6 className="text-uppercase fw-bold">Mi Gusto</h6>
                        <hr
                            className="mx-auto mx-md-0 mb-4 mt-0"
                            style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                        />
                        <p>
                            Tu lugar para pedir la mejor comida. Calidad, variedad y servicio en cada plato.
                        </p>
                    </div>

                    <div className="col-12 col-md-3 mb-4">
                        <h6 className="text-uppercase fw-bold">Enlaces</h6>
                        <hr
                            className="mx-auto mx-md-0 mb-4 mt-0"
                            style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                        />
                        <p>
                            <a
                                href="https://www.migusto.com.ar/pedir"
                                className="text-light text-decoration-none"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Pedir
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://www.migusto.com.ar/carta"
                                className="text-light text-decoration-none"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Carta
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://www.migusto.com.ar/sucursales"
                                className="text-light text-decoration-none"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Sucursales
                            </a>
                        </p>
                    </div>

                    <div className="col-12 col-md-5 mb-4">
                        <h6 className="text-uppercase fw-bold">Contacto</h6>
                        <hr
                            className="mx-auto mx-md-0 mb-4 mt-0"
                            style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                        />
                        <p><i className="fas fa-home me-2"></i> Buenos Aires, Argentina</p>
                        <p><i className="fas fa-envelope me-2"></i> contacto@migusto.com.ar</p>
                        <p><i className="fas fa-phone me-2"></i> +54 11 4321-9876</p>
                    </div>
                </div>
            </div>

            <div className="text-center py-3 border-top border-secondary small">
                © 2025 Mi Gusto — Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
