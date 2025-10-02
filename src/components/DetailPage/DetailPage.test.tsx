// import { render, screen, waitFor } from '@testing-library/react';
// import { mockCharactersData, mockImage } from '../../test-utils/mocks';
// import type { Mock } from 'vitest';
// import userEvent from '@testing-library/user-event';
// import placeholder from '../../assets/placeholder.png';
// import { DetailPage } from './DetailPage';
// import {
//   DETAIL_PAGE_BUTTON_NAME,
//   DETAIL_PAGE_ERROR,
//   DETAIL_PAGE_LOADING,
//   DETAIL_PAGE_TEST_ID,
// } from './DetailPage.constants';
// import { useAppSelector } from '../../hooks/useAppSelector';
// import { Provider } from 'react-redux';
// import { store } from '../../store/store';
// import {
//   useGetCharacterQuery,
//   useGetCharactersQuery,
//   useGetTransformedPhotosQuery,
// } from '../../services/api';
// const mocks = {
//   navigate: vi.fn(),
//   fetchCharacter: vi.fn(),
// };

// vi.mock('../../hooks/useAppSelector', () => ({
//   useAppSelector: vi.fn().mockReturnValue([]),
// }));
// vi.mock('../../hooks/useAppDispatch', () => ({
//   useAppDispatch: vi.fn().mockReturnValue([]),
// }));
// vi.mock(import('../../services/api'), async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     useGetCharactersQuery: vi.fn(),
//     useGetTransformedPhotosQuery: vi.fn(),
//     useGetCharacterQuery: vi.fn(),
//   };
// });

// vi.mock('react-router', async () => {
//   const original =
//     await vi.importActual<typeof import('react-router')>('react-router');

//   return {
//     ...original,
//     useNavigate: () => mocks.navigate,
//     useSearchParams: () => [new URLSearchParams({ page: '2' }), vi.fn()],
//     useLocation: vi.fn().mockReturnValue({ pathname: '/character/1' }),
//   };
// });

// describe('DetailPage component', () => {
//   beforeEach(() => {
//     (useGetCharactersQuery as Mock).mockImplementation(() => ({
//       character: mockCharactersData[0],
//       isLoading: false,
//       isError: false,
//     }));
//     (useGetCharacterQuery as Mock).mockImplementation(() => ({
//       data: undefined,
//       isLoading: false,
//       isError: false,
//     }));
//     (useGetTransformedPhotosQuery as Mock).mockImplementation(() => ({
//       data: {
//         [mockCharactersData[0].name]: { image: mockCharactersData[0].image },
//       },
//     }));
//   });
//   test('renders detail page correctly with mock data', () => {
//     render(
//       <Provider store={store}>
//         <DetailPage />
//       </Provider>
//     );
//     expect(screen.getByTestId(DETAIL_PAGE_TEST_ID)).toBeInTheDocument();
//   });

//   test('navigates back to the list page on Back button click', async () => {
//     render(
//       <Provider store={store}>
//         <DetailPage />
//       </Provider>
//     );
//     await userEvent.click(
//       screen.getByRole('button', { name: DETAIL_PAGE_BUTTON_NAME })
//     );
//     await waitFor(() => {
//       expect(mocks.navigate).toHaveBeenCalledWith('/?page=2');
//     });
//   });

//   test('displays loading state when data is not available', () => {
//     (useGetCharactersQuery as Mock).mockImplementation(() => ({
//       character: mockCharactersData[0],
//       isLoading: true,
//       isError: false,
//     }));
//     render(
//       <Provider store={store}>
//         <DetailPage />
//       </Provider>
//     );
//     expect(screen.getByText(DETAIL_PAGE_LOADING)).toBeInTheDocument();
//   });

//   test('displays error message when error is present in loader data', () => {
//     (useGetCharactersQuery as Mock).mockImplementation(() => ({
//       character: mockCharactersData[0],
//       isLoading: false,
//       isError: true,
//     }));
//     render(
//       <Provider store={store}>
//         <DetailPage />
//       </Provider>
//     );
//     expect(screen.getByText(DETAIL_PAGE_ERROR)).toBeInTheDocument();
//   });

//   test('displays placeholder image when character image fails to load', () => {
//     (useAppSelector as unknown as Mock).mockReturnValue(undefined);
//     render(
//       <Provider store={store}>
//         <DetailPage />
//       </Provider>
//     );
//     expect(screen.getByRole('img')).toHaveAttribute('src', placeholder);
//   });

//   test('displays character image when available', () => {
//     (useGetTransformedPhotosQuery as Mock).mockReturnValue({
//       data: {
//         [mockCharactersData[0].name]: { image: mockImage },
//       },
//     });
//     render(
//       <Provider store={store}>
//         <DetailPage />
//       </Provider>
//     );
//     expect(screen.getByRole('img')).toHaveAttribute('src', mockImage);
//   });
//   test('displays character data when available', () => {
//     (useGetCharacterQuery as Mock).mockImplementation(() => ({
//       data: undefined,
//       isLoading: false,
//       isError: false,
//     }));
//     render(
//       <Provider store={store}>
//         <DetailPage />
//       </Provider>
//     );
//     expect(screen.getByText(mockCharactersData[0].name)).toBeInTheDocument();
//   });
//   test('fetches character data from the API if not available in the list', () => {
//     (useGetCharactersQuery as Mock).mockImplementation(() => ({
//       character: undefined,
//       isLoading: false,
//       isError: false,
//     }));
//     (useGetCharacterQuery as Mock).mockReturnValue(() => ({
//       data: mockCharactersData[0],
//       isLoading: false,
//       isError: false,
//     }));

//     render(
//       <Provider store={store}>
//         <DetailPage />
//       </Provider>
//     );
//     expect(useGetCharacterQuery).toHaveBeenCalledWith('1', { skip: false });
//   });
//   test('skips character by ID when found in list', () => {
//     (useGetCharactersQuery as Mock).mockReturnValue({
//       character: mockCharactersData[0],
//       isLoading: false,
//       isError: false,
//     });

//     render(<DetailPage />);
//     expect(useGetCharacterQuery).toHaveBeenCalledWith('1', {
//       skip: true,
//     });
//   });
// });
