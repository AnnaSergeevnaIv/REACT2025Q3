import { render, screen } from '@testing-library/react';
import { Card, type CardProps } from './Card';
import placeholder from '../../assets/placeholder.png';
import userEvent from '@testing-library/user-event';
import {
  CARD_CHECKBOX_TEST_ID,
  CARD_DETAIL_PAGE_CONTAINER_CLASS,
  CARD_TEST_ID,
} from './Card.constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import type { Mock } from 'vitest';
import { mockCharactersData, mockImage } from '../../test-utils/mocks';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useGetTransformedPhotosQuery } from '../../services/api';
vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn().mockReturnValue([]),
}));
vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: vi.fn(),
}));
vi.mock('../../services/api', () => ({
  useGetTransformedPhotosQuery: vi.fn().mockReturnValue({
    data: undefined,
  }),
}));
describe('Card component', () => {
  const mockDispatch = vi.fn();
  const baseProps: CardProps = {
    name: 'Darth Vader',
    height: 202,
    eye_color: 'yellow',
    url: 'www.ggg/1/',
    cardClickHandle: vi.fn(),
    hair_color: 'black',
    mass: '100',
    skin_color: 'white',
    isDetailPage: false,
  };
  const { name, height, eye_color, url } = baseProps;
  const expectedPayload = {
    name,
    height,
    eye_color,
    url,
    image: placeholder,
    hair_color: 'black',
    mass: '100',
    skin_color: 'white',
  };

  beforeEach(() => {
    mockDispatch.mockClear();
    (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useAppSelector as unknown as Mock).mockReturnValue([]);
    (useGetTransformedPhotosQuery as unknown as Mock).mockReturnValue({
      data: undefined,
    });
  });

  test('displays character name correctly', () => {
    render(<Card {...baseProps} />);
    expect(screen.getByText(baseProps.name)).toBeInTheDocument();
  });

  test('displays character height correctly', () => {
    render(<Card {...baseProps} />);
    expect(screen.getByText(`Height: ${baseProps.height}`)).toBeInTheDocument();
  });

  test('displays character eye color correctly', () => {
    render(<Card {...baseProps} />);
    expect(
      screen.getByText(`Eye color: ${baseProps.eye_color}`)
    ).toBeInTheDocument();
  });

  test('Card component should render image from data', () => {
    (useGetTransformedPhotosQuery as unknown as Mock).mockReturnValue({
      data: {
        [baseProps.name]: {
          image: mockImage,
        },
      },
    });
    render(<Card {...baseProps} />);
    expect(
      screen.getByRole('img', { name: `${baseProps.name} image` })
    ).toHaveAttribute('src', mockImage);
  });

  test('Card component should render placeholder image when photo and image from props are undefined', () => {
    render(<Card {...baseProps} />);
    expect(
      screen.getByRole('img', { name: `${baseProps.name} image` })
    ).toHaveAttribute('src', placeholder);
  });

  test('Card component should render image from given props if photo is undefined', () => {
    const props: CardProps = {
      ...baseProps,
      image: mockImage,
    };
    render(<Card {...props} />);
    expect(
      screen.getByRole('img', { name: `${props.name} image` })
    ).toHaveAttribute('src', mockImage);
  });

  test('calls cardClickHandle with correct id on click', async () => {
    render(<Card {...baseProps} />);
    await userEvent.click(screen.getByTestId(CARD_TEST_ID));
    expect(baseProps.cardClickHandle).toHaveBeenCalledWith('1');
  });

  test('renders card with unchecked checkbox when character is not in the store', () => {
    render(<Card {...baseProps} />);
    expect(screen.getByTestId(CARD_CHECKBOX_TEST_ID)).not.toBeChecked();
  });
  test('renders card with checked checkbox when character is present in the store', () => {
    (useAppSelector as unknown as Mock).mockReturnValue([
      ...mockCharactersData,
    ]);
    render(<Card {...baseProps} />);
    expect(screen.getByTestId(CARD_CHECKBOX_TEST_ID)).toBeChecked();
  });

  test('dispatches charactersAdded action when checkbox is clicked and checked', async () => {
    render(<Card {...baseProps} />);
    await userEvent.click(screen.getByTestId(CARD_CHECKBOX_TEST_ID));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'counter/characterAdded',
      payload: expectedPayload,
    });
  });
  test('calls cardClickHandle when cardis clicked', async () => {
    render(<Card {...baseProps} />);
    await userEvent.click(screen.getByTestId(CARD_TEST_ID));
    expect(baseProps.cardClickHandle).toHaveBeenCalledWith('1');
  });
  test('does not dispatch character action when clicking on card (not checkbox)', async () => {
    render(<Card {...baseProps} />);
    await userEvent.click(screen.getByTestId(CARD_TEST_ID));
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('dispatches characterRemoved action when checkbox is clicked and checked', async () => {
    (useAppSelector as unknown as Mock).mockReturnValueOnce([
      mockCharactersData[0],
    ]);
    render(<Card {...baseProps} />);
    await userEvent.click(screen.getByTestId(CARD_CHECKBOX_TEST_ID));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'counter/characterRemoved',
      payload: expectedPayload,
    });
  });

  test('renders card with detail page container class when isDetailPage is true', () => {
    render(<Card {...baseProps} isDetailPage={true} />);
    expect(screen.getByTestId(CARD_TEST_ID)).toHaveClass(
      CARD_DETAIL_PAGE_CONTAINER_CLASS
    );
    expect(
      screen.getByText(`Hair color: ${baseProps.hair_color}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Mass: ${baseProps.mass}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Skin color: ${baseProps.skin_color}`)
    ).toBeInTheDocument();
  });
});
