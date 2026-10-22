import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import '../globals.css';

export const metadata: Metadata = {
  title: 'ADC12 Aluminum Die Casting | Custom Manufacturing',
  description: 'Custom ADC12 aluminum die casting parts built to your drawings. Automotive, motorcycle, industrial and custom manufacturing solutions.'
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

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
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}