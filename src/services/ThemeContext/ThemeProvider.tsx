'use client';
import React from 'react';
import {
  ThemeContext,
  type Theme,
} from '../../services/ThemeContext/ThemeContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <body className={theme}>{children}</body>
    </ThemeContext.Provider>
  );
}
