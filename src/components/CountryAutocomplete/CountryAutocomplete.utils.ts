export function filterCountries(countries: string[], value: string) {
  if (value === '') return countries;
  return countries.filter((country) =>
    country.toLowerCase().includes(value.toLowerCase())
  );
}
