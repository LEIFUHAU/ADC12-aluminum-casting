'use client';

import { useTranslations } from 'next-intl';

export default function Applications() {
  const t = useTranslations('landing.industries');
  const items = [1, 2, 3, 4];

  return (
    <section id="industries" className="section section-dark">
      <div className="section-heading site-reveal">
        <div>
          <p className="eyebrow eyebrow-light">{t('eyebrow')}</p>
          <h2>{t('titleLead')}<br /><em>{t('titleAccent')}</em></h2>
        </div>
        <p>{t('copy')}</p>
      </div>
      <div className="industry-grid">
        {items.map((item) => (
          <article className="industry-item site-reveal" key={item}>
            <span className="industry-number">0{item}</span>
            <h3>{t(`item${item}Title`)}</h3>
            <p>{t(`item${item}Text`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
