import { type AxiosResponse } from 'axios';
import { APIServiceCharacters, APIServiceCharactersPhoto } from './api-service';
import type { PhotoCharacterData } from '../App';
import type { LoaderFunctionArgs } from 'react-router';

export interface CharacterData {
  name: string;
  eye_color: string;
  height: number;
  image?: string;
}
interface ResponseCharacters {
  results: CharacterData[];
}

export async function getCharacters(search: string, page: number) {
  try {
    const response: AxiosResponse<ResponseCharacters> =
      await APIServiceCharacters.get(
        search ? `?search=${search}` : `?page=${page}`
      );
    console.log('response', response, response.data.results);
    return { error: undefined, data: response.data.results ?? [] };
  } catch (error) {
    console.log(error);
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
      data: undefined,
    };
  }
}

export async function getPhotoData() {
  const response: AxiosResponse<PhotoCharacterData[]> =
    await APIServiceCharactersPhoto.get('');
  const data = response.data;
  return data;
}

export async function charactersLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const page = url.searchParams.get('page') || '1';

  return await getCharacters(search, parseInt(page));
}
