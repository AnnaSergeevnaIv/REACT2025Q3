import Field from '../Field';
interface RadioFieldProps {
  legend: string;
  radioNames: string[];
}

export default function RadioField({ legend, radioNames }: RadioFieldProps) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      {radioNames.map((radio) => (
        <Field
          name={legend.toLowerCase()}
          id={radio.toLowerCase()}
          text={radio}
          type="radio"
          key={radio}
        />
      ))}
    </fieldset>
  );
}
