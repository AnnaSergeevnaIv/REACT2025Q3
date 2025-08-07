'use client';
import { type ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/routing';
import {
  SEARCH_BAR_CLASS,
  SEARCH_BAR_INPUT_CLASS,
} from './SearchBar.constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { localStorageSearchKey } from './SearchBar.constants';
import './SearchBar.css';
import React from 'react';
import { useTranslations } from 'next-intl';
export type SearchBarProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: (value: string) => void;
  value: string;
};

export function SearchBar() {
  const t = useTranslations('SearchBar');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [inputValue, setInputValue] = useLocalStorage<string>(
    localStorageSearchKey,
    searchParams?.get('search') || ''
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (value.trim()) {
      params.set('search', value.trim());
      params.set('page', '1');
    } else {
      params.delete('search');
    }
    router.push(
      `${pathname === '/about' ? '/' : pathname}?${params.toString()}`
    );
    setInputValue(value);
  };

  return (
    <div data-testid="search-bar" className={SEARCH_BAR_CLASS}>
      <input
        type="text"
        className={SEARCH_BAR_INPUT_CLASS}
        placeholder={t('searchPlaceholder')}
        onChange={handleChange}
        value={inputValue}
      />
      <button
        onClick={() => {
          handleClick(inputValue.trim());
        }}
      >
        {t('searchButton')}
      </button>
    </div>
  );
}
