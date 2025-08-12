import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import {
  FOOTER_DOWNLOAD_BUTTON_NAME,
  FOOTER_TEST_ID,
  FOOTER_UNCHECK_BUTTON_NAME,
} from './Footer.constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import type { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { mockCharactersData } from '../../test-utils/mocks';
import { downloadCSV } from '../../services/csv-export';

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn(),
}));
vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: vi.fn(),
}));
vi.mock('../../services/csv-export', () => ({
  downloadCSV: vi.fn(),
}));

describe('Footer component', () => {
  const mockFunction = vi.fn();
  beforeEach(() => {
    (useAppDispatch as unknown as Mock).mockReturnValue(mockFunction);
  });
  test('does not render Footer when there are no selected characters in store', () => {
    (useAppSelector as unknown as Mock).mockReturnValue([]);
    render(<Footer />);
    expect(screen.queryByTestId(FOOTER_TEST_ID)).not.toBeInTheDocument();
  });
  test('does not render Footer when characters in store are undefined', () => {
    (useAppSelector as unknown as Mock).mockReturnValue(undefined);
    render(<Footer />);
    expect(screen.queryByTestId(FOOTER_TEST_ID)).not.toBeInTheDocument();
  });

  test('renders Footer when there are selected characters in store', () => {
    (useAppSelector as unknown as Mock).mockReturnValue(mockCharactersData);
    render(<Footer />);
    expect(screen.queryByTestId(FOOTER_TEST_ID)).toBeInTheDocument();
  });
  test('dispatches action when unselect button was clicked', async () => {
    render(<Footer />);
    await userEvent.click(screen.getByText(FOOTER_UNCHECK_BUTTON_NAME));
    expect(mockFunction).toHaveBeenCalled();
  });
  test('call downloadCSV function when download button was clicked', async () => {
    (useAppSelector as unknown as Mock).mockReturnValue(mockCharactersData);
    render(<Footer />);
    await userEvent.click(screen.getByText(FOOTER_DOWNLOAD_BUTTON_NAME));
    expect(downloadCSV).toHaveBeenCalledWith(
      mockCharactersData,
      mockCharactersData.length
    );
  });
});
