import type { UseFormRegister } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import Field from '../Field';
import {
  RADIO_FIELD_CONTAINER_CLASS,
  RADIO_FIELD_RADIO,
} from './RadioField.constants';
interface RadioFieldProps {
  legend: string;
  radioNames: string[];
  error: string;
  name: keyof FormDataType;
  register?: UseFormRegister<FormDataType>;
}
import './RadioField.css';
import type { FormDataType } from '../../validation/schema';

export default function RadioField({
  legend,
  radioNames,
  error,
  name,
  register,
}: RadioFieldProps) {
  return (
    <div className={RADIO_FIELD_CONTAINER_CLASS}>
      <fieldset className={RADIO_FIELD_RADIO}>
        <legend>{legend}</legend>
        {radioNames.map((radio) => (
          <Field
            name={name}
            id={radio.toLowerCase()}
            text={radio}
            type="radio"
            key={radio}
            errorIsNeeded={false}
            register={register}
          />
        ))}
      </fieldset>
      <ErrorMessage message={error} />
    </div>
  );
}
