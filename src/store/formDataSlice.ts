import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type FormData } from './countriesSlice.types';
import type { RootState } from './store';
const initialState: FormData = {
  name: '',
  gender: '',
  accept: false,
  image: '',
  country: '',
  age: 1,
  email: '',
  password: '',
  confirmPassword: '',
};
export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    dataAdded: (_state, action: PayloadAction<FormData>) => {
      return action.payload;
    },
  },
});

export const { dataAdded } = formDataSlice.actions;
export const selectFormData = (state: RootState) => state.formData;
export default formDataSlice.reducer;
