import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
