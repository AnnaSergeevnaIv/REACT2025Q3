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
import {
  characterAdded,
  characterRemoved,
  selectCheckedCharacters,
} from '../../store/characterSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectPhotoById } from '../../store/photosSlice';

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
  const photo = useAppSelector((state) => selectPhotoById(state, name));
  const photoImage = photo ? photo.image : image ? image : placeholder;

  const checkedCards = useAppSelector(selectCheckedCharacters);
  const checkboxClickHandle = (event: ChangeEvent) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (event.target.checked) {
      dispatch(
        characterAdded({ name, height, eye_color, url, image: photo.image })
      );
    } else {
      dispatch(
        characterRemoved({ name, height, eye_color, url, image: photo.image })
      );
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
      {image ? (
        <></>
      ) : (
        <input
          type="checkbox"
          onChange={checkboxClickHandle}
          className={CARD_CHECKBOX_CLASS}
          checked={isCardChecked()}
          data-testid={CARD_CHECKBOX_TEST_ID}
        />
      )}
      <img
        src={photoImage}
        alt={`${name} image`}
        className={CARD_IMAGE_CLASS}
      />
      <h3>{name}</h3>
      <p>{`Height: ${height}`}</p>
      <p>{`Eye color: ${eye_color}`}</p>
    </div>
  );
}
