import { COUNTRIES } from '../../utils/countries';
import { filterCountries } from './CountryAutocomplete.utils';

describe('CountryAutocomplete filterCountries function', () => {
  test("should return ['Belarus', 'Cyprus', 'Russia'] with rus value", () => {
    const result = filterCountries(COUNTRIES, 'rus');
    expect(result).toStrictEqual(['Belarus', 'Cyprus', 'Russia']);
  });
  test("should return COUNTRIES with '' value", () => {
    const result = filterCountries(COUNTRIES, '');
    expect(result).toStrictEqual(COUNTRIES);
  });
});
