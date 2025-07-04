import { render, screen, waitFor } from '@testing-library/react';
import { MainPage, type MainProps } from './main-page';
import * as network from '../services/network-requests';
import {
  mockCharactersData,
  mockPhotoCharacterData,
} from '../test-utils/mocks';
import { localStorageSearchKey } from '../constants/constants';
import userEvent from '@testing-library/user-event';

describe('Card component', () => {
  test('renders character cards after successful data fetch', async () => {
    const mockMainPageProps: MainProps = { photoData: [] };
    vi.spyOn(network, 'getCharacters').mockImplementation(() =>
      Promise.resolve(mockCharactersData)
    );
    render(<MainPage {...mockMainPageProps} />);
    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(2);
    });
  });

  test('displays initial input value from localStorage', async () => {
    localStorage.setItem(localStorageSearchKey, 'test');
    const mockMainPageProps: MainProps = { photoData: [] };
    render(<MainPage {...mockMainPageProps} />);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('test');
    });
    localStorage.removeItem(localStorageSearchKey);
  });

  test('displays loading message while fetching data', () => {
    const mockMainPageProps: MainProps = { photoData: [] };
    const mock = async () => {
      setTimeout(() => {}, 100);
      return Promise.resolve([]);
    };
    vi.spyOn(network, 'getCharacters').mockImplementation(mock);
    render(<MainPage {...mockMainPageProps} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message when API returns an error string', async () => {
    const mockMainPageProps: MainProps = { photoData: [] };
    vi.spyOn(network, 'getCharacters').mockImplementation(() =>
      Promise.resolve('Network error')
    );
    render(<MainPage {...mockMainPageProps} />);
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  test('throws error when error button is clicked', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const mockMainPageProps: MainProps = { photoData: [] };
    render(<MainPage {...mockMainPageProps} />);
    const errorButton = screen.getByRole('button', { name: 'Throw error' });

    await expect(userEvent.click(errorButton)).rejects.toThrow(
      'Test error from button!'
    );

    consoleError.mockRestore();
  });

  test('calls getData and updates state on input submission', async () => {
    const mockMainPageProps: MainProps = { photoData: [] };
    const getCharactersMock = vi
      .spyOn(network, 'getCharacters')
      .mockImplementation(() => Promise.resolve(mockCharactersData));
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    render(<MainPage {...mockMainPageProps} />);
    await userEvent.type(screen.getByRole('textbox'), 'test type');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(getCharactersMock).toHaveBeenCalledWith('test type');
      expect(setItemSpy).toHaveBeenCalledWith(
        localStorageSearchKey,
        'test type'
      );
      expect(screen.getByRole('textbox')).toHaveValue('test type');
    });
    setItemSpy.mockRestore();
  });

  test('updates image field in data from photoData on prop change', async () => {
    const mockMainPageProps: MainProps = { photoData: mockPhotoCharacterData };
    vi.spyOn(network, 'getCharacters').mockImplementation(() =>
      Promise.resolve(mockCharactersData)
    );
    render(<MainPage {...mockMainPageProps} />);
    await waitFor(() => {
      expect(
        screen.getByRole('img', {
          name: `${mockPhotoCharacterData[0].name} image`,
        })
      ).toHaveAttribute('src', mockPhotoCharacterData[0].image);
    });
  });
});
