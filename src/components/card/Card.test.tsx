import { render, screen } from '@testing-library/react';
import { Card, type CardProps } from './Card';
import placeholder from '../../assets/placeholder.png';
import userEvent from '@testing-library/user-event';
import { CARD_TEST_ID } from './Card.constants';

describe('Card component', () => {
  const baseProps: CardProps = {
    name: 'Darth Vader',
    height: 202,
    eye_color: 'yellow',
    url: 'www.ggg/1/',
    cardClickHandle: vi.fn(),
  };
  test('Card component should render image from given props', () => {
    const props: CardProps = {
      ...baseProps,
      image:
        'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg',
    };
    render(<Card {...props} />);
    expect(
      screen.getByRole('img', { name: `${props.name} image` })
    ).toHaveAttribute(
      'src',
      'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg'
    );
  });

  test('Card component should render placeholder image when no image prop is provided', () => {
    render(<Card {...baseProps} />);
    expect(
      screen.getByRole('img', { name: `${baseProps.name} image` })
    ).toHaveAttribute('src', placeholder);
  });

  test('calls cardClickHandle with correct id on click', async () => {
    render(<Card {...baseProps} />);
    await userEvent.click(screen.getByTestId(CARD_TEST_ID));
    expect(baseProps.cardClickHandle).toHaveBeenCalledWith('1');
  });
});
