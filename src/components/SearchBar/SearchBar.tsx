'use client';
import { type ChangeEvent } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  SEARCH_BAR_CLASS,
  SEARCH_BAR_INPUT_CLASS,
  SEARCH_BAR_SEARCH_BUTTON_NAME,
} from './SearchBar.constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { localStorageSearchKey } from '../../app/MainPage.constants';
import './SearchBar.css';

export type SearchBarProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: (value: string) => void;
  value: string;
};

export function SearchBar() {
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
    router.push(`${pathname}?${params.toString()}`);
    setInputValue(value);
  };

  return (
    <div data-testid="search-bar" className={SEARCH_BAR_CLASS}>
      <input
        type="text"
        className={SEARCH_BAR_INPUT_CLASS}
        placeholder="Search character"
        onChange={handleChange}
        value={inputValue}
      />
      <button
        onClick={() => {
          handleClick(inputValue.trim());
        }}
      >
        {SEARCH_BAR_SEARCH_BUTTON_NAME}
      </button>
    </div>
  );
}
