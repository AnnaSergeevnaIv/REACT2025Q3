import { render, screen } from '@testing-library/react';
import { Header, type HeaderProps } from './Header';
import userEvent from '@testing-library/user-event';
import type { Mock } from 'vitest';
import {
  HEADER_ABOUT_BUTTON_NAME,
  HEADER_SEARCH_BUTTON_NAME,
} from './Header.constant';

vi.mock('react-router', () => {
  const original = vi.importActual('react-router');
  return {
    ...original,
    useNavigate: vi.fn(),
  };
});

import * as reactRouter from 'react-router';

describe('Header component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const baseProps: HeaderProps = { clickHandle: () => {}, value: '' };

  test('Header component should render input and button', () => {
    render(<Header {...baseProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: HEADER_SEARCH_BUTTON_NAME })
    ).toBeInTheDocument();
  });

  test('Header component should display passed value in input', () => {
    const mockProps: HeaderProps = {
      ...baseProps,
      value: 'test value',
    };
    render(<Header {...mockProps} />);
    expect(screen.getByRole('textbox')).toHaveValue(mockProps.value);
  });

  test('Should render empty input when value is empty', () => {
    render(<Header {...baseProps} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('Header component should call click handler on button click', async () => {
    const mockHandleClick = vi.fn();
    const mockProps: HeaderProps = {
      ...baseProps,
      clickHandle: mockHandleClick,
    };
    render(<Header {...mockProps} />);
    const button = screen.getByRole('button', {
      name: HEADER_SEARCH_BUTTON_NAME,
    });
    await userEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalled();
  });

  test('should call click handler with updated input value after user types and clicks button', async () => {
    const mockHandleClick = vi.fn();
    const mockProps: HeaderProps = {
      ...baseProps,
      clickHandle: mockHandleClick,
    };
    render(<Header {...mockProps} />);
    await userEvent.type(screen.getByRole('textbox'), 'test');
    await userEvent.click(
      screen.getByRole('button', { name: HEADER_SEARCH_BUTTON_NAME })
    );
    expect(mockHandleClick).toHaveBeenCalledWith('test');
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
});
