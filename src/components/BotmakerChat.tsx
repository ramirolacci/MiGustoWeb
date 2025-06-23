import { useEffect } from 'react';

const BotmakerChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://go.botmaker.com/rest/webchat/p/HH4I2M0BVY/init.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
};

export default BotmakerChat; 