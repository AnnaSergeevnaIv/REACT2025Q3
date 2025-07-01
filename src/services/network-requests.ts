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
  console.log('getCharacters', search);
  const response: AxiosResponse<ResponseCharacters> =
    await APIServiceCharacters.get(search ? `?search=${search}` : ``);
  console.log(response);
  return response.data.results;
}

export async function getPhotoData() {
  const response: AxiosResponse<PhotoCharacterData[]> =
    await APIServiceCharactersPhoto.get('');
  const data = response.data;
  console.log('data from axios', data);
  return data;
}
