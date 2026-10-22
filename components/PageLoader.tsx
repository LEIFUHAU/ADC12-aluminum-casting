'use client';

import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const startFadeOut = () => {
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setIsVisible(false), 500);
      }, 800);
    };

    if (document.readyState === 'complete') {
      startFadeOut();
    } else {
      window.addEventListener('load', startFadeOut);
      return () => window.removeEventListener('load', startFadeOut);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`page-loader-overlay ${isFading ? 'page-loader-hidden' : ''}`}>
      <div className="page-loader">
        <div className="item1"></div>
        <div className="item2"></div>
        <div className="item3"></div>
      </div>
    </div>
  );
}