'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const products = [
  {
    image: '/images/products/product-overview.jpg',
    alt: 'ADC12 aluminum die cast components',
    anchor: 'item1'
  },
  {
    image: '/images/products/heat-sinks.jpg',
    alt: 'Machined aluminum heat sink components',
    anchor: 'item2'
  },
  {
    image: '/images/products/product-samples.jpg',
    alt: 'Finished aluminum casting samples',
    anchor: 'item3'
  }
];

export default function Products() {
  const t = useTranslations('landing.products');

  return (
    <section id="products" className="section products-section">
      <div className="section-heading products-heading site-reveal">
        <div>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2>{t('titleLead')}<br /><em>{t('titleAccent')}</em></h2>
        </div>
        <p>{t('copy')}</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="casting-card site-reveal" key={product.anchor}>
            <a href="#contact" aria-label={`${t(`${product.anchor}Title`)} - ${t('tag')}`}>
              <div className="casting-image">
                <img src={product.image} alt={product.alt} loading="lazy" />
                <div className="casting-shade" aria-hidden="true" />
                <ArrowUpRight className="button-arrow" aria-hidden="true" />
              </div>
              <div className="casting-meta">
                <span className="casting-tag">{t('tag')}</span>
                <h3>{t(`${product.anchor}Title`)}</h3>
                <p>{t(`${product.anchor}Text`)}</p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
