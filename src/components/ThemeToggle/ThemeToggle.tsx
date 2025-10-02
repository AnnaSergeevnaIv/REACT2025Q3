'use client';
import { useContext } from 'react';
import { ThemeContext } from '../../services/ThemeContext/ThemeContext';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const t = useTranslations('ThemeToggle');
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeToggle = () =>
    setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button onClick={handleThemeToggle}>
      {theme === 'light' ? t('dark') : t('light')}
    </button>
  );
}
