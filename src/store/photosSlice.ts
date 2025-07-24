import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { PhotoCharacterData } from '../App';
import type { RootState } from './store';
import { getPhotoData } from '../services/network-requests/network-requests';
import { createEntityAdapter, type EntityState } from '@reduxjs/toolkit';

type PhotoCharacterDataWithId = { id: string; image: string };
interface PhotosState extends EntityState<PhotoCharacterDataWithId, string> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const photoAdapter = createEntityAdapter<PhotoCharacterDataWithId>();
const initialState: PhotosState = photoAdapter.getInitialState({
  status: 'idle',
});

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
          const photosWithId: PhotoCharacterDataWithId[] = action.payload.map(
            (photo) => ({ image: photo.image, id: photo.name })
          );
          photoAdapter.setAll(state, photosWithId);
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
// export const selectPhotos = (state: RootState) => state.photos.photos;
export const { selectAll: selectAllPhotos, selectById: selectPhotoById } =
  photoAdapter.getSelectors((state: RootState) => state.photos);
