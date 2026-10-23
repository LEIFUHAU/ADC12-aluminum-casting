'use client';

import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('landing.proof');
  const items = [1, 2, 3, 4];

  return (
    <section className="proof-strip" aria-label="Manufacturing strengths">
      {items.map((item) => (
        <div className="proof-item site-reveal" key={item}>
          <strong>{t(`item${item}Title`)}</strong>
          <p>{t(`item${item}Text`)}</p>
        </div>
      ))}
    </section>
  );
}
