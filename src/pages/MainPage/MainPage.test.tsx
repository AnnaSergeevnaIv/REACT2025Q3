import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './MainPage';
import userEvent from '@testing-library/user-event';

import { localStorageSearchKey, TEST_SEARCH_INPUT } from './MainPage.constants';
import type { Mock } from 'vitest';

vi.mock('react-router', () => {
  const original = vi.importActual('react-router');
  return {
    ...original,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
    Outlet: () => <div data-testid="mock-outlet" />,
  };
});
import * as reactRouter from 'react-router';

describe('MainPage component', () => {
  const mockNavigate = vi.fn();
  beforeEach(() => {
    (reactRouter.useNavigate as Mock).mockReturnValue(mockNavigate);
    (reactRouter.useLocation as Mock).mockReturnValue({
      pathname: '/',
      search: '',
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  test('displays initial input value from localStorage', async () => {
    localStorage.setItem(localStorageSearchKey, TEST_SEARCH_INPUT);
    render(<MainPage />);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue(TEST_SEARCH_INPUT);
    });
    localStorage.removeItem(localStorageSearchKey);
  });

  test('calls navigate with search param when inputValue exists', () => {
    localStorage.setItem(localStorageSearchKey, TEST_SEARCH_INPUT);
    render(<MainPage />);
    expect(mockNavigate).toHaveBeenCalledWith(`/?search=${TEST_SEARCH_INPUT}`, {
      replace: true,
    });
  });

  test('calls navigate with default page=1 if no inputValue exists', () => {
    render(<MainPage />);
    expect(mockNavigate).toHaveBeenCalledWith(`/?page=1`, { replace: true });
  });

  test('updates localStorage and calls navigate on search', async () => {
    render(<MainPage />);
    await userEvent.type(screen.getByRole('textbox'), TEST_SEARCH_INPUT);
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        `/?search=${TEST_SEARCH_INPUT}`
      );
      expect(localStorage.getItem(localStorageSearchKey)).toBe(
        TEST_SEARCH_INPUT
      );
    });
  });

  test('does not call navigate when searchParams already contain page or search', () => {
    (reactRouter.useLocation as Mock).mockReturnValue({
      pathname: '/',
      search: '?page=2&search=Luke',
    });
    render(<MainPage />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('skips navigation logic when pathname is not "/"', () => {
    (reactRouter.useLocation as Mock).mockReturnValue({
      pathname: '/about',
      search: '',
    });
    render(<MainPage />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
