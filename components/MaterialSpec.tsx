'use client';

import { useTranslations } from 'next-intl';

export default function MaterialSpec() {
  const t = useTranslations('landing.quality');

  return (
    <section id="quality" className="section quality-section">
      <div className="quality-heading site-reveal">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2>{t('titleLead')}<br /><em>{t('titleAccent')}</em></h2>
        <p>{t('copy')}</p>
      </div>
      <div className="site-reveal">
        <p className="eyebrow">{t('inspectionTitle')}</p>
        <div className="inspection-list">
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="inspection-row" key={item}>
              <span>0{item}</span>
              <p>{t(`check${item}`)}</p>
            </div>
          ))}
        </div>
        <p className="certificate-note">{t('inspectionNote')}</p>
      </div>
    </section>
  );
}
