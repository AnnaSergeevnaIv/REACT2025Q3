import { render, screen, waitFor } from '@testing-library/react';
import MainPage from './MainPage';
import userEvent from '@testing-library/user-event';
import { COUNTRIES } from '../../utils/countries';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  BUTTON_REACT_HOOK_FORM,
  BUTTON_UNCONTROLLED_FORM,
} from '../../components/FormSwitchButtons';
import { mockReduxFormData } from '../../test-utils/mocks';
vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn().mockReturnValue({}),
}));
vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: vi.fn(),
}));
describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppSelector).mockReturnValue(COUNTRIES);
  });
  test('MainPage should render', () => {
    render(<MainPage />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
  test('renders UncontrolledForm after clicking the Open Uncontrolled Form button', async () => {
    render(<MainPage />);
    await userEvent.click(
      screen.getByRole('button', { name: BUTTON_UNCONTROLLED_FORM })
    );
    waitFor(() => {
      expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
    });
  });
  test('renders ReactHookForm after clicking the Open ReactHookForm button', async () => {
    render(<MainPage />);
    await userEvent.click(
      screen.getByRole('button', { name: BUTTON_REACT_HOOK_FORM })
    );
    waitFor(() => {
      expect(screen.getByTestId('react-hook-form')).toBeInTheDocument();
    });
  });
  test('renders FormDataDisplay if it has data', async () => {
    vi.mocked(useAppSelector).mockReturnValue(mockReduxFormData);
    render(<MainPage />);
    waitFor(() => {
      expect(screen.getByText(mockReduxFormData.name)).toBeInTheDocument();
      expect(screen.getByText(mockReduxFormData.email)).toBeInTheDocument();
      expect(screen.getByText(mockReduxFormData.country)).toBeInTheDocument();
      expect(screen.getByText(mockReduxFormData.image)).toBeInTheDocument();
      expect(screen.getByText(mockReduxFormData.gender)).toBeInTheDocument();
      expect(screen.getByText(mockReduxFormData.age)).toBeInTheDocument();
      expect(screen.getByText(mockReduxFormData.password)).toBeInTheDocument();
    });
  });
});
