import { useRef, useState, type FormEventHandler } from 'react';
import {
  FORM,
  FORM_CONTAINER_CLASS,
  TEXT_FIELD_TYPES,
  TEXT_FIELDS,
} from './UncontrolledForm.constants';
import Field from '../Field';
import RadioField from '../RadioField';
import CountryAutocomplete from '../CountryAutocomplete';
import './UncontrolledForm.css';
import { formSchema } from '../../validation/schema';
import type { ValidationError } from './UncontrolledForm.types';

export default function UncontrolledForm() {
  const ref = useRef<HTMLFormElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationError>({});
  const submitHandle: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!ref.current) return;
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const errors: ValidationError = {};
      const flattened = result.error.flatten();
      for (const [field, messages] of Object.entries(flattened.fieldErrors)) {
        if (messages && messages.length > 0) {
          errors[field] = messages[0];
        }
      }
      setErrors(errors);
      console.log(errors);
    }
    console.log(data);
  };

  const acceptName = FORM.accept.split(' ')[0].toLowerCase();

  return (
    <form className={FORM_CONTAINER_CLASS} ref={ref} onSubmit={submitHandle}>
      {(Object.keys(TEXT_FIELDS) as Array<keyof typeof TEXT_FIELDS>).map(
        (field, index) => {
          return (
            <Field
              key={field}
              name={field}
              text={TEXT_FIELDS[field]}
              type={TEXT_FIELD_TYPES[field]}
              id={field}
              ref={index === 0 ? firstInputRef : undefined}
              errorIsNeeded={true}
              error={errors[field] ?? ''}
            />
          );
        }
      )}
      <RadioField
        legend={FORM.gender}
        radioNames={['Female', 'Male']}
        error={errors[FORM.gender.toLowerCase()] ?? ''}
      />
      <Field
        name={acceptName}
        text={FORM.accept}
        type="checkbox"
        id={acceptName}
        errorIsNeeded={true}
        error={errors[acceptName] ?? ''}
      />
      <Field
        name={FORM.image.toLowerCase()}
        text={FORM.image}
        type="file"
        id={FORM.image.toLowerCase()}
        errorIsNeeded={true}
        error={errors[FORM.image.toLowerCase()] ?? ''}
      />
      <CountryAutocomplete error={errors[FORM.country.toLowerCase()] ?? ''} />
      <input type="submit" />
    </form>
  );
}
