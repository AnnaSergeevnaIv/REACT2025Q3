import { type AxiosResponse } from 'axios';
import {
  APIServiceCharacters,
  APIServiceCharactersPhoto,
} from '../api-service';
import type { PhotoCharacterData } from '../../App';
import type { LoaderFunctionArgs } from 'react-router';

export interface CharacterData {
  name: string;
  eye_color: string;
  height: number;
  url: string;
  image?: string;
}
interface ResponseCharacters<T> {
  results: T;
  previous: string | undefined;
  next: string | undefined;
}

export interface FullCharacterData extends CharacterData {
  hair_color: string;
  mass: string;
  skin_color: string;
}
export async function getCharacters(search: string, page: number) {
  try {
    const response: AxiosResponse<ResponseCharacters<CharacterData[]>> =
      await APIServiceCharacters.get(
        search ? `?search=${search}&page=${page}` : `?page=${page}`
      );
    console.log(response);
    const data: ResponseCharacters<CharacterData[]> = {
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

export async function getCharacter(id: string) {
  try {
    const response: AxiosResponse<FullCharacterData> =
      await APIServiceCharacters.get(`/${id}`);
    console.log(response);
    return { data: response.data, error: undefined };
  } catch (error) {
    return {
      data: undefined,
      error: error instanceof Error ? error.message : 'Unknown error',
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

export async function characterDetailLoader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) {
    throw new Response('Character ID not provided', { status: 400 });
  }
  return await getCharacter(id);
}
