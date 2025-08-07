import { createContext } from 'react';
import { PhotoCharacterData } from '../api';

export const PhotoContext = createContext<PhotoCharacterData[]>([]);
