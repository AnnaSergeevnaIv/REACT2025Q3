import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';
import { charactersApi, photosApi } from '../services/api';

export const store = configureStore({
  reducer: {
    [photosApi.reducerPath]: photosApi.reducer,
    [charactersApi.reducerPath]: charactersApi.reducer,

    characters: characterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      photosApi.middleware,
      charactersApi.middleware
    ),
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
