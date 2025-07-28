import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Mock } from 'vitest';
import { AboutPage } from './AboutPage';
import {
  ABOUT_PAGE_BUTTON_NAME,
  ABOUT_PAGE_TEST_ID,
} from './AboutPage.constants';

vi.mock('react-router', () => {
  const original = vi.importActual('react-router');
  return {
    ...original,
    useNavigate: vi.fn(),
    Link: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});
import * as reactRouter from 'react-router';

describe('AboutPage component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render the About page correctly', () => {
    render(<AboutPage />);
    expect(screen.getByTestId(ABOUT_PAGE_TEST_ID)).toBeInTheDocument();
  });
  test('should navigate back when the Back button is clicked', async () => {
    const mockNavigate = vi.fn();
    (reactRouter.useNavigate as Mock).mockReturnValue(mockNavigate);
    render(<AboutPage />);
    await userEvent.click(
      screen.getByRole('button', { name: ABOUT_PAGE_BUTTON_NAME })
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
