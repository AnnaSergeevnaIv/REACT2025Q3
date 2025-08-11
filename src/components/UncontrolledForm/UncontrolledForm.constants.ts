import type { InputTypeMap, TextFields } from './UncontrolledForm.types';

export const FORM_CONTAINER_CLASS = 'form-container';
export const FORM_RADIO_CLASS = 'radio-container';
export const FORM = {
  gender: 'Gender',
  accept: 'Accept Terms and Conditions agreement ',
  image: 'Image',
  country: 'Country',
} as const;
export const TEXT_FIELDS: TextFields = {
  name: 'Name',
  age: 'Age',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',
} as const;

export const TEXT_FIELD_TYPES: InputTypeMap = {
  name: 'text',
  age: 'number',
  email: 'email',
  password: 'password',
  confirmPassword: 'password',
};
