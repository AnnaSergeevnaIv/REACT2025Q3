import { render, screen } from '@testing-library/react';
import { SearchBar, type SearchBarProps } from './SearchBar';
import { SEARCH_BAR_SEARCH_BUTTON_NAME } from './SearchBar.constants';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  const mockHandleClick = vi.fn();
  const value = 'test value';
  const mockProps: SearchBarProps = {
    onChange: () => {},
    onClick: mockHandleClick,
    value: value,
  };
  test('SearchBar component should display passed value in input', () => {
    render(<SearchBar {...mockProps} />);
    expect(screen.getByRole('textbox')).toHaveValue(mockProps.value);
  });
  test('Should render empty input when value is empty', () => {
    const mockProps: SearchBarProps = {
      onChange: () => {},
      onClick: () => {},
      value: '',
    };
    render(<SearchBar {...mockProps} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('SearchBar should call click handler on button click', async () => {
    render(<SearchBar {...mockProps} />);
    const button = screen.getByRole('button', {
      name: SEARCH_BAR_SEARCH_BUTTON_NAME,
    });
    await userEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalled();
  });

  test('should call click handler with updated input value after user types and clicks button', async () => {
    render(<SearchBar {...mockProps} />);
    await userEvent.type(screen.getByRole('textbox'), value);
    await userEvent.click(
      screen.getByRole('button', { name: SEARCH_BAR_SEARCH_BUTTON_NAME })
    );
    expect(mockHandleClick).toHaveBeenCalledWith(value);
  });
});
