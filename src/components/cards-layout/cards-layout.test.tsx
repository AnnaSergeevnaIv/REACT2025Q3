import { render, screen } from '@testing-library/react';
import { CardsLayout, type CardsLayoutProps } from './cards-layout';
import { mockCharactersData } from '../../test-utils/mocks';

describe('CardsLayout component', () => {
  test('c renders the correct number of cards', () => {
    const cardsLayoutProps: CardsLayoutProps = {
      characters: mockCharactersData,
    };
    render(<CardsLayout {...cardsLayoutProps} />);
    expect(screen.getAllByTestId('card')).toHaveLength(2);
  });

  test('CardsLayout renders the correct number of cards', () => {
    const cardsLayoutProps: CardsLayoutProps = { characters: [] };
    render(<CardsLayout {...cardsLayoutProps} />);
    expect(screen.queryAllByTestId('card')).toHaveLength(0);
  });
});
