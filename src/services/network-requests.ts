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
  previous: string | undefined;
  next: string | undefined;
}

export async function getCharacters(search: string, page: number) {
  try {
    const response: AxiosResponse<ResponseCharacters> =
      await APIServiceCharacters.get(
        search ? `?search=${search}&page=${page}` : `?page=${page}`
      );
    const data: ResponseCharacters = {
      results: response.data.results,
      previous: response.data.previous,
      next: response.data.next,
    };
    return { error: undefined, data: data };
  } catch (error) {
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
