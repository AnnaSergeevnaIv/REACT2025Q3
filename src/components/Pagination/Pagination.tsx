'use client';
import React from 'react';
import { PAGINATION_BUTTON_CONTAINER_CLASS } from './Pagination.constants';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/routing';
import './Pagination.css';
import { useTranslations } from 'next-intl';
export type PaginationProps = {
  nextDisabled: boolean;
  prevDisabled: boolean;
};

export function Pagination({ nextDisabled, prevDisabled }: PaginationProps) {
  const t = useTranslations('Pagination');
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const pathname = usePathname();
  const router = useRouter();
  const handlePagination = (next: boolean) => {
    const nextPage = next ? +page + 1 : +page - 1;
    const params = new URLSearchParams();
    params.set('page', String(nextPage));
    params.set('search', searchParams?.get('search') || '');
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className={PAGINATION_BUTTON_CONTAINER_CLASS}>
      <button
        onClick={() => {
          handlePagination(false);
        }}
        disabled={prevDisabled}
      >
        {t('previous')}
      </button>
      <button
        onClick={() => {
          handlePagination(true);
        }}
        disabled={nextDisabled}
      >
        {t('next')}
      </button>
    </div>
  );
}
