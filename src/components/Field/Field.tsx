import { useEffect } from 'react';
import {
  FIELD_CONTAINER_CLASS,
  FIELD_ERROR_CLASS,
  FIELD_INPUT_CLASS,
} from './Field.constants';
import './Field.css';
interface FieldProps {
  name: string;
  text: string;
  error?: string;
  id: string;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  ref?: React.RefObject<HTMLInputElement | null>;
}
export default function Field({
  name,
  id,
  text,
  type,
  ref,
  error = '',
}: FieldProps) {
  useEffect(() => {
    if (!ref) return;
    if (ref.current === null) return;
    ref.current.focus();
  }, [ref]);
  return (
    <div className={FIELD_CONTAINER_CLASS}>
      <label htmlFor={id}>{text}</label>
      <input
        ref={ref}
        className={FIELD_INPUT_CLASS}
        type={type}
        id={id}
        placeholder={`Enter ${text.toLowerCase()}`}
        name={name}
        value={type === 'radio' ? id : undefined}
        accept={type === 'file' ? 'image/png,image/jpeg' : undefined}
      />
      <p className={FIELD_ERROR_CLASS}>{error}</p>
    </div>
  );
}
