import { render, screen, waitFor } from '@testing-library/react';
import { MainPage, type MainProps } from './MainPage';
import * as network from '../../services/network-requests';
import userEvent from '@testing-library/user-event';
import {
  mockCharactersData,
  mockPhotoCharacterData,
} from '../../test-utils/mocks';
import {
  ERROR_MESSAGE,
  LOADING_TEXT,
  localStorageSearchKey,
  TEST_SEARCH_INPUT,
} from './MainPage.constants';

describe('Card component', () => {
  const mockEmptyMainPageProps: MainProps = { photoData: [] };

  test('renders character cards after successful data fetch', async () => {
    vi.spyOn(network, 'getCharacters').mockImplementation(() =>
      Promise.resolve(mockCharactersData)
    );
    render(<MainPage {...mockEmptyMainPageProps} />);
    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(2);
    });
  });

  test('displays initial input value from localStorage', async () => {
    localStorage.setItem(localStorageSearchKey, 'test');
    render(<MainPage {...mockEmptyMainPageProps} />);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('test');
    });
    localStorage.removeItem(localStorageSearchKey);
  });

  test('displays loading message while fetching data', () => {
    const mock = async () => {
      setTimeout(() => {}, 100);
      return Promise.resolve([]);
    };
    vi.spyOn(network, 'getCharacters').mockImplementation(mock);
    render(<MainPage {...mockEmptyMainPageProps} />);
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
  });

  test('displays error message when API returns an error string', async () => {
    vi.spyOn(network, 'getCharacters').mockImplementation(() =>
      Promise.resolve(ERROR_MESSAGE)
    );
    render(<MainPage {...mockEmptyMainPageProps} />);
    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
    });
  });

  test('calls getData and updates state on input submission', async () => {
    const getCharactersMock = vi
      .spyOn(network, 'getCharacters')
      .mockImplementation(() => Promise.resolve(mockCharactersData));
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    render(<MainPage {...mockEmptyMainPageProps} />);
    await userEvent.type(screen.getByRole('textbox'), TEST_SEARCH_INPUT);
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(getCharactersMock).toHaveBeenCalledWith(TEST_SEARCH_INPUT);
      expect(setItemSpy).toHaveBeenCalledWith(
        localStorageSearchKey,
        TEST_SEARCH_INPUT
      );
      expect(screen.getByRole('textbox')).toHaveValue(TEST_SEARCH_INPUT);
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
