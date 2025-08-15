import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';
import formDataReducer from './formDataSlice';
export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    formData: formDataReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
