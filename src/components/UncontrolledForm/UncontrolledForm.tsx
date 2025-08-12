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
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { dataAdded } from '../../store/formDataSlice';
import { fileToBase64 } from '../../utils/fileToBase64';

export default function UncontrolledForm({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) {
  const ref = useRef<HTMLFormElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationError>({});
  const dispatch = useAppDispatch();

  const submitHandle: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!ref.current) return;
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const result = formSchema.safeParse(data);
    console.log(data);
    if (!result.success) {
      const errors: ValidationError = {};
      const flattened = result.error.flatten();
      for (const [field, messages] of Object.entries(flattened.fieldErrors)) {
        if (messages && messages.length > 0) {
          errors[field] = messages[0];
        }
      }
      setErrors(errors);
    } else {
      const file = fileInputRef.current?.files?.[0] ?? null;
      const image = file ? await fileToBase64(file) : '';
      const data = { ...result.data, image: image };
      dispatch(dataAdded(data));
      setIsModalOpen(false);
    }
  };

  const acceptName = FORM.accepted.split(' ')[0].toLowerCase() + 'ed';

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
        text={FORM.accepted}
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
        ref={fileInputRef}
      />
      <CountryAutocomplete error={errors[FORM.country.toLowerCase()] ?? ''} />
      <input type="submit" />
    </form>
  );
}
