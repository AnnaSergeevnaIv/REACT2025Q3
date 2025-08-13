import { useEffect } from 'react';
import {
  FIELD_CONTAINER_CLASS,
  FIELD_INPUT_CLASS,
  FIELD_INPUT_CONTAINER_CLASS,
} from './Field.constants';
import './Field.css';
import ErrorMessage from '../ErrorMessage';
import type { UseFormRegister } from 'react-hook-form';
import type { FormDataType } from '../../validation/schema';
interface FieldProps {
  name: keyof FormDataType;
  text: string;
  error?: string;
  id: string;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  ref?: React.RefObject<HTMLInputElement | null>;
  errorIsNeeded: boolean;
  register?: UseFormRegister<FormDataType>;
}
export default function Field({
  name,
  id,
  text,
  type,
  ref,
  error = '',
  errorIsNeeded,
  register,
}: FieldProps) {
  useEffect(() => {
    if (!ref) return;
    if (ref.current === null) return;
    ref.current.focus();
  }, [ref]);
  return (
    <div className={FIELD_CONTAINER_CLASS}>
      <div className={FIELD_INPUT_CONTAINER_CLASS}>
        <label htmlFor={id}>{text}</label>
        <input
          {...(register ? register(name) : {})}
          ref={(el) => {
            if (ref) ref.current = el;
            if (register) register(name).ref(el);
          }}
          className={FIELD_INPUT_CLASS}
          type={type}
          id={id}
          placeholder={`Enter ${text.toLowerCase()}`}
          name={name}
          value={type === 'radio' ? id : undefined}
          accept={type === 'file' ? 'image/png,image/jpeg' : undefined}
        />
      </div>
      {errorIsNeeded ? <ErrorMessage message={error} /> : null}
    </div>
  );
}
