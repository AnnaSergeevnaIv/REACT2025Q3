import { Component, type ReactNode } from 'react';
import { type CharacterData } from '../../services/network-requests';
import { CARDS_LAYOUT_CONTAINER_CLASS } from './CardsLayout.constants';
import { Card } from '../Card';

export interface CardsLayoutProps {
  characters: CharacterData[];
}

export class CardsLayout extends Component<CardsLayoutProps> {
  render(): ReactNode {
    return (
      <div className={CARDS_LAYOUT_CONTAINER_CLASS}>
        {this.props.characters.map((character) => (
          <Card {...character} key={character.name} />
        ))}
      </div>
    );
  }
}
