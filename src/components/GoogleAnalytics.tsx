import { useEffect } from 'react';
import { initGoogleAnalytics, cleanupGoogleAnalytics, isGAConfigured } from '../services/analytics';

const GoogleAnalytics = () => {
  useEffect(() => {
    const maybeInit = () => {
      const consent = localStorage.getItem('cookieConsent') || 'unset';
      if (consent === 'accepted' && isGAConfigured()) {
        initGoogleAnalytics();
      } else {
        cleanupGoogleAnalytics();
      }
    };

    maybeInit();

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === 'accepted') {
        initGoogleAnalytics();
      } else if (detail === 'rejected') {
        cleanupGoogleAnalytics();
      }
    };
    window.addEventListener('cookie-consent-changed', handler as EventListener);
    return () => {
      window.removeEventListener('cookie-consent-changed', handler as EventListener);
      cleanupGoogleAnalytics();
    };
  }, []);
  return null;
};

export default GoogleAnalytics;


