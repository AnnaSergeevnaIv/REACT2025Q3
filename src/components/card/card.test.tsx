import { render, screen } from '@testing-library/react';
import { type CharacterData } from '../../services/network-requests';
import { Card } from './card';
import placeholder from '../../assets/placeholder.png';

describe('Card component', () => {
  test('Card component should render image from given props', () => {
    const mockProps: CharacterData = {
      name: 'Darth Vader',
      height: 202,
      eye_color: 'yellow',
      image:
        'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg',
    };
    render(<Card {...mockProps} />);
    expect(
      screen.getByRole('img', { name: mockProps.name + ' image' })
    ).toHaveAttribute(
      'src',
      'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg'
    );
  });

  test('Card component should render placeholder image when no image prop is provided', () => {
    const mockProps: CharacterData = {
      name: 'Darth Vader',
      height: 202,
      eye_color: 'yellow',
    };
    render(<Card {...mockProps} />);
    expect(
      screen.getByRole('img', { name: mockProps.name + ' image' })
    ).toHaveAttribute('src', placeholder);
  });
});
