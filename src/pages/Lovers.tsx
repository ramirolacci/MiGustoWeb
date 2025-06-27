import App from '../lovers/App';
import { useEffect } from 'react';

const LoversWrapper = () => {
  useEffect(() => {
    document.body.classList.add('lovers-page');
    return () => {
      document.body.classList.remove('lovers-page');
    };
  }, []);
  return <App />;
};

export default LoversWrapper; 