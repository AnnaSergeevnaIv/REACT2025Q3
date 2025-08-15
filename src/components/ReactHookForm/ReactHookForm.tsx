import { useForm } from 'react-hook-form';
import {
  FORM,
  TEXT_FIELDS,
  TEXT_FIELD_TYPES,
  acceptName,
  type FormReduxDataType,
} from '../UncontrolledForm';
import { formSchema, type FormDataType } from '../../validation/schema';
import Field from '../Field';
import { zodResolver } from '@hookform/resolvers/zod';
import RadioField from '../RadioField';
import CountryAutocomplete from '../CountryAutocomplete';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fileToBase64 } from '../../utils/fileToBase64';
import { dataAdded } from '../../store/formDataSlice';

export default function ReactHookForm({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  });
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit(async (data) => {
    const imageString = await fileToBase64(data.image);
    const dataForSubmit: FormReduxDataType = { ...data, image: imageString };
    dispatch(dataAdded(dataForSubmit));
    setIsModalOpen(false);
  });
  console.log('errors', errors);
  return (
    <form onSubmit={onSubmit} data-testid="react-hook-form">
      {(Object.keys(TEXT_FIELDS) as Array<keyof typeof TEXT_FIELDS>).map(
        (field) => {
          return (
            <Field
              key={field}
              name={field}
              id={field}
              text={TEXT_FIELDS[field]}
              errorIsNeeded={true}
              type={TEXT_FIELD_TYPES[field]}
              register={register}
              error={errors[field]?.message}
            />
          );
        }
      )}
      <RadioField
        legend={FORM.gender}
        name="gender"
        radioNames={['female', 'male']}
        register={register}
        error={errors['gender']?.message ?? ''}
      />
      <Field
        name="accepted"
        text={FORM.accepted}
        type="checkbox"
        id={acceptName}
        errorIsNeeded={true}
        error={errors['accepted']?.message ?? ''}
        register={register}
      />
      <Field
        name="image"
        text={FORM.image}
        type="file"
        id={FORM.image.toLowerCase()}
        errorIsNeeded={true}
        error={
          typeof errors['image']?.message === 'string'
            ? errors['image']?.message
            : ''
        }
        register={register}
      />
      <CountryAutocomplete
        error={errors['country']?.message ?? ''}
        register={register}
      />
      <input type="submit" disabled={Object.keys(errors).length > 0} />
    </form>
  );
}
