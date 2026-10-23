'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function InquiryCTA() {
  const t = useTranslations('landing.process');

  return (
    <section className="section section-dark inquiry-cta">
      <div className="section-heading site-reveal">
        <div>
          <p className="eyebrow eyebrow-light">{t('eyebrow')}</p>
          <h2>{t('titleLead')}<br /><em>{t('titleAccent')}</em></h2>
        </div>
        <a className="button-primary" href="#contact">{t('step1Title')}<ArrowRight className="button-arrow" aria-hidden="true" /></a>
      </div>
    </section>
  );
}
