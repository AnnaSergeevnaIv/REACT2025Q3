import { render, screen } from '@testing-library/react';
import { CardsLayout } from './CardsLayout';
import { mockCharactersData } from '../../test-utils/mocks';
import type { Mock } from 'vitest';

vi.mock('react-router', () => {
  const original = vi.importActual('react-router');
  return {
    ...original,
    useRouteLoaderData: vi.fn(),
  };
});
import * as reactRouter from 'react-router';

describe('CardsLayout component', () => {
  beforeEach(() => {
    (reactRouter.useRouteLoaderData as Mock).mockReturnValue({
      data: mockCharactersData,
      error: undefined,
    });
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
      data: [],
      error: undefined,
    });
    render(<CardsLayout />);
    expect(screen.queryAllByTestId('card')).toHaveLength(0);
  });
});
