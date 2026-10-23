'use client';

import { useTranslations } from 'next-intl';

export default function Process() {
  const t = useTranslations('landing.process');
  const steps = [1, 2, 3, 4];

  return (
    <section id="process" className="section process-section">
      <div className="section-heading site-reveal">
        <div>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2>{t('titleLead')}<br /><em>{t('titleAccent')}</em></h2>
        </div>
        <p>{t('copy')}</p>
      </div>
      <div className="process-row">
        {steps.map((step) => (
          <article className="process-step site-reveal" key={step}>
            <span>0{step}</span>
            <h3>{t(`step${step}Title`)}</h3>
            <p>{t(`step${step}Text`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
