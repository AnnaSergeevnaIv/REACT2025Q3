import { render, screen, waitFor } from '@testing-library/react';
import UncontrolledForm from './UncontrolledForm';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { COUNTRIES } from '../../utils/countries';
import { TEXT_FIELDS } from './UncontrolledForm.constants';
import { formSchema } from '../../validation/schema';
import { mockFormData } from '../../test-utils/mocks';
import userEvent from '@testing-library/user-event';
import type { ZodError } from 'zod';
vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: vi.fn(),
}));
vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn().mockReturnValue({}),
}));
vi.mock('../../validation/schema', () => ({
  formSchema: {
    safeParse: vi.fn(),
  },
}));
vi.mock('../../utils/flatErrors', () => ({
  flatErrors: vi.fn().mockReturnValue({ name: 'test' }),
}));
describe('UncontrolledForm component', () => {
  const setIsModalOpenMock = vi.fn();
  const dispatchMock = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppSelector).mockReturnValue(COUNTRIES);
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
  });
  test('should render all fields', () => {
    render(<UncontrolledForm setIsModalOpen={setIsModalOpenMock} />);
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
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

  test('should set isModalOpen to false and call useAppDispatch when form has been submitted successfully', async () => {
    vi.mocked(formSchema.safeParse).mockReturnValue({
      success: true,
      data: mockFormData,
    });
    render(<UncontrolledForm setIsModalOpen={setIsModalOpenMock} />);
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(useAppDispatch).toHaveBeenCalled();
      expect(setIsModalOpenMock).toHaveBeenCalledWith(false);
    });
  });

  test("shouldn't call useAppDispatch and set isModalOpen to false when form hasn't been submitted successfully", async () => {
    vi.mocked(formSchema.safeParse).mockReturnValue({
      success: false,
      error: {} as unknown as ZodError<typeof mockFormData>,
    });
    render(<UncontrolledForm setIsModalOpen={setIsModalOpenMock} />);
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(dispatchMock).not.toHaveBeenCalled();
      expect(setIsModalOpenMock).not.toHaveBeenCalledWith(false);
    });
  });
});
