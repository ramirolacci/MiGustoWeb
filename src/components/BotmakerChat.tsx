import { useEffect } from 'react';

const cleanBotmaker = () => {
  // Eliminar el script por id
  const oldScript = document.getElementById('botmaker-webchat-script');
  if (oldScript) {
    document.body.removeChild(oldScript);
  }
  // Eliminar el iframe del bot si existe
  const botIframe = document.querySelector('iframe[src*="botmaker"]');
  if (botIframe && botIframe.parentNode) {
    botIframe.parentNode.removeChild(botIframe);
  }
  // Eliminar el div del widget si existe
  const botDiv = document.querySelector('div[id*="botmaker"]');
  if (botDiv && botDiv.parentNode) {
    botDiv.parentNode.removeChild(botDiv);
  }
};

const BotmakerChat = () => {
  useEffect(() => {
    // Limpieza agresiva al montar
    cleanBotmaker();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://go.botmaker.com/rest/webchat/p/HH4I2M0BVY/init.js';
    script.id = 'botmaker-webchat-script';
    document.body.appendChild(script);
    return () => {
      // Limpieza agresiva al desmontar
      cleanBotmaker();
    };
  }, []);
  return null;
};

export default BotmakerChat; 