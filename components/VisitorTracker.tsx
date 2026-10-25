'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// 轻量访问埋点：页面加载时上报一次
export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('visitor_id', visitorId);
    }

    const device = /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    const params = new URLSearchParams(window.location.search);

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        locale: pathname.split('/')[1] || '',
        country: '',
        referrer: document.referrer || '',
        utm_source: params.get('utm_source') || '',
        device,
        visitor_id: visitorId,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
