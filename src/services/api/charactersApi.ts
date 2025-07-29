import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURLCharacters } from '../../constants/constants';
import type {
  FullCharacterData,
  ResponseCharacters,
} from '../network-requests/network-requests';

interface QueryParams {
  search?: string;
  page: number;
}
export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  tagTypes: ['Characters'],
  baseQuery: fetchBaseQuery({ baseUrl: baseURLCharacters }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ResponseCharacters, QueryParams>({
      query: (queryParams) => ({
        url: `${queryParams.search ? `?search=${queryParams.search}&page=${queryParams.page}` : `?page=${queryParams.page}`}`,
      }),
    }),
    getCharacter: builder.query<FullCharacterData, string>({
      query: (id) => ({ url: `/${id}` }),
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = charactersApi;
