/*
  Gestor simple de Google Analytics (gtag.js) controlado por consentimiento.
  - Carga solo cuando el usuario acepta cookies no esenciales
  - Limpia/remueve scripts si el usuario rechaza
*/

const GA_SCRIPT_ID = 'ga-script';
const GA_INIT_SCRIPT_ID = 'ga-init-script';

function getMeasurementId(): string | undefined {
	const id = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID as string | undefined;
	if (id && id.trim().length > 0 && id !== 'G-XXXXXXXXXX') return id.trim();
	return undefined;
}

function hasScript(id: string): boolean {
	return !!document.getElementById(id);
}

export function initGoogleAnalytics(): void {
	const measurementId = getMeasurementId();
	if (!measurementId) return; // no configurado aún
	if (hasScript(GA_SCRIPT_ID)) return; // ya cargado

	// Script principal de GA
	const gaScript = document.createElement('script');
	gaScript.id = GA_SCRIPT_ID;
	gaScript.async = true;
	gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
	document.head.appendChild(gaScript);

	// Inicialización de dataLayer/gtag
	const initScript = document.createElement('script');
	initScript.id = GA_INIT_SCRIPT_ID;
	initScript.innerHTML = `
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', '${measurementId}', { anonymize_ip: true });
	`;
	document.head.appendChild(initScript);
}

export function cleanupGoogleAnalytics(): void {
	// Remover scripts
	const s1 = document.getElementById(GA_SCRIPT_ID);
	if (s1 && s1.parentNode) s1.parentNode.removeChild(s1);
	const s2 = document.getElementById(GA_INIT_SCRIPT_ID);
	if (s2 && s2.parentNode) s2.parentNode.removeChild(s2);

	// Intentar limpiar objetos globales
	try { (window as any).gtag = undefined; } catch {}
	try { (window as any).dataLayer = []; } catch {}
}

export function isGAConfigured(): boolean {
	return !!getMeasurementId();
}

export default {
	initGoogleAnalytics,
	cleanupGoogleAnalytics,
	isGAConfigured,
};


