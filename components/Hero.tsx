'use client';

import { ArrowDown, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('landing.hero');

  return (
    <section id="home" className="hero">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow eyebrow-light">{t('eyebrow')}</p>
        <h1>{t('titleLead')}<br /><em>{t('titleAccent')}</em></h1>
        <p className="hero-copy">{t('copy')}</p>
        <div className="hero-actions">
          <a className="button-primary" href="#contact">{t('primary')}<ArrowRight className="button-arrow" aria-hidden="true" /></a>
          <a className="button-text" href="#factory">{t('secondary')}<ArrowDown className="button-arrow" aria-hidden="true" /></a>
        </div>
      </div>
      <p className="hero-note">{t('note')}</p>
      <div className="hero-index" aria-hidden="true">01<br />ENGINEERED TO SPECIFICATION</div>
    </section>
  );
}
