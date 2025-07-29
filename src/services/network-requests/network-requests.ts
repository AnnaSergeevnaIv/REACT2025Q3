import { type AxiosResponse } from 'axios';
import { APIServiceCharacters } from '../api-service';
import type { LoaderFunctionArgs } from 'react-router';

export interface ResponseCharacters {
  results: FullCharacterData[];
  previous: string | undefined;
  next: string | undefined;
}

export interface FullCharacterData {
  name: string;
  eye_color: string;
  height: number;
  url: string;
  image?: string;
  hair_color: string;
  mass: string;
  skin_color: string;
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

export async function characterDetailLoader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) {
    throw new Response('Character ID not provided', { status: 400 });
  }
  return await getCharacter(id);
}
