'use client';
import { PhotoCharacterData } from '../api';
import { PhotoContext } from './PhotoContext';

import React from 'react';

interface PhotoProviderProps {
  children: React.ReactNode;
  value: PhotoCharacterData[];
}

export default function PhotosProvider({
  children,
  value,
}: PhotoProviderProps) {
  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
}
