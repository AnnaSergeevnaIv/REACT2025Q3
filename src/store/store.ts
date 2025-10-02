import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';

export const store = configureStore({
  reducer: {
    checkedCharacters: characterReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
