'use client';
import {
  CARD_CHECKBOX_CLASS,
  CARD_CHECKBOX_TEST_ID,
  CARD_CONTAINER_CLASS,
  CARD_DETAIL_PAGE_CONTAINER_CLASS,
  CARD_IMAGE_CLASS,
  CARD_TEST_ID,
} from './Card.constants';
import { getIdFromUrl } from './Card.utils';
import { useContext, type ChangeEvent, type MouseEvent } from 'react';
import {
  characterAdded,
  characterRemoved,
  selectCheckedCharacters,
} from '../../store/characterSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { type FullCharacterData } from '../../services/api/character.types';
import Image from 'next/image';
import './Card.css';
import { useRouter } from '../../i18n/routing';
import { useSearchParams } from 'next/navigation';
import { PhotoContext } from '../../services/PhotoContext/PhotoContext';
import React from 'react';
import { useTranslations } from 'next-intl';
export interface CardProps extends FullCharacterData {
  isDetailPage?: boolean;
}
export function Card(props: CardProps) {
  const t = useTranslations('Card');
  const { name, height, eye_color, image, url, ...rest } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const checkedCards = useAppSelector(selectCheckedCharacters);
  const photos = useContext(PhotoContext);
  const photo = photos.find((photo) => photo.name === name)?.image;
  const photoImage = image || photo;

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
    router.push(`/character/${getIdFromUrl(url)}?${params?.toString()}`);
  };
  const isCardChecked = () => {
    const checkedCard = checkedCards.find((card) => card.name === name);
    return !!checkedCard;
  };
  return (
    <div
      className={
        rest.isDetailPage
          ? CARD_DETAIL_PAGE_CONTAINER_CLASS
          : CARD_CONTAINER_CLASS
      }
      data-testid={CARD_TEST_ID}
      onClick={cardContainerClickHandle}
    >
      {rest.isDetailPage || image ? (
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
      <Image
        src={photoImage ? photoImage : '/placeholder.png'}
        alt={`${name} image`}
        className={CARD_IMAGE_CLASS}
        width={200}
        height={200}
      />
      <h3>{name}</h3>
      <p>{`${t('height')}: ${height}`}</p>
      <p>{`${t('eyeColor')}: ${eye_color}`}</p>
      {rest.isDetailPage && (
        <>
          <p>{`${t('hairColor')}: ${rest.hair_color}`}</p>
          <p>{`${t('mass')}: ${rest.mass}`}</p>
          <p>{`${t('skinColor')}: ${rest.skin_color}`}</p>
        </>
      )}
    </div>
  );
}
