import type { UseFormRegister } from 'react-hook-form';
import type { FormDataType } from '../../validation/schema';
export interface FieldProps {
  name: keyof FormDataType;
  text: string;
  error?: string;
  id: string;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  ref?: React.RefObject<HTMLInputElement | null>;
  errorIsNeeded: boolean;
  register?: UseFormRegister<FormDataType>;
}
