import { type CharacterData } from '../../services/network-requests';
import { CARDS_LAYOUT_CONTAINER_CLASS } from './CardsLayout.constants';
import { Card } from '../Card';

export interface CardsLayoutProps {
  characters: CharacterData[];
}

export function CardsLayout({ characters }: CardsLayoutProps) {
  return (
    <div className={CARDS_LAYOUT_CONTAINER_CLASS}>
      {characters.map((character) => (
        <Card {...character} key={character.name} />
      ))}
    </div>
  );
}
