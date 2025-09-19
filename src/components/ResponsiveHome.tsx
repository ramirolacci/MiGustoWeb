import React, { useEffect, useState } from 'react';

const DesktopHome = React.lazy(() => import('./Home'));
const MobileHome = React.lazy(() => import('../pages/HomeMobile'));

export default function ResponsiveHome() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile ? <MobileHome /> : <DesktopHome />;
}






