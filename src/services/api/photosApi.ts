import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURLCharactersPhotos } from '../../constants/constants';
import * as v from 'valibot';

const photoSchema = v.object({
  name: v.string(),
  image: v.string(),
});
type Photo = v.InferOutput<typeof photoSchema>;
const transformedPhotosSchema = v.record(
  v.string(),
  v.object({
    image: v.string(),
  })
);
type TransformedPhotos = Record<string, { image: string }>;

export const photosApi = createApi({
  reducerPath: 'photosApi',
  tagTypes: ['Photos'],
  baseQuery: fetchBaseQuery({ baseUrl: baseURLCharactersPhotos }),
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], undefined>({
      query: () => '',
      responseSchema: v.array(photoSchema),
    }),
    getTransformedPhotos: builder.query<TransformedPhotos, undefined>({
      query: () => '',
      rawResponseSchema: v.array(photoSchema),
      transformResponse: (response: Photo[]) => {
        return response.reduce(
          (acc, photo) => ({ ...acc, [photo.name]: { image: photo.image } }),
          {}
        );
      },
      responseSchema: transformedPhotosSchema,
    }),
  }),
});

export const { useGetTransformedPhotosQuery } = photosApi;
