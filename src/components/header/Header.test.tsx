import { render, screen } from '@testing-library/react';
import { Header, type HeaderProps } from './Header';
import userEvent from '@testing-library/user-event';

describe('Header component', () => {
  const baseProps: HeaderProps = { clickHandle: () => {}, value: '' };

  test('Header component should render input and button', () => {
    render(<Header {...baseProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
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
    const button = screen.getByRole('button');
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
    await userEvent.click(screen.getByRole('button'));
    expect(mockHandleClick).toHaveBeenCalledWith('test');
  });
});
