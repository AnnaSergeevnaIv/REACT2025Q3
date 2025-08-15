import { type FormReduxDataType } from '../components/UncontrolledForm';
import type { FormDataType } from '../validation/schema';

export const mockReduxFormData: FormReduxDataType = {
  name: 'John',
  email: 'john.doe@example.com',
  country: 'United States',
  image: 'https://via.placeholder.com/150',
  gender: 'male',
  age: '25',
  password: 'Qwerty!11',
  confirmPassword: 'Qwerty!11',
  accepted: true,
};
export const mockFormData: FormDataType = {
  name: 'John',
  email: 'john.doe@example.com',
  country: 'United States',
  image: 'https://via.placeholder.com/150',
  gender: 'male',
  age: '25',
  password: 'Qwerty!11',
  confirmPassword: 'Qwerty!11',
  accepted: true,
};
