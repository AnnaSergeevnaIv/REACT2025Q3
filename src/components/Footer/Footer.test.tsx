import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { FOOTER_TEST_ID, FOOTER_UNCHECK_BUTTON_NAME } from './Footer.constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import type { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useAppDispatch } from '../../hooks/useAppDispatch';

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn(),
}));
vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: vi.fn(),
}));

describe('Footer component', () => {
  const mockDispatch = vi.fn();

  test('does not render Footer when there are no selected characters in store', () => {
    (useAppSelector as unknown as Mock).mockReturnValue(0);
    render(<Footer />);
    expect(screen.queryByTestId(FOOTER_TEST_ID)).not.toBeInTheDocument();
  });

  test('renders Footer when there are selected characters in store', () => {
    (useAppSelector as unknown as Mock).mockReturnValue(3);
    render(<Footer />);
    expect(screen.queryByTestId(FOOTER_TEST_ID)).toBeInTheDocument();
  });
  test('dispatches clear action when unselect button was clicked', async () => {
    (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    render(<Footer />);
    await userEvent.click(screen.getByText(FOOTER_UNCHECK_BUTTON_NAME));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
