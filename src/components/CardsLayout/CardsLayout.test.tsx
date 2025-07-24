import { render, screen, waitFor } from '@testing-library/react';
import { CardsLayout } from './CardsLayout';
import {
  mockCharactersData,
  mockPhotoCharacterData,
} from '../../test-utils/mocks';
import type { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
  CARDS_LAYOUT_BUTTON_NEXT_NAME,
  CARDS_LAYOUT_BUTTON_PREV_NAME,
  CARDS_LAYOUT_LOADING,
} from './CardsLayout.constants';
import { CARD_TEST_ID } from '../Card';
const mocks = {
  navigate: vi.fn(),
};
vi.mock('react-router', async () => {
  const original =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...original,
    useRouteLoaderData: vi.fn(),
    useNavigate: () => mocks.navigate,
    useSearchParams: () => [new URLSearchParams({ page: '2' }), vi.fn()],
  };
});
vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn(),
}));
vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: vi.fn(),
}));
import * as reactRouter from 'react-router';
import { useAppSelector } from '../../hooks/useAppSelector';

describe('CardsLayout component', () => {
  beforeEach(() => {
    (reactRouter.useRouteLoaderData as Mock).mockReturnValue({
      data: {
        results: mockCharactersData,
        previous: 'some-prev-url',
        next: 'some-next-url',
      },
      error: undefined,
    });
    (useAppSelector as unknown as Mock).mockReturnValue([]);
    mocks.navigate.mockClear();
    localStorage.clear();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('CardsLayout renders the correct number of cards with provided data', () => {
    render(<CardsLayout />);
    expect(screen.getAllByTestId('card')).toHaveLength(2);
  });

  test('CardsLayout renders zero cards when provided with an empty array', () => {
    (reactRouter.useRouteLoaderData as Mock).mockReturnValue({
      data: {
        results: [],
        previous: 'some-prev-url',
        next: 'some-next-url',
      },
      error: undefined,
    });
    render(<CardsLayout />);
    expect(screen.queryAllByTestId('card')).toHaveLength(0);
  });

  test('Clicking Next button navigates to the next page', async () => {
    render(<CardsLayout />);
    await userEvent.click(
      screen.getByRole('button', { name: CARDS_LAYOUT_BUTTON_NEXT_NAME })
    );
    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith(`?page=3`);
    });
  });

  test('Clicking Prev button navigates to the prev page', async () => {
    render(<CardsLayout />);
    await userEvent.click(
      screen.getByRole('button', { name: CARDS_LAYOUT_BUTTON_PREV_NAME })
    );
    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith(`?page=1`);
    });
  });

  test('renders loading state when data is not yet available', () => {
    (reactRouter.useRouteLoaderData as Mock).mockReturnValue({
      data: undefined,
      error: undefined,
    });
    render(<CardsLayout />);
    expect(screen.getByText(CARDS_LAYOUT_LOADING)).toBeInTheDocument();
  });

  test('calls cardClickHandle with correct ID when a card is clicked', async () => {
    render(<CardsLayout />);
    await userEvent.click(screen.getAllByTestId(CARD_TEST_ID)[0]);
    expect(mocks.navigate).toHaveBeenCalledWith('character/1?page=2');
  });

  test('renders error message when route loader returns an error', () => {
    const errorMessage = 'Something went wrong';
    (reactRouter.useRouteLoaderData as Mock).mockReturnValue({
      data: undefined,
      error: errorMessage,
    });

    render(<CardsLayout />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  test('renders cards with images from PhotoContext', () => {
    (useAppSelector as unknown as Mock).mockReturnValue(mockPhotoCharacterData);
    render(<CardsLayout />);
    expect(
      screen.getByAltText(`${mockPhotoCharacterData[0].name} image`)
    ).toHaveAttribute('src', mockPhotoCharacterData[0].image);
  });
});
