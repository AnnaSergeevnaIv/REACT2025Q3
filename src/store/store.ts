import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';
import photosReducer from './photosSlice';

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    photos: photosReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
