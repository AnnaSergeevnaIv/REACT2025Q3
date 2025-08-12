import { render, screen, waitFor } from '@testing-library/react';
import { Pagination, type PaginationProps } from './Pagination';
import userEvent from '@testing-library/user-event';
import {
  PAGINATION_BUTTON_NEXT_NAME,
  PAGINATION_BUTTON_PREV_NAME,
} from './Pagination.constants';

describe('Pagination component', () => {
  const mockClick = vi.fn();
  const mockProps: PaginationProps = {
    onClick: mockClick,
    nextDisabled: false,
    prevDisabled: false,
  };
  test('Clicking Next button navigates to the next page', async () => {
    render(<Pagination {...mockProps} />);
    await userEvent.click(
      screen.getByRole('button', { name: PAGINATION_BUTTON_NEXT_NAME })
    );
    await waitFor(() => {
      expect(mockClick).toHaveBeenCalled();
    });
  });

  test('Clicking Prev button navigates to the prev page', async () => {
    render(<Pagination {...mockProps} />);
    await userEvent.click(
      screen.getByRole('button', { name: PAGINATION_BUTTON_PREV_NAME })
    );
    await waitFor(() => {
      expect(mockClick).toHaveBeenCalled();
    });
  });
});
