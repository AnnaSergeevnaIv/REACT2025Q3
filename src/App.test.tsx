import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

vi.mock('react-router', () => {
  const original = vi.importActual('react-router');
  return {
    ...original,
    Outlet: () => <div data-testId="mock-outlet" />,
  };
});
vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn(),
}));
vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: vi.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('renders App and displays initial content', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });
});
