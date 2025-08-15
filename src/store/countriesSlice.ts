import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../utils/countries';
import type { RootState } from './store';

const initialState: string[] = COUNTRIES;

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: RootState) => state.countries;
export default countriesSlice.reducer;
