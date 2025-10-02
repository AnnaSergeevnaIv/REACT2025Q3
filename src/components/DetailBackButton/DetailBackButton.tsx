'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '../../i18n/routing';
import React from 'react';
import { useTranslations } from 'next-intl';
export function DetailBackButton() {
  const t = useTranslations('DetailBackButton');
  const router = useRouter();
  const params = useSearchParams();
  const backHandle = () => {
    router.push(`/?${params}`);
  };
  return <button onClick={backHandle}>{t('back')}</button>;
}
