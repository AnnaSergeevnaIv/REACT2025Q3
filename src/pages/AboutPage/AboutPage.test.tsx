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
vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn().mockReturnValue([]),
}));
vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: vi.fn().mockReturnValue([]),
}));
import * as reactRouter from 'react-router';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

describe('AboutPage component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render the About page correctly', () => {
    render(
      <Provider store={store}>
        <AboutPage />
      </Provider>
    );
    expect(screen.getByTestId(ABOUT_PAGE_TEST_ID)).toBeInTheDocument();
  });
  test('should navigate back when the Back button is clicked', async () => {
    const mockNavigate = vi.fn();
    (reactRouter.useNavigate as Mock).mockReturnValue(mockNavigate);
    render(
      <Provider store={store}>
        <AboutPage />
      </Provider>
    );
    await userEvent.click(
      screen.getByRole('button', { name: ABOUT_PAGE_BUTTON_NAME })
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
