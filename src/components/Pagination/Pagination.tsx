'use client';
import React from 'react';
import {
  PAGINATION_BUTTON_CONTAINER_CLASS,
  PAGINATION_BUTTON_NEXT_NAME,
  PAGINATION_BUTTON_PREV_NAME,
} from './Pagination.constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import './Pagination.css';

export type PaginationProps = {
  // onClick: (next: boolean) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
};

export function Pagination({
  // onClick,
  nextDisabled,
  prevDisabled,
}: PaginationProps) {
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
        {PAGINATION_BUTTON_PREV_NAME}
      </button>
      <button
        onClick={() => {
          handlePagination(true);
        }}
        disabled={nextDisabled}
      >
        {PAGINATION_BUTTON_NEXT_NAME}
      </button>
    </div>
  );
}
