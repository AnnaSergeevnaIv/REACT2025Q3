import { createContext } from 'react';
import type { PhotoCharacterData } from '../App';

export const PhotoContext = createContext<PhotoCharacterData[]>([]);
