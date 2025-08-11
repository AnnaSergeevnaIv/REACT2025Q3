import { selectCountries } from '../../store/countriesSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import './CountryAutocomplete.css';
import {
  COUNTRY_CONTAINER_CLASS,
  COUNTRY_INPUT_CLASS,
} from './CountryAutocomplete.constants';
import { useState, type ChangeEventHandler } from 'react';
import { filterCountries } from './CountryAutocomplete.utils';
export default function CountryAutocomplete() {
  const countriesFromRedux = useAppSelector(selectCountries);
  const [countries, setCountries] = useState<string[]>(countriesFromRedux);
  const onChangeHandle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCountries(filterCountries(countriesFromRedux, event.target.value));
  };
  return (
    <div className={COUNTRY_CONTAINER_CLASS}>
      <label htmlFor="country">Country</label>
      <input
        id="country"
        name="country"
        list="countries"
        className={COUNTRY_INPUT_CLASS}
        onChange={onChangeHandle}
        placeholder="Enter country"
        autoComplete="off"
      />
      <datalist id="countries">
        {countries.map((country: string) => (
          <option key={country} value={country} />
        ))}
      </datalist>
    </div>
  );
}
