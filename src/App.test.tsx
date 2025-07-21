import { render, screen, waitFor } from '@testing-library/react';
import { MAIN_PAGE_TEST_ID } from './pages/MainPage';
import * as network from './services/network-requests';
import App from './App';
import { mockPhotoCharacterData } from './test-utils/mocks';
import { localStoragePhotoKey } from './constants/constants';

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('renders App and displays initial content', () => {
    render(<App />);
    expect(screen.getByTestId(MAIN_PAGE_TEST_ID)).toBeInTheDocument();
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
