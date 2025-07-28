import { render, screen, waitFor } from '@testing-library/react';
import * as network from './services/network-requests/network-requests';
import App from './App';
import { mockPhotoCharacterData } from './test-utils/mocks';
import { localStoragePhotoKey } from './constants/constants';
vi.mock('react-router', () => {
  const original = vi.importActual('react-router');
  return {
    ...original,
    Outlet: () => <div data-testid="mock-outlet" />,
  };
});

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('renders App and displays initial content', () => {
    render(<App />);
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });

  test('calls getPhotoData on mount if no data in localStorage', async () => {
    const getData = vi
      .spyOn(network, 'getPhotoData')
      .mockResolvedValue(mockPhotoCharacterData);

    render(<App />);
    await waitFor(() => {
      expect(getData).toHaveBeenCalled();
    });
  });

  test('does NOT call getPhotoData if data is in localStorage', () => {
    const getData = vi
      .spyOn(network, 'getPhotoData')
      .mockResolvedValue(mockPhotoCharacterData);

    localStorage.setItem(
      localStoragePhotoKey,
      JSON.stringify(mockPhotoCharacterData)
    );
    render(<App />);
    expect(getData).not.toHaveBeenCalled();
  });
});
