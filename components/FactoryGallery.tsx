'use client';

import { useTranslations } from 'next-intl';

const equipment = [
  { image: '/images/factory/cnc-machining.jpg', key: 'item1' },
  { image: '/images/factory/mold-workshop.jpg', key: 'item2' },
  { image: '/images/factory/die-casting-line.jpg', key: 'item3' },
  { image: '/images/factory/cnc-workshop.jpg', key: 'item4' },
  { image: '/images/factory/surface-finishing.jpg', key: 'item5' }
];

export default function FactoryGallery() {
  const t = useTranslations('landing.equipment');

  return (
    <section id="equipment" className="section equipment-section">
      <div className="section-heading site-reveal">
        <div>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2>{t('titleLead')}<br /><em>{t('titleAccent')}</em></h2>
        </div>
        <p>{t('copy')}</p>
      </div>
      <div className="equipment-grid">
        {equipment.map((item) => (
          <figure className="equipment-card site-reveal" key={item.key}>
            <div className="equipment-image">
              <img src={item.image} alt={t(`${item.key}Alt`)} loading="lazy" />
            </div>
            <figcaption>
              <span>{t(`${item.key}Index`)}</span>
              <strong>{t(`${item.key}Title`)}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
