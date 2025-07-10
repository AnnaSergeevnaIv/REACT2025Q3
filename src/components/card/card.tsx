import { type CharacterData } from '../../services/network-requests';
import placeholder from '../../assets/placeholder.png';
import { CARD_CONTAINER_CLASS, CARD_IMAGE_CLASS } from './Card.constants';

export function Card({ name, height, eye_color, image }: CharacterData) {
  return (
    <div className={CARD_CONTAINER_CLASS} data-testid="card">
      <img
        src={image ? image : placeholder}
        alt={`${name} image`}
        className={CARD_IMAGE_CLASS}
      />
      <h3 className="font-bold text-white">{name}</h3>
      <p>{`Height: ${height}`}</p>
      <p>{`Eye color: ${eye_color}`}</p>
    </div>
  );
}
