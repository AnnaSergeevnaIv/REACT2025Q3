import { useContext, useState, type ChangeEvent } from 'react';
import logo from '../../assets/logo.png';
import {
  HEADER_ABOUT_BUTTON_NAME,
  HEADER_CLASS,
  HEADER_IMAGE_CLASS,
  HEADER_INPUT_CLASS,
  HEADER_SEARCH_BUTTON_NAME,
  HEADER_THEME_DARK_BUTTON_NAME,
  HEADER_THEME_LIGHT_BUTTON_NAME,
} from './Header.constant';
import { useNavigate } from 'react-router';
import { ThemeContext } from '../../services/ThemeContext';

export interface HeaderProps {
  clickHandle: (value: string) => void;
  value: string;
}

export function Header({ clickHandle, value }: HeaderProps) {
  const [inputValue, setInputValue] = useState(value);
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleThemeToggle = () =>
    setTheme(theme === 'light' ? 'dark' : 'light');

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
        {HEADER_SEARCH_BUTTON_NAME}
      </button>
      <button
        onClick={() => {
          navigate('/about');
        }}
      >
        {HEADER_ABOUT_BUTTON_NAME}
      </button>
      <button onClick={handleThemeToggle}>
        {theme === 'light'
          ? HEADER_THEME_DARK_BUTTON_NAME
          : HEADER_THEME_LIGHT_BUTTON_NAME}
      </button>
    </header>
  );
}
