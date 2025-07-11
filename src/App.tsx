import { useEffect } from 'react';
import { getPhotoData } from './services/network-requests';
import { localStoragePhotoKey } from './constants/constants';
import { MainPage } from './pages/MainPage';
import { ErrorBoundary } from './services/ErrorBoundary';
import { useLocalStorage } from './hooks/useLocalStorage';

export interface PhotoCharacterData {
  name: string;
  image: string;
}

export default function App() {
  const [photoData, setPhotoData] = useLocalStorage<PhotoCharacterData[]>(
    localStoragePhotoKey,
    []
  );
  useEffect(() => {
    async function getPhotos() {
      if (photoData.length > 0) {
        return;
      }
      const photoDataFromAPI = await getPhotoData();
      setPhotoData(photoDataFromAPI);
    }
    getPhotos();
  }, []);

  return (
    <ErrorBoundary
      fallback={<h1>Something went wrong. Please refresh the page </h1>}
    >
      <MainPage photoData={photoData} />
    </ErrorBoundary>
  );
}
