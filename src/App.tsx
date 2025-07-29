import { ErrorBoundary } from './services/ErrorBoundary';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Outlet } from 'react-router';
import { ThemeContext, type Theme } from './services/ThemeContext';

export default function App() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');
  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`${theme} app-container`}>
          <Outlet />
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}
