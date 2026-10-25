'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const salesEmail = 'longwenqi7799@gmail.com';

export default function Contact() {
  const t = useTranslations('landing.contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          country: formData.get('country'),
          message: formData.get('message'),
          source: 'website',
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
    }
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
        <label>{t('phone')}<input name="phone" type="tel" placeholder={t('phonePlaceholder')} /></label>
        <label>{t('country')}<input name="country" type="text" placeholder={t('countryPlaceholder')} /></label>
        <label>{t('company')}<input name="company" type="text" placeholder={t('companyPlaceholder')} /></label>
        <label>{t('message')}<textarea name="message" required placeholder={t('messagePlaceholder')} /></label>
        <p className="form-note">{t('emailNote')}</p>
        <button className="button-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t('statusSending') : t('submit')}
          {status !== 'sending' && <ArrowRight className="button-arrow" aria-hidden="true" />}
        </button>
        <output aria-live="polite">
          {status === 'success' && t('statusSuccess')}
          {status === 'error' && t('statusError')}
        </output>
      </form>
    </section>
  );
}
