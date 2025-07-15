import { render, screen } from '@testing-library/react';
import { Card, type CardProps } from './Card';
import placeholder from '../../assets/placeholder.png';

describe('Card component', () => {
  const baseProps: CardProps = {
    name: 'Darth Vader',
    height: 202,
    eye_color: 'yellow',
    url: '',
    cardClickHandle: () => {},
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
});
