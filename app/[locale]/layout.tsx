import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import VisitorTracker from '@/components/VisitorTracker';
import '../globals.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isChinese = locale === 'zh';

  return {
    title: isChinese ? 'ADC12 铝合金压铸 | 按图定制制造' : 'ADC12 Aluminum Die Casting | Custom Manufacturing',
    description: isChinese
      ? '专注 ADC12 铝合金压铸件，支持依据客户 3D 图纸定制，并提供加工与质量检验。'
      : 'Custom ADC12 aluminum die castings manufactured from customer 3D drawings, with machining and inspection support.'
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <VisitorTracker />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
