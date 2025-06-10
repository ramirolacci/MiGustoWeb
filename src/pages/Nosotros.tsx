import React from 'react';
import './Nosotros.css';

const Nosotros = () => {
    return (
        <div className="nosotros-container">
            <div className="nosotros-content">
                <h1>NOSOTROS</h1>
                
                <section className="quienes-somos">
                    <h2>QUIENES SOMOS?</h2>
                    <p>Somos una empresa gastronómica fundada en el año 1999 por la madre de los actuales dueños, Pablo y Jésica Lemos.</p>
                    <p>Iniciamos en el mercado con nuestro primer local ubicado en Don Torcuato.</p>
                    <p>Nuestros pilares: Calidad, Servicio y Limpieza</p>
                </section>

                <section className="franquicias">
                    <h2>FRANQUICIAS</h2>
                    <p>Durante los años la marca dispuso de 4 locales propios. En el año 2010 los dueños recibieron una propuesta para abrir la primer franquicia, ésta se encuentra situada en la localidad de Bella Vista.</p>
                    <p>En la actualidad Mi Gusto cuenta con 34 franquicias.</p>
                </section>

                <section className="vision">
                    <h2>VISIÓN</h2>
                    <p>Ser una empresa gastronómica de nivel internacional en continua expansión, reconocida por ser la N°1 en nuestros productos premium de calidad indiscutida.</p>
                </section>

                <section className="mision">
                    <h2>MISIÓN</h2>
                    <p>Brindar experiencias gastronómicas sensorialmente memorables e inéditas en el mercado mediante la innovación constante en recetas que potencian los sentidos, la selección y uso de materias primas de los más altos estándares de calidad, la mejora continua de nuestros procesos, maquinarias, tecnología productiva, la confianza y el compromiso mutuo con nuestros colaboradores para alcanzar la excelencia y garantizar la satisfacción requerida por nuestros clientes y el cumplimiento de los compromisos asumidos con ellos.</p>
                </section>

                <section className="valores">
                    <h2>VALORES</h2>
                    <h3>NUESTRO ADN ORGANIZACIONAL</h3>
                    <div className="valores-grid">
                        <div className="valor-item">
                            <h4>EXCELENCIA</h4>
                            <p>Es tener una actitud comprometida para hacer las cosas bien la primera vez, siempre, y todos. "Somos lo que hacemos cada día, de modo que la excelencia no es un acto, sino un hábito" - Aristóteles.</p>
                        </div>
                        <div className="valor-item">
                            <h4>CALIDAD</h4>
                            <p>Es el premio a la excelencia, es hacer bien las cosas que hay que hacer. La calidad no se negocia.</p>
                        </div>
                        <div className="valor-item">
                            <h4>HUMANIDAD</h4>
                            <p>Invertimos en el desarrollo de nuestros colaboradores e incentivamos a tratar a otro como nos gustaría que nos traten.</p>
                        </div>
                        <div className="valor-item">
                            <h4>INNOVACIÓN CONTINUA</h4>
                            <p>Somos disruptivos y escuchamos ideas para mejorar lo que tenemos y para crear lo que aún no existe.</p>
                        </div>
                        <div className="valor-item">
                            <h4>ORIENTACIÓN AL CLIENTE</h4>
                            <p>Nuestra atención garantiza al cliente una experiencia premium para un producto premium.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Nosotros; 