import React, { useEffect, useState, useCallback } from 'react';
import './CookieConsent.css';

type ConsentStatus = 'accepted' | 'rejected' | 'unset';

const STORAGE_KEY = 'cookieConsent';

const getStoredConsent = (): ConsentStatus => {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		if (value === 'accepted' || value === 'rejected') return value;
		return 'unset';
	} catch {
		return 'unset';
	}
};

const setStoredConsent = (value: ConsentStatus) => {
	try {
		if (value === 'unset') localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, value);
	} catch {
		// ignore storage errors
	}
};

const CookieConsent: React.FC = () => {
	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => {
		const status = getStoredConsent();
		setVisible(status === 'unset');

		const onOpen = () => setVisible(true);
		window.addEventListener('open-cookie-consent', onOpen as EventListener);
		return () => window.removeEventListener('open-cookie-consent', onOpen as EventListener);
	}, []);

	const acceptAll = useCallback(() => {
		setStoredConsent('accepted');
		setVisible(false);
		// Notificar a la app para inicializar herramientas que dependan del consentimiento
		try {
			window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: 'accepted' }));
		} catch {}
	}, []);

	const rejectNonEssential = useCallback(() => {
		setStoredConsent('rejected');
		setVisible(false);
		// Notificar a la app para desmontar/deshabilitar scripts no esenciales
		try {
			window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: 'rejected' }));
		} catch {}
	}, []);

	if (!visible) return null;

	return (
		<div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Consentimiento de cookies">
			<div className="cookie-consent__content">
				<h3 className="cookie-consent__title">Política de Cookies</h3>
				<p className="cookie-consent__text">
					Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el uso del sitio y personalizar contenido. Podés aceptar todas o rechazar las no esenciales.
					{' '}<a className="cookie-consent__link" href="/legales" onClick={() => setVisible(false)}>Más info</a>
				</p>
			</div>
			<div className="cookie-consent__actions">
				<button className="cookie-btn cookie-btn--secondary" onClick={rejectNonEssential} aria-label="Rechazar cookies no esenciales">Solo necesarias</button>
				<button className="cookie-btn cookie-btn--primary" onClick={acceptAll} aria-label="Aceptar todas las cookies">Aceptar todas</button>
			</div>
		</div>
	);
};

export default CookieConsent;


