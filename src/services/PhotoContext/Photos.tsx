import React from 'react';
import { PhotoCharacterData } from '../api';
import { baseURLCharactersPhotos } from '../../constants/constants';
import PhotosProvider from './PhotoProv';

export async function Photos({ children }: { children: React.ReactNode }) {
  const photos = await fetch(`${baseURLCharactersPhotos}`);
  const photosJson: PhotoCharacterData[] = await photos.json();
  return <PhotosProvider value={photosJson}>{children}</PhotosProvider>;
}
