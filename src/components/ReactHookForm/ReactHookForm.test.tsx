import { render, screen } from '@testing-library/react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { COUNTRIES } from '../../utils/countries';
import ReactHookForm from './ReactHookForm';
import { TEXT_FIELDS } from '../UncontrolledForm';

vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: vi.fn(),
}));
vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn().mockReturnValue({}),
}));

describe('ReactHookForm component', () => {
  const setIsModalOpenMock = vi.fn();
  const dispatchMock = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppSelector).mockReturnValue(COUNTRIES);
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
    // vi.mocked(fileToBase64).mockReturnValue(Promise.resolve("base64string"));
  });
  test('should render all fields', () => {
    render(<ReactHookForm setIsModalOpen={setIsModalOpenMock} />);
    expect(screen.getByTestId('react-hook-form')).toBeInTheDocument();
    Object.values(TEXT_FIELDS).forEach((field) => {
      expect(screen.getByText(field)).toBeInTheDocument();
    });
    expect(
      screen.getByRole('checkbox', {
        name: /Accept Terms and Conditions agreement/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
  });
});
