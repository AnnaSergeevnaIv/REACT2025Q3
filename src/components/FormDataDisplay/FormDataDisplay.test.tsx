import { render, screen, waitFor } from '@testing-library/react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { mockReduxFormData } from '../../test-utils/mocks';
import FormDataDisplay from './FormDataDisplay';
import {
  DISPLAY_CONTAINER_COLOR_CLASS,
  DISPLAY_TEST_ID,
} from './FormDataDisplay.constants';

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn().mockReturnValue({}),
}));
describe('FormDaraDisplay tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppSelector).mockReturnValue(mockReduxFormData);
  });
  test("FormDataDisplay shouldn't render if there isn't data in Redux", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      ...mockReduxFormData,
      name: '',
    });
    render(<FormDataDisplay />);
    expect(screen.queryByText(mockReduxFormData.email)).not.toBeInTheDocument();
  });
  test('FormDaraDisplay shuold render if there is data in Redux', async () => {
    render(<FormDataDisplay />);
    // await waitFor(() => {
    expect(screen.getByText(mockReduxFormData.name)).toBeInTheDocument();
    expect(screen.getByText(mockReduxFormData.email)).toBeInTheDocument();
    expect(screen.getByText(mockReduxFormData.country)).toBeInTheDocument();
    expect(screen.getByText(mockReduxFormData.gender)).toBeInTheDocument();
    expect(screen.getByText(mockReduxFormData.age)).toBeInTheDocument();
    // })
  });

  test('Use class with border when data has changed', () => {
    render(<FormDataDisplay />);
    vi.mocked(useAppSelector).mockReturnValue({
      ...mockReduxFormData,
      name: 'NewName',
    });
    expect(screen.getByTestId(DISPLAY_TEST_ID)).toHaveClass(
      DISPLAY_CONTAINER_COLOR_CLASS
    );
  });
  test('Use class without border when data has changed and 3 sec passed', async () => {
    render(<FormDataDisplay />);
    vi.mocked(useAppSelector).mockReturnValue({
      ...mockReduxFormData,
      name: 'NewName',
    });
    await waitFor(
      () => {
        expect(screen.getByTestId(DISPLAY_TEST_ID)).not.toHaveClass(
          DISPLAY_CONTAINER_COLOR_CLASS
        );
      },
      { timeout: 4000 }
    );
  });
  test("Shouldn't render image if data[image] is empty", async () => {
    vi.mocked(useAppSelector).mockReturnValue({
      ...mockReduxFormData,
      image: '',
    });
    render(<FormDataDisplay />);
    waitFor(() => {
      expect(screen.getByRole('img')).not.toBeInTheDocument();
    });
  });
});
