import { render, screen, waitFor } from '@testing-library/react';
import {
  mockFullCharacterData,
  mockImage,
  mockPhotoCharacterData,
} from '../../test-utils/mocks';
import type { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import placeholder from '../../assets/placeholder.png';

const mocks = {
  navigate: vi.fn(),
};
vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn().mockReturnValue([]),
}));

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

import * as reactRouter from 'react-router';
import { DetailPage } from './DetailPage';
import {
  DETAIL_PAGE_BUTTON_NAME,
  DETAIL_PAGE_LOADING,
  DETAIL_PAGE_TEST_ERROR,
  DETAIL_PAGE_TEST_ID,
} from './DetailPage.constants';
import { PhotoContext } from '../../services/PhotoContext';
import { useAppSelector } from '../../hooks/useAppSelector';

describe('DetailPage component', () => {
  beforeEach(() => {
    (reactRouter.useRouteLoaderData as Mock).mockReturnValue({
      data: mockFullCharacterData,
      error: undefined,
    });
  });
  test('renders detail page correctly with mock data', () => {
    render(<DetailPage />);
    expect(screen.getByTestId(DETAIL_PAGE_TEST_ID)).toBeInTheDocument();
  });

  test('navigates back to the list page on Back button click', async () => {
    render(<DetailPage />);
    await userEvent.click(
      screen.getByRole('button', { name: DETAIL_PAGE_BUTTON_NAME })
    );
    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith('/?page=2');
    });
  });

  test('displays loading state when data is not available', () => {
    (reactRouter.useRouteLoaderData as Mock).mockReturnValue({
      data: undefined,
      error: undefined,
    });
    render(<DetailPage />);
    expect(screen.getByText(DETAIL_PAGE_LOADING)).toBeInTheDocument();
  });

  test('displays error message when error is present in loader data', () => {
    (reactRouter.useRouteLoaderData as Mock).mockReturnValue({
      data: undefined,
      error: DETAIL_PAGE_TEST_ERROR,
    });
    render(<DetailPage />);
    expect(
      screen.getByText(`Error: ${DETAIL_PAGE_TEST_ERROR}`)
    ).toBeInTheDocument();
  });

  test('displays placeholder image when character image fails to load', () => {
    (useAppSelector as unknown as Mock).mockReturnValue(undefined);
    render(<DetailPage />);
    expect(screen.getByRole('img')).toHaveAttribute('src', placeholder);
  });

  test('displays character image when available', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      ...mockFullCharacterData,
      image: mockImage,
    });
    (reactRouter.useRouteLoaderData as Mock).mockReturnValue({
      data: { ...mockFullCharacterData, image: mockImage },
      error: undefined,
    });
    render(
      <PhotoContext.Provider value={mockPhotoCharacterData}>
        <DetailPage />
      </PhotoContext.Provider>
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', mockImage);
  });
});
