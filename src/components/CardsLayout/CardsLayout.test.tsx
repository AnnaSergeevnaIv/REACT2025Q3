import { render, screen } from '@testing-library/react';
import { CardsLayout, type CardsLayoutProps } from './CardsLayout';
import { mockCharactersData } from '../../test-utils/mocks';

describe('CardsLayout component', () => {
  test('CardsLayout renders the correct number of cards with provided data', () => {
    const cardsLayoutProps: CardsLayoutProps = {
      characters: mockCharactersData,
    };
    render(<CardsLayout {...cardsLayoutProps} />);
    expect(screen.getAllByTestId('card')).toHaveLength(2);
  });

  test('CardsLayout renders zero cards when provided with an empty array', () => {
    const cardsLayoutProps: CardsLayoutProps = { characters: [] };
    render(<CardsLayout {...cardsLayoutProps} />);
    expect(screen.queryAllByTestId('card')).toHaveLength(0);
  });
});
