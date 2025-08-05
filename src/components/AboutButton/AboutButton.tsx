'use client';
import React from 'react';
import { useRouter } from '../../i18n/routing';
import { useTranslations } from 'next-intl';
export function AboutButton() {
  const t = useTranslations('AboutButton');
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push('/about');
      }}
    >
      {t('about')}
    </button>
  );
}
