'use client';

import { Cog } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {
      document.documentElement.classList.add('motion-ready');
      document.querySelectorAll('.site-reveal').forEach((element) => observer.observe(element));
    }

    const startFade = () => {
      timers.push(setTimeout(() => {
        setIsFading(true);
        timers.push(setTimeout(() => setIsVisible(false), 450));
      }, 250));
    };

    if (document.readyState === 'complete') startFade();
    else window.addEventListener('load', startFade, { once: true });

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('load', startFade);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`page-loader-overlay${isFading ? ' page-loader-hidden' : ''}`} role="status" aria-label="Loading">
      <Cog className="gear-spinner" aria-hidden="true" />
      <p className="loader-caption">ADC12 · PRECISION CASTING</p>
    </div>
  );
}
