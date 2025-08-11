import { type FormData } from '../../store/countriesSlice.types';
export type TextFields = Omit<
  FormData,
  'gender' | 'accept' | 'image' | 'country' | 'age'
> & { age: string };
type InputType = React.InputHTMLAttributes<HTMLInputElement>['type'];

export type InputTypeMap = { [K in keyof TextFields]: InputType };
