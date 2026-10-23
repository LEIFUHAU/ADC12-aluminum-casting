'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('landing.footer');
  const nav = useTranslations('landing.nav');
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div>
        <a href="#home" className="brand-mark"><strong>ADC12</strong><span>PRECISION CASTING</span></a>
        <p className="footer-description">{t('description')}</p>
      </div>
      <div>
        <p className="footer-column-title">{t('quickLinks')}</p>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#industries">{nav('industries')}</a><a href="#products">{nav('products')}</a><a href="#factory">{nav('factory')}</a><a href="#quality">{nav('quality')}</a>
        </nav>
      </div>
      <div>
        <p className="footer-column-title">{t('contact')}</p>
        <nav className="footer-links" aria-label="Contact links">
          <a href="mailto:longwenqi7799@gmail.com">longwenqi7799@gmail.com</a><a href="tel:+8613431681201">+86 134 3168 1201</a>
        </nav>
      </div>
      <div className="footer-bottom"><span>© {year} ADC12 Precision Casting</span><a href="#home">{t('backToTop')} ↑</a></div>
    </footer>
  );
}
