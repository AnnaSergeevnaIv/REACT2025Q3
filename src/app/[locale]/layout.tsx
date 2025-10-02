import '@/index.css';
import { ThemeProvider } from '@/services/ThemeContext';
import { Header } from '@/components/header';
import { ReduxProvider } from '@/services/ReduxProvider/ReduxProvider';
import { Photos } from '@/services/PhotoContext';
import React from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ErrorBoundary } from '@/services/ErrorBoundary';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <ErrorBoundary>
        <ThemeProvider>
          <ReduxProvider>
            <Photos>
              <NextIntlClientProvider>
                <div className="app-container">
                  <div className="main-page">
                    <Header />
                    {children}
                  </div>
                </div>
              </NextIntlClientProvider>
            </Photos>
          </ReduxProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </html>
  );
}
