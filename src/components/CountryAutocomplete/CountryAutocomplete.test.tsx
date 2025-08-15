import { render, screen, waitFor } from '@testing-library/react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { COUNTRIES } from '../../utils/countries';
import CountryAutocomplete from './CountryAutocomplete';
import { filterCountries } from './CountryAutocomplete.utils';
import userEvent from '@testing-library/user-event';

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn().mockReturnValue({}),
}));
vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn().mockReturnValue({}),
}));
vi.mock('./CountryAutocomplete.utils.ts', () => ({
  filterCountries: vi.fn(),
}));
describe('CountryAutocomplete component', () => {
  const filterCountriesMock = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppSelector).mockReturnValue(COUNTRIES);
    vi.mocked(filterCountries).mockImplementation(filterCountriesMock);
  });
  test('should render without error', () => {
    render(<CountryAutocomplete error="" />);
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  });
  test('should render error', () => {
    render(<CountryAutocomplete error="test error" />);
    expect(screen.getByText('test error')).toBeInTheDocument();
  });
  test('should call filterCountry when user is typing', async () => {
    render(<CountryAutocomplete error="" />);
    userEvent.type(screen.getByRole('combobox', { name: /country/i }), 'Russ');
    await waitFor(() => {
      expect(filterCountriesMock).toHaveBeenCalled();
    });
  });
});
