import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { PhotoCharacterData } from '../App';
import type { RootState } from './store';
import { getPhotoData } from '../services/network-requests/network-requests';
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchPhotos.fulfilled,
        (state, action: PayloadAction<PhotoCharacterData[]>) => {
          state.status = 'succeeded';
          state.photos = action.payload;
        }
      )
      .addCase(fetchPhotos.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
  return await getPhotoData();
});

export default photosSlice.reducer;
export const selectPhotoStatus = (state: RootState) => state.photos.status;
export const selectPhotos = (state: RootState) => state.photos.photos;
