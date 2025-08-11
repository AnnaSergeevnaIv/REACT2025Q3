import { useRef, type FormEventHandler } from 'react';
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
export default function UncontrolledForm() {
  const ref = useRef<HTMLFormElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const submitHandle: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!ref.current) return;
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
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
            />
          );
        }
      )}
      <RadioField legend={FORM.gender} radioNames={['Female', 'Male']} />
      <Field
        name={acceptName}
        text={FORM.accept}
        type="checkbox"
        id={acceptName}
      />
      <Field
        name={FORM.image.toLowerCase()}
        text={FORM.image}
        type="file"
        id={FORM.image.toLowerCase()}
      />
      <CountryAutocomplete />
      <input type="submit" />
    </form>
  );
}
