'use client';
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('LanguageSwitcher');
  const nextLocale = locale === 'en' ? 'ru' : 'en';
  const handleLanguageChange = () => {
    const currentParams = new URLSearchParams(searchParams?.toString() || '');
    const newPath =
      pathname +
      (currentParams.toString() ? `?${currentParams.toString()}` : '');
    router.replace(newPath, { locale: nextLocale });
  };

  return <button onClick={handleLanguageChange}>{t(nextLocale)}</button>;
}
