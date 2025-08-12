import { type FormDataType } from '../../validation/schema';
export type TextFields = Omit<
  FormDataType,
  'gender' | 'accepted' | 'image' | 'country' | 'age'
> & { age: string };
type InputType = React.InputHTMLAttributes<HTMLInputElement>['type'];

export type InputTypeMap = { [K in keyof TextFields]: InputType };

export type ValidationError = Record<string, string>;
