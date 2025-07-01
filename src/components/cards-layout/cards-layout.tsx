import { Component, type ReactNode } from 'react';
import { type CharacterData } from '../../services/network-requests';
import { Card } from '../card/card';

interface CardsLayoutProps {
  characters: CharacterData[];
}

export class CardsLayout extends Component<CardsLayoutProps> {
  render(): ReactNode {
    return (
      <div className="flex flex-wrap gap-7 justify-center mb-7">
        {this.props.characters.map((character) => (
          <Card {...character} key={character.name} />
        ))}
      </div>
    );
  }
}
