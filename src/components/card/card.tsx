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
import { useGetTransformedPhotosQuery } from '../../services/api';
import { type FullCharacterData } from '../../services/network-requests/network-requests';

export interface CardProps extends FullCharacterData {
  cardClickHandle: (id: string) => void;
}
export function Card(props: CardProps) {
  const { name, height, eye_color, image, url, cardClickHandle } = props;
  const dispatch = useAppDispatch();
  const { data } = useGetTransformedPhotosQuery(undefined);

  const checkedCards = useAppSelector(selectCheckedCharacters);
  const photoImage =
    data && data[name]?.image ? data[name].image : image ? image : placeholder;

  const checkboxClickHandle = (event: ChangeEvent) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (event.target.checked) {
      dispatch(
        characterAdded({
          name,
          height,
          eye_color,
          url,
          image: photoImage,
          hair_color: props.hair_color,
          mass: props.mass,
          skin_color: props.skin_color,
        })
      );
    } else {
      dispatch(
        characterRemoved({
          name,
          height,
          eye_color,
          url,
          image: photoImage,
          hair_color: props.hair_color,
          mass: props.mass,
          skin_color: props.skin_color,
        })
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
