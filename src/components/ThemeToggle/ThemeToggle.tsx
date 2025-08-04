'use client';
import { useContext } from 'react';
import { ThemeContext } from '../../services/ThemeContext/ThemeContext';
import {
  THEME_DARK_BUTTON_NAME,
  THEME_LIGHT_BUTTON_NAME,
} from './ThemeToggle.constants';

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeToggle = () =>
    setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button onClick={handleThemeToggle}>
      {theme === 'light' ? THEME_DARK_BUTTON_NAME : THEME_LIGHT_BUTTON_NAME}
    </button>
  );
}
