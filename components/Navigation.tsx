'use client';

import { Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('landing.nav');
  const links = [
    { label: t('industries'), href: '#industries' },
    { label: t('products'), href: '#products' },
    { label: t('factory'), href: '#factory' },
    { label: t('quality'), href: '#quality' },
    { label: t('contact'), href: '#contact' }
  ];
  const localeHref = locale === 'en' ? '/zh' : '/en';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
        <a href="#home" className="brand-mark" aria-label="ADC12 Precision Casting home">
          <strong>ADC12</strong><span>PRECISION CASTING</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="language-link" href={localeHref} lang={locale === 'en' ? 'zh' : 'en'}>{t('switch')}</a>
          <a className="header-quote" href="#contact">{t('quote')}</a>
          <button className="menu-toggle" type="button" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((open) => !open)}>
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.label}</a>)}
          <a className="mobile-quote" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t('quote')}</a>
        </nav>
      )}
    </>
  );
}
