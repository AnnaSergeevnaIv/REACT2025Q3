import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  test('Error Message should render message', () => {
    const text = 'test';
    render(<ErrorMessage message={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
