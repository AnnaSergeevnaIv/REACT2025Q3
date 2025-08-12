import { useEffect } from 'react';
import { ErrorBoundary } from './services/ErrorBoundary';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Outlet } from 'react-router';
import { ThemeContext, type Theme } from './services/ThemeContext';
import { useAppSelector } from './hooks/useAppSelector';
import {
  fetchPhotos,
  selectAllPhotos,
  selectPhotoStatus,
} from './store/photosSlice';
import { useAppDispatch } from './hooks/useAppDispatch';

export interface PhotoCharacterData {
  name: string;
  image: string;
}

export default function App() {
  const photoData = useAppSelector(selectAllPhotos);
  const photoDataStatus = useAppSelector(selectPhotoStatus);
  const dispatch = useAppDispatch();

  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');
  useEffect(() => {
    async function getPhotos() {
      if (photoDataStatus === 'idle') {
        dispatch(fetchPhotos());
      }
    }
    getPhotos();
  }, [photoData, dispatch, photoDataStatus]);

  return (
    <ErrorBoundary
      fallback={<h1>Something went wrong. Please refresh the page </h1>}
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`${theme} app-container`}>
          <Outlet />
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}
