import Field from '../Field';
import {
  RADIO_FIELD_CONTAINER_CLASS,
  RADIO_FIELD_ERROR_CLASS,
  RADIO_FIELD_RADIO,
} from './RadioField.constants';
interface RadioFieldProps {
  legend: string;
  radioNames: string[];
  error: string;
}
import './RadioField.css';

export default function RadioField({
  legend,
  radioNames,
  error,
}: RadioFieldProps) {
  return (
    <div className={RADIO_FIELD_CONTAINER_CLASS}>
      <fieldset className={RADIO_FIELD_RADIO}>
        <legend>{legend}</legend>
        {radioNames.map((radio) => (
          <Field
            name={legend.toLowerCase()}
            id={radio.toLowerCase()}
            text={radio}
            type="radio"
            key={radio}
            errorIsNeeded={false}
          />
        ))}
      </fieldset>
      <p className={RADIO_FIELD_ERROR_CLASS}>{error}</p>
    </div>
  );
}
