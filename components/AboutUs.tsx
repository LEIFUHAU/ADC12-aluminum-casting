'use client';

import { useTranslations } from 'next-intl';

export default function AboutUs() {
  const t = useTranslations('landing.factory');
  const capabilities = [1, 2, 3];
  const facts = [1, 2, 3, 4];

  return (
    <section id="factory" className="factory-section">
      <div className="factory-photo site-reveal">
        <div className="factory-image" role="img" aria-label="Aluminum die casting factory workshop" />
      </div>
      <div className="factory-copy site-reveal">
        <p className="eyebrow eyebrow-light">{t('eyebrow')}</p>
        <h2>{t('titleLead')}<br /><em>{t('titleAccent')}</em></h2>
        <p>{t('copy')}</p>
        <div className="factory-facts" aria-label={t('factsLabel')}>
          {facts.map((fact) => (
            <div className="factory-fact" key={fact}>
              <strong>{t(`fact${fact}Value`)}</strong>
              <span>{t(`fact${fact}Label`)}</span>
            </div>
          ))}
        </div>
        <ul className="capability-list">
          {capabilities.map((item) => (
            <li key={item}>
              <span>0{item}</span>
              <div><strong>{t(`item${item}Title`)}</strong><p>{t(`item${item}Text`)}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
