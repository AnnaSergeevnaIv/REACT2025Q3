import { type CharacterData } from '../../services/network-requests/network-requests';
import placeholder from '../../assets/placeholder.png';
import {
  CARD_CHECKBOX_CLASS,
  CARD_CHECKBOX_TEST_ID,
  CARD_CONTAINER_CLASS,
  CARD_IMAGE_CLASS,
  CARD_TEST_ID,
} from './Card.constants';
import { getIdFromUrl } from './Card.utils';
import type { ChangeEvent, MouseEvent } from 'react';
import { increment, selectCheckedCards } from '../../store/counter-slice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

export interface CardProps extends CharacterData {
  cardClickHandle: (id: string) => void;
}
export function Card({
  name,
  height,
  eye_color,
  image,
  url,
  cardClickHandle,
}: CardProps) {
  const dispatch = useAppDispatch();
  const checkedCards = useAppSelector(selectCheckedCards);
  const checkboxClickHandle = (event: ChangeEvent) => {
    if (event.target instanceof HTMLInputElement && event.target.checked) {
      dispatch(increment({ name, height, eye_color, image, url }));
    }
  };
  const cardContainerClickHandle = (event: MouseEvent) => {
    if (event.target instanceof HTMLInputElement) return;
    cardClickHandle(getIdFromUrl(url));
  };
  const isCardChecked = () => {
    const checkedCard = checkedCards.find((card) => card.name === name);
    return !!checkedCard;
  };
  return (
    <div
      className={CARD_CONTAINER_CLASS}
      data-testid={CARD_TEST_ID}
      onClick={cardContainerClickHandle}
    >
      <input
        type="checkbox"
        onChange={checkboxClickHandle}
        className={CARD_CHECKBOX_CLASS}
        checked={isCardChecked()}
        data-testid={CARD_CHECKBOX_TEST_ID}
      />
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
