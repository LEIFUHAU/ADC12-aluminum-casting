'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const salesEmail = 'longwenqi7799@gmail.com';

export default function Contact() {
  const t = useTranslations('landing.contact');
  const [status, setStatus] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `ADC12 casting inquiry - ${formData.get('company') || formData.get('name')}`;
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Company: ${formData.get('company') || '-'}`,
      '',
      'Project requirements:',
      `${formData.get('message')}`
    ].join('\n');

    window.location.href = `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(t('status'));
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-heading site-reveal">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2>{t('titleLead')}<br /><em>{t('titleAccent')}</em></h2>
        <p>{t('copy')}</p>
        <div className="contact-address">
          <a href={`mailto:${salesEmail}`}>{salesEmail}</a>
          <a href="tel:+8613431681201">+86 134 3168 1201</a>
        </div>
      </div>
      <form className="contact-form site-reveal" onSubmit={handleSubmit}>
        <label>{t('name')}<input name="name" type="text" required placeholder={t('namePlaceholder')} /></label>
        <label>{t('email')}<input name="email" type="email" required placeholder={t('emailPlaceholder')} /></label>
        <label>{t('company')}<input name="company" type="text" placeholder={t('companyPlaceholder')} /></label>
        <label>{t('message')}<textarea name="message" required placeholder={t('messagePlaceholder')} /></label>
        <p className="form-note">{t('emailNote')}</p>
        <button className="button-primary" type="submit">{t('submit')}<ArrowRight className="button-arrow" aria-hidden="true" /></button>
        <output aria-live="polite">{status}</output>
      </form>
    </section>
  );
}
