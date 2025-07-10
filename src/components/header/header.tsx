import { useState, type ChangeEvent } from 'react';
import logo from '../../assets/logo.png';
import {
  HEADER_CLASS,
  HEADER_IMAGE_CLASS,
  HEADER_INPUT_CLASS,
} from './Header.constant';

export interface HeaderProps {
  clickHandle: (value: string) => void;
  value: string;
}

export function Header({ clickHandle, value }: HeaderProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <header className={HEADER_CLASS}>
      <img src={logo} alt="start wars logo" className={HEADER_IMAGE_CLASS} />
      <input
        type="text"
        className={HEADER_INPUT_CLASS}
        placeholder="Search character"
        onChange={handleChange}
        value={inputValue}
      />
      <button
        onClick={() => {
          clickHandle(inputValue.trim());
        }}
      >
        Search
      </button>
    </header>
  );
}
