import { ErrorBoundary } from './ErrorBoundary';
import { render, screen } from '@testing-library/react';

describe('error boundary', () => {
  const fallback = <div data-testid="fallback">Smth went wrong!</div>;
  const ProblemChild = () => {
    throw new Error('Test error');
  };
  const normalChild = <div data-testid="children">All is ok!</div>;
  test('renders children when no error is thrown', () => {
    render(<ErrorBoundary fallback={fallback}>{normalChild}</ErrorBoundary>);
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  test('renders fallback UI when error is thrown', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={fallback}>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });
});
