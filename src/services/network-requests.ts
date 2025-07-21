import { type AxiosResponse } from 'axios';
import { APIServiceCharacters, APIServiceCharactersPhoto } from './api-service';
import type { PhotoCharacterData } from '../App';

export interface CharacterData {
  name: string;
  eye_color: string;
  height: number;
  image?: string;
}
interface ResponseCharacters {
  results: CharacterData[];
}

export async function getCharacters(search: string = '') {
  try {
    const response: AxiosResponse<ResponseCharacters> =
      await APIServiceCharacters.get(search ? `?search=${search}` : ``);
    return response.data.results ?? [];
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

export async function getPhotoData() {
  const response: AxiosResponse<PhotoCharacterData[]> =
    await APIServiceCharactersPhoto.get('');
  const data = response.data;
  return data;
}
