import { render, screen } from '@testing-library/react';
import { Header, type HeaderProps } from './Header';
import userEvent from '@testing-library/user-event';
import type { Mock } from 'vitest';
import {
  HEADER_ABOUT_BUTTON_NAME,
  HEADER_THEME_DARK_BUTTON_NAME,
  HEADER_THEME_LIGHT_BUTTON_NAME,
} from './Header.constants';

vi.mock('react-router', () => {
  const original = vi.importActual('react-router');
  return {
    ...original,
    useNavigate: vi.fn(),
  };
});
vi.mock('react', () => ({
  useContext: vi.fn().mockReturnValue({
    theme: 'dark',
    setTheme: vi.fn(),
  }),
  useState: vi.fn().mockReturnValue(['dark', vi.fn()]),
  createContext: vi.fn().mockReturnValue({
    theme: 'dark',
    setTheme: vi.fn(),
  }),
}));

import * as reactRouter from 'react-router';
import { useContext } from 'react';

describe('Header component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const baseProps: HeaderProps = { clickHandle: () => {}, value: '' };

  test('Header component should render search bar, about button and theme button', () => {
    render(<Header {...baseProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: HEADER_ABOUT_BUTTON_NAME })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: HEADER_THEME_LIGHT_BUTTON_NAME })
    ).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  test('navigates to About page when About button is clicked', async () => {
    const mockNavigate = vi.fn();
    (reactRouter.useNavigate as Mock).mockReturnValue(mockNavigate);
    render(<Header {...baseProps} />);
    await userEvent.click(
      screen.getByRole('button', { name: HEADER_ABOUT_BUTTON_NAME })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });
  test('calls setTheme with light when theme button is clicked and theme is dark', async () => {
    const setTheme = vi.fn();
    (useContext as Mock).mockReturnValue({
      theme: 'dark',
      setTheme,
    });
    render(<Header {...baseProps} />);
    await userEvent.click(
      screen.getByRole('button', { name: HEADER_THEME_LIGHT_BUTTON_NAME })
    );
    expect(setTheme).toHaveBeenCalledWith('light');
  });
  test('calls setTheme with dark when theme button is clicked and theme is light', async () => {
    const setTheme = vi.fn();
    (useContext as Mock).mockReturnValue({
      theme: 'light',
      setTheme,
    });
    render(<Header {...baseProps} />);
    await userEvent.click(
      screen.getByRole('button', { name: HEADER_THEME_DARK_BUTTON_NAME })
    );
    expect(setTheme).toHaveBeenCalledWith('dark');
  });
  test('renders button with correct name when theme is dark', () => {
    (useContext as Mock).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
    });
    render(<Header {...baseProps} />);
    expect(
      screen.getByRole('button', { name: HEADER_THEME_LIGHT_BUTTON_NAME })
    ).toBeInTheDocument();
  });
  test('renders button with correct name when theme is light', () => {
    (useContext as Mock).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
    });
    render(<Header {...baseProps} />);
    expect(
      screen.getByRole('button', { name: HEADER_THEME_DARK_BUTTON_NAME })
    ).toBeInTheDocument();
  });
});
