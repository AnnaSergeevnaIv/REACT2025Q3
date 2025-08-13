import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type FormReduxDataType } from '../components/UncontrolledForm';
import type { RootState } from './store';
export const initialState: FormReduxDataType = {
  name: '',
  gender: 'male',
  accepted: '',
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
    dataAdded: (_state, action: PayloadAction<FormReduxDataType>) => {
      return action.payload;
    },
  },
});

export const { dataAdded } = formDataSlice.actions;
export const selectFormData = (state: RootState) => state.formData;
export default formDataSlice.reducer;
