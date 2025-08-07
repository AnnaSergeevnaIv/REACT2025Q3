import { render, screen, waitFor } from '@testing-library/react';
import { CardsLayout } from './CardsLayout';
import { mockCharactersData } from '../../test-utils/mocks';
import type { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
  CARDS_LAYOUT_ERROR,
  CARDS_LAYOUT_LOADING,
  CARDS_LAYOUT_NO_DATA,
  CARDS_LAYOUT_REFETCH_BUTTON_NAME,
} from './CardsLayout.constants';
import { CARD_TEST_ID } from '../card';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useGetCharactersQuery } from '../../services/api';
import {
  PAGINATION_BUTTON_NEXT_NAME,
  PAGINATION_BUTTON_PREV_NAME,
} from '../Pagination';
const mocks = {
  navigate: vi.fn(),
  refetch: vi.fn(),
};
vi.mock('react-router', async () => {
  const original =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...original,
    useNavigate: () => mocks.navigate,
    useSearchParams: () => [new URLSearchParams({ page: '2' }), vi.fn()],
  };
});
vi.mock(import('../../services/api'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(),
  };
});

describe('CardsLayout component', () => {
  beforeEach(() => {
    mocks.navigate.mockClear();
    localStorage.clear();
    (useGetCharactersQuery as Mock).mockImplementation(() => ({
      data: {
        results: [],
        previous: 'some-prev-url',
        next: 'some-next-url',
      },
      isLoading: false,
      isError: false,
      refetch: mocks.refetch,
    }));
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('CardsLayout renders the correct number of cards with provided data', async () => {
    (useGetCharactersQuery as Mock).mockImplementation(() => ({
      data: {
        results: mockCharactersData,
        previous: 'some-prev-url',
        next: 'some-next-url',
      },
      isLoading: false,
      isError: false,
    }));
    render(
      <Provider store={store}>
        <CardsLayout />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(2);
    });
  });

  test('CardsLayout renders zero cards when provided with an empty array', () => {
    (useGetCharactersQuery as Mock).mockImplementation(() => ({
      data: {
        results: [],
        previous: 'some-prev-url',
        next: 'some-next-url',
      },
      isLoading: false,
      isError: false,
    }));
    render(
      <Provider store={store}>
        <CardsLayout />
      </Provider>
    );
    expect(screen.queryAllByTestId('card')).toHaveLength(0);
  });

  test('renders loading state when data is not yet available', () => {
    (useGetCharactersQuery as Mock).mockImplementation(() => ({
      data: {
        results: undefined,
        previous: 'some-prev-url',
        next: 'some-next-url',
      },
      isLoading: true,
      isError: false,
    }));
    render(
      <Provider store={store}>
        <CardsLayout />
      </Provider>
    );
    expect(screen.getByText(CARDS_LAYOUT_LOADING)).toBeInTheDocument();
  });

  test('calls cardClickHandle with correct ID when a card is clicked', async () => {
    (useGetCharactersQuery as Mock).mockImplementation(() => ({
      data: {
        results: mockCharactersData,
        previous: 'some-prev-url',
        next: 'some-next-url',
      },
      isLoading: false,
      isError: false,
    }));
    render(
      <Provider store={store}>
        <CardsLayout />
      </Provider>
    );
    await userEvent.click(screen.getAllByTestId(CARD_TEST_ID)[0]);
    expect(mocks.navigate).toHaveBeenCalledWith('character/1?page=2');
  });

  test('renders error message when route loader returns an error', () => {
    (useGetCharactersQuery as Mock).mockImplementation(() => ({
      data: {
        results: undefined,
        previous: 'some-prev-url',
        next: 'some-next-url',
      },
      isLoading: false,
      isError: true,
    }));

    render(
      <Provider store={store}>
        <CardsLayout />
      </Provider>
    );
    expect(screen.getByText(CARDS_LAYOUT_ERROR)).toBeInTheDocument();
  });
  test('renders no data message when the data is undefined', () => {
    (useGetCharactersQuery as Mock).mockImplementation(() => ({
      data: {
        results: undefined,
        previous: 'some-prev-url',
        next: 'some-next-url',
      },
      isLoading: false,
      isError: false,
    }));
    render(
      <Provider store={store}>
        <CardsLayout />
      </Provider>
    );
    expect(screen.getByText(CARDS_LAYOUT_NO_DATA)).toBeInTheDocument();
  });

  test('Clicking Next button navigates to the next page', async () => {
    render(
      <Provider store={store}>
        <CardsLayout />
      </Provider>
    );
    await userEvent.click(
      screen.getByRole('button', { name: PAGINATION_BUTTON_NEXT_NAME })
    );
    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith(`?page=3`);
    });
  });
  test('Clicking Prev button navigates to the prev page', async () => {
    render(
      <Provider store={store}>
        <CardsLayout />
      </Provider>
    );
    await userEvent.click(
      screen.getByRole('button', { name: PAGINATION_BUTTON_PREV_NAME })
    );
    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith(`?page=1`);
    });
  });

  test('Refetch button refetches data', async () => {
    render(
      <Provider store={store}>
        <CardsLayout />
      </Provider>
    );
    await userEvent.click(
      screen.getByRole('button', { name: CARDS_LAYOUT_REFETCH_BUTTON_NAME })
    );
    await waitFor(() => {
      expect(mocks.refetch).toHaveBeenCalled();
    });
  });
});
