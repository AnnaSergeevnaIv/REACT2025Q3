import { render, screen } from '@testing-library/react';
import { NoMatch } from './NoMatch';
import { NO_MATCH_TEST_ID } from './NoMatch.constants';
vi.mock('react-router', () => {
  const original = vi.importActual('react-router');
  return {
    ...original,
    Link: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe('NoMatch component', () => {
  test('should render the NoMatch page correctly', () => {
    render(<NoMatch />);
    expect(screen.getByTestId(NO_MATCH_TEST_ID)).toBeInTheDocument();
  });
});
