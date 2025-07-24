import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PhotoCharacterData } from '../App';
import type { RootState } from './store';
interface PhotosState {
  photos: PhotoCharacterData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
const initialState: PhotosState = {
  photos: [],
  status: 'idle',
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    photosLoaded: (state, action: PayloadAction<PhotoCharacterData[]>) => {
      state.photos = action.payload;
      state.status = 'succeeded';
    },
  },
});

export default photosSlice.reducer;
export const { photosLoaded } = photosSlice.actions;
export const selectPhotoStatus = (state: RootState) => state.photos.status;
export const selectPhotos = (state: RootState) => state.photos.photos;
