import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectFormData } from '../../store/formDataSlice';
import {
  DISPLAY_CONTAINER_CLASS,
  DISPLAY_CONTAINER_COLOR_CLASS,
  DISPLAY_IMAGE,
  DISPLAY_ROW_CONTAINER_CLASS,
  DISPLAY_ROW_VALUE_CLASS,
} from './FormDataDisplay.constants';
import type { FormDataType } from '../../validation/schema';
import './FormDataDisplay.css';
const keys: Array<keyof FormDataType> = [
  'name',
  'age',
  'email',
  'gender',
  'accepted',
  'password',
  'confirmPassword',
  'country',
  'image',
];

export default function FormDataDisplay() {
  const data = useAppSelector(selectFormData);
  console.log(data);
  const [isDataNew, setIsDataNew] = useState(false);

  useEffect(() => {
    setIsDataNew(true);
    setTimeout(() => {
      setIsDataNew(false);
    }, 3000);
  }, [data]);

  if (data.name !== '') {
    return (
      <div
        className={`${DISPLAY_CONTAINER_CLASS} ${isDataNew ? DISPLAY_CONTAINER_COLOR_CLASS : ''}`}
      >
        {keys.map((elem) =>
          elem === 'image' ? (
            data[elem] !== '' ? (
              <img src={data[elem]} alt={elem} className={DISPLAY_IMAGE} />
            ) : null
          ) : (
            <div className={DISPLAY_ROW_CONTAINER_CLASS} key={elem}>
              <h1>{elem}</h1>
              <p className={DISPLAY_ROW_VALUE_CLASS}>{data[elem]}</p>
            </div>
          )
        )}
      </div>
    );
  }
  return null;
}
