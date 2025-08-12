import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type FormDataType } from '../validation/schema';
import type { RootState } from './store';
const initialState: FormDataType = {
  name: '',
  gender: 'male',
  accept: true,
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
    dataAdded: (_state, action: PayloadAction<FormDataType>) => {
      return action.payload;
    },
  },
});

export const { dataAdded } = formDataSlice.actions;
export const selectFormData = (state: RootState) => state.formData;
export default formDataSlice.reducer;
