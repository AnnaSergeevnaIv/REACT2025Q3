import type { ChangeEvent } from 'react';
import {
  SEARCH_BAR_CLASS,
  SEARCH_BAR_INPUT_CLASS,
  SEARCH_BAR_SEARCH_BUTTON_NAME,
} from './SearchBar.constants';
export type SearchBarProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: (value: string) => void;
  value: string;
};
export function SearchBar({ onChange, onClick, value }: SearchBarProps) {
  return (
    <div data-testid="search-bar" className={SEARCH_BAR_CLASS}>
      <input
        type="text"
        className={SEARCH_BAR_INPUT_CLASS}
        placeholder="Search character"
        onChange={onChange}
        value={value}
      />
      <button
        onClick={() => {
          onClick(value.trim());
        }}
      >
        {SEARCH_BAR_SEARCH_BUTTON_NAME}
      </button>
    </div>
  );
}
