import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import VisitorTracker from '@/components/VisitorTracker';
import '../globals.css';

const siteUrl = 'https://c77799.com.cn';
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Foshan Hongmingrui Precision Casting',
  url: siteUrl,
  telephone: '+8613431681201',
  email: 'longwenqi7799@gmail.com',
  areaServed: 'WorldWide',
  description: 'ADC12 aluminum die casting OEM/ODM, 6000m² factory, 20+ years experience.',
  sameAs: ['https://wa.me/8618965869753'],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isChinese = locale === 'zh';
  const localePath = isChinese ? '/zh' : '/en';

  return {
    metadataBase: new URL(siteUrl),
    title: isChinese ? 'ADC12 铝合金压铸 | 按图定制制造' : 'ADC12 Aluminum Die Casting | Custom Manufacturing',
    description: isChinese
      ? '专注 ADC12 铝合金压铸件，支持依据客户 3D 图纸定制，并提供加工与质量检验。'
      : 'Custom ADC12 aluminum die castings manufactured from customer 3D drawings, with machining and inspection support.',
    alternates: {
      canonical: localePath,
      languages: {
        en: '/en',
        'zh-CN': '/zh',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Hongmingrui Precision Casting',
      title: 'ADC12 Aluminum Die Casting Manufacturer in China',
      description: 'Custom ADC12 aluminum die castings from 3D drawings. 6000m² factory, 20+ years experience, ISO 9001. Automotive, LED, industrial parts.',
      url: siteUrl,
      locale: isChinese ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <VisitorTracker />
          {children}
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
